import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { RouterOutputs } from "../../utils/api";
import { api } from "../../utils/api";
import { AvatarCell } from "./AvatarCell";
import { LeaderboardHeader } from "./LeaderboardHeader";
import { LeaderboardRow } from "./LeaderboardRow";

export type RankedUser = RouterOutputs["user"]["getTopFive"][number];

const columnHelper = createColumnHelper<RankedUser>();

const columns = [
  columnHelper.accessor("rank", {
    cell: (info) => <p>{info.getValue()}.</p>,
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
  columnHelper.accessor("best_streak", {
    cell: (info) => `${info.getValue()} 🔥`,
    header: "Beste Streak",
  }),
];

export function Leaderboard() {
  const { data } = api.user.getTopFive.useQuery();

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="h-fit w-[850px] rounded-xl border-2 border-black bg-white py-2 px-4 shadow-4-right">
      <table className="w-full table-auto divide-y divide-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <LeaderboardHeader key={headerGroup.id} headerGroup={headerGroup} />
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <LeaderboardRow key={row.id} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
