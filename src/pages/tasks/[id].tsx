import { useRouter } from "next/router";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { api } from "../../utils/api";
import MathInput from "../../components/math/MathInput";
import { TaskDescription } from "../../components/math/MathDisplay";
import { useState } from "react";

export default function TaskPage() {
  const router = useRouter();
  const { id } = router.query;
  const [userAnswer, setUserAnswer] = useState("");

  const { data: task, isError } = api.task.getByIdIncludeCategory.useQuery({
    id: id as string,
  });

  if (isError) return <>Error bruvv...</>;
  if (!task) return <>Loading...</>;

  return (
    <div className="bg-[url('/grid.svg')]">
      <div className="mt-10 flex flex-col items-center justify-center gap-12 rounded-md border-2 border-brand-blue bg-gradient-radial from-[rgba(217,217,217,0.12)] to-white bg-cover py-10 shadow-4-right shadow-brand-blue">
        <div className="text-6xl font-bold text-brand-green">{task.title}</div>
        <Badge text={task.category.name} />
        <div className="rounded-md bg-white p-4">
          <p className="text-4xl">{task.description}</p>
          <TaskDescription description="Dette er en oppgave math(\frac{x+2}2)" />
        </div>
        <MathInput onChange={setUserAnswer} />
        <div>
          <Button
            variant="shadow"
            onClick={() => alert("You answered " + userAnswer)}
          >
            Sjekk svar
          </Button>
        </div>
      </div>
    </div>
  );
}
