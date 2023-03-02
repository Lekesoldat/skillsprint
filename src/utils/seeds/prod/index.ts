import type { PrismaClient } from "@prisma/client";
import { differenceInSeconds } from "date-fns";
import { createUsers } from "../utils/user-utilities";
import { createCategories } from "./categories";
import { createDayOneTasks } from "./day-one-tasks";
import { createEquationTasks } from "./old-tasks/equations";
import { createExponentialTasks } from "./old-tasks/exponential";
import { createInverseProportionalFunctionTasks } from "./old-tasks/inverse";
import { createLinearTasks } from "./old-tasks/linear";
import { createQuadraticTasks } from "./old-tasks/quadratic";
import { userList as users } from "./user-list";

const createOldTasks = async ({
  prismaClient,
}: {
  prismaClient: PrismaClient;
}) => {
  const timer = new Date();
  console.info("🏫 Seeding tasks for Blussuvoll ...");

  await createEquationTasks({ prismaClient });
  await createExponentialTasks({ prismaClient });
  await createInverseProportionalFunctionTasks({ prismaClient });
  await createLinearTasks({ prismaClient });
  await createQuadraticTasks({ prismaClient });

  console.log(`Took ${differenceInSeconds(new Date(), timer)}s`);
};

export const initBlussuvoll = async ({
  prismaClient,
}: {
  prismaClient: PrismaClient;
}) => {
  console.info("🏫 Initializing Blussuvoll ...");

  await createCategories({ prismaClient });
  await createUsers({ prismaClient, users, withAdmins: true });
  await createDayOneTasks({ prismaClient });

  // await createOldTasks({ prismaClient });
};
