import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import type { CellContext } from "@tanstack/react-table";
import type { FC } from "react";
import type { RankedUser } from "./Leaderboard";

interface AvatarCellProps {
  info: CellContext<RankedUser, string | null>;
}

export const AvatarCell: FC<AvatarCellProps> = ({ info }) => {
  return (
    <div className="mx-auto w-12">
      <Avatar>
        <AvatarImage
          src={
            info.getValue() ??
            "https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
          }
          alt={info.row.original.name.slice(0, 2)}
        />
        <AvatarFallback className="capitalize">
          {info.row.original.name.slice(0, 2)}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};
