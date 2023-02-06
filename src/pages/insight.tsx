import { DoughnutChart } from "../components/charts/DoughnutChart";
import { LineChart } from "../components/charts/LineChart";
import { api } from "../utils/api";

export default function Page() {
  const { data } = api.taskAttempt.getSuccessGrouped.useQuery();

  if (!data) return <>Loading..</>;
  return (
    // Chartcontainer
    <div className="w-100 flex">
      {/* <div className="h-100 w-100 relative flex-1">
        <LineChart />
      </div>
      <div className="h-100 w-100 relative">
        <DoughnutChart />
      </div> */}

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
