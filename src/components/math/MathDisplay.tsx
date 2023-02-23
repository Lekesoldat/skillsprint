import type { FC } from "react";
import { useEffect } from "react";
import reactStringReplace from "react-string-replace";

interface MathDisplayProps {
  description: string;
  className?: string;
}
export const MathDisplay: FC<MathDisplayProps> = ({
  description,
  className,
}) => {
  useEffect(() => {
    import("mathlive");
  }, []);

  return (
    <p className={className}>
      {reactStringReplace(description, /math\$(.*?)\&/, (match, i) => (
        <span className="h-full" key={i}>
          <math-field class="mx-1 inline-flex" read-only>
            {match}
          </math-field>
        </span>
      ))}
    </p>
  );
};
