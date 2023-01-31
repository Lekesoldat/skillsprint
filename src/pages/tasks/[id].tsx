import { useRouter } from "next/router";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { api } from "../../utils/api";

export default function TaskPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data: task, isError } = api.task.getByIdIncludeCategory.useQuery({
    id: id as string,
  });

  if (isError) return <>Error bruvv...</>;
  if (!task) return <>Loading...</>;

  // return <pre>{JSON.stringify(data, null, 2)}</pre>;

  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-12 rounded-md border-2 border-brand-blue py-10 shadow-4-right shadow-brand-blue">
      <div className="text-6xl font-bold text-brand-green">{task.title}</div>
      <Badge text={task.category.name} />
      <p className="text-4xl">{task.description}</p>
      <div>inputfield</div>
      <div>
        <Button text={"sjekk svar"} type="shadow" />
      </div>
    </div>
  );
}
