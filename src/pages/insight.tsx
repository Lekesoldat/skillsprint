import { AttemptPie } from "../components/charts/AttemptPie";
import { CategoryPie } from "../components/charts/CategoryPie";
import { PerformanceGraph } from "../components/charts/PerformanceGraph";
import { TaskTable } from "../components/task-table/TaskTable";

export default function Page() {
  return (
    <div className="flex w-full flex-1 flex-col justify-between">
      <div className="flex flex-col items-center">
        <div className="mb-2 font-bold">Siste løste oppgaver</div>

        <div className="w-full">
          <TaskTable />
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="font-bold">Poeng over tid</div>
        <PerformanceGraph />
      </div>

      <div className="flex justify-between">
        <div className="flex h-[300px] w-[300px] flex-col items-center lg:h-[400px] lg:w-[400px]">
          <div className="font-bold">Svarfordeling</div>
          <AttemptPie />
        </div>

        <div className="flex h-[300px] w-[300px] flex-col items-center lg:h-[400px] lg:w-[400px]">
          <div className="font-bold">Kategorifordeling</div>
          <CategoryPie />
        </div>
      </div>
    </div>
  );
}
