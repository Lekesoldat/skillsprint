import { FC } from "react";
import {
  ResponsiveContainer,
  Legend,
  Pie,
  Cell,
  Tooltip,
  Bar,
  BarChart,
  XAxis,
  YAxis,
} from "recharts";
import { api, RouterOutputs } from "../../utils/api";
import { Spinner } from "../ui/loaders/Spinner";

type Categories = RouterOutputs["category"]["getAll"];

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

export const AttemptPerTaskChart: FC<{
  categoryId?: string;
  categories: Categories;
}> = (props) => {
  const { data, isLoading, error } =
    api.taskAttempt.getAttemptsPerTask.useQuery({
      categoryId: props.categoryId,
    });

  if (error) return <div>Klarte ikke laste inn forsøk.</div>;
  if (isLoading) return <Spinner />;
  if (!data || data.length === 0)
    return (
      <div className="mt-8 text-center">
        Du har ikke gjort noen oppgaver i denne kategorien.
      </div>
    );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          tick={{ fontSize: 10, color: "000" }}
          tickLine={false}
        />
        <YAxis />
        <Tooltip formatter={(value, name, props) => [value, "Forsøk"]} />
        <Bar dataKey="attempts" fill="#4B83F9" />
      </BarChart>
    </ResponsiveContainer>
  );
};
