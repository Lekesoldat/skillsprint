import type { FC } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { api } from "../../utils/api";
import { Spinner } from "../ui/loaders/Spinner";

export const AttemptPie: FC<{ categoryId?: string }> = (props) => {
  const { data, isLoading, error } = api.taskAttempt.getUserAttempts.useQuery({
    categoryId: props.categoryId,
  });

  if (error) return <div>Klarte ikke laste inn forsøk.</div>;
  if (isLoading) return <Spinner />;
  if (data.length === 0)
    return (
      <div className="mt-8 text-center">
        Du har ikke gjort noen oppgaver i denne kategorien.
      </div>
    );

  const total = data.reduce((acc, curr) => acc + curr.count, 0);

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
        <Tooltip
          formatter={(value, name) => [
            `${value.toString()} (${percentage(Number(value), total).toFixed(
              1
            )}%)`,
            name,
          ]}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

function percentage(partialValue: number, totalValue: number) {
  return (100 * partialValue) / totalValue;
}
