import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import type { BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import superjson from "superjson";
import { PictureTask } from "../../components/task-answer/PictureTask";
import { TextTask } from "../../components/task-answer/TextTask";
import { useToast } from "../../hooks/use-toast";
import { appRouter } from "../../server/api/root";
import { createInnerTRPCContext } from "../../server/api/trpc";
import type { RouterOutputs } from "../../utils/api";
import { api } from "../../utils/api";

export type TaskPageProps = InferGetStaticPropsType<typeof getStaticProps>;

export type SubmitHandler = (
  e?: BaseSyntheticEvent<object, any, any> | undefined
) => Promise<void>;

export type FormValues = {
  answer: string;
};

export default function TaskPage({ task }: TaskPageProps) {
  const { handleSubmit, control } = useForm<FormValues>();

  const utils = api.useContext();
  const { toast } = useToast();

  const { data: attempt, isLoading } = api.taskAttempt.startAttempt.useQuery(
    task.id
  );

  const { mutate, isLoading: isAnswering } =
    api.taskAttempt.attemptAnswer.useMutation({
      onSettled: (data) => {
        if (!data || data.result === "PENDING") {
          return;
        }
        if (data.result === "SUCCESS") {
          toast({
            title: `Riktig svar! +${task.points} poeng`,
            variant: "success",
          });
          void utils.auth.me.invalidate();
          void utils.taskAttempt.startAttempt.setData(task.id, data);
        } else if (data.result === "FAIL") {
          toast({
            title: "Svaret ditt er feil. Prøv igjen!",
            variant: "destructive",
          });
          // Start a new attempt on fail if the user has not previously solved it
          // if (attempt?.result === "SUCCESS") {
          //   void utils.taskAttempt.startAttempt.setData(task.id, data);
          // } else {
          void utils.taskAttempt.startAttempt.invalidate(task.id);
          // }
        }
      },
    });

  const submitHandler = handleSubmit((data) => {
    mutate({
      answer: data.answer,
      taskId: task.id,
    });
  });

  return (
    <div className="mb-[200px] mt-8 w-full lg:mb-40">
      <div className="bg-[url('/grid.svg')]">
        {task.image ? (
          <PictureTask
            task={task}
            attempt={attempt}
            form={{ submitHandler, control }}
            isAnswering={isAnswering}
            isLoading={isLoading}
          />
        ) : (
          <TextTask
            task={task}
            attempt={attempt}
            form={{ submitHandler, control }}
            isAnswering={isAnswering}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}

type Props = {
  task: RouterOutputs["task"]["getByIdIncludeCategory"];
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null }),
    transformer: superjson, // optional - adds superjson serialization
  });

  const tasksIds = await ssg.task.getAllAvailableTaskIds.fetch();

  const paths = tasksIds.map(({ id }) => ({ params: { id: id } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, { id: string }> = async (
  ctx
) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null }),
    transformer: superjson, // optional - adds superjson serialization
  });
  const id = ctx.params?.id;
  if (!id) {
    return {
      notFound: true,
    };
  }

  const task = await ssg.task.getByIdIncludeCategory.fetch({ id: id });
  return {
    props: {
      task,
    },
  };
};
