import type { Row } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import Link from "next/link";
import type { FC } from "react";
import type { SolvedTask } from "./TaskTable";

interface TableRowProps {
  row: Row<SolvedTask>;
}

export const TaskTableRow: FC<TableRowProps> = ({ row }) => {
  return (
    <tr key={row.id}>
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id} className="mx-auto py-2 text-center">
          <Link href={`/tasks/${row.original.taskId}`}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </Link>
        </td>
      ))}
    </tr>
  );
};
