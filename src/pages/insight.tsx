import { AllTimePerformanceGraph } from "../components/charts/AllTimePerformanceGraph";
import { AttemptPie } from "../components/charts/AttemptPie";
import { CategoryPie } from "../components/charts/CategoryPie";
import { TodayPerformanceGraph } from "../components/charts/TodayPerformanceGraph";
import { TaskTable } from "../components/task-table/TaskTable";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

export default function Page() {
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
            <TabsTrigger value="today">Dagens Økt</TabsTrigger>
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

      <div className="flex justify-between">
        <div className="flex h-[300px] w-[300px] flex-col items-center lg:h-[400px] lg:w-[400px]">
          <div className="font-bold">Svarfordeling</div>
          <AttemptPie />
        </div>

        <div className="flex h-[300px] w-[300px] flex-col items-center lg:h-[400px] lg:w-[400px]">
          <div className="font-bold">Kategorifordeling</div>
          <CategoryPie />
        </div>
      </div>
    </div>
  );
}
