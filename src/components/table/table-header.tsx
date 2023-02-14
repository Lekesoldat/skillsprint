import type { HeaderGroup } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import type { FC } from "react";
import type { RankedUser } from "./table";

interface TableHeaderProps {
  headerGroup: HeaderGroup<RankedUser>;
}

export const TableHeader: FC<TableHeaderProps> = ({ headerGroup }) => {
  return (
    <tr>
      {headerGroup.headers.map((header) => (
        <th key={header.id} className="py-2 text-slate-500">
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
        </th>
      ))}
    </tr>
  );
};
