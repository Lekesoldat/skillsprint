import { Spinner } from "../components/ui/loaders/Spinner";
import { api } from "../utils/api";

export default function Page() {
  const { data, error } = api.task.getAllFlags.useQuery();

  if (error) return <div>Kunne ikke laste inn flags.</div>;

  if (!data)
    return (
      <div>
        <Spinner />
      </div>
    );

  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.map((task) => (
        <div key={task.title}>
          <p>{task.title}</p>
          <p>Flag: {task.answer}</p>
        </div>
      ))}
    </div>
  );
}
