import Image from "next/image";
import type { PropsWithChildren } from "react";
import type { TaskPageProps } from "../../pages/tasks/[id]";
import { Badge } from "../ui/Badge";

interface Props {
  task: TaskPageProps["task"];
}

export const PictureTask = ({ task, children }: PropsWithChildren<Props>) => {
  return (
    <>
      <div className="mt-0 flex flex-col items-center justify-center gap-4 rounded-md border-2 border-brand-purple bg-gradient-radial from-[rgba(217,217,217,0.12)] to-white bg-cover px-10 py-10 shadow-4-right shadow-brand-purple lg:mt-10">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="text-4xl font-bold text-brand-green lg:text-5xl">
            {task.title}
          </div>
          <Badge text={task.category.name} />
        </div>

        {/* Content  Grid*/}
        <div
          id="content-grid"
          className="order-last grid grid-cols-1 gap-4 lg:grid-cols-2"
        >
          {task.image && (
            <div className="flex w-full justify-center lg:order-2">
              <div className="relative flex h-[350px] w-[350px] flex-col bg-brand-white lg:h-[450px] lg:w-[450px]">
                <Image
                  src={task.image}
                  alt={task.title}
                  fill
                  className="object-contain"
                  placeholder="empty"
                />
              </div>
            </div>
          )}

          {/* Description and Answer */}
          <div
            id="description-and-answer"
            className="flex flex-col items-center lg:justify-evenly"
          >
            {/* The form */}
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
