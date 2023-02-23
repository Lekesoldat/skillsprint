import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import superjson from "superjson";
import { MathDisplay } from "../../components/math/MathDisplay";
import { MathInput } from "../../components/math/MathInput";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { useToast } from "../../hooks/use-toast";
import { appRouter } from "../../server/api/root";
import { createInnerTRPCContext } from "../../server/api/trpc";
import type { RouterOutputs } from "../../utils/api";
import { api } from "../../utils/api";

export type TaskPageProps = InferGetStaticPropsType<typeof getStaticProps>;

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
    <div className="mb-[200px] mt-8 w-full lg:mb-0">
      <div className="bg-[url('/grid.svg')]">
        <div className="mt-0 flex flex-col items-center justify-center gap-4 rounded-md border-2 border-brand-purple bg-gradient-radial from-[rgba(217,217,217,0.12)] to-white bg-cover px-10 py-10 shadow-4-right shadow-brand-purple lg:mt-10 lg:gap-8 lg:px-0">
          <div className="text-4xl font-bold text-brand-green lg:text-5xl">
            {task.title}
          </div>
          <Badge text={task.category.name} />
          <div className="flex max-w-[75ch] flex-col items-center rounded-md bg-white p-4">
            {task.image && (
              <div className="relative mb-4 h-[350px] w-[350px] lg:h-[450px] lg:w-[450px]">
                <Image
                  src={task.image}
                  alt={task.title}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <MathDisplay description={task.description} />
          </div>
          <form className="grid gap-6" onSubmit={submitHandler}>
            {attempt?.result === "SUCCESS" ? (
              <div className="flex w-full justify-center">
                <div className="rounded-lg border-2 bg-brand-white p-4">
                  <MathDisplay description={`math$${task.answer}&`} />
                </div>
              </div>
            ) : (
              <MathInput control={control} name="answer" />
            )}

            {/* If task is answered */}
            {attempt?.result === "SUCCESS" ? (
              <p className="mb-4 font-medium text-brand-green">
                Denne oppgaven er fullført! Svaret ser du over.
              </p>
            ) : (
              <Button type="submit" loading={isLoading || isAnswering}>
                Sjekk svar
              </Button>
            )}

            {attempt?.result === "SUCCESS" && (
              <div className="flex justify-between">
                {task.prevTask?.id ? (
                  <Link href={`/tasks/${task.prevTask.id}`}>
                    <Button size="xs">Gå tilbake</Button>
                  </Link>
                ) : (
                  <div />
                )}
                {task.nextTaskId ? (
                  <Link href={`/tasks/${task.nextTaskId}`}>
                    <Button size="xs">Gå videre</Button>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            )}
          </form>
        </div>
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
