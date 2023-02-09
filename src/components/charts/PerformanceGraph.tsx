import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { api } from "../../utils/api";

export const PerformanceGraph = () => {
  const { data, error } =
    api.taskAttempt.getGroupedAndAggregatedPoints.useQuery();

  if (error) return <>Error..</>;
  if (!data) return <>Loading..</>;

  return (
    <ResponsiveContainer width="100%" aspect={3}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
      >
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Legend iconType="circle" />
        <Line type="monotone" dataKey="user_sum" stroke="#22CA94" name="Deg" />
        <Line
          type="monotone"
          dataKey="group_sum"
          stroke="#FDA16E"
          name="Klassen"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
