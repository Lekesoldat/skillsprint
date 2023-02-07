import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { differenceInSeconds } from "date-fns";
import { createAchievements } from "./achievements";
import { createCategories } from "./categories";
import { createTaskAttempts, createTasks } from "./tasks";
import { createUsers } from "./users";

faker.seed(69);
const prismaClient = new PrismaClient();
await prismaClient.$connect();

export { prismaClient, faker };

async function init() {
  console.info("--- --- --- --- --- --- ---");
  console.info("🌱 Seeding database!");

  // Users
  const startUsers = new Date();
  const users = await createUsers();
  console.log(`Took ${differenceInSeconds(new Date(), startUsers)}s`);

  // Achievements
  const startAchievements = new Date();
  await createAchievements();
  console.log(`Took ${differenceInSeconds(new Date(), startAchievements)}s`);

  // Categories
  const startCategories = new Date();
  await createCategories();
  console.log(`Took ${differenceInSeconds(new Date(), startCategories)}s`);

  // Tasks
  const startTasks = new Date();
  const tasks = await createTasks();
  console.log(`Took ${differenceInSeconds(new Date(), startTasks)}s`);

  // Task Attempts
  const startAttempts = new Date();
  await createTaskAttempts(tasks, users);
  console.log(`Took ${differenceInSeconds(new Date(), startAttempts)}s`);

  console.info("\n🌴 Done seeding database!");
  console.info("--- --- --- --- --- --- ---");
}

await init();
