import type { TaskAttempt, TaskHint } from "@prisma/client";
import type { Control } from "react-hook-form";
import type {
  FormValues,
  SubmitHandler,
  TaskPageProps,
} from "../../pages/tasks/[id]";
import { MathDisplay } from "../math/MathDisplay";
import { MathInput } from "../math/MathInput";
import { Button } from "../ui/Button";
import { Collapsible } from "../ui/Collapsible";
import { TaskNavigation } from "./TaskNavigation";

const TaskHints: Record<TaskHint, string> = {
  MULTIPLE_VALUES:
    "Denne oppgaven kan ha flere svar. Oppgi med komma mellom svarene, f.eks: x=13,x=-13",
  FUNCTION:
    "Oppgi funksjonen uten deklarasjonen foran, f.eks: 2x+1 og ikke f(x)=2x+1",
  DECIMAL:
    "Dersom svaret har desimaler i seg, bruk punktum i stedet for komma, f.eks: 1.5",
  FLAG: "Løsningsordet på denne oppgaven får du av læreren din når du har gjort oppgaven.",
};

interface TaskFormProps {
  task: TaskPageProps["task"];
  attempt: TaskAttempt | undefined;
  form: {
    submitHandler: SubmitHandler;
    control: Control<FormValues, any>;
  };
  isLoading: boolean;
  isAnswering: boolean;
}
export const AnswerForm = ({
  task,
  attempt,
  form: { submitHandler, control },
  isAnswering,
  isLoading,
}: TaskFormProps) => {
  return (
    <>
      <div className="flex max-w-[75ch] flex-col items-center rounded-md bg-white p-4">
        <MathDisplay description={task.description} />
      </div>

      <form className="mt-3 flex flex-col gap-4" onSubmit={submitHandler}>
        {attempt?.result === "SUCCESS" && (
          <div className="flex w-full justify-center">
            <div className="rounded-lg border-2 bg-brand-white p-4">
              <Collapsible
                trigger="Du har svart på denne oppgaven"
                className="[&>div>button]:font-bold [&>div>button]:text-brand-green"
              >
                <MathDisplay
                  description={`math$${task.answer}&`}
                  className="text-center text-xl"
                />
              </Collapsible>
            </div>
          </div>
        )}
        <MathInput control={control} name="answer" />

        {task.hint && (
          <div className="rounded-md border-2 border-brand-black bg-brand-babyBlue px-2 py-1 text-brand-black">
            NB! {TaskHints[task.hint]}
          </div>
        )}

        <Button type="submit" loading={isLoading || isAnswering}>
          Sjekk svar
        </Button>

        {attempt?.result === "SUCCESS" && (
          <TaskNavigation
            prevTaskId={task.prevTask?.id}
            nextTaskId={task?.nextTaskId}
          />
        )}
      </form>
    </>
  );
};