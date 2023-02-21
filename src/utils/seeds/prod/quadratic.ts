import type { Prisma, PrismaClient } from "@prisma/client";

export async function createQuadraticTasks({
  prismaClient,
}: {
  prismaClient: PrismaClient;
}) {
  console.info("\n📝 Seeding quadratic tasks...");
  const data: Prisma.TaskCreateInput[] = [
    // Oppgave 1 - https://www.matematika.no/kvadratiske-funksjoner-2-spor-i/
    {
      id: "cleeb7hsj000008l81muxehco",
      title: "Oppgave 1a",
      description:
        "Lag en verditabell og tegn grafen math$k(x)=x^2& i et koordinatsystem.",
      category: { connect: { id: "cleeb63a5000008judykn4061" } },
      points: 50,
      answer: "lion-horse",
    },
    {
      id: "cleeb9bth000108l86ezw6p0v",
      title: "Oppgave 1b",
      description:
        "Hva kalles verdiene til math$k(x)& når x er et naturlig positivt heltall?",
      category: { connect: { id: "cleeb63a5000008judykn4061" } },
      points: 50,
      answer: "kvadrattall",
      prevTask: { connect: { id: "cleeb7hsj000008l81muxehco" } },
    },

    // Oppgave 2 - https://www.matematika.no/a-utforske-funksjoner-2-spor-i/
    {
      id: "cleebrirf000008jt8er15aem",
      title: "Oppgave 2a",
      description: "Tegn grafen til funksjonen math$h(x)=-x^{2}+2x-2$",
      category: { connect: { id: "cleeb63a5000008judykn4061" } },
      points: 50,
      answer: "turtle-chimp",
      prevTask: { connect: { id: "cleeb9bth000108l86ezw6p0v" } },
    },
    {
      id: "cleebhp92000008jv4xbkh700",
      title: "Oppgave 2b",
      description: "Hva slags type funksjon er math$h(x)&?",
      category: { connect: { id: "cleeb63a5000008judykn4061" } },
      points: 50,
      answer: "andregradsfunksjon",
      prevTask: { connect: { id: "cleebrirf000008jt8er15aem" } },
    },
    {
      id: "cleebhwdu000108jv260iaxf5",
      title: "Oppgave 2c",
      description: "Hva kalles grafen til denne typen funksjon?",
      category: { connect: { id: "cleeb63a5000008judykn4061" } },
      points: 50,
      answer: "parabel",
      prevTask: { connect: { id: "cleebhp92000008jv4xbkh700" } },
    },
    {
      id: "cleebi44d000208jv85hpa9vx",
      title: "Oppgave 2d",
      description: "Finn symmetriaksen. Oppgi på formen math$x=...&",
      category: { connect: { id: "cleeb63a5000008judykn4061" } },
      points: 50,
      answer: "x=1",
      prevTask: { connect: { id: "cleebhwdu000108jv260iaxf5" } },
    },
    {
      id: "cleebiad3000308jv9ad98zj8",
      title: "Oppgave 2e",
      description:
        "Finn eventuelle ekstremalpunkter. Oppgi på formen math$(x,y)&",
      category: { connect: { id: "cleeb63a5000008judykn4061" } },
      points: 100,
      answer: "(1,-1)",
      prevTask: { connect: { id: "cleebi44d000208jv85hpa9vx" } },
    },

    // Oppgave 3 - https://www.matematika.no/andregradslikninger-grafisk-losning-1-spor-i/
    {
      id: "cleebs9cy000108jt2h90em7p",
      title: "Oppgave 3a",
      description: "math$x^2+2x-3=0&. Oppgi på formen math$x=...,x=...&",
      category: { connect: { id: "cleeb63a5000008judykn4061" } },
      points: 100,
      answer: "x=1,x=-3",
      prevTask: { connect: { id: "cleebiad3000308jv9ad98zj8" } },
    },
    {
      id: "cleebse3x000208jtgg6n1nya",
      title: "Oppgave 3b",
      description: "math$x^2-2x-8=0&. Oppgi på formen math$x=...,x=...&",
      category: { connect: { id: "cleeb63a5000008judykn4061" } },
      points: 100,
      answer: "x=4,x=-2",
      prevTask: { connect: { id: "cleebs9cy000108jt2h90em7p" } },
    },
    {
      id: "cleebsiuj000308jt8r82ebx7",
      title: "Oppgave 3c",
      description: "math$x^2+2x-15=0&. Oppgi på formen math$x=...,x=...&",
      category: { connect: { id: "cleeb63a5000008judykn4061" } },
      points: 100,
      answer: "x=3,x=-5",
      prevTask: { connect: { id: "cleebse3x000208jtgg6n1nya" } },
    },
    {
      id: "cleebsojt000408jt7lr31h4m",
      title: "Oppgave 3d",
      description: "math$x^2+10x+25=0&. Oppgi på formen math$x=...,x=...&",
      category: { connect: { id: "cleeb63a5000008judykn4061" } },
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
