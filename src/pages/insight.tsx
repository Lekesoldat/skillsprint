import { AttemptPie } from "../components/charts/AttemptPie";
import { CategoryPie } from "../components/charts/CategoryPie";
import { PerformanceGraph } from "../components/charts/PerformanceGraph";

export default function Page() {
  return (
    <div>
      <PerformanceGraph />
      <div>
        <CategoryPie />
        <AttemptPie />
      </div>
    </div>
  );
}
