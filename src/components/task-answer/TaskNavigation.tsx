import Link from "next/link";
import { useToast } from "../../hooks/use-toast";
import { Button } from "../ui/Button";

interface TaskNavigationProps {
  prevTaskId?: string;
  nextTaskId?: string | null;
}

export const TaskNavigation = ({
  prevTaskId,
  nextTaskId,
}: TaskNavigationProps) => {
  // TODO: remove this
  const { dismiss } = useToast();
  return (
    <div className="flex justify-between" onClick={() => dismiss()}>
      {prevTaskId ? (
        <Link href={`/tasks/${prevTaskId}`}>
          <Button size="xs">Gå tilbake</Button>
        </Link>
      ) : (
        <div />
      )}
      {nextTaskId ? (
        <Link href={`/tasks/${nextTaskId}`}>
          <Button size="xs">Gå videre</Button>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
};
