import type { FC } from "react";

interface TaskCardProps {
  title: string;
  points: number;
}

export const TaskCard: FC<TaskCardProps> = ({ title, points }) => {
  return (
    <div
      className={`my-2 flex min-w-[300px] justify-between rounded-md border-2 border-brand-black bg-brand-white py-4 px-6 shadow-4-right-border-purple`}
    >
      {/* Title */}
      <div>{title}</div>

      {/* Points */}
      <p>{points}p</p>
    </div>
  );
};
