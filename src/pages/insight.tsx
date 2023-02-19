import { AttemptPie } from "../components/charts/CategoryPie";
import { CategoryPie } from "../components/charts/AttemptPie";
import { PerformanceGraph } from "../components/charts/PerformanceGraph";
import { TaskTable } from "../components/task-table/TaskTable";

export default function Page() {
  return (
    <div className="w-full">
      <div className="flex">
        <TaskTable />
        <CategoryPie />
      </div>

      <div className="mt-4 flex">
        <AttemptPie />
        <div className="flex-1">
          <PerformanceGraph />
        </div>
      </div>
    </div>
  );
}
