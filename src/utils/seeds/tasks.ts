import type { Prisma, Task, User } from "@prisma/client";
import { taskAttemptCuids } from "./ids";
import { faker, prismaClient } from "./seed";

export async function createTasks() {
  console.info("\n📝 Seeding tasks...");
  const data: Prisma.TaskCreateInput[] = [
    // Algebra
    {
      id: "cldiog5kk000008l29k73fx8g",
      title: "Oppgave 1a",
      description:
        "En liten seilbåt har et trekantet seil med et areal på 9 m². Høyden på seilet er 6 meter. Formelen for arealet til en trekant er math(A=\\frac{gh}{2}). Hva er formelen for grunnlinjen i denne trekanten?",
      category: { connect: { id: "cldacdi520000sbxe8eyqu26y" } },
      points: 50,
      answer: "g=\\frac{2A}{h}",
    },
    {
      id: "cldioiaq9000f08l27ek850k3",
      title: "Oppgave 1b",
      description:
        "En liten seilbåt har et trekantet seil med et areal på 9 m². Høyden på seilet er 6 meter. Formelen for arealet til en trekant er math(A=\\frac{gh}{2}). Bruk formelen og regn ut lengden til grunnlinjen.",
      category: { connect: { id: "cldacdi520000sbxe8eyqu26y" } },
      points: 75,
      answer: "3",
      prevTask: { connect: { id: "cldiog5kk000008l29k73fx8g" } },
    },
    {
      id: "cldudjgkh000008ig5tnn2ixf",
      title: "Oppgave 2a",
      description:
        "Anvend kunnskapen din om faktorisering når du faktoriserer uttrykkene. math(5a+20b+10c)",
      category: { connect: { id: "cldacdi520000sbxe8eyqu26y" } },
      points: 25,
      answer: "5(a+4b+2c)",
    },
    {
      id: "cldudoi2p000208igdu8ebtud",
      title: "Oppgave 2b",
      description:
        "Anvend kunnskapen din om faktorisering når du faktoriserer uttrykkene. math(2a^2 b-2ab)",
      category: { connect: { id: "cldacdi520000sbxe8eyqu26y" } },
      points: 50,
      answer: "2ab(a-1)",
      prevTask: { connect: { id: "cldudjgkh000008ig5tnn2ixf" } },
    },
    {
      id: "cldudqbi5000308ig86l16ppf",
      title: "Oppgave 2c",
      description:
        "Anvend kunnskapen din om faktorisering når du faktoriserer uttrykkene. math(2b^3 + 10b^2 - 4b)",
      category: { connect: { id: "cldacdi520000sbxe8eyqu26y" } },
      points: 75,
      answer: "2b(b^2 + 5b - 2)",
      prevTask: { connect: { id: "cldudoi2p000208igdu8ebtud" } },
    },
    {
      id: "cldudr1a2000408ig1qzaa7pm",
      title: "Oppgave 2d",
      description:
        "Anvend kunnskapen din om faktorisering når du faktoriserer uttrykkene. math(5x^3 y^2-10x^2 y+xy^2)",
      category: { connect: { id: "cldacdi520000sbxe8eyqu26y" } },
      points: 100,
      answer: "xy(5x^2 y-10x+y)",
      prevTask: { connect: { id: "cldudqbi5000308ig86l16ppf" } },
    },
    {
      id: "cldudrdaz000508ig6393dei9",
      title: "Oppgave 2e",
      description:
        "Anvend kunnskapen din om faktorisering når du faktoriserer uttrykkene. math(9x^3 y^2 + 27x^2 y^3)",
      category: { connect: { id: "cldacdi520000sbxe8eyqu26y" } },
      points: 100,
      answer: "9x^2 y^2 (x + 3y)",
      prevTask: { connect: { id: "cldudr1a2000408ig1qzaa7pm" } },
    },
    {
      id: "cldudrj6k000608igclru197t",
      title: "Oppgave 2f",
      description:
        "Anvend kunnskapen din om faktorisering når du faktoriserer uttrykkene. math(4xy^2 z+8x^2 yz + 16xyz^2)",
      category: { connect: { id: "cldacdi520000sbxe8eyqu26y" } },
      points: 125,
      answer: "4xyz(y+2x+4z)",
      prevTask: { connect: { id: "cldudrdaz000508ig6393dei9" } },
    },

    // Økonomi
    {
      id: "cldx7ix84000108juf6y64x3i",
      title: "Oppgave 1a",
      description:
        "En baker tjener 41 500 kroner i bruttolønn per måned. Bakeren betaler 35 % i skatt hver måned. Bruk gjerne regneark når du løser oppgavene. Hvor mye utgjør prosenttrekket i kroner per måned?",
      category: { connect: { id: "cldx7ez8a000008juf4sl1wdq" } },
      points: 50,
      answer: "14525",
    },
    {
      id: "cldxc2oz2000109l8bp33fmcf",
      title: "Oppgave 1b",
      description:
        "En baker tjener 41 500 kroner i bruttolønn per måned. Bakeren betaler 35 % i skatt hver måned. Bruk gjerne regneark når du løser oppgavene. Hva er bakerens nettolønn per måned?",
      category: { connect: { id: "cldx7ez8a000008juf4sl1wdq" } },
      points: 75,
      answer: "26975",
      prevTask: { connect: { id: "cldx7ix84000108juf6y64x3i" } },
    },
    {
      id: "cldx7ra2p000008mt7td7grls",
      title: "Oppgave 2a",
      description:
        "Charlotte skal på språkreise i Malaga og ønsker å veksle norske kroner til euro. Bruk tabellen til høyre for å finne vekslingskurs for ønsket valuta. Hvor mange norske kroner må hun betale for 50 €?",
      category: { connect: { id: "cldx7ez8a000008juf4sl1wdq" } },
      points: 50,
      answer: "523.52",
    },
    {
      id: "cldx7vlv2000008mmbhex1qxi",
      title: "Oppgave 2b",
      description:
        "Charlotte skal på språkreise i Malaga og ønsker å veksle norske kroner til euro. Bruk tabellen til høyre for å finne vekslingskurs for ønsket valuta. Hvor mange euro får hun for 600 norske kroner?",
      category: { connect: { id: "cldx7ez8a000008juf4sl1wdq" } },
      points: 75,
      answer: "57.30",
      prevTask: { connect: { id: "cldx7ra2p000008mt7td7grls" } },
    },

    // Likninger
    {
      id: "cldx88udv000008l49cllfn9h",
      title: "Oppgave 1a",
      description:
        "Andregradslikninger kalles også kvadratiske likninger og inneholder et ledd med math(x^2). Løs likningene ved regning: math(x^2=121)",
      category: { connect: { id: "cldacdi530002sbxeu6rgijzl" } },
      points: 50,
      answer: "x=11,x=-11",
    },
    {
      id: "cldx891wg000108l4hv703vl7",
      title: "Oppgave 1b",
      description:
        "Andregradslikninger kalles også kvadratiske likninger og inneholder et ledd med math(x^2). Løs likningene ved regning: math(x^2+23=72)",
      category: { connect: { id: "cldacdi530002sbxeu6rgijzl" } },
      points: 75,
      answer: "x=7,x=-7",
      prevTask: { connect: { id: "cldx88udv000008l49cllfn9h" } },
    },
    {
      id: "cldx899n7000208l489j16ufq",
      title: "Oppgave 1c",
      description:
        "Andregradslikninger kalles også kvadratiske likninger og inneholder et ledd med math(x^2). Løs likningene ved regning: math(x^2-16=9)",
      category: { connect: { id: "cldacdi530002sbxeu6rgijzl" } },
      points: 90,
      answer: "x=5,x=-5",
      prevTask: { connect: { id: "cldx891wg000108l4hv703vl7" } },
    },
    {
      id: "cldx89jld000308l4bautag2d",
      title: "Oppgave 1d",
      description:
        "Andregradslikninger kalles også kvadratiske likninger og inneholder et ledd med math(x^2). Løs likningene ved regning: math(2x^2=128)",
      category: { connect: { id: "cldacdi530002sbxeu6rgijzl" } },
      points: 100,
      answer: "x=8,x=-8",
      prevTask: { connect: { id: "cldx899n7000208l489j16ufq" } },
    },

    // Funksjoner
    {
      id: "cldx8ew9o000408l4fild651m",
      title: "Oppgave 1a",
      description:
        "Et håndballag fra CSK ønsker å reise til Storhamar-cup med buss. Å leie sjåfør og buss tur/retur vil koste 30 000 kr. Bussen tar maksimalt 50 passasjerer. Skriv ned funksjonsuttrykket som viser utgiftene per person.",
      category: { connect: { id: "cldacdi520001sbxekmyct9yd" } },
      points: 50,
      answer: "f(x)=\\frac{30000}{x}",
    },
    {
      id: "cldx8f46d000508l4ap9983lt",
      title: "Oppgave 1b",
      description:
        "Et håndballag fra CSK ønsker å reise til Storhamar-cup med buss. Å leie sjåfør og buss tur/retur vil koste 30 000 kr. Bussen tar maksimalt 50 passasjerer. Skriv ned funksjonsuttrykket som viser utgiftene per person. Hvor mye koster turen per person dersom 20 stykker deltar?",
      category: { connect: { id: "cldacdi520001sbxekmyct9yd" } },
      points: 75,
      answer: "1500",
      prevTask: { connect: { id: "cldx8ew9o000408l4fild651m" } },
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

export async function createTaskAttempts(tasks: Task[], users: User[]) {
  console.info("\n✅ Seeding task attempts...");

  const completed = new Map<[string, string], boolean>();

  const start = new Date(2023, 2, 4, 12);
  const end = new Date(2023, 2, 4, 15);

  let count = 0;

  const promises = taskAttemptCuids.map((id) => {
    const taskId = faker.helpers.arrayElement(tasks).id;
    const userId =
      count <= 10
        ? "cle2wz3id0002fxpb0digx7tv"
        : faker.helpers.arrayElement(users).id;

    if (count <= 10) {
      count++;
    }

    const result = completed.get([taskId, userId])
      ? "PENDING"
      : faker.helpers.arrayElement(["FAIL", "SUCCESS", "PENDING"] as const);

    const elapsedTime = faker.datatype.number({ min: 100, max: 1000 });
    const createdAt = faker.date.between(start, end);

    if (result === "SUCCESS") {
      completed.set([taskId, userId], true);
    }

    return prismaClient.taskAttempt.upsert({
      where: { id },
      create: {
        id,
        taskId,
        userId,
        result,
        elapsedTime,
        createdAt,
      },
      update: {
        taskId,
        userId,
        result,
        createdAt,
        elapsedTime,
      },
    });
  });

  return await prismaClient.$transaction(promises);
}
