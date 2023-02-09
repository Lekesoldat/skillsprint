import {
  ResponsiveContainer,
  PieChart,
  Legend,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import { api } from "../../utils/api";

export const CategoryPie = () => {
  const { data, error } = api.taskAttempt.getUserAttempts.useQuery();

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <ResponsiveContainer width="100%" aspect={3}>
      <PieChart margin={{ top: 5, right: 30, left: 30, bottom: 5 }}>
        <Legend iconType="circle" />
        <Pie data={data} dataKey={"count"} innerRadius={100}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              name={entry.result === "SUCCESS" ? "Riktig" : "Feil"}
              className="stroke-brand-black stroke-2"
              fill={entry.result === "SUCCESS" ? "#22CA94" : "#FE5150"}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};
