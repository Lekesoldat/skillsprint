import { DoughnutChart } from "../components/charts/DoughnutChart";
import { LineChart } from "../components/charts/LineChart";

export default function Page() {
  return (
    // Chartcontainer
    <div className="w-100 flex">
      <div className="h-100 w-100 relative flex-1">
        <LineChart />
      </div>
      <div className="h-100 w-100 relative">
        <DoughnutChart />
      </div>
    </div>
  );
}
