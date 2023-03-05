import type { Prisma, PrismaClient } from "@prisma/client";
import { differenceInSeconds } from "date-fns";

const providedTasks: Prisma.TaskCreateInput[] = [
  // 2.23
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

  // 2.24
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

  // 2.25.1
  {
    id: "cletwsik3000008jmh4df8q40",
    title: "Oppgave 2.25.1a",
    description:
      "Petter kjøper x euro til 11 kr per euro (€). Han betaler i tillegg 30 kr i gebyr. Lag et funksjonsuttrykk math$B(x)& som viser hvor mye han må betale i alt.",
    answer: "B(x)=11x+30",
    placeholder: "B(x)=\\placeholder[blank1]{}x+\\placeholder[blank2]",
    points: 75,
    category: { connect: { id: "cldacdi520001sbxekmyct9yd" } },
  },
  {
    id: "cletwz36j000108jmasp929ly",
    title: "Oppgave 2.25.1a",
    description:
      "Petter kjøper x euro til 11 kr per euro (€). Han betaler i tillegg 30 kr i gebyr. Bruk funksjonsuttrykket til à finne ut hvor mange kroner Petter má betale for 200 €",
    answer: "2230kr",
    placeholder: "\\placeholder[blank1]{}kr",
    points: 25,
    category: { connect: { id: "cldacdi520001sbxekmyct9yd" } },
    prevTask: { connect: { id: "cletwsik3000008jmh4df8q40" } },
  },

  // 2.25.2
  {
    id: "cletx24ht000208jmbazkf9fj",
    title: "Oppgave 2.25.2a",
    description:
      "Aida kjoper x liter bensin til 15,50 kr/L og to kanner spylerveske til 65 kr per kanne. Lag et funksjonsuttrykk math$B(x)& som viser hvor mye hun má betale i alt.",
    answer: "B(x)=15.5x+130",
    placeholder: "B(x)=\\placeholder[blank1]{}x+\\placeholder[blank2]",
    points: 75,
    category: { connect: { id: "cldacdi520001sbxekmyct9yd" } },
    prevTask: { connect: { id: "cletwz36j000108jmasp929ly" } },
  },
  {
    id: "cletx2a6r000308jm77dm4l41",
    title: "Oppgave 2.25.2a",
    description:
      "Aida kjoper x liter bensin til 15,50 kr/L og to kanner spylerveske til 65 kr per kanne. Bruk funksjonsuttrykket til å finne ut hvor mye Aida må betale for 35 L bensin og to kanner spylerveske.",
    answer: "672.50kr",
    placeholder: "\\placeholder[blank1]{}kr",
    points: 75,
    category: { connect: { id: "cldacdi520001sbxekmyct9yd" } },
    prevTask: { connect: { id: "cletx24ht000208jmbazkf9fj" } },
  },

  // 2.25.3
  {
    id: "cletx8mvt000408jm8dn6amo5",
    title: "Oppgave 2.25.3a",
    description:
      "En elbil har en batterikapasitet på 40 kWh (kilowattimer). Den bruker 1.8 kWh per mil. Lag et funksjonsuttrykk math$E(x)& som viser hvor stor kapasitet det er igjen etter x mil.",
    answer: "E(x)=40-1.8x",
    placeholder: "E(x)=\\placeholder[blank1]{}-\\placeholder[blank2]{}x",
    points: 100,
    category: { connect: { id: "cldacdi520001sbxekmyct9yd" } },
    prevTask: { connect: { id: "cletx2a6r000308jm77dm4l41" } },
  },
  {
    id: "cletxc03t000508jm2v7lg7mp",
    title: "Oppgave 2.25.3b",
    description:
      "En elbil har en batterikapasitet på 40 kWh (kilowattimer). Den bruker 1.8 kWh per mil. Basert på svaret i forrige oppgave: Hva er stigningstallet i funksjonen?",
    answer: "-1.8",
    points: 25,
    category: { connect: { id: "cldacdi520001sbxekmyct9yd" } },
    prevTask: { connect: { id: "cletx8mvt000408jm8dn6amo5" } },
  },
  {
    id: "cletxg1qv000608jm5oe02ty1",
    title: "Oppgave 2.25.3c",
    description:
      "En elbil har en batterikapasitet på 40 kWh (kilowattimer). Den bruker 1.8 kWh per mil. Basert på svaret i forrige oppgave: Hva er konstantleddet i funksjonen?",
    answer: "40",
    points: 25,
    category: { connect: { id: "cldacdi520001sbxekmyct9yd" } },
    prevTask: { connect: { id: "cletxc03t000508jm2v7lg7mp" } },
  },

  // 2.26.1
  {
    id: "clevdm8hi000108mc3wqhdb4w",
    title: "Oppgave 2.26.1a",
    description:
      "Et svømmebasseng har form som et rektangulært prisme og fylles med vann med en hastighet på math$25 m^3& per time. Lag et funksjonsuttrykk math$V(x)& som viser hvor mye vann det er i bassenget etter x timer.",
    answer: "V(x)=25x",
    placeholder: "V(x)=\\placeholder[blank1]{}x",
    points: 75,
    category: { connect: { id: "cldacdi520001sbxekmyct9yd" } },
  },
  {
    id: "clevds5xt000008lacw9za59e",
    title: "Oppgave 2.26.1b",
    description:
      "Et svømmebasseng har form som et rektangulært prisme og fylles med vann med en hastighet på math$25 m^3& per time. Bruk funksjonsuttrykket til å finne ut hvor mye vann det er i bassenget etter 5 timer.",
    answer: "125m^3",
    placeholder: "\\placeholder[blank1]{}m^3",
    points: 25,
    category: { connect: { id: "cldacdi520001sbxekmyct9yd" } },
    prevTask: { connect: { id: "clevdm8hi000108mc3wqhdb4w" } },
  },

  // 2.26.2
  {
    id: "clevdukrr000108la0on1cfiu",
    title: "Oppgave 2.26.2a",
    description:
      "Et svømmebasseng har form som et rektangulært prisme og fylles med vann med en hastighet på math$25 m^3& per time. Lag et funksjonsuttrykk math$V(x)& som viser hvor mye vann det er i bassenget etter x timer når det er 5000 L i bassenget fra før.",
    answer: "V(x)=25x+5",
    placeholder: "V(x)=\\placeholder[blank1]{}x+\\placeholder[blank2]{}",
    points: 75,
    category: { connect: { id: "cldacdi520001sbxekmyct9yd" } },
    prevTask: { connect: { id: "clevds5xt000008lacw9za59e" } },
  },
  {
    id: "clevdupzf000208la1iik1j4w",
    title: "Oppgave 2.26.2b",
    description:
      "Et svømmebasseng har form som et rektangulært prisme og fylles med vann med en hastighet på math$25 m^3& per time. Bruk funksjonsuttrykket til å finne ut hvor mye vann det er i bassenget etter 7 timer.",
    answer: "180m^3",
    placeholder: "\\placeholder[blank1]{}m^3",
    points: 75,
    category: { connect: { id: "cldacdi520001sbxekmyct9yd" } },
    prevTask: { connect: { id: "clevdukrr000108la0on1cfiu" } },
  },

  // 2.26.3
  {
    id: "clevdzqpp000308laejy13k6g",
    title: "Oppgave 2.26.3a",
    description:
      "Et svømmebasseng har form som et rektangulært prisme og fylles med vann med en hastighet på math$25 m^3& per time. Lag et funksjonsuttrykk math$V(x)& som viser hvor mye vann det er igjen i bassenget etter x timer når bassenget inneholder math$10 000 m^3& vann og vannet tappes ut med en hastighet på math$175 m^3& per time.",
    answer: "V(x)=10000-175x",
    placeholder: "V(x)=\\placeholder[blank1]{}-\\placeholder[blank2]{}x",
    points: 100,
    category: { connect: { id: "cldacdi520001sbxekmyct9yd" } },
    prevTask: { connect: { id: "clevdupzf000208la1iik1j4w" } },
  },
  {
    id: "clevdzvrn000408la1g6x9g5g",
    title: "Oppgave 2.26.3b",
    description:
      "Et svømmebasseng har form som et rektangulært prisme og fylles med vann med en hastighet på math$25 m^3& per time. Bruk funksjonsuttrykket til å finne ut hvor mye vann det er igjen i bassenget etter 20 timer.",
    answer: "6500m^3",
    placeholder: "\\placeholder[blank1]{}m^3",
    points: 75,
    category: { connect: { id: "cldacdi520001sbxekmyct9yd" } },
    prevTask: { connect: { id: "clevdzqpp000308laejy13k6g" } },
  },
  {
    id: "cleve41e1000508la179r40ek",
    title: "Oppgave 2.26.3c",
    description:
      "Et svømmebasseng har form som et rektangulært prisme og fylles med vann med en hastighet på math$25 m^3& per time. Etter hvor mange timer er bassenget tomt for vann? Oppgi ca. antall timer.",
    answer: "57",
    points: 75,
    category: { connect: { id: "cldacdi520001sbxekmyct9yd" } },
    prevTask: { connect: { id: "clevdzvrn000408la1g6x9g5g" } },
  },

  // 2.27
  {
    id: "cleveej7i000008mb5cqe3f3k",
    title: "Oppgave 2.27",
    description:
      "Noor kjorer moped med en gjennomsnittsfart på 30 km/h. Hvis hun kjører i x timer, vil strekningen S uttrykes ved funksjonsuttrykket math$S(x) = 30x&. Tegn grafen til funksjonen.",
    answer: "krevende-bille",
    hint: "FLAG",
    points: 100,
    category: { connect: { id: "cler3mpi9000108kxdzogagj4" } },
  },

  // 2.28
  {
    id: "clevep44w000208mbhy5mgzq5",
    title: "Oppgave 2.28a",
    description:
      "Samenhengen mellom celsiusgrader og fahrenheitgrader kan beskrives med funksjonen math$F(C)=1.8C+32& der F er fahrenheitgrader og C er celsiusgrader. Tegn grafen til funksjonen math$F(C)=1.8C+32&.",
    answer: "nyttig-graf",
    points: 100,
    hint: "FLAG",
    category: { connect: { id: "cler3mpi9000108kxdzogagj4" } },
  },
  {
    id: "clevevakk000308mb4h4ieulr",
    title: "Oppgave 2.28b",
    description:
      "Samenhengen mellom celsiusgrader og fahrenheitgrader kan beskrives med funksjonen math$F(C)=1.8C+32& der F er fahrenheitgrader og C er celsiusgrader. Les av på grafen hvor mange grader fahrenheit det er når det er 30 grader celsius.",
    answer: "86F",
    placeholder: "\\placeholder[blank1]{}F",
    points: 75,
    category: { connect: { id: "cler3mpi9000108kxdzogagj4" } },
    prevTask: { connect: { id: "clevep44w000208mbhy5mgzq5" } },
  },
  {
    id: "clevexgs8000408mbb5ypbp6m",
    title: "Oppgave 2.28c",
    description:
      'Samenhengen mellom celsiusgrader og fahrenheitgrader kan beskrives med funksjonen math$F(C)=1.8C+32& der F er fahrenheitgrader og C er celsiusgrader. Undersøk om det stemmer at kokepunktet til vann er 212 grader fahrenheit. Hvis det stemmer, skriv "riktig", hvis ikke skriv "feil".',
    answer: "riktig",
    points: 75,
    category: { connect: { id: "cler3mpi9000108kxdzogagj4" } },
    prevTask: { connect: { id: "clevevakk000308mb4h4ieulr" } },
  },
  {
    id: "clevf1fk2000508mb24292rrc",
    title: "Oppgave 2.28d",
    description:
      "Samenhengen mellom celsiusgrader og fahrenheitgrader kan beskrives med funksjonen math$F(C)=1.8C+32& der F er fahrenheitgrader og C er celsiusgrader. Hvor mange grader celsius er det hvis det er 32F?",
    answer: "0C",
    placeholder: "\\placeholder[blank1]{}C",
    points: 75,
    category: { connect: { id: "cler3mpi9000108kxdzogagj4" } },
    prevTask: { connect: { id: "clevexgs8000408mbb5ypbp6m" } },
  },

  // 2.29.1
  {
    id: "clevf4bnr000608mbechdb00z",
    title: "Oppgave 2.29.1a",
    description:
      "Hassan sykler med en hastighet på 24 km/h. Funksjonsuttrykekt math$L(x)=24x& viser hvor langt han har syklet på x timer. Tegn grafen til funksjonen.",
    answer: "sykkeltur",
    hint: "FLAG",
    points: 100,
    category: { connect: { id: "cler3mpi9000108kxdzogagj4" } },
  },
  {
    id: "clevf4bnr000608mbechdb00z",
    title: "Oppgave 2.29.1b",
    description:
      "Hassan sykler med en hastighet på 24 km/h. Funksjonsuttrykekt math$L(x)=24x& viser hvor langt han har syklet på x timer. Les av på grafen hvor langt han har syklet etter 2 timer (x = 2).",
    answer: "48km",
    placeholder: "\\placeholder[blank1]{}km",
    points: 50,
    category: { connect: { id: "cler3mpi9000108kxdzogagj4" } },
    prevTask: { connect: { id: "clevf4bnr000608mbechdb00z" } },
  },

  // 2.29.2
  {
    id: "clevf8oxk000808mb8wvj4fqw",
    title: "Oppgave 2.29.2a",
    description:
      "Erik går 30 km på ski. Han går i gjennomsnitt 0.2 km på 1 minutt. Lag et funksjonuttrykk math$L(x)& som viser hvor langt han har igjen etter x minutter.",
    answer: "L(x)=30-0.2x",
    placeholder: "L(x)=\\placeholder[blank1]{}-\\placeholder[blank2]{}x",
    points: 100,
    category: { connect: { id: "cler3mpi9000108kxdzogagj4" } },
    prevTask: { connect: { id: "clevf4bnr000608mbechdb00z" } },
  },
  {
    id: "clevfdiq4000908mbd0qv5c1z",
    title: "Oppgave 2.29.2b",
    description:
      "Erik går 30 km på ski. Han går i gjennomsnitt 0.2 km på 1 minutt. Tegn grafen for funksjonen når math$0<=x<=150&.",
    answer: "skitur",
    hint: "FLAG",
    points: 75,
    category: { connect: { id: "cler3mpi9000108kxdzogagj4" } },
    prevTask: { connect: { id: "clevf8oxk000808mb8wvj4fqw" } },
  },
  {
    id: "clevfj0kv000a08mbhcvqdijn",
    title: "Oppgave 2.29.2c",
    description:
      "Erik går 30 km på ski. Han går i gjennomsnitt 0.2 km på 1 minutt. Les av på grafen hvor langt han har igjen etter 100 minutter (x = 100).",
    answer: "10km",
    placeholder: "\\placeholder[blank1]{}km",
    points: 50,
    category: { connect: { id: "cler3mpi9000108kxdzogagj4" } },
    prevTask: { connect: { id: "clevfdiq4000908mbd0qv5c1z" } },
  },

  // 2.29.3
  {
    id: "clevfkzsz000b08mbf9or0rue",
    title: "Oppgave 2.29.3a",
    description:
      "Johan strikker en genser. Han kjøper 560 g garn. Han bruker 40 g garn hver dag i x dager. Lag et funksjonsuttrykk math$G(x)& som viser hvor mye han har igjen etter x dager.",
    answer: "G(x)=560-40x",
    placeholder: "G(x)=\\placeholder[blank1]{}-\\placeholder[blank2]{}x",
    points: 100,
    category: { connect: { id: "cler3mpi9000108kxdzogagj4" } },
    prevTask: { connect: { id: "clevfj0kv000a08mbhcvqdijn" } },
  },
  {
    id: "clevfp5sx000c08mb22gahsk8",
    title: "Oppgave 2.29.3b",
    description:
      "Johan strikker en genser. Han kjøper 560 g garn. Han bruker 40 g garn hver dag i x dager. Tegn grafen for funksjonen når math$0<=x<=14&.",
    answer: "strikkegenser",
    hint: "FLAG",
    points: 75,
    category: { connect: { id: "cler3mpi9000108kxdzogagj4" } },
    prevTask: { connect: { id: "clevfj0kv000a08mbhcvqdijn" } },
  },
  {
    id: "clevfpbdl000d08mbekze7ze3",
    title: "Oppgave 2.29.3c",
    description:
      "Johan strikker en genser. Han kjøper 560 g garn. Han bruker 40 g garn hver dag i x dager. Forklar hvorfor vi ikke bør bruke x-verdier høyere enn 14.",
    answer: "negativitet",
    hint: "FLAG",
    points: 75,
    category: { connect: { id: "cler3mpi9000108kxdzogagj4" } },
    prevTask: { connect: { id: "clevfp5sx000c08mb22gahsk8" } },
  },
  {
    id: "clevfpunn000e08mbac1f4y5w",
    title: "Oppgave 2.29.3d",
    description:
      "Johan strikker en genser. Han kjøper 560 g garn. Han bruker 40 g garn hver dag i x dager. Les av på grafen hvor mye han har igjen etter 5 dager.",
    answer: "360g",
    placeholder: "\\placeholder[blank1]{}g",
    points: 50,
    category: { connect: { id: "cler3mpi9000108kxdzogagj4" } },
    prevTask: { connect: { id: "clevfpbdl000d08mbekze7ze3" } },
  },
  {
    id: "clevfq1hw000f08mbdnq42xtq",
    title: "Oppgave 2.29.3e",
    description:
      "Johan strikker en genser. Han kjøper 560 g garn. Han bruker 40 g garn hver dag i x dager. Les av på grafen hvor mange dager det er gått når han har 100 g garn igjen. Skriv kun inn desimaltallet.",
    answer: "11.5",
    hint: "DECIMAL",
    points: 75,
    category: { connect: { id: "cler3mpi9000108kxdzogagj4" } },
    prevTask: { connect: { id: "clevfpunn000e08mbac1f4y5w" } },
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
