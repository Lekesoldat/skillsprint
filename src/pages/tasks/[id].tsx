import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TaskDescription } from "../../components/math/MathDisplay";
import { MathInput } from "../../components/math/MathInput";
import { TaskCompletionPopover } from "../../components/TaskCompletionPopover";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { createInnerTRPCContext } from "../../server/api/trpc";
import type { RouterOutputs } from "../../utils/api";
import { api } from "../../utils/api";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import superjson from "superjson";
import { appRouter } from "../../server/api/root";

export type FormValues = {
  answer: string;
};

export default function TaskPage({
  task,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { handleSubmit, control } = useForm<FormValues>();
  const utils = api.useContext();
  const [submitted, setSubmitted] = useState(false);

  const { data: attempt, isLoading } = api.taskAttempt.startAttempt.useQuery(
    task.id
  );
  const { mutate, isLoading: isAnswering } =
    api.taskAttempt.attemptAnswer.useMutation({
      onSettled: (data) => {
        const res = data?.result || "PENDING";
        setSubmitted(true);
        if (data) {
          void utils.taskAttempt.startAttempt.setData(task.id, data);
          console.log({ attempt });
        }
        if (res === "SUCCESS") {
          void utils.auth.me.invalidate();
        }
      },
    });

  console.log(attempt);

  return (
    <div className="w-full">
      <div className="bg-[url('/grid.svg')]">
        <div className="mt-10 flex flex-col items-center justify-center gap-12 rounded-md border-2 border-brand-blue bg-gradient-radial from-[rgba(217,217,217,0.12)] to-white bg-cover py-10 shadow-4-right shadow-brand-blue">
          <div className="text-6xl font-bold text-brand-green">
            {task.title}
          </div>
          <Badge text={task.category.name} />
          <div className="max-w-[75ch] rounded-md bg-white p-4">
            <TaskDescription description={task.description} />
          </div>
          <form
            className="grid gap-6"
            onSubmit={handleSubmit((data) => {
              mutate({
                answer: data.answer,
                taskId: task.id,
              });
            })}
          >
            <MathInput control={control} name="answer" />

            <TaskCompletionPopover
              points={task.points}
              status={attempt?.result || "PENDING"}
              // show={answered && }
              submitted={
                submitted && attempt
                  ? attempt.result !== "PENDING"
                  : false && !isAnswering
              }
            >
              <Button type="submit" loading={isLoading}>
                Sjekk svar
              </Button>
            </TaskCompletionPopover>
            {attempt?.result === "SUCCESS" && (
              <div>
                <p className="mb-4 font-medium text-brand-green">
                  Denne oppgaven er fullført!
                </p>
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
