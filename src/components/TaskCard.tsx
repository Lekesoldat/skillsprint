import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { ChevronsUpDown } from "lucide-react";
import type { FC } from "react";

interface TaskCardProps extends VariantProps<typeof taskCardStyle> {
  title: string;
  points: number;
  possible?: number;
}

// TODO: fiks dette
export const TaskCard: FC<TaskCardProps> = ({
  title,
  points,
  possible,
  variant,
}) => {
  return (
    <div className={taskCardStyle({ variant })}>
      <div>{title}</div>

      <div className="flex flex-row items-center">
        {variant === "solved" && <p>+{points}p</p>}
        {variant === "unsolved" && <p>{points}p</p>}
        {variant === "group" && (
          <p>
            {points}/{possible}
          </p>
        )}
        {variant === "group" && <ChevronsUpDown className="ml-2 h-4 w-4" />}
      </div>
    </div>
  );
};

const taskCardStyle = cva(
  [
    // Spacing
    "my-2 py-4 px-6",

    // Placement
    "flex justify-between",

    // Width
    "min-w-[300px]",

    // Misc
    "rounded-md border-2 border-brand-black bg-brand-white transition-all duration-300",
    "hover:ring-1 ring-black",
  ],
  {
    variants: {
      variant: {
        solved: ["shadow-4-right-border-green text-brand-green"],
        unsolved: ["shadow-4-right-border-pink"],
        group: ["shadow-4-right-border-blue"],
      },
    },
    defaultVariants: {
      variant: "unsolved",
    },
  }
);
