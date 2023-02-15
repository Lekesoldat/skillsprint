import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { FC } from "react";

interface TaskCardProps {
  title: string;
  points: number;
  solved: VariantProps<typeof taskCardStyle>["solved"];
}

export const TaskCard: FC<TaskCardProps> = ({ title, points, solved }) => {
  return (
    <div className={taskCardStyle({ solved })}>
      <div>{title}</div>

      {solved ? <p>🎉</p> : <p>{points}p</p>}
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
    "rounded-md border-2 border-brand-black bg-brand-white",
  ],
  {
    variants: {
      solved: {
        true: ["shadow-4-right-border-green"],
        false: ["shadow-4-right-border-purple"],
      },
    },
    defaultVariants: {
      solved: true,
    },
  }
);
