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
        "Lag en verditabell og tegn grafen math$k(x)=x^2& i et koordinatsystem. ",
      category: { connect: { id: "cleeb63a5000008judykn4061" } },
      points: 50,
      hint: "FLAG",
      answerType: "FLAG",
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
      answerType: "FLAG",
      prevTask: { connect: { id: "cleeb7hsj000008l81muxehco" } },
    },

    // Oppgave 2 - https://www.matematika.no/a-utforske-funksjoner-2-spor-i/
    {
      id: "cleebrirf000008jt8er15aem",
      title: "Oppgave 2a",
      description: "Tegn grafen til funksjonen math$h(x)=-x^{2}+2x-2$. ",
      category: { connect: { id: "cleeb63a5000008judykn4061" } },
      points: 50,
      hint: "FLAG",
      answer: "turtle-chimp",
    },
    {
      id: "cleebhp92000008jv4xbkh700",
      title: "Oppgave 2b",
      description: "Hva slags type funksjon er math$h(x)&?",
      category: { connect: { id: "cleeb63a5000008judykn4061" } },
      points: 50,
      answerType: "FLAG",
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
      points: 75,
      answer: "(1,-1)",
      prevTask: { connect: { id: "cleebi44d000208jv85hpa9vx" } },
    },

    // Oppgave 3 - https://www.matematika.no/kvadratiske-funksjoner-2-spor-iv/
    {
      id: "cleecfgai000008js7ber34v8",
      title: "Oppgave 3a",
      description:
        "Lag en verditabell og tegn grafen math$f(x)=2x^2+1& i et koordinatsystem. ",
      category: { connect: { id: "cleeb63a5000008judykn4061" } },
      points: 75,
      hint: "FLAG",
      answerType: "FLAG",
      answer: "rusten-spiker",
    },
    {
      id: "cleecflo5000108js4ivfcv3g",
      title: "Oppgave 3b",
      description:
        "Lag en verditabell og tegn grafen math$g(x)=-2x^2+1& i et koordinatsystem. ",
      category: { connect: { id: "cleeb63a5000008judykn4061" } },
      points: 75,
      hint: "FLAG",
      answer: "tafatt-gomp",
      prevTask: { connect: { id: "cleecfgai000008js7ber34v8" } },
    },
    {
      id: "cleecfr1s000208js74h45hfc",
      title: "Oppgave 3c",
      description:
        "Hva er forskjellen og likheten mellom de to funksjonene math$f(x)& og math$g(x)&? ",
      category: { connect: { id: "cleeb63a5000008judykn4061" } },
      points: 75,
      hint: "FLAG",
      answer: "sliten-and",
      prevTask: { connect: { id: "cleecflo5000108js4ivfcv3g" } },
    },

    // Oppgave 4 - https://www.matematika.no/kvadratiske-funksjoner-i-praksis-2-spor-iv
    {
      id: "cleecj177000008l44s817sqf",
      title: "Oppgave 4",
      description:
        "En gruppe forskere øver opp en fotballrobot til å sparke en ball så nøyaktig som mulig. Punktet på bakken ligger 8 meter unna roboten. Forskerne har funnet to funksjoner som beskriver buene til de to forsøkene som traff på riktig sted. Det er de to kvadratiske funksjonene math$k(x)=-0.3x^2+2.4x& og math$l(x)=-\\frac{1}{2}x^2-4x&. Bruk en graftegner og finn minst 3 andre kvadratiske funksjoner som også treffer på riktig sted.",
      category: { connect: { id: "cleeb63a5000008judykn4061" } },
      points: 150,
      hint: "FLAG",
      answer: "vanskelig-oppgave",
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
