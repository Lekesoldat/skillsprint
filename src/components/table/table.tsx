import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";

type Person = {
  avatar: string;
  name: string;
  points: number;
  bestStreak: number;
};

const columnHelper = createColumnHelper<Person>();

const capitalize = (str: string) =>
  str[0] ? str[0].toUpperCase() + str.slice(1) : str.slice(1);

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: (info) => capitalize(info.column.id),
  }),
  columnHelper.accessor("avatar", {
    cell: (info) => <img src={info.getValue()} className="w-10" />, // TODO do url
    header: () => undefined,
  }),
  columnHelper.accessor("points", {
    cell: (info) => info.getValue(),
    header: (info) => capitalize(info.column.id),
  }),
  columnHelper.accessor("bestStreak", {
    cell: (info) => `${info.getValue()} 🔥`,
    header: "Best streak",
  }),
];

function Table() {
  const [data, setData] = React.useState(() => [
    {
      name: "test",
      avatar:
        "https://gravatar.com/avatar/319db1cef635624179f447689a689e42?s=400&d=robohash&r=x",
      points: 2000,
      bestStreak: 14,
    },
  ]);
  console.log(data);
  const rerender = React.useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2 text-brand-black">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
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
      <div className="h-4" />
      <button onClick={() => rerender()} className="border p-2">
        Rerender
      </button>
    </div>
  );
}
