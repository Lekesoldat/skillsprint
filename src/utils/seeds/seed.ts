import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
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
  const users = await createUsers();

  // Achievements
  await createAchievements();

  // Categories
  const categories = await createCategories();

  // Tasks
  const tasks = await createTasks(categories);

  // Task Attempts
  await createTaskAttempts(tasks, users);

  console.info("\n🌴 Done seeding database!");
  console.info("--- --- --- --- --- --- ---");
}

await init();
