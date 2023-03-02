import type { Prisma, PrismaClient } from "@prisma/client";
import { differenceInSeconds } from "date-fns";

const providedTasks: Prisma.TaskCreateInput[] = [
  {
    id: "cler3i0se000008kxdq1adnxh",
    title: "Oppgave 2.23",
    description:
      "Lag et funksjonsuttrykk som viser tilbakelagt strekning math$S(x)& når du sykler x timer med en hastighet pa 25 km/h.",
    answer: "S(x)=25x",
    category: { connect: { id: "cldacdi520001sbxekmyct9yd" } },
    answerType: "FUNCTION_ANSWER",
    placeholder: "S(x)=\\placeholder[blank1]{}x",
    points: 100,
  },
  {
    id: "cler4dqoq000007l6hulb6r27",
    title: "Oppgave 2.24a",
    description:
      "Erona kjøper x kg epler til 15 kr per kilogram og en boks med druer til 30 kr. Hun betaler P kr til sammen. Lag et funksjonsuttrykk math$P(x)& som viser hvor mye hun må betale.",
    answer: "P(x)=15x+30",
    answerType: "FUNCTION_ANSWER",
    placeholder: "P(x)=\\placeholder[blank1]{}x+\\placeholder[blank2]",
    points: 50,
    category: { connect: { id: "cldacdi520001sbxekmyct9yd" } },
  },
  {
    id: "cler4fya3000107l682qc4to3",
    title: "Oppgave 2.24b",
    description:
      "Erona kjøper x kg epler til 15 kr per kilogram og en boks med druer til 30 kr. Bruk funksjonsuttrykket til å finne ut hvor mye Erona skal betale for 2.5 kg epler og én boks druer?",
    answer: "67.50kr",
    hint: "DECIMAL",
    placeholder: "\\placeholder[blank1]{}kr",
    points: 75,
    category: { connect: { id: "cldacdi520001sbxekmyct9yd" } },
    prevTask: { connect: { id: "cler4dqoq000007l6hulb6r27" } },
  },
];

export async function createDayOneTasks({
  prismaClient,
}: {
  prismaClient: PrismaClient;
}) {
  const timer = new Date();
  console.info("\n📝 Seeding provided tasks...");

  const data = await prismaClient.$transaction(
    providedTasks.map((task) =>
      prismaClient.task.upsert({
        where: { id: task.id },
        create: task,
        update: task,
      })
    )
  );

  console.log(`Took ${differenceInSeconds(new Date(), timer)}s`);

  return data;
}
