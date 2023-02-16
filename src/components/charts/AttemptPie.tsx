import {
  ResponsiveContainer,
  PieChart,
  Legend,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import { api } from "../../utils/api";
import { Loader } from "../ui/Loader";

export const CategoryPie = () => {
  const { data, error } = api.taskAttempt.getUserAttempts.useQuery();

  if (error) return <div>failed to load</div>;
  if (!data) return <Loader />;

  return (
    <ResponsiveContainer width={"35%"} aspect={4 / 3}>
      <PieChart>
        <Legend iconType="circle" verticalAlign="top" />
        <Pie data={data} dataKey={"count"} innerRadius={80}>
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
