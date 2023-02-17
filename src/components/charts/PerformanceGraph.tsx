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
import { Loader } from "../ui/Loader";

export const PerformanceGraph = () => {
  const { data, error } = api.taskAttempt.getSuccessGrouped.useQuery();

  if (error) return <>Error..</>;
  if (!data) return <Loader />;

  return (
    <ResponsiveContainer width="100%" aspect={3}>
      <LineChart data={data}>
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Legend iconType="circle" verticalAlign="top" />
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
