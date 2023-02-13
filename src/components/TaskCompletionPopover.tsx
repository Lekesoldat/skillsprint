import { Settings2 } from "lucide-react";
import { PropsWithChildren } from "react";
import { RouterOutputs } from "../utils/api";
import { Button } from "./ui/Button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover";

type Status = RouterOutputs["taskAttempt"]["attemptAnswer"]["result"];

interface TaskCompletionPopoverProps {
  points: number;
  status: Status;
  open: boolean;
}

export function TaskCompletionPopover({
  children,
  open,
  points,
  status,
}: PropsWithChildren<TaskCompletionPopoverProps>) {
  return (
    <Popover open={open}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
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
          <Button size="xs">
            {status === "FAIL" ? "Prøv igjen" : "Gå videre"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
