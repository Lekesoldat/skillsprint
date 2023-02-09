import Link from "next/link";
import { api } from "../../utils/api";

export default function Task() {
  const { data, isError } = api.category.getCategoriesAndTasks.useQuery();

  if (isError) return <>Error bruvv...</>;

  if (!data) return <>Loading...</>;

  return (
    <div className="grid h-full grid-cols-4">
      {data.map((d) => (
        <div key={d.id}>
          <div>{d.name}</div>
          <div>
            {d.tasks.map((t) => (
              <Link key={t.id} href={`/tasks/${t.id}`}>
                <p>
                  {t.title} - {t.points}p
                </p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
