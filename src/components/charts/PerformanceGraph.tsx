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
  const { data, error } = api.taskAttempt.getSuccessGrouped.useQuery();

  if (error) return <>Error..</>;
  if (!data) return <>Loading..</>;

  return (
    <ResponsiveContainer width="50%" aspect={4.0 / 2.0}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="groupPoints"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="userPoints" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};
