import { api } from "../../utils/api";

export default function Task() {
  const { data, isError } = api.task.getAll.useQuery();

  if (isError) return <>Error bruvv...</>;

  if (!data) return <>Loading...</>;

  return <></>;
}
