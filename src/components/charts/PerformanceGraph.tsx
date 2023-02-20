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
import { Skeleton } from "../ui/SkeletonLoader";

export const PerformanceGraph = () => {
  const { data, error } = api.taskAttempt.getSuccessGrouped.useQuery();

  if (error) return <>Noe gikk galt med progresjonsgrafen...</>;
  if (!data) return <Skeleton count={5} />;

  return (
    <ResponsiveContainer width="100%" aspect={3}>
      <LineChart data={data}>
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
