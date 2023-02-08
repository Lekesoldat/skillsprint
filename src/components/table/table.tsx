import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { AvatarCell } from "./avatar-cell";
import { TableHeader } from "./table-header";
import { TableRow } from "./table-row";

export type Person = {
  rank: string;
  avatar: string;
  name: string;
  points: number;
  bestStreak: number;
};

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor("rank", {
    cell: (info) => info.getValue(),
    header: () => "#",
  }),
  columnHelper.accessor("avatar", {
    cell: (info) => <AvatarCell info={info} />, // TODO do url
    header: () => undefined,
  }),
  columnHelper.accessor("name", {
    cell: (info) => <p className="text-start">{info.getValue()}</p>,
    header: () => <p className="text-start">Brukernavn</p>,
  }),
  columnHelper.accessor("points", {
    cell: (info) => info.getValue(),
    header: "Poeng",
  }),
  columnHelper.accessor("bestStreak", {
    cell: (info) => `${info.getValue()} 🔥`,
    header: "Beste streak",
  }),
];

export function Table() {
  const [data, setData] = React.useState(() => [
    {
      name: "Amund Apekatt",
      rank: "1.",
      avatar: "https://cdn-icons-png.flaticon.com/512/2202/2202112.png",
      points: 2351,
      bestStreak: 14,
    },
    {
      name: "Ole Isbjørn",
      rank: "2.",
      avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
      points: 1964,
      bestStreak: 4,
    },
  ]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-[800px] rounded-xl border-2 border-black bg-white py-2 shadow-4-right">
      <table className="w-full table-auto divide-y divide-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableHeader key={headerGroup.id} headerGroup={headerGroup} />
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
