import Link from "next/link";
import { TaskCard } from "../../components/TaskCard";
import { Loader } from "../../components/ui/Loader";
import { api } from "../../utils/api";

export default function Task() {
  const { data, isError } = api.category.getCategoriesAndTasks.useQuery();
  if (isError) return <>Error bruvv...</>;

  if (!data) return <Loader />;

  return (
    // Grid
    <div className="grid grid-cols-3 gap-8">
      {data.map((d) => (
        // Columns
        <div key={d.id} className="flex flex-col items-center">
          {/* Title */}
          <div className="font-bold uppercase">{d.name}</div>

          {/* Tasks container*/}
          <div className="flex w-full flex-col items-center">
            {d.tasks.map((t) => (
              // Task
              <Link key={t.id} href={`/tasks/${t.id}`}>
                <TaskCard title={t.title} points={t.points} />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
