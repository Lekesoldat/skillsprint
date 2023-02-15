"use client";
import { api } from "../../../utils/api";

interface TaskPageProps {
  params: { id: string };
}
export default function Page({ params }: TaskPageProps) {
  const { data, isError } = api.task.getById.useQuery({
    id: params.id,
  });

  if (isError) return <div>Error</div>;
  if (!data) return <div>Loading...</div>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
