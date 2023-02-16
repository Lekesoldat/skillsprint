import { AttemptPie } from "../components/charts/AttemptPie";
import { CategoryPie } from "../components/charts/Attempt";
import { PerformanceGraph } from "../components/charts/PerformanceGraph";
import { TaskTable } from "../components/task-table/TaskTable";

export default function Page() {
  return (
    <div>
      <TaskTable />
      <CategoryPie />
      <PerformanceGraph />
      <AttemptPie />
    </div>
  );
}
