import { faker } from "@faker-js/faker";
import { differenceInSeconds } from "date-fns";
import { createCategories } from "./categories";
import { prismaClient } from "./clients";
import { createDummyTasks } from "./dummy-tasks";
import { createSchoolProvidedTasks } from "./prod";
import { createLinearTasks } from "./prod/linear";
import { createQuadraticTasks } from "./prod/quadratic";
import { createUsers } from "./users";

async function prod_init() {
  const startSeeding = new Date();
  console.info("--- --- --- --- --- --- ---");
  console.info("🌱 Seeding database for production!");

  // Users
  const startUsers = new Date();
  await createUsers({ prismaClient, faker, onlyFriends: true });
  console.log(`Took ${differenceInSeconds(new Date(), startUsers)}s`);

  // Categories
  const startCategories = new Date();
  await createCategories({ prismaClient });
  console.log(`Took ${differenceInSeconds(new Date(), startCategories)}s`);

  // Tasks
  const startTasks = new Date();
  // await createDummyTasks({ prismaClient });
  await createSchoolProvidedTasks({ prismaClient });
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
