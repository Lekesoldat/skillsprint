import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import type { RouterOutputs } from "../../utils/api";
import { api } from "../../utils/api";
import { MathInput } from "../../components/math/MathInput";
import { TaskDescription } from "../../components/math/MathDisplay";
import { useForm } from "react-hook-form";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { appRouter } from "../../server/api/root";
import { useState } from "react";
import { createInnerTRPCContext } from "../../server/api/trpc";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

export type FormValues = {
  answer: string;
};

export default function TaskPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { handleSubmit, control } = useForm<FormValues>();
  const [status, setStatus] = useState<
    RouterOutputs["taskAttempt"]["attemptAnswer"]["result"]
  >(props.attempt.result);

  const { data: task, isError } = api.task.getByIdIncludeCategory.useQuery(
    {
      id: props.id,
    },
    { enabled: !!props.id }
  );

  const { mutate } = api.taskAttempt.attemptAnswer.useMutation({
    onSettled: (data, err) => {
      setStatus(data?.result || "PENDING");
    },
  });

  if (isError) return <>Error bruvv...</>;
  if (!task) return <>Loading...</>;

  return (
    <div className="bg-[url('/grid.svg')]">
      <div className="mt-10 flex flex-col items-center justify-center gap-12 rounded-md border-2 border-brand-blue bg-gradient-radial from-[rgba(217,217,217,0.12)] to-white bg-cover py-10 shadow-4-right shadow-brand-blue">
        <div className="text-6xl font-bold text-brand-green">{task.title}</div>
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
          <Button variant="shadow" type="submit">
            Sjekk svar
          </Button>
        </form>
        {status === "SUCCESS" && (
          <p className="text-green-600">Du har svart riktig!</p>
        )}
        {status === "FAIL" && (
          <p className="text-red-600">Du har svart feil!</p>
        )}
      </div>
    </div>
  );
}

type Props = {
  attempt: RouterOutputs["taskAttempt"]["startAttempt"];
  id: string;
};

export const getServerSideProps: GetServerSideProps<
  Props,
  { id: string }
> = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const caller = appRouter.createCaller(
    createInnerTRPCContext({
      session: session,
    })
  );
  const id = ctx.params?.id;

  if (!id) {
    return {
      notFound: true,
    };
  }
  const attempt = await caller.taskAttempt.startAttempt(id);
  console.log(attempt);
  return {
    props: {
      attempt,
      id,
    },
  };
};
