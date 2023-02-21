import type { PrismaClient } from "@prisma/client";
import { createEquationTasks } from "./equations";
import { createExponentialTasks } from "./exponential";
import { createInverseProportionalFunctionTasks } from "./inverse";
import { createLinearTasks } from "./linear";
import { createQuadraticTasks } from "./quadratic";

export const createSchoolProvidedTasks = async ({
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
