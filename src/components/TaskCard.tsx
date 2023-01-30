import type { AttemptStatus } from "@prisma/client";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import Link from "next/link";
import type { FC } from "react";

interface TaskCardProps {
  taskId: string;
  title: string;
  points: number;
  status: AttemptStatus;
  shadowDirection: VariantProps<typeof taskCardStyles>["shadowDirection"];
  color: VariantProps<typeof taskCardStyles>["color"];
}

// TODO: Ikke i nærheten av ferdig. Hater designet.
export const TaskCard: FC<TaskCardProps> = ({
  taskId,
  title,
  points,
  status,
  shadowDirection,
  color,
}) => {
  return (
    <Link href={`/tasks/${taskId}`}>
      <div className={taskCardStyles({ color, shadowDirection })}>
        {/* Title */}
        <div>{title}</div>

        {/* Points */}
        <p>
          {status === "SUCCESS" ? "✅" : "🎉"}
          {points}
        </p>
      </div>
    </Link>
  );
};

const taskCardStyles = cva(
  [
    // Texct
    "text-brand-black",
    "capitalize",

    // Border
    "border",
    "border-brand-black",

    // Spacing
    "w-fit",
    "py-1.5",
    "px-2.5",

    // Misc
    "rounded-md",
    "grid",
    "place-content-center",
  ],
  {
    variants: {
      color: {
        blue: "shadow-brand-blue",
        red: "bg-brand-red",
        green: "bg-brand-green",
        pink: "bg-brand-pink",
        yellow: "bg-brand-yellow",
        purple: "bg-brand-purple",
      },
      shadowDirection: {
        left: "shadow-4-left",
        down: "shadow-4-hard",
        right: "shadow-4-right",
      },
    },
    defaultVariants: {
      color: "pink",
    },
  }
);
