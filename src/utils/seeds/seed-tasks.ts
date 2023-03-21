import { prismaClient } from "./clients";
import { createDayOneTasks } from "./prod/day-one-tasks";

await createDayOneTasks({ prismaClient });
