import type { Prisma, PrismaClient } from "@prisma/client";

export async function createExponentialTasks({
  prismaClient,
}: {
  prismaClient: PrismaClient;
}) {
  console.info("\n📝 Seeding exponential tasks...");
  const data: Prisma.TaskCreateInput[] = [
    // Oppgave 1 - https://www.matematika.no/eksponentialfunksjon-2-spor-iii/
    {
      id: "cleec345q000108meb2avbgw2",
      title: "Oppgave 1a",
      description:
        "En ny bil koster math$285 000& kroner. Verditapet er på math$10%& hvert år. Lag en eksponentialfunksjon math$f(x)& som beskriver bilens verdi etter math$x& år.",
      category: { connect: { id: "cleebx9wi000508jt5ik9fgpx" } },
      points: 100,
      hint: "FUNCTION",
      answer: "0.9^x*285000",
    },
    {
      id: "cleec3gww000208mebunf6mo9",
      title: "Oppgave 1b",
      description:
        "En ny bil koster math$285 000& kroner. Verditapet er på math$10%& hvert år. Tegn grafen fra forrige oppgave.",
      category: { connect: { id: "cleebx9wi000508jt5ik9fgpx" } },
      points: 75,
      hint: "FLAG",
      answerType: 'FLAG',
      answer: "sulten-gullfisk",
      prevTask: { connect: { id: "cleec345q000108meb2avbgw2" } },
    },
    {
      id: "cleec3rpx000308me6524gtjb",
      title: "Oppgave 1c",
      description:
        "Med svaret fra forrige oppgave, hvor mange år senere er bilens verdi under 100 000 kroner? Oppgi ca. antall år.",
      category: { connect: { id: "cleebx9wi000508jt5ik9fgpx" } },
      points: 75,
      answer: "10",
      prevTask: { connect: { id: "cleec3gww000208mebunf6mo9" } },
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
