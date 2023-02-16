import { differenceInSeconds } from "date-fns";
import { createCategories } from "./categories";
import { createTaskAttempts, createTasks } from "./tasks";
import { createUsers } from "./users";

async function dev_init() {
  const startSeeding = new Date();
  console.info("--- --- --- --- --- --- ---");
  console.info("🌱 Seeding database for development!");

  // Users
  const startUsers = new Date();
  const users = await createUsers();
  console.log(`Took ${differenceInSeconds(new Date(), startUsers)}s`);

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

  console.info(
    `\n🌴 Done seeding database for development after ${differenceInSeconds(
      new Date(),
      startSeeding
    )}s!`
  );
  console.info("--- --- --- --- --- --- ---");
}

await dev_init();
