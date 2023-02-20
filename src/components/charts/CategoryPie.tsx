import {
  ResponsiveContainer,
  PieChart,
  Legend,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import { api } from "../../utils/api";
import { Spinner } from "../ui/loaders/Spinner";

const COLORS = [
  "#22CA94",
  "#4B83F9",
  "#FE5150",
  "#F8BED4",
  "#FDDD6D",
  "#C8BEFD",
  "#87898C",
  "#E5E5E5",
  "#FDA16E",
];

export const CategoryPie = () => {
  const { data, error } = api.taskAttempt.getCategoriesOfSuccesses.useQuery();

  if (error) return <div>failed to load</div>;
  if (!data) return <Spinner />;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Legend iconType="circle" />
        <Pie data={data} dataKey={"count"} innerRadius="50%">
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              name={entry.name}
              className="stroke-brand-black stroke-2"
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};
