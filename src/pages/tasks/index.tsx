import Link from "next/link";
import { TaskCard } from "../../components/TaskCard";
import { Skeleton } from "../../components/ui/loaders/Skeleton";
import { api } from "../../utils/api";

export default function Page() {
  const { data, isError } = api.category.getCategoriesAndTasks.useQuery();

  if (isError) return <>Noe gikkk galt ved henting av oppgaver..</>;

  if (!data) return <LoadingComponent />;

  return (
    // Grid
    <div className="grid w-full grid-cols-2 lg:grid-cols-3">
      {data.tasks.map((d) => (
        // Columns
        <div key={d.id} className="flex flex-col items-center">
          {/* Title */}
          <div className="font-bold uppercase">{d.name}</div>

          {/* Tasks container*/}
          <div className="flex w-full flex-col items-center">
            {d.tasks.map((t) => (
              // Task
              <Link key={t.id} href={`/tasks/${t.id}`}>
                <TaskCard
                  title={t.title}
                  points={t.points}
                  solved={data.successes.includes(t.id)}
                />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const LoadingComponent = () => {
  const data = Array(6).fill(0);

  return (
    // Grid
    <div className="grid w-full grid-cols-2 lg:grid-cols-3">
      {data.map((_, index) => (
        <Skeleton key={`skeleton-${index}`} count={10} />
      ))}
    </div>
  );
};
