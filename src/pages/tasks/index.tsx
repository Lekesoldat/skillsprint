import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import type { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { TaskCard } from "../../components/TaskCard";
import { appRouter } from "../../server/api/root";
import { createInnerTRPCContext } from "../../server/api/trpc";
import type { RouterOutputs } from "../../utils/api";
import { api } from "../../utils/api";
import superjson from "superjson";
import { TaskCollapsible } from "../../components/TaskCollapsible";

type Tasks = RouterOutputs["task"]["getAll"];
type Solved = RouterOutputs["taskAttempt"]["getSolvedAttempts"];
// Group tasks that are net to each other
const groupTasks = (tasks: Tasks) => {
  const grouped: Map<string, Tasks> = new Map();
  for (const task of tasks) {
    const match = task.title.match(/(Oppgave\s[\d.]+)[a-z]*/);
    if (match && match[1]) {
      const key = match[1];
      const list = grouped.get(key);
      if (!list) {
        grouped.set(key, [task]);
        continue;
      } else {
        list.push(task);
      }
    }
  }

  return [...grouped.entries()] as const;
};

export default function Page(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data: solved } = api.taskAttempt.getSolvedAttempts.useQuery();

  return (
    // Grid
    <div className="grid w-full grid-cols-2 lg:grid-cols-3">
      {props.categories.map((cat) => (
        // Columns
        <div key={cat.id} className="flex flex-col items-center">
          {/* Title */}
          <div className="text-center font-bold uppercase">{cat.name}</div>

          {/* Tasks container*/}
          <div className="flex w-full flex-col items-center">
            {cat.tasks.map((entry) => (
              <TaskCards key={entry[0]} tasks={entry} solved={solved} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const TaskCards = (props: {
  tasks: ReturnType<typeof groupTasks>[number];
  solved: Solved | undefined;
}) => {
  if (props.tasks[1].length === 1) {
    const t = props.tasks[1][0]!;

    return (
      <Link href={`/tasks/${t.id}`}>
        <TaskCard
          title={t.title}
          points={t.points}
          variant={
            props.solved?.some((s) => s.taskId === t.id) ? "solved" : "unsolved"
          }
        />
      </Link>
    );
  } else {
    const total = props.tasks[1].reduce((acc, t) => acc + t.points, 0);
    let current = 0;
    for (const task of props.tasks[1]) {
      if (props.solved?.some((s) => s.taskId === task.id)) {
        current += task.points;
      }
    }
    return (
      <TaskCollapsible trigger={props.tasks[0]} current={current} total={total}>
        <ul className="grid gap-1">
          {props.tasks[1].map((t) => (
            <li key={t.id}>
              <Link href={`/tasks/${t.id}`}>
                <TaskCard
                  title={t.title}
                  points={t.points}
                  variant={
                    props.solved?.some((s) => s.taskId === t.id)
                      ? "solved"
                      : "unsolved"
                  }
                />
              </Link>
            </li>
          ))}
        </ul>
      </TaskCollapsible>
    );
  }
};

export const getStaticProps = async () => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null }),
    transformer: superjson,
  });

  const categories = await ssg.category.getAll.fetch();
  return {
    props: {
      categories: categories
        .filter((x) => x.task.length > 0)
        .map((x) => ({
          id: x.id,
          name: x.name,
          tasks: groupTasks(x.task),
        })),
    },
  };
};
