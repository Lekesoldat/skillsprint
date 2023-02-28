import * as React from "react";

import {
  Collapsible as CollapsibleRoot,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { TaskCard } from "./TaskCard";

interface CollapsibleProps {
  trigger: string;
  children: React.ReactNode;
  current: number;
  total: number;
  className?: string;
}

export const TaskCollapsible = (
  props: React.PropsWithChildren<CollapsibleProps>
) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <CollapsibleRoot open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex w-full items-center justify-between">
        <TaskCard
          title={props.trigger}
          points={props.current}
          possible={props.total}
          variant={props.current === props.total ? "solved" : "group"}
        />
        <span className="sr-only">Toggle</span>
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
        {props.children}
      </CollapsibleContent>
    </CollapsibleRoot>
  );
};
