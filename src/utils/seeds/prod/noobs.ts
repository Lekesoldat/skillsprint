import type { Prisma, PrismaClient } from "@prisma/client";
import { differenceInSeconds } from "date-fns";

export async function createNoobTasks({
  prismaClient,
}: {
  prismaClient: PrismaClient;
}) {
  const timer = new Date();
  console.info("\n📝 Seeding noob tasks...");

  const noobTasks: Prisma.TaskCreateInput[] = [
    {
      id: "cle79684v000708mlbqti5tbn",
      title: "Oppgave 1a",
      description: "Hva er math$2+2&?",
      category: { connect: { id: "cle791t0y000308ml7zsw59wo" } },
      points: 50,
      answer: "4",
    },
    {
      id: "cle7975f5000808mlf20ma3qh",
      title: "Oppgave 1b",
      description: "Hva er den største verdien av 2, 3 og 4?",
      category: { connect: { id: "cle791t0y000308ml7zsw59wo" } },
      points: 75,
      answer: "4",
      prevTask: { connect: { id: "cle79684v000708mlbqti5tbn" } },
    },
    {
      id: "cle797rt1000908ml608z61ww",
      title: "Oppgave 1c",
      description: "Hvor mange timer er det i 2 dager?",
      category: { connect: { id: "cle791t0y000308ml7zsw59wo" } },
      points: 75,
      answer: "48",
      prevTask: { connect: { id: "cle7975f5000808mlf20ma3qh" } },
    },
    {
      id: "cle7980os000a08mlgg12fedd",
      title: "Oppgave 1d",
      description: "Hvor mange sekunder er det i ett døgn?",
      category: { connect: { id: "cle791t0y000308ml7zsw59wo" } },
      points: 100,
      answer: "86400",
      prevTask: { connect: { id: "cle797rt1000908ml608z61ww" } },
    },
    {
      id: "cle798ake000b08ml2v6g351s",
      title: "Oppgave 1e",
      description: "Hva er math$2+2*2&?",
      category: { connect: { id: "cle791t0y000308ml7zsw59wo" } },
      points: 125,
      answer: "6",
      prevTask: { connect: { id: "cle7980os000a08mlgg12fedd" } },
    },
  ];

  const data = await prismaClient.$transaction(
    noobTasks.map((task) =>
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
