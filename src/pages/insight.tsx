import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import type { InferGetStaticPropsType } from "next";
import { useState } from "react";
import superjson from "superjson";
import { AllTimePerformanceGraph } from "../components/charts/AllTimePerformanceGraph";
import { AttemptPerTaskChart } from "../components/charts/AttemptPerTask";
import { AttemptPie } from "../components/charts/AttemptPie";
import { CategoryPie } from "../components/charts/CategoryPie";
import { TodayPerformanceGraph } from "../components/charts/TodayPerformanceGraph";
import { TaskTable } from "../components/task-table/TaskTable";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/Select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { appRouter } from "../server/api/root";
import { createInnerTRPCContext } from "../server/api/trpc";

export default function Page({
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [selected, setSelected] = useState<string>("all");
  return (
    <div className="flex w-full flex-1 flex-col justify-between gap-y-14">
      <div className="flex flex-col items-center">
        <div className="mb-2 font-bold">Siste løste oppgaver</div>

        <div className="w-full">
          <TaskTable />
        </div>
      </div>

      <div className="w-full text-center font-bold">
        <p className="mb-4">Poeng over tid</p>
        <Tabs defaultValue="today">
          <TabsList>
            <TabsTrigger value="today">Dagens økt</TabsTrigger>
            <TabsTrigger value="all-time">Sammenlagt</TabsTrigger>
          </TabsList>

          <TabsContent value="today">
            <div className="flex flex-col items-center">
              <TodayPerformanceGraph />
            </div>
          </TabsContent>

          <TabsContent value="all-time">
            <div className="flex flex-col items-center">
              <AllTimePerformanceGraph />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Select onValueChange={(val) => setSelected(val)} defaultValue="all">
        <SelectTrigger className="max-w-[300px] self-center">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">Alle</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="flex justify-between">
        <div className="flex h-[300px] w-[300px] flex-col items-center lg:h-[400px] lg:w-[400px]">
          <div className="font-bold">Svarfordeling</div>
          <AttemptPie categoryId={selected !== "all" ? selected : undefined} />
        </div>

        <div className="flex h-[300px] w-[300px] flex-col items-center lg:h-[400px] lg:w-[400px]">
          {selected === "all" ? (
            <>
              <div className="font-bold">Kategorifordeling</div>
              <CategoryPie />
            </>
          ) : (
            <>
              <div className="font-bold">Forsøksfordeling</div>
              <AttemptPerTaskChart
                categories={categories}
                categoryId={selected}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null }),
    transformer: superjson,
  });

  const categories = await ssg.category.getAll.fetch();
  return {
    props: {
      categories,
    },
  };
}
