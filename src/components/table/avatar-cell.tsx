import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import type { CellContext } from "@tanstack/react-table";
import type { FC } from "react";
import { capitalize } from "../../utils/classnames";
import type { Person } from "./table";

interface AvatarCellProps {
  info: CellContext<Person, string>;
}

export const AvatarCell: FC<AvatarCellProps> = ({ info }) => {
  return (
    <div className="mx-auto w-12">
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
  );
};
