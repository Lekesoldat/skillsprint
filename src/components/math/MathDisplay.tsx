import { FC, useEffect } from "react";
import reactStringReplace from "react-string-replace";

interface TaskDescriptionProps {
  description: string;
}
export const TaskDescription: FC<TaskDescriptionProps> = ({ description }) => {
  useEffect(() => {
    import("mathlive");
  }, []);

  return (
    <p>
      {reactStringReplace(description, /math\((.+)\)/, (match, i) => (
        <span className="h-full">
          <math-field read-only class="ml-1 inline-flex">
            {match}
          </math-field>
        </span>
      ))}
    </p>
  );
};
