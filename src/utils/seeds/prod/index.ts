import type { PrismaClient } from "@prisma/client";
import { createUsers } from "../utils/user-utilities";
import { createCategories } from "./categories";
import { createDayOneTasks } from "./day-one-tasks";
import {
  SESSION_FOUR_USERS,
  SESSION_ONE_USERS,
  SESSION_THREE_USERS,
  SESSION_TWO_USERS,
} from "./user-list";

export const initBlussuvoll = async ({
  prismaClient,
}: {
  prismaClient: PrismaClient;
}) => {
  console.info("🏫 Initializing Blussuvoll ...");
  await createCategories({ prismaClient });
  await createDayOneTasks({ prismaClient });

  await createUsers({ prismaClient, users: SESSION_ONE_USERS });
  await createUsers({ prismaClient, users: SESSION_TWO_USERS });
  await createUsers({ prismaClient, users: SESSION_THREE_USERS });
  await createUsers({ prismaClient, users: SESSION_FOUR_USERS });
  // await createUsers({ prismaClient, users: [], withAdmins: true });
};
