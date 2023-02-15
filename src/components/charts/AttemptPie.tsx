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

export const AttemptPie = () => {
  const { data, error } = api.taskAttempt.getCategoriesOfSuccesses.useQuery();

  if (error) return <div>failed to load</div>;
  if (!data) return <Loader />;

  return (
    <ResponsiveContainer width="100%" aspect={3}>
      <PieChart margin={{ top: 5, right: 30, left: 30, bottom: 5 }}>
        <Legend iconType="circle" />
        <Pie data={data} dataKey={"count"} innerRadius={100}>
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
