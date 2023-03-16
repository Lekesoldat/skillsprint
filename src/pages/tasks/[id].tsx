import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import superjson from "superjson";
import { PictureTask } from "../../components/task-answer/PictureTask";
import { AnswerForm } from "../../components/task-answer/TaskForm";
import { TextTask } from "../../components/task-answer/TextTask";
import { useToast } from "../../hooks/use-toast";
import { appRouter } from "../../server/api/root";
import { createInnerTRPCContext } from "../../server/api/trpc";
import type { RouterOutputs } from "../../utils/api";
import { api } from "../../utils/api";
import { starsConfetti } from "../../utils/confetti";

export type TaskPageProps = InferGetStaticPropsType<typeof getStaticProps>;

export type FormValues = {
  answer: string;
};

export default function TaskPage({ task }: TaskPageProps) {
  const form = useForm<FormValues>();

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
          if (attempt?.result === "SUCCESS") {
            toast({
              title: "Riktig svar!",
              description: "Men du har allerede fått poeng for denne oppgaven",
              variant: "success",
            });
          } else {
            toast({
              title: `Riktig svar! +${task.points} poeng`,
              variant: "success",
            });
          }

          starsConfetti();
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
          void utils.auth.me.invalidate();
          void utils.taskAttempt.startAttempt.invalidate(task.id);
          // }
        }
      },
    });

  const handleSubmit = useCallback(
    (data: FormValues) => {
      mutate({
        answer: data.answer,
        taskId: task.id,
      });
    },
    [mutate, task.id]
  );

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        void form.handleSubmit(handleSubmit)();
      }
    };
    document.addEventListener("keydown", keyDownHandler);

    // clean up
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [form, form.handleSubmit, handleSubmit]);

  return (
    <div className="mb-[200px] mt-8 w-full lg:mb-60">
      <div className="bg-[url('/grid.svg')]">
        {task.image ? (
          <PictureTask task={task}>
            <AnswerForm
              task={task}
              attempt={attempt}
              form={form}
              isAnswering={isAnswering}
              isLoading={isLoading}
              onSubmit={handleSubmit}
            />
          </PictureTask>
        ) : (
          <TextTask task={task}>
            <AnswerForm
              task={task}
              attempt={attempt}
              form={form}
              isAnswering={isAnswering}
              isLoading={isLoading}
              onSubmit={handleSubmit}
            />
          </TextTask>
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
