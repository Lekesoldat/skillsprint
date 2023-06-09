import { prismaClient } from "./clients";
import { createDayOneTasks } from "./prod/day-one-tasks";
import { createUsers } from "./utils/user-utilities";

await createUsers({
  prismaClient,
  users: [],
  withAdmins: true,
});
await createDayOneTasks({ prismaClient });
