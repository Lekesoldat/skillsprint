import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { differenceInSeconds } from "date-fns";
import { createCategories } from "./categories";
import { createTasks } from "./tasks";
import { createUsers } from "./users";

faker.seed(69);
const prismaClient = new PrismaClient();
await prismaClient.$connect();

export { prismaClient, faker };

async function prod_init() {
  const startSeeding = new Date();
  console.info("--- --- --- --- --- --- ---");
  console.info("🌱 Seeding database for production!");

  // Users
  const startUsers = new Date();
  await createUsers();
  console.log(`Took ${differenceInSeconds(new Date(), startUsers)}s`);

  // Categories
  const startCategories = new Date();
  await createCategories();
  console.log(`Took ${differenceInSeconds(new Date(), startCategories)}s`);

  // Tasks
  const startTasks = new Date();
  await createTasks();
  console.log(`Took ${differenceInSeconds(new Date(), startTasks)}s`);

  console.info(
    `\n🌴 Done seeding database for production after ${differenceInSeconds(
      new Date(),
      startSeeding
    )}s!`
  );
  console.info("--- --- --- --- --- --- ---");
}

await prod_init();
