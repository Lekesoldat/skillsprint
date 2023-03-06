import { differenceInSeconds } from "date-fns";
import { prismaClient } from "./clients";
import { initBlussuvoll } from "./prod";
import { createNoobTasks } from "./prod/noobs";

async function init() {
  const timer = new Date();
  console.info("--- --- --- --- --- --- ---");
  console.info("🌱 Seeding database for production!");

  await initBlussuvoll({ prismaClient });
  // await createNoobTasks({ prismaClient });

  console.info(
    `\n🌴 Done seeding database for production after ${differenceInSeconds(
      new Date(),
      timer
    )}s!`
  );
  console.info("--- --- --- --- --- --- ---");
}

await init();
