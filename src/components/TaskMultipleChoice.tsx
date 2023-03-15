import type { FC } from "react";
import type { UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";
import type { FormValues } from "../pages/tasks/[id]";
import { Label } from "./ui/Label";
import { RadioGroup, RadioGroupItem } from "./ui/RadioGroup";

interface TaskMultipleChoiceProps extends UseControllerProps<FormValues> {
  choices: string[];
}

export const TaskMultipleChoice: FC<TaskMultipleChoiceProps> = (props) => {
  const { field } = useController(props);

  return (
    <RadioGroup className="bg-white" {...field} onValueChange={field.onChange}>
      {props.choices.map((choice, i) => (
        <div className="flex items-center space-x-2" key={choice}>
          <RadioGroupItem value={`${i + 1}`} id={`choice-{${i + 1}}`} />
          <Label
            className="w-full cursor-pointer"
            htmlFor={`choice-{${i + 1}}`}
          >
            {String.fromCharCode("a".charCodeAt(0) + i)})&nbsp;{choice}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};
