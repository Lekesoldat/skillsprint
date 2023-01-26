"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
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

const capitalize = (str: string) =>
  str[0] ? str[0].toUpperCase() + str.slice(1) : str.slice(1);

const columns = [
  columnHelper.accessor("rank", {
    cell: (info) => info.getValue(),
    header: () => "#",
  }),
  columnHelper.accessor("avatar", {
    cell: (info) => (
      <div className="w-12">
        <Avatar>
          <AvatarImage
            src={info.getValue()}
            alt={info.row.original.name.slice(0, 2)}
          />
          <AvatarFallback>
            {capitalize(info.row.original.name.slice(0, 2))}
          </AvatarFallback>
        </Avatar>
      </div>
    ), // TODO do url
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
    <table className="rounded bg-white px-8 py-4 font-space-grotesk shadow-4-skew">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableHeader key={headerGroup.id} headerGroup={headerGroup} />
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row, i) => (
          <TableRow key={row.id} row={row} />
        ))}
      </tbody>
      <tfoot>
        {table.getFooterGroups().map((footerGroup) => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
}
