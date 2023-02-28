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
          src={info.getValue() ?? ""}
          alt={info.row.original.name.slice(0, 2)}
        />
        <AvatarFallback className="uppercase">
          {info.row.original.name.slice(0, 2)}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};
