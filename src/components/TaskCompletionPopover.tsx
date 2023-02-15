import React, { useEffect } from "react";
import { PropsWithChildren } from "react";
import { RouterOutputs } from "../utils/api";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover";

type Status = RouterOutputs["taskAttempt"]["attemptAnswer"]["result"];

interface TaskCompletionPopoverProps {
  points: number;
  status: Status;
  submitted: boolean;
}

export function TaskCompletionPopover({
  children,
  submitted,
  points,
  status,
}: PropsWithChildren<TaskCompletionPopoverProps>) {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (!submitted || !open) return;
    const timeout = setTimeout(() => setOpen(false), 4000);
    return () => {
      clearTimeout(timeout);
    };
  }, [open, submitted]);
  return (
    <Popover open={open && submitted}>
      <PopoverTrigger asChild onClick={() => setOpen(true)}>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-60">
        <div className="grid gap-4">
          <div className="space-y-2">
            {status === "SUCCESS" && (
              <>
                <h4 className="font-semibold leading-none">
                  Svaret ditt er riktig!
                </h4>
                <p className="font-bold text-brand-green">+{points} poeng</p>
              </>
            )}
            {status === "FAIL" && (
              <p className="text-center font-bold text-brand-red">
                Svaret ditt er feil
              </p>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
