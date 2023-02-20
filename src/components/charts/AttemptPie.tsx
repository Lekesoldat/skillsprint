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

export const AttemptPie = () => {
  const { data, error } = api.taskAttempt.getUserAttempts.useQuery();

  if (error) return <div>Klarte ikke laste inn forsøk.</div>;
  if (!data) return <Spinner />;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Legend iconType="circle" />
        <Pie data={data} dataKey={"count"} innerRadius="50%">
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
