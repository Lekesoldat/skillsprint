import type { Prisma, PrismaClient } from "@prisma/client";
import { createEquationTasks } from "./equations";
import argon2 from "argon2";
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
  console.info("\n📝 Seeding Blussuvoll users tasks...");
  const hashedUsers = await hashPasswords(userList);

  return await prismaClient.$transaction(
    hashedUsers.map((user) =>
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

const hashPasswords = async (userList: Prisma.UserCreateInput[]) => {
  const userPromises = userList.map(async ({ name, password }) => {
    const hashedPassword = await argon2.hash(password);

    return {
      name,
      password: hashedPassword,
    };
  });

  return await Promise.all(userPromises);
};
