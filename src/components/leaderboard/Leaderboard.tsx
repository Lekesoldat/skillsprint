import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import type { RouterOutputs } from "../../utils/api";
import { api } from "../../utils/api";
import { Skeleton } from "../ui/loaders/Skeleton";
import { AvatarCell } from "./AvatarCell";
import { LeaderboardHeader } from "./LeaderboardHeader";
import { LeaderboardRow } from "./LeaderboardRow";

export type RankedUser = RouterOutputs["user"]["getTopFive"]["rows"][number];

const columnHelper = createColumnHelper<RankedUser>();

const columns = [
  columnHelper.accessor("rank", {
    cell: (info) => <p>{info.getValue()}.</p>,
    header: () => "#",
  }),
  columnHelper.accessor("avatar", {
    cell: (info) => <AvatarCell info={info} />,
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
  columnHelper.accessor("best_streak", {
    cell: (info) => `${info.getValue()} 🔥`,
    header: "Beste Streak",
  }),
];

export function Leaderboard() {
  const { data, isLoading } = api.user.getTopFive.useQuery();

  const columnsMemo = React.useMemo(
    () =>
      isLoading
        ? columns.map((column) => ({
            ...column,
            cell: () => <Skeleton />,
          }))
        : columns,
    [isLoading]
  );

  const table = useReactTable({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    data: data ? data.rows : Array(5).fill({}),
    columns: columnsMemo,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col items-center">
      <div className="h-fit w-[650px] rounded-xl border-2 border-black bg-white py-2 px-4 shadow-4-right lg:w-[850px]">
        <table className="w-full table-auto divide-y divide-gray-300">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <LeaderboardHeader
                key={headerGroup.id}
                headerGroup={headerGroup}
              />
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <LeaderboardRow key={row.id} row={row} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
