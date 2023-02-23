import type { TaskAttempt } from "@prisma/client";
import type { Control } from "react-hook-form";
import type {
  FormValues,
  SubmitHandler,
  TaskPageProps,
} from "../../pages/tasks/[id]";
import { MathDisplay } from "../math/MathDisplay";
import { MathInput } from "../math/MathInput";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Collapsible } from "../ui/Collapsible";
import { TaskNavigation } from "./TaskNavigation";

interface Props {
  task: Omit<TaskPageProps["task"], "image">;
  attempt: TaskAttempt | undefined;
  form: {
    submitHandler: SubmitHandler;
    control: Control<FormValues, any>;
  };
  isLoading: boolean;
  isAnswering: boolean;
}
export const TextTask = ({
  task,
  attempt,
  form: { submitHandler, control },
  isAnswering,
  isLoading,
}: Props) => {
  return (
    <>
      <div className="mt-0 flex flex-col items-center justify-center gap-4 rounded-md border-2 border-brand-purple bg-gradient-radial from-[rgba(217,217,217,0.12)] to-white bg-cover px-10 py-10 shadow-4-right shadow-brand-purple lg:mt-10 lg:gap-8 lg:px-0">
        <div className="text-4xl font-bold text-brand-green lg:text-5xl">
          {task.title}
        </div>
        <Badge text={task.category.name} />
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

          {/* If task is answered */}
          <MathInput control={control} name="answer" />

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
      </div>
    </>
  );
};
