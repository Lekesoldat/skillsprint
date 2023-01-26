import type { Row } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import type { FC } from "react";
import type { Person } from "./table";

interface TableRowProps {
  row: Row<Person>;
}

export const TableRow: FC<TableRowProps> = ({ row }) => {
  return (
    <tr key={row.id} className="border-b border-slate-300">
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id} className="p-2 text-center">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
};
