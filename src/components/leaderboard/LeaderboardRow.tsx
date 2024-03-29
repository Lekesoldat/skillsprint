import type { Row } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { cva } from "class-variance-authority";
import { useSession } from "next-auth/react";
import type { FC } from "react";
import type { RankedUser } from "./Leaderboard";

interface TableRowProps {
  row: Row<RankedUser>;
}

export const LeaderboardRow: FC<TableRowProps> = ({ row }) => {
  const { data } = useSession();

  const outsideLeaderboard = +row.original.rank > 5;
  const onLeaderboard =
    data && row.original.id === data.user?.id && !outsideLeaderboard;

  return (
    <tr key={row.id}>
      {row.getVisibleCells().map((cell) => (
        <td
          key={cell.id}
          className={rowStyle({
            onLeaderboard,
            outsideLeaderboard,
          })}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
};

const rowStyle = cva(["mx-auto text-center"], {
  variants: {
    onLeaderboard: {
      true: [
        "bg-brand-yellow border-y-[1px] first:border-l-[1px] last:border-r-[1px] border-brand-black",
      ],
    },
    outsideLeaderboard: {
      true: ["bg-brand-babyBlue border-t-[1px] border-brand-black"],
    },
  },
});
