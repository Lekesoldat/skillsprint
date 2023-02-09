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
        <span className="h-full" key={i}>
          <math-field class="ml-1 inline-flex" read-only>
            {match}
          </math-field>
        </span>
      ))}
    </p>
  );
};
