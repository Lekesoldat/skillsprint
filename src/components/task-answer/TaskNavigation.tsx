import Link from "next/link";
import { Button } from "../ui/Button";

interface TaskNavigationProps {
  prevTaskId?: string;
  nextTaskId?: string | null;
}

export const TaskNavigation = ({
  prevTaskId,
  nextTaskId,
}: TaskNavigationProps) => {
  return (
    <div className="flex justify-between">
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
