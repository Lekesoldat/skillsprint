import { useRouter } from "next/router";
import { api } from "../../utils/api";

export default function TaskPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isError } = api.task.getByIdIncludeCategory.useQuery({
    id: id as string,
  });

  if (isError) return <>Error bruvv...</>;
  if (!data) return <>Loading...</>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
