import type { PrismaClient } from "@prisma/client";
import { createEquationTasks } from "./equations";
import { createExponentialTasks } from "./exponential";
import { createInverseProportionalFunctionTasks } from "./inverse";
import { createLinearTasks } from "./linear";
import { createQuadraticTasks } from "./quadratic";
import { userList } from "./users";

const createBlussuvollTasks = async ({
  prismaClient,
}: {
  prismaClient: PrismaClient;
}) => {
  await createEquationTasks({ prismaClient });
  await createExponentialTasks({ prismaClient });
  await createInverseProportionalFunctionTasks({ prismaClient });
  await createLinearTasks({ prismaClient });
  await createQuadraticTasks({ prismaClient });
};

const createBlussuvollUsers = async ({
  prismaClient,
}: {
  prismaClient: PrismaClient;
}) => {
  console.info("\n📝 Seeding Blussuvoll users...");
  return await prismaClient.$transaction(
    userList.map((user) =>
      prismaClient.user.upsert({
        where: { name: user.name },
        create: user,
        update: user,
      })
    )
  );
};

export const initBlussuvoll = async ({
  prismaClient,
}: {
  prismaClient: PrismaClient;
}) => {
  await createBlussuvollUsers({ prismaClient });
  await createBlussuvollTasks({ prismaClient });
};
