import { faker } from "@faker-js/faker/locale/nb_NO";
import { PrismaClient } from "@prisma/client";

faker.seed(69);
const prismaClient = new PrismaClient();
await prismaClient.$connect();

export { prismaClient, faker };
