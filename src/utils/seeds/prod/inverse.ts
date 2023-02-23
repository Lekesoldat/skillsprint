import type { Prisma, PrismaClient } from "@prisma/client";

export async function createInverseProportionalFunctionTasks({
  prismaClient,
}: {
  prismaClient: PrismaClient;
}) {
  console.info("\n📝 Seeding inverse proportional function tasks...");
  const data: Prisma.TaskCreateInput[] = [
    // Oppgave 1 - https://www.matematika.no/omvendt-proporsjonale-funksjoner-2-spor-iv/
    {
      id: "cleecqz7m000008kxaqfa8dqa",
      title: "Oppgave 1a",
      description:
        "En hytteeier må bære 200 terassebord fra parkeringsplassen til hytta. Skriv ned funksjonsuttrykket som viser hvor mange timer han bruker dersom han klarer math$x& planker/time.",
      category: { connect: { id: "cleeckaww000108l4h4gjekif" } },
      points: 100,
      hint: "FUNCTION",
      answer: "\\frac{200}{x}",
    },
    {
      id: "cleecr4gm000108kx9d636p65",
      title: "Oppgave 1b",
      description:
        "En hytteeier må bære 200 terassebord fra parkeringsplassen til hytta. Lag en verditabell og tegn grafen. Du kan bruke x-verdier fra 1 til 100.",
      category: { connect: { id: "cleeckaww000108l4h4gjekif" } },
      points: 100,
      hint: "FLAG",
      answer: "dreven-fugl",
      prevTask: { connect: { id: "cleecqz7m000008kxaqfa8dqa" } },
    },
    {
      id: "cleecr9fy000208kxdew780cc",
      title: "Oppgave 1c",
      description:
        "En hytteeier må bære 200 terassebord fra parkeringsplassen til hytta. Hvis han bærer 50 planker i timen. hvor lang tid bruker han da på hele trelasten?",
      category: { connect: { id: "cleeckaww000108l4h4gjekif" } },
      points: 100,
      answer: "4",
      prevTask: { connect: { id: "cleecr4gm000108kx9d636p65" } },
    },
    {
      id: "cleefr8xh000008lc9mjj8p1c",
      title: "Oppgave 1d",
      description:
        "En hytteeier må bære 200 terassebord fra parkeringsplassen til hytta. Vis at funksjonen tilfredsstiller kravet til omvendt proporsjonale funksjoner.",
      category: { connect: { id: "cleeckaww000108l4h4gjekif" } },
      points: 100,
      hint: "FLAG",
      answer: "rund-ball",
      prevTask: { connect: { id: "cleecr9fy000208kxdew780cc" } },
    },
  ];

  return await prismaClient.$transaction(
    data.map((task) =>
      prismaClient.task.upsert({
        where: { id: task.id },
        create: task,
        update: task,
      })
    )
  );
}
