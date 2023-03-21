import type { PrismaClient } from "@prisma/client";
import { createDayOneTasks } from "./day-one-tasks";

export const initBlussuvoll = async ({
  prismaClient,
}: {
  prismaClient: PrismaClient;
}) => {
  console.info("🏫 Initializing Blussuvoll ...");
  await createDayOneTasks({ prismaClient });
};
