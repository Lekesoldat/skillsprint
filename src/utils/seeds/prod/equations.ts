import type { Prisma, PrismaClient } from "@prisma/client";

export async function createEquationTasks({
  prismaClient,
}: {
  prismaClient: PrismaClient;
}) {
  console.info("\n📝 Seeding equation tasks...");
  const data: Prisma.TaskCreateInput[] = [
    // Oppgave 3 - https://www.matematika.no/andregradslikninger-grafisk-losning-1-spor-i/
    {
      id: "cleebs9cy000108jt2h90em7p",
      title: "Oppgave 1a",
      description: "math$x^2+2x-3=0&",
      hint: "MULTIPLE_VALUES",
      category: { connect: { id: "cldacdi530002sbxeu6rgijzl" } },
      points: 100,
      answer: "x=1,x=-3",
    },
    {
      id: "cleebse3x000208jtgg6n1nya",
      title: "Oppgave 1b",
      description: "math$x^2-2x-8=0&",
      hint: "MULTIPLE_VALUES",
      category: { connect: { id: "cldacdi530002sbxeu6rgijzl" } },
      points: 100,
      answer: "x=4,x=-2",
      prevTask: { connect: { id: "cleebs9cy000108jt2h90em7p" } },
    },
    {
      id: "cleebsiuj000308jt8r82ebx7",
      title: "Oppgave 1c",
      description: "math$x^2+2x-15=0&",
      hint: "MULTIPLE_VALUES",
      category: { connect: { id: "cldacdi530002sbxeu6rgijzl" } },
      points: 100,
      answer: "x=3,x=-5",
      prevTask: { connect: { id: "cleebse3x000208jtgg6n1nya" } },
    },
    {
      id: "cleebsojt000408jt7lr31h4m",
      title: "Oppgave 1d",
      description: "math$x^2+10x+25=0&",
      hint: "MULTIPLE_VALUES",
      category: { connect: { id: "cldacdi530002sbxeu6rgijzl" } },
      points: 100,
      answer: "x=-5",
      prevTask: { connect: { id: "cleebsiuj000308jt8r82ebx7" } },
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
