import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import type { RouterOutputs } from "../../utils/api";
import { api } from "../../utils/api";
import { TaskTableHeader } from "./TaskTableHeader";
import { TaskTableRow } from "./TaskTableRow";

export type SolvedTask = RouterOutputs["task"]["getLastSolvedTasks"][number];

const columnHelper = createColumnHelper<SolvedTask>();

const columns = [
  columnHelper.accessor("title", {
    cell: (info) => <p>{info.getValue().split(" ")[1]}</p>,
    header: () => "Siste Oppgaver",
  }),

  columnHelper.accessor("points", {
    cell: (info) => <p>+ {info.getValue()}p</p>,
    header: () => "Poeng",
  }),

  columnHelper.accessor("category", {
    cell: (info) => <p>{info.getValue()}</p>,
    header: () => "Kategori",
  }),

  columnHelper.accessor("finishedAt", {
    cell: (info) => <p>kl. {format(info.getValue(), "HH:mm")}</p>,
    header: () => "Fullført",
  }),
];

export const TaskTable = () => {
  const { data } = api.task.getLastSolvedTasks.useQuery();

  const table = useReactTable({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    data: data ?? Array(5).fill({}),
    columns: !data
      ? columns.map((column) => ({
          ...column,
          cell: () => <Skeleton />,
        }))
      : columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex-1 rounded-xl border-2 border-black bg-brand-white py-4 px-8 shadow-4-right">
      <table className="w-full table-auto divide-y divide-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TaskTableHeader key={headerGroup.id} headerGroup={headerGroup} />
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <TaskTableRow key={row.id} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Skeleton = () => {
  return (
    <div
      role="status"
      className="w-full animate-pulse space-y-8 md:flex md:items-center md:space-y-0 md:space-x-8"
    >
      <div className="h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
