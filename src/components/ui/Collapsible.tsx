import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

import {
  Collapsible as CollapsibleRoot,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { cn } from "../../utils/classnames";

interface CollapsibleProps {
  trigger: string;
  children: React.ReactNode;
  className?: string;
}

export const Collapsible = (
  props: React.PropsWithChildren<CollapsibleProps>
) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <CollapsibleRoot
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn("min-w-[150px] space-y-2", props.className)}
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        <CollapsibleTrigger className="flex w-full items-center justify-between">
          <span className="mr-2">{props.trigger}</span>
          {isOpen ? (
            <EyeOff className="h-4 w-4 text-black" />
          ) : (
            <Eye className="h-4 w-4 text-black" />
          )}
          <span className="sr-only">Toggle</span>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-4 py-3">
        {props.children}
      </CollapsibleContent>
    </CollapsibleRoot>
  );
};
