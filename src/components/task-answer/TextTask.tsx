import type { PropsWithChildren } from "react";
import type { TaskPageProps } from "../../pages/tasks/[id]";
import { Badge } from "../ui/Badge";

interface Props {
  task: Omit<TaskPageProps["task"], "image">;
}

export const TextTask = ({ task, children }: PropsWithChildren<Props>) => {
  return (
    <>
      <div className="mt-0 flex flex-col items-center justify-center gap-4 rounded-md border-2 border-brand-purple bg-gradient-radial from-[rgba(217,217,217,0.12)] to-white bg-cover px-10 py-10 shadow-4-right shadow-brand-purple lg:mt-10 lg:gap-8 lg:px-0">
        <div className="text-4xl font-bold text-brand-green lg:text-5xl">
          {task.title}
        </div>
        <Badge text={task.category.name} />

        {children}
      </div>
    </>
  );
};
