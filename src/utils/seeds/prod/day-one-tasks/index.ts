import type { Prisma, PrismaClient } from "@prisma/client";
import { differenceInSeconds } from "date-fns";

const providedTasks: Prisma.TaskCreateInput[] = [
  // Lineære funksjoner
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

  // Funksjon og graf
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
      "Erik går 30 km på ski. Han går i gjennomsnitt 0.2 km på 1 minutt. Tegn grafen for funksjonen når math$0 \\leqq x \\leqq 150&.",
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
      "Johan strikker en genser. Han kjøper 560 g garn. Han bruker 40 g garn hver dag i x dager. Tegn grafen for funksjonen når math$0 \\leqq x \\leqq 14&.",
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

  // 2.30.1
  {
    id: "clewljxef000008mo1nd7ga92",
    title: "Oppgave 2.30.1a",
    description:
      "Emma bruker 300 kWh (kilowattimer) strøm i uka. Lag et funksjonsuttrykk math$S(x)& som viser hvor mye strøm hun bruker på x uker.",
    answer: "S(x)=300x",
    points: 100,
    placeholder: "S(x)=\\placeholder[blank1]{}\\placeholder[blank2]{}x",
    category: { connect: { id: "cler3mpi9000108kxdzogagj4" } },
  },
  {
    id: "clewlwc3k000208l760wqfvcd",
    title: "Oppgave 2.30.1b",
    description:
      "Emma bruker 300 kWh (kilowattimer) strøm i uka. Tegn grafen til funksjonen.",
    answer: "billig-strøm",
    hint: "FLAG",
    points: 75,
    category: { connect: { id: "cler3mpi9000108kxdzogagj4" } },
    prevTask: { connect: { id: "clewljxef000008mo1nd7ga92" } },
  },
  {
    id: "clewlyvwc000308l744kzhkpy",
    title: "Oppgave 2.30.1b",
    description:
      "Emma bruker 300 kWh (kilowattimer) strøm i uka. Les av på grafen hvor mange kilowattimer Emma har brukt etter 52 uker (x = 52).",
    answer: "15600kWh",
    placeholder: "\\placeholder[blank1]{}kWh",
    points: 75,
    category: { connect: { id: "cler3mpi9000108kxdzogagj4" } },
    prevTask: { connect: { id: "clewlwc3k000208l760wqfvcd" } },
  },
  // 2.30.2
  {
    id: "clewm2gt2000408l77tgia843",
    title: "Oppgave 2.30.2a",
    description:
      "En elbil har en batterikapasistet på 81 kWh (kilowattimer). Den bruker 1.8 kWh per mil. Lag et funksjonsuttrykk math$E(x)& som viser hvor stor kapasitet det er igjen etter x mil.",
    answer: "E(x)=81-1.8x",
    placeholder: "E(x)=\\placeholder[blank1]{}-\\placeholder[blank2]{}x",
    points: 100,
    category: { connect: { id: "cler3mpi9000108kxdzogagj4" } },
    prevTask: { connect: { id: "clewlyvwc000308l744kzhkpy" } },
  },
  {
    id: "clewm5rce000508l73bjf72bn",
    title: "Oppgave 2.30.2b",
    description:
      "En elbil har en batterikapasistet på 81 kWh (kilowattimer). Den bruker 1.8 kWh per mil. Tegn grafen til funksjonen når math$0 \\leqq x \\leqq 45$.",
    answer: "elbil",
    hint: "FLAG",
    points: 75,
    category: { connect: { id: "cler3mpi9000108kxdzogagj4" } },
    prevTask: { connect: { id: "clewm2gt2000408l77tgia843" } },
  },
  {
    id: "clewmavx7000b08l7btdc1de8",
    title: "Oppgave 2.30.2c",
    description:
      "En elbil har en batterikapasistet på 81 kWh (kilowattimer). Den bruker 1.8 kWh per mil. Les av på grafen hvor mange mil bilen har kjørt når det er 20% strøm igjen på batteriet.",
    answer: "36mil",
    placeholder: "\\placeholder[blank1]{}mil",
    points: 50,
    category: { connect: { id: "cler3mpi9000108kxdzogagj4" } },
    prevTask: { connect: { id: "clewm5rce000508l73bjf72bn" } },
  },
  {
    id: "clewm8pxt000a08l7ct9m78ad",
    title: "Oppgave 2.30.2d",
    description:
      "En elbil har en batterikapasistet på 81 kWh (kilowattimer). Den bruker 1.8 kWh per mil. Hva er maksimal kjørelengde med et forbruk på 1.8 kWh per mil?",
    answer: "45mil",
    placeholder: "\\placeholder[blank1]{}mil",
    points: 75,
    category: { connect: { id: "cler3mpi9000108kxdzogagj4" } },
    prevTask: { connect: { id: "clewmavx7000b08l7btdc1de8" } },
  },
  // 2.30.3
  {
    id: "clewme1gg000c08l7akvwgs31",
    title: "Oppgave 2.30.3a",
    description:
      "I en kommune med 60 000 innbyggere skulle 90% av innbyggerne vaksineres mot covid-19. I gjennomsnitt ble det vaksinert 1500 personer hver uke. Lag et funksjonsuttrykk math$C(x)& som viser hvor mange som ikke var vaksinert etter x uker.",
    answer: "C(x)=54000-1500x",
    placeholder: "C(x)=\\placeholder[blank1]{}-\\placeholder[blank2]{}x",
    points: 100,
    category: { connect: { id: "cler3mpi9000108kxdzogagj4" } },
    prevTask: { connect: { id: "clewm8pxt000a08l7ct9m78ad" } },
  },
  {
    id: "clewmewcd000d08l74rmb7a50",
    title: "Oppgave 2.30.3b",
    description:
      "I en kommune med 60 000 innbyggere skulle 90% av innbyggerne vaksineres mot covid-19. I gjennomsnitt ble det vaksinert 1500 personer hver uke. Tegn grafen til funksjonen når math$0 \\leqq x \\leqq 36&.",
    answer: "vaksine",
    hint: "FLAG",
    points: 75,
    category: { connect: { id: "cler3mpi9000108kxdzogagj4" } },
    prevTask: { connect: { id: "clewme1gg000c08l7akvwgs31" } },
  },
  {
    id: "clewmf0e2000e08l76iyq8ieo",
    title: "Oppgave 2.30.3c",
    description:
      "I en kommune med 60 000 innbyggere skulle 90% av innbyggerne vaksineres mot covid-19. I gjennomsnitt ble det vaksinert 1500 personer hver uke. Les av på grafen hvor mange som ikke var vaksinert etter 20 uker. Oppgi bare tallet.",
    answer: "24000",
    points: 50,
    category: { connect: { id: "cler3mpi9000108kxdzogagj4" } },
    prevTask: { connect: { id: "clewmewcd000d08l74rmb7a50" } },
  },
  {
    id: "clewmf68a000f08l71vqpevc5",
    title: "Oppgave 2.30.3d",
    description:
      "I en kommune med 60 000 innbyggere skulle 90% av innbyggerne vaksineres mot covid-19. I gjennomsnitt ble det vaksinert 1500 personer hver uke. Les av på grafen hvor mange uker som var gått når det var 21 000 personer igjen å vaksinere.",
    answer: "22uker",
    placeholder: "\\placeholder[blank1]{}uker",
    points: 75,
    category: { connect: { id: "cler3mpi9000108kxdzogagj4" } },
    prevTask: { connect: { id: "clewmf0e2000e08l76iyq8ieo" } },
  },

  // Brøkfunksjoner
  // 2.31
  {
    id: "clewmu5ym000008mb82ry4uek",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.31.png",
    title: "Oppgave 2.31a1",
    description:
      "Klassen din skal arrangere en trinfest. De leier lys- og musikkanlegg for 2000kr. Utgiftene skal fordeles likt på festdeltagerne. Hva er prisen per deltaker når det er 10 deltakere? Oppgi bare tallet.",
    answer: "200",
    points: 50,
    category: { connect: { id: "cler3o0ps000208kxhg7u2v0n" } },
  },
  {
    id: "clewn0n45000108mb3gd3ammn",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.31.png",
    title: "Oppgave 2.31a2",
    description:
      "Klassen din skal arrangere en trinfest. De leier lys- og musikkanlegg for 2000kr. Utgiftene skal fordeles likt på festdeltagerne. Hva er prisen per deltaker når det er 20 deltakere? Oppgi bare tallet.",
    answer: "100",
    points: 50,
    category: { connect: { id: "cler3o0ps000208kxhg7u2v0n" } },
    prevTask: { connect: { id: "clewmu5ym000008mb82ry4uek" } },
  },
  {
    id: "clewn2mft000208mbht422lua",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.31.png",
    title: "Oppgave 2.31b",
    description:
      "lassen din skal arrangere en trinfest. De leier lys- og musikkanlegg for 2000kr. Utgiftene skal fordeles likt på festdeltagerne. Forklar hvorfor prisen per deltaker går ned i samme forhold osm antall deltakere øker.",
    answer: "party",
    hint: "FLAG",
    points: 75,
    category: { connect: { id: "cler3o0ps000208kxhg7u2v0n" } },
    prevTask: { connect: { id: "clewn0n45000108mb3gd3ammn" } },
  },
  {
    id: "clewn8670000308mb67ub5aky",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.31.png",
    title: "Oppgave 2.31c",
    description:
      "Klassen din skal arrangere en trinfest. De leier lys- og musikkanlegg for 2000kr. Utgiftene skal fordeles likt på festdeltagerne. Lag et funksjonsuttrykk math$U(x)& som beskriver sammenhengen mellom utgiftene U og x antall deltakere.",
    answer: "U(x)=\\frac{2000}{x}",
    placeholder: "U(x)=\\placeholder[blank1]{}",
    points: 125,
    category: { connect: { id: "cler3o0ps000208kxhg7u2v0n" } },
    prevTask: { connect: { id: "clewn2mft000208mbht422lua" } },
  },

  // 2.32
  {
    id: "clewno9ik000808mbfbokhf29",
    title: "Oppgave 2.32.1",
    description:
      "Prisen for å leie en hytte i Lofoten skal deles likt mellom x antall venner. Det koster totalt 5400 kr å leie hytta. Finn en brøkfunksjon som beskriver situasjonen.",
    answer: "f(x)=\\frac{5400}{x}",
    placeholder: "f(x)=\\placeholder[blank1]{}",
    points: 50,
    category: { connect: { id: "cler3o0ps000208kxhg7u2v0n" } },
  },
  {
    id: "clewnwvoe000008mo9bwq7xb0",
    title: "Oppgave 2.32.2",
    description:
      "På en hvalsafaritur må hver person betale 450 kr. I tillegg skal leiekostnadene på 4800 kr for båten fordeles på x antall personer. Finn en brøkfunksjon som beskriver situasjonen.",
    answer: "f(x)=\\frac{4800}{x}+450",
    placeholder: "f(x)=\\placeholder[blank1]{}",
    points: 75,
    category: { connect: { id: "cler3o0ps000208kxhg7u2v0n" } },
    prevTask: { connect: { id: "clewno9ik000808mbfbokhf29" } },
  },
  {
    id: "clewo2rzg000108moegzobp6e",
    title: "Oppgave 2.32.3",
    description:
      "Noen venner skal leie en hytte i Lofoten til 5400 kr, og de skal på hvalsafari hvor leie av båten koster 4800 kr. I tillegg skal guiden ha 450 kr per person. Finn en brøkfunksjon som beskriver situasjonen.",
    answer: "f(x)=450+\\frac{10200}{x}",
    placeholder: "f(x)=\\placeholder[blank1]{}",
    points: 100,
    category: { connect: { id: "cler3o0ps000208kxhg7u2v0n" } },
    prevTask: { connect: { id: "clewnwvoe000008mo9bwq7xb0" } },
  },

  // 2.33
  {
    id: "clewojnu6000008jt5kr451f7",
    title: "Oppgave 2.33a",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.33.png",
    description:
      "Mona skal kjøre en strekning på 40 km. Grafen viser sammenhengen mellom farten og tiden hun bruker. Bruk grafen når du svarer på spørsmålene. Hva har farten vært hvis hun bruker 0.8 time på 40 km? Oppgi bare tallet i km/h.",
    answer: "50",
    points: 50,
    category: { connect: { id: "cler3o0ps000208kxhg7u2v0n" } },
  },
  {
    id: "clewoliha000108jtetig4gbv",
    title: "Oppgave 2.33b",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.33.png",
    description:
      "Mona skal kjøre en strekning på 40 km. Grafen viser sammenhengen mellom farten og tiden hun bruker. Bruk grafen når du svarer på spørsmålene. Omtrent hva har farten vært hvis hun bruker 1 time og 30 minutter? Oppgi bare tallet i km/h.",
    answer: "26.7",
    hint: "DECIMAL",
    points: 50,
    category: { connect: { id: "cler3o0ps000208kxhg7u2v0n" } },
    prevTask: { connect: { id: "clewojnu6000008jt5kr451f7" } },
  },
  {
    id: "clewolm0m000208jth2k2b10v",
    title: "Oppgave 2.33c",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.33.png",
    description:
      "Mona skal kjøre en strekning på 40 km. Grafen viser sammenhengen mellom farten og tiden hun bruker. Bruk grafen når du svarer på spørsmålene. Hvor lang tid bruker hun hvis farten er 20 km/h? Oppgi bare tallet i timer.",
    answer: "2",
    points: 50,
    category: { connect: { id: "cler3o0ps000208kxhg7u2v0n" } },
    prevTask: { connect: { id: "clewoliha000108jtetig4gbv" } },
  },
  {
    id: "clewolqbf000308jt5cdb1sqk",
    title: "Oppgave 2.33d",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.33.png",
    description:
      "Mona skal kjøre en strekning på 40 km. Grafen viser sammenhengen mellom farten og tiden hun bruker. Bruk grafen når du svarer på spørsmålene. Omtrent hvor mange minutter bruker hun hvis farten er 50 km/h? Oppgi bare tallet i minutter.",
    answer: "48",
    points: 50,
    category: { connect: { id: "cler3o0ps000208kxhg7u2v0n" } },
    prevTask: { connect: { id: "clewolm0m000208jth2k2b10v" } },
  },

  // Oppgave 2.34
  {
    id: "clewp0hbe000008l5hqi8flea",
    title: "Oppgave 2.34a",
    description:
      "Funksjonsuttrykket math$U(x)=\\frac{9000}{x}& viser utgiftene U som hver elev har når det reiser x antall elever på klassetur til Trondheim. Tegn grafen til funksjonen math$U(x)& når math$50 \\leqq x \\leqq 100&.",
    answer: "klassetur",
    hint: "FLAG",
    points: 50,
    category: { connect: { id: "cler3o0ps000208kxhg7u2v0n" } },
  },
  {
    id: "clewp4gec000108l54xgp73to",
    title: "Oppgave 2.34b",
    description:
      "Funksjonsuttrykket math$U(x)=\\frac{9000}{x}& viser utgiftene U som hver elev har når det reiser x antall elever på klassetur til Trondheim. Bestem grafisk hva prisen per elev blir når det er 75 elever som drar. Oppgi bare tallet i kroner.",
    answer: "120",
    points: 75,
    category: { connect: { id: "cler3o0ps000208kxhg7u2v0n" } },
    prevTask: { connect: { id: "clewp0hbe000008l5hqi8flea" } },
  },
  {
    id: "clewp6op7000208l514w07ezb",
    title: "Oppgave 2.34c",
    description:
      "Funksjonsuttrykket math$U(x)=\\frac{9000}{x}& viser utgiftene U som hver elev har når det reiser x antall elever på klassetur til Trondheim. Bestem grafisk hvor mange elever som drar når prisen per elev blir 150 kr.",
    answer: "60",
    points: 75,
    category: { connect: { id: "cler3o0ps000208kxhg7u2v0n" } },
    prevTask: { connect: { id: "clewp4gec000108l54xgp73to" } },
  },

  // Oppgave 2.35.1
  {
    id: "clewp9amz000308l576y1e7hx",
    title: "Oppgave 2.35.1",
    description:
      "En syklist skal sykle en strekning på 36 km. Farten er F km/h, og tiden hun bruker, er x timer. Vi får dette funksjonsuttrykket for farten: math$F(x)=\\frac{36}{x}&. Tegn grafen til funksjonen math$F(x)& med en graftegner. Hvor stor er farten hvis syklisten bruker 3 timer? Oppgi bare tallet i km/h.",
    answer: "12",
    points: 100,
    category: { connect: { id: "cler3o0ps000208kxhg7u2v0n" } },
  },

  // Oppgave 2.35.2
  {
    id: "clewpdqux000408l591xp5a7k",
    title: "Oppgave 2.35.2a",
    description:
      "Marita leier en sykkel. Hun avtaler en leiepris på 2800 kr og kan da leie den i inntil 10 døgn. Sett opp et funksjonsuttrykk math$P(x)& som viser prisen P per døgn når du leier sykkelen i x døgn.",
    answer: "P(x)=\\frac{2800}{x}",
    placeholder: "P(x)=\\frac{}",
    points: 50,
    category: { connect: { id: "cler3o0ps000208kxhg7u2v0n" } },
    prevTask: { connect: { id: "clewp9amz000308l576y1e7hx" } },
  },
  {
    id: "clewpuivy000108l73aki8v6q",
    title: "Oppgave 2.35.2b",
    description:
      "Marita leier en sykkel. Hun avtaler en leiepris på 2800 kr og kan da leie den i inntil 10 døgn. Tegn grafen til funksjonen P(x) når math$1 \\leqq x \\leqq 10&.",
    answer: "sykkel",
    hint: "FLAG",
    points: 50,
    category: { connect: { id: "cler3o0ps000208kxhg7u2v0n" } },
    prevTask: { connect: { id: "clewpdqux000408l591xp5a7k" } },
  },
  {
    id: "clewpwiix000008l1e0d6ae7b",
    title: "Oppgave 2.35.2c",
    description:
      "Marita leier en sykkel. Hun avtaler en leiepris på 2800 kr og kan da leie den i inntil 10 døgn. Bestem grafisk hvor mange døgn sykkelen er leid når prisen per dgn blir 560 kr. Oppgi bare tallet i døgn.",
    answer: "5",
    points: 75,
    category: { connect: { id: "cler3o0ps000208kxhg7u2v0n" } },
    prevTask: { connect: { id: "clewpuivy000108l73aki8v6q" } },
  },

  // Oppgave 2.35.3
  {
    id: "clewpyp43000108l15towbx03",
    title: "Oppgave 2.35.3a",
    description:
      "En elektrisk sparkesykkel koster 15kr i startpris og 2kr per minutt. Sett opp et funksjonsuttrykk som viser leieprisen K i kroner når du bruker sykkelen i x minutter. ",
    answer: "K(x)=2x+15",
    placeholder: "K(x)=\\placeholder[blank1]{}",
    points: 75,
    category: { connect: { id: "cler3o0ps000208kxhg7u2v0n" } },
    prevTask: { connect: { id: "clewpwiix000008l1e0d6ae7b" } },
  },
  {
    id: "clewq42h5000208l18cay5iq7",
    title: "Oppgave 2.35.3b",
    description:
      "En elektrisk sparkesykkel koster 15kr i startpris og 2kr per minutt. Sett opp et funksjonsuttrykk P(x) som viser prisen P per minutt i kroner når du bruker sykkelen i x minutter.",
    answer: "P(x)=2+\\frac{15}{x}",
    placeholder: "P(x)=\\placeholder[blank1]{}",
    points: 75,
    category: { connect: { id: "cler3o0ps000208kxhg7u2v0n" } },
    prevTask: { connect: { id: "clewpyp43000108l15towbx03" } },
  },
  {
    id: "clewq4c52000308l1cfsz6o8h",
    title: "Oppgave 2.35.3c",
    description:
      "En elektrisk sparkesykkel koster 15kr i startpris og 2kr per minutt. Tegn grafen til funksjonen P(x) når math$1 \\leqq x \\leqq 30&.",
    answer: "sparkesykkel",
    hint: "FLAG",
    points: 75,
    category: { connect: { id: "cler3o0ps000208kxhg7u2v0n" } },
    prevTask: { connect: { id: "clewq42h5000208l18cay5iq7" } },
  },
  {
    id: "clewq66lw000408l1dpov2a7z",
    title: "Oppgave 2.35.3d",
    description:
      "En elektrisk sparkesykkel koster 15kr i startpris og 2kr per minutt. Bestem grafisk hva prisen per minutt blir hvis sykkelen leies i 2 minutter. Oppgi bare tallet i kroner.",
    answer: "9.5",
    hint: "DECIMAL",
    points: 75,
    category: { connect: { id: "cler3o0ps000208kxhg7u2v0n" } },
    prevTask: { connect: { id: "clewq4c52000308l1cfsz6o8h" } },
  },

  // Oppgave 2.36.1
  {
    id: "clewq9n54000608l1d1obd6b9",
    title: "Oppgave 2.36.1b",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.36.1.png",
    description:
      "Et rektangel har arealet math$24 cm^2&. Bredden er x cm, og lengden er l cm. Sammenhengen mellom lengden og bredden kan uttrykkes slik math$l(x)=\\frac{24}{x}&. Tegn grafen. Les av på grafen hvor stor bredden er når lengden er 6cm. Oppgi bare tallet i cm.",
    answer: "4",
    points: 50,
    category: { connect: { id: "cler3o0ps000208kxhg7u2v0n" } },
  },
  {
    id: "clewqf4cx000h08l1azyy49xn",
    title: "Oppgave 2.36.1c",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.36.1.png",
    description:
      "Et rektangel har arealet math$24 cm^2&. Bredden er x cm, og lengden er l cm. Sammenhengen mellom lengden og bredden kan uttrykkes slik math$l(x)=\\frac{24}{x}&. Les av på grafen hvor stor lengden er når bredden er 10cm. Oppgi bare tallet i cm.",
    answer: "2.4",
    hint: "DECIMAL",
    points: 50,
    category: { connect: { id: "cler3o0ps000208kxhg7u2v0n" } },
    prevTask: { connect: { id: "clewq9n54000608l1d1obd6b9" } },
  },

  // Oppgave 2.36.2
  {
    id: "clewqh187000i08l1gek4f3fl",
    title: "Oppgave 2.36.2a",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.36.2.png",
    description:
      "Et rektangel har et areal på math$100 cm^2&. Sidene er b og x + 5 lange. Funksjonsuttrykket math$b(x)=\\frac{100}{x+5}& beskriver sammenhengen mellom de to sidene når arealet er math$100 cm^2&. Tegn grafen til funksjonen for math$0 \\leqq x \\leqq 30&",
    answer: "rektangel",
    hint: "FLAG",
    points: 75,
    category: { connect: { id: "cler3o0ps000208kxhg7u2v0n" } },
    prevTask: { connect: { id: "clewqf4cx000h08l1azyy49xn" } },
  },
  {
    id: "clewqn3o8000j08l1758fehy4",
    title: "Oppgave 2.36.2b",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.36.2.png",
    description:
      "Et rektangel har et areal på math$100 cm^2&. Sidene er b og x + 5 lange. Funksjonsuttrykket math$b(x)=\\frac{100}{x+5}& beskriver sammenhengen mellom de to sidene når arealet er math$100 cm^2&. Bruk grafen til å finne bredden av b når x = 5. Oppgi bare tallet i cm.",
    answer: "10",
    points: 75,
    category: { connect: { id: "cler3o0ps000208kxhg7u2v0n" } },
    prevTask: { connect: { id: "clewqh187000i08l1gek4f3fl" } },
  },
  {
    id: "clewqn949000k08l12u7v40nd",
    title: "Oppgave 2.36.2c",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.36.2.png",
    description:
      "Et rektangel har et areal på math$100 cm^2&. Sidene er b og x + 5 lange. Funksjonsuttrykket math$b(x)=\\frac{100}{x+5}& beskriver sammenhengen mellom de to sidene når arealet er math$100 cm^2&. Bruk grafen til å finne lengden av x når b = 4. Oppgi bare tallet i cm.",
    answer: "20",
    points: 75,
    category: { connect: { id: "cler3o0ps000208kxhg7u2v0n" } },
    prevTask: { connect: { id: "clewqn3o8000j08l1758fehy4" } },
  },

  // Oppgave 2.36.3
  {
    id: "clewqpczn000l08l1dpzhev3v",
    title: "Oppgave 2.36.3a",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.36.3.png",
    description:
      "Et rektangel har et areal på math$60 cm^2&. Sidene er b og x - 1 lange. Finn et uttrykk b(x) der bredden er b cm, arealet er math$60 cm^2& og lengden er (x - 1) cm.",
    answer: "b(x)=\\frac{60}{x-1}",
    placeholder: "b(x)=\\placeholder[blank1]{}",
    points: 100,
    category: { connect: { id: "cler3o0ps000208kxhg7u2v0n" } },
    prevTask: { connect: { id: "clewqn949000k08l12u7v40nd" } },
  },
  {
    id: "clewqtcvv000m08l18nhih0lf",
    title: "Oppgave 2.36.3b",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.36.3.png",
    description:
      "Et rektangel har et areal på math$60 cm^2&. Sidene er b og x - 1 lange. Tegn grafen til funksjonen for math$2 \\leqq x \\leqq 30&.",
    answer: "sirkel",
    hint: "FLAG",
    points: 100,
    category: { connect: { id: "cler3o0ps000208kxhg7u2v0n" } },
    prevTask: { connect: { id: "clewqpczn000l08l1dpzhev3v" } },
  },
  {
    id: "clewqvrfz000n08l13783ee2x",
    title: "Oppgave 2.36.3c",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.36.3.png",
    description:
      "Et rektangel har et areal på math$60 cm^2&. Sidene er b og x - 1 lange. Hvorfor kan ikke x være lik 1?",
    answer: "ulovlig",
    hint: "FLAG",
    points: 100,
    category: { connect: { id: "cler3o0ps000208kxhg7u2v0n" } },
    prevTask: { connect: { id: "clewqtcvv000m08l18nhih0lf" } },
  },
  {
    id: "clewqy73t000o08l1flmufptk",
    title: "Oppgave 2.36.3d",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.36.3.png",
    description:
      "Et rektangel har et areal på math$60 cm^2&. Sidene er b og x - 1 lange. Bruk grafen til å finne lengden av bredden b når x = 10. Oppgi bare tallet i cm.",
    answer: "6.67",
    hint: "DECIMAL",
    points: 100,
    category: { connect: { id: "cler3o0ps000208kxhg7u2v0n" } },
    prevTask: { connect: { id: "clewqvrfz000n08l13783ee2x" } },
  },
  {
    id: "clewr071w000p08l1d65871kh",
    title: "Oppgave 2.36.3e",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.36.3.png",
    description:
      "Et rektangel har et areal på math$60 cm^2&. Sidene er b og x - 1 lange. Bruk grafen til å finne lengden av x når b = 20. Oppgi bare tallet i cm.",
    answer: "4",
    points: 100,
    category: { connect: { id: "cler3o0ps000208kxhg7u2v0n" } },
    prevTask: { connect: { id: "clewqy73t000o08l1flmufptk" } },
  },

  // Andregradsfunksjoner
  // Oppgave 2.37
  {
    id: "clewsm11n000008mlhanccb7i",
    title: "Oppgave 2.37.1",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.37.png",
    description:
      "Hvilken funksjon hører til figur I? Svar kun med stor bokstav.",
    answer: "C",
    points: 25,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
  },
  {
    id: "clewspj4o000108ml7wj3bs8l",
    title: "Oppgave 2.37.2",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.37.png",
    description:
      "Hvilken funksjon hører til figur II? Svar kun med stor bokstav.",
    answer: "A",
    points: 25,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
    prevTask: { connect: { id: "clewsm11n000008mlhanccb7i" } },
  },
  {
    id: "clewsplxo000208ml3uw23qdj",
    title: "Oppgave 2.37.3",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.37.png",
    description:
      "Hvilken funksjon hører til figur III? Svar kun med stor bokstav.",
    answer: "B",
    points: 25,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
    prevTask: { connect: { id: "clewspj4o000108ml7wj3bs8l" } },
  },

  // Oppgave 2.38
  {
    id: "clewsqmf0000308ml1m1h1xt6",
    title: "Oppgave 2.38.1",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.38.png",
    description:
      "Hvilken funksjon hører til figur I? Svar kun med stor bokstav.",
    answer: "C",
    points: 25,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
  },
  {
    id: "clewsss88000408mlbgvvdpyw",
    title: "Oppgave 2.38.2",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.38.png",
    description:
      "Hvilken funksjon hører til figur II? Svar kun med stor bokstav.",
    answer: "A",
    points: 25,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
    prevTask: { connect: { id: "clewsqmf0000308ml1m1h1xt6" } },
  },
  {
    id: "clewstf1x000508ml0k3lap09",
    title: "Oppgave 2.38.3",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.38.png",
    description:
      "Hvilken funksjon hører til figur III? Svar kun med stor bokstav.",
    answer: "B",
    points: 25,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
    prevTask: { connect: { id: "clewsss88000408mlbgvvdpyw" } },
  },

  // Oppgave 2.39
  {
    id: "clewsu4os000608mlhitdh6f8",
    title: "Oppgave 2.39a",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.39.png",
    description:
      "Grafen math$y=-2x^2+4.5& kan du se i koordinatsystemet. Hvilken verdi har y når x = 0?",
    answer: "y=4.5",
    placeholder: "y=\\placeholder[blank1]{}",
    points: 50,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
  },
  {
    id: "clewsyjlb000708mlbq5eha6o",
    title: "Oppgave 2.39b",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.39.png",
    description:
      "Grafen math$y=-2x^2+4.5& kan du se i koordinatsystemet. Omtrent hvilke verdier har x når y = 2.5?",
    answerType: "MULTIPLE_VALUES",
    answer: "x=1 \\lor x=-1",
    points: 50,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
    prevTask: { connect: { id: "clewsu4os000608mlhitdh6f8" } },
  },
  {
    id: "clewt2uiu000808ml8zv75uil",
    title: "Oppgave 2.39c",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.39.png",
    description:
      "Grafen math$y=-2x^2+4.5& kan du se i koordinatsystemet. Hva er koordinatene til grafens to skjæringspunkter med x-aksen?",
    answerType: "MULTIPLE_VALUES",
    placeholder:
      "(\\placeholder[blank1]{},\\placeholder[blank2]{}) \\land (\\placeholder[blank3]{},\\placeholder[blank4]{})}",
    hint: "DECIMAL",
    answer: "(-1.5,0) \\land (1.5,0)",
    points: 100,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
    prevTask: { connect: { id: "clewsyjlb000708mlbq5eha6o" } },
  },

  // Oppgave 2.40
  {
    id: "clewtb8qa000008l6et2gayj0",
    title: "Oppgave 2.40a",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.40.png",
    description:
      "Grafen math$y=x^2-1& kan du se i koordinatsystemet. Hvilken verdi har y når x = -1?",
    answer: "y=0",
    placeholder: "y=\\placeholder[blank1]{}",
    points: 50,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
  },
  {
    id: "clewtf3ag000008mbcdat29j8",
    title: "Oppgave 2.40b",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.40.png",
    description:
      "Grafen math$y=x^2-1& kan du se i koordinatsystemet. Hvilke verdier har x når y = 3?",
    answerType: "MULTIPLE_VALUES",
    answer: "x=2 \\lor x=-2",
    points: 50,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
    prevTask: { connect: { id: "clewtb8qa000008l6et2gayj0" } },
  },
  {
    id: "clewtfjr3000208mb5ok1f2ue",
    title: "Oppgave 2.40c",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.40.png",
    description:
      "Grafen math$y=x^2-1& kan du se i koordinatsystemet. Hva er koordinatene til grafens skjæringspunkt med y-aksen?",
    answer: "(0,-1)",
    placeholder: "(\\placeholder[blank1]{}, \\placeholder[blank2]{})",
    points: 75,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
    prevTask: { connect: { id: "clewtf3ag000008mbcdat29j8" } },
  },
  {
    id: "clewtfrvr000308mb7isz39em",
    title: "Oppgave 2.40d",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.40.png",
    description:
      "Grafen math$y=x^2-1& kan du se i koordinatsystemet. Hva er koordinatene til grafens skjæringspunkter med x-aksen?",
    answerType: "MULTIPLE_VALUES",
    placeholder:
      "(\\placeholder[blank1]{},\\placeholder[blank2]{}) \\land (\\placeholder[blank3]{},\\placeholder[blank4]{})}",
    answer: "(1,0) \\land (-1,0)",
    points: 75,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
    prevTask: { connect: { id: "clewtfjr3000208mb5ok1f2ue" } },
  },

  // Oppave 2.41
  {
    id: "clewtvo1c000008mkcnw297qy",
    title: "Oppgave 2.41.1",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.41.png",
    description:
      "Tegningen viser arealet av et område med faste og variable størrelser. Hva blir arealet av hele området hvis x = 6?",
    answer: "41",
    points: 50,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
  },
  {
    id: "clewtz1nw000208mk0nfr72gi",
    title: "Oppgave 2.41.2a",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.41.png",
    description:
      "Skriv et regnestykke som viser arealet av det kvadratiske området. Bruk * som gange-tegn.",
    answer: "3\\cdot3",
    points: 75,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
    prevTask: { connect: { id: "clewtvo1c000008mkcnw297qy" } },
  },
  {
    id: "clewu1mqo000408mk0urrcgg6",
    title: "Oppgave 2.41.2b",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.41.png",
    description:
      "Skriv et regnestykke som viser arealet av det rektangulære området.",
    placeholder: "(\\placeholder[blank1]{})\\cdot(\\placeholder[blank2]{})",
    answer: "(x+2)\\cdot(x-2)",
    points: 75,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
    prevTask: { connect: { id: "clewtz1nw000208mk0nfr72gi" } },
  },
  {
    id: "clewtz4zx000308mk84p0gont",
    title: "Oppgave 2.41.3",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.41.png",
    description:
      "Finn et uttrykk for arealet av hele området uttrykt så enkelt som mulig.",
    answer: "x^2+5",
    points: 100,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
    prevTask: { connect: { id: "clewu1mqo000408mk0urrcgg6" } },
  },

  // Oppgave 2.42.1
  {
    id: "clewum441000008ml2s1hb9bg",
    title: "Oppgave 2.42.1a",
    description:
      "I en bakteriekoloni er det flere tusen bakterier. Etter at kolonien har vokst i x minutter, er antallet bakterier B målt i tusen, B(x) er gitt ved funksjonsuttrykket math$B(x)=6x^2&. Tegn grafen til funksjonen.",
    answer: "bakterier",
    hint: "FLAG",
    points: 50,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
  },
  {
    id: "clewup7s1000108mlerrv1vud",
    title: "Oppgave 2.42.1b",
    description:
      "I en bakteriekoloni er det flere tusen bakterier. Etter at kolonien har vokst i x minutter, er antallet bakterier B målt i tusen, B(x) er gitt ved funksjonsuttrykket math$B(x)=6x^2&. Hvor mange bakterier er det etter 1 minutt?",
    answer: "6000",
    points: 75,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
    prevTask: { connect: { id: "clewum441000008ml2s1hb9bg" } },
  },

  // Oppgave 2.42.2
  {
    id: "clewusyqk000208ml3acadf8o",
    title: "Oppgave 2.42.2a",
    description:
      "I en bakteriekoloni er det flere tusen bakterier. Etter at kolonien har vokst i x minutter, er antallet bakterier B målt i tusen, B(x) er gitt ved funksjonsuttrykket math$B(x)=6x^2&. Tegn grafen til funksjonen når math$0 \\leqq x \\leqq 4&.",
    answer: "hallo",
    hint: "FLAG",
    points: 75,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
    prevTask: { connect: { id: "clewup7s1000108mlerrv1vud" } },
  },
  {
    id: "clewut8e1000308mla7k07z1a",
    title: "Opppgave 2.42.2b",
    description:
      "I en bakteriekoloni er det flere tusen bakterier. Etter at kolonien har vokst i x minutter, er antallet bakterier B målt i tusen, B(x) er gitt ved funksjonsuttrykket math$B(x)=6x^2&. Hvor mange bakterier er det etter 2 minutter?",
    answer: "24000",
    points: 75,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
    prevTask: { connect: { id: "clewusyqk000208ml3acadf8o" } },
  },

  // Oppgave 2.42.3
  {
    id: "clewutf2c000408ml72zs71v5",
    title: "Opppgave 2.42.3b",
    description:
      "I en bakteriekoloni er det flere tusen bakterier. Etter at kolonien har vokst i x minutter, er antallet bakterier B målt i tusen, B(x) er gitt ved funksjonsuttrykket math$B(x)=6x^2&. Tegn grafen til funksjonen når math$0 \\leqq x \\leqq 30&.",
    answer: "koloni",
    hint: "FLAG",
    points: 75,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
    prevTask: { connect: { id: "clewut8e1000308mla7k07z1a" } },
  },
  {
    id: "clewutmbg000508ml2jr4dl1b",
    title: "Opppgave 2.42.3c",
    description:
      "I en bakteriekoloni er det flere tusen bakterier. Etter at kolonien har vokst i x minutter, er antallet bakterier B målt i tusen, B(x) er gitt ved funksjonsuttrykket math$B(x)=6x^2&. Hvor mange minutter har det gått når det er 3 750 000 bakterier i kolonien? Oppgi bare tallet i minutter.",
    answer: "25",
    points: 100,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
    prevTask: { connect: { id: "clewutf2c000408ml72zs71v5" } },
  },

  // Oppgave 2.43.1
  {
    id: "clewvci2k000008l3b1h81qj6",
    title: "Oppgave 2.43.1a",
    description:
      "Funksjonsuttrykket math$K(x)=-0.3x^2+6x& beskriver banen til en kule som skytes med stor fart opp i lufta. K er høyde over bakken i kilometer, og x er antall sekunder etter oppskytingen. Tegn grafen til funksjonen.",
    answer: "kule",
    hint: "FLAG",
    points: 50,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
  },
  {
    id: "clewvffa2000108l3cs8jalew",
    title: "Oppgave 2.43.1b",
    description:
      "Funksjonsuttrykket math$K(x)=-0.3x^2+6x& beskriver banen til en kule som skytes med stor fart opp i lufta. K er høyde over bakken i kilometer, og x er antall sekunder etter oppskytingen. Bruk grafen og finn ut hvor høyt over bakken kula var etter 10 sekunder. Oppgi bare tallet i km.",
    answer: "30",
    points: 50,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
    prevTask: { connect: { id: "clewvci2k000008l3b1h81qj6" } },
  },

  // Oppgave 2.43.2
  {
    id: "clewvjegd000208l37c5v57gr",
    title: "Oppgave 2.43.2a",
    description:
      "Funksjonsuttrykket math$K(x)=-0.3x^2+6x& beskriver banen til en kule som skytes med stor fart opp i lufta. K er høyde over bakken i kilometer, og x er antall sekunder etter oppskytingen. Tegn grafen til funksjonen når math$0 \\leqq x \\leqq 20&.",
    answer: "bane",
    hint: "FLAG",
    points: 50,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
    prevTask: { connect: { id: "clewvffa2000108l3cs8jalew" } },
  },
  {
    id: "clewvjj8m000308l3f0b71zyq",
    title: "Oppgave 2.43.2b",
    description:
      "Funksjonsuttrykket math$K(x)=-0.3x^2+6x& beskriver banen til en kule som skytes med stor fart opp i lufta. K er høyde over bakken i kilometer, og x er antall sekunder etter oppskytingen. Bruk grafen og finn ut hvor høyt over bakken kula var etter 5 sekunder. Oppgi bare tallet i km.",
    answer: "22.5",
    hint: "DECIMAL",
    points: 75,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
    prevTask: { connect: { id: "clewvjegd000208l37c5v57gr" } },
  },
  {
    id: "clewvjqoc000408l32bag6p32",
    title: "Oppgave 2.43.2c",
    description:
      "Funksjonsuttrykket math$K(x)=-0.3x^2+6x& beskriver banen til en kule som skytes med stor fart opp i lufta. K er høyde over bakken i kilometer, og x er antall sekunder etter oppskytingen. Etter hvilke to tider var kula 15 km over bakken? Oppgi bare tallet i sekunder.",
    placeholder: "\\placeholder[blank1]{}\\land\\placeholder[blank2]{}",
    answer: "2.9 \\land 17.1",
    hint: "DECIMAL",
    points: 75,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
    prevTask: { connect: { id: "clewvjj8m000308l3f0b71zyq" } },
  },

  // Oppgave 2.43.3
  {
    id: "clewvk6k4000508l36fhd4cv9",
    title: "Oppgave 2.43.3a",
    description:
      "Funksjonsuttrykket math$K(x)=-0.3x^2+6x& beskriver banen til en kule som skytes med stor fart opp i lufta. K er høyde over bakken i kilometer, og x er antall sekunder etter oppskytingen. Tegn grafen til funksjonen når math$0 \\leqq x \\leqq 20&.",
    answer: "sos",
    hint: "FLAG",
    points: 50,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
    prevTask: { connect: { id: "clewvjqoc000408l32bag6p32" } },
  },
  {
    id: "clewvkbx5000608l37qxr32b4",
    title: "Oppgave 2.43.3b",
    description:
      "Funksjonsuttrykket math$K(x)=-0.3x^2+6x& beskriver banen til en kule som skytes med stor fart opp i lufta. K er høyde over bakken i kilometer, og x er antall sekunder etter oppskytingen. Hvor lang tid var det gått når kula var 10 km over bakken? Oppgi svaret i sekunder med én desimal",
    answer: "1.8 \\land 18.2",
    placeholder: "\\placeholder[blank1]{}\\land\\placeholder[blank2]{}",
    hint: "DECIMAL",
    points: 75,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
    prevTask: { connect: { id: "clewvk6k4000508l36fhd4cv9" } },
  },
  {
    id: "clewvkj97000708l33zso1zb9",
    title: "Oppgave 2.43.3c",
    description:
      "Funksjonsuttrykket math$K(x)=-0.3x^2+6x& beskriver banen til en kule som skytes med stor fart opp i lufta. K er høyde over bakken i kilometer, og x er antall sekunder etter oppskytingen. Hvorfor kan vi ikke bruke x-verdier høyere enn 20?",
    answer: "kopp",
    hint: "FLAG",
    points: 100,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
    prevTask: { connect: { id: "clewvkbx5000608l37qxr32b4" } },
  },

  // Oppgave 2.44.1
  {
    id: "clewvz43u000008js74bs0buv",
    title: "Oppgave 2.44.1a",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.44.png",
    description: "Hva blir omkretsen av gårdsplassen hvis x = 5?",
    answer: "30m",
    placeholder: "\\placeholder[blank1]{}m",
    points: 50,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
  },
  {
    id: "cleww15s3000108jsebhvhmqg",
    title: "Oppgave 2.44.1b",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.44.png",
    description: "Hva blir arealet av gårdsplassen hvis x = 10?",
    answer: "150m^2",
    placeholder: "\\placeholder[blank1]{}m^2",
    points: 50,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
    prevTask: { connect: { id: "clewvz43u000008js74bs0buv" } },
  },

  // Oppgave 2.44.2
  {
    id: "cleww4b3u000208js5zn55c9k",
    title: "Oppgave 2.44.2a",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.44.png",
    description:
      "Lag et funksjonsuttrykk A(x) som viser arealet A av gårdsplassen.",
    answer: "A(x)=\\frac{3x^2}{2}",
    placeholder: "A(x)=\\placeholder[blank1]{}",
    points: 75,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
    prevTask: { connect: { id: "cleww15s3000108jsebhvhmqg" } },
  },
  {
    id: "cleww4mi1000308js7lkqcmdg",
    title: "Oppgave 2.44.2b",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.44.png",
    description: "Framstill funksjonen A(x) når math$4 \\leqq x \\leqq 12&.",
    answer: "carti",
    hint: "FLAG",
    points: 75,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
    prevTask: { connect: { id: "cleww4b3u000208js5zn55c9k" } },
  },

  // Oppgave 2.44.3
  {
    id: "cleww4sq0000408js2p453e3e",
    title: "Oppgave 2.44.3b",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.44.png",
    description:
      "Gitt funksjonen A(x) fra forrige oppgave. Hva blir arealet av gårdsplassen hvis x = 6m?",
    answer: "54m^2",
    placeholder: "\\placeholder[blank1]{}m^2",
    points: 100,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
    prevTask: { connect: { id: "cleww4mi1000308js7lkqcmdg" } },
  },
  {
    id: "cleww4zyc000508js8u779g9t",
    title: "Oppgave 2.44.3c",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/day-one-tasks/task-2.44.png",
    description:
      "Gitt funksjonen A(x) fra forrige oppgave. Hvilken verdi har x hvis arealet av gårdsplassen er math$96 m^2&?",
    answer: "8",
    points: 100,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
    prevTask: { connect: { id: "cleww4sq0000408js2p453e3e" } },
  },

  // Oppgave 2.45
  {
    id: "cleww56se000608jsbd4ofusk",
    title: "Oppgave 2.45b",
    description:
      "Tegn grafen math$y=x^2-4x& med en graftegner. For hvilke verdier blir y = 0?",
    answerType: "MULTIPLE_VALUES",
    answer: "x=0 \\lor x=4",
    points: 50,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
  },
  {
    id: "clewwkj3w000008js94zx8yqi",
    title: "Oppgave 2.45c",
    description:
      "Tegn grafen math$y=x^2-4x& med en graftegner. Hva blir y når x = 3?",
    answer: "y=-3",
    placeholder: "y=\\placeholder[blank1]{}",
    points: 50,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
    prevTask: { connect: { id: "cleww56se000608jsbd4ofusk" } },
  },

  // Oppgave 2.46.1
  {
    id: "clewx59sf000008mc2hdg4efn",
    title: "Oppgave 2.46.1",
    description:
      "Funksjonsuttrykket math$R(x)=-60x^2+300x& viser sammenhengen mellom høyde over bakken i kilometer og tid i minutter som en rakett bruker under oppskytning til den internasjonale romstasjonen (ISS), der R er høyde fra jorden i kilometer og x er tid i minutter. Finn grafens ekstremalpunkt.",
    answer: "(2.5,375)",
    placeholder: "(\\placeholder[blank1]{},\\placeholder[blank2]{})",
    points: 50,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
  },

  // Oppgave 2.46.2
  {
    id: "clewxdt37000008l97essfagl",
    title: "Oppgave 2.46.2",
    description:
      "Funksjonsuttrykket math$R(x)=-60x^2+300x& viser sammenhengen mellom høyde over bakken i kilometer og tid i minutter som en rakett bruker under oppskytning til den internasjonale romstasjonen (ISS), der R er høyde fra jorden i kilometer og x er tid i minutter. Tegn grafen til funksjonen R(x) når math$0 \\leqq x \\leqq 3& og en lineær graf fra startpunktet til grafens toppunkt. Ved hjelp av den lineære grafen, finn stigningstallet til grafen. Oppgi kun tallet.",
    answer: "150",
    points: 150,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
    prevTask: { connect: { id: "clewx59sf000008mc2hdg4efn" } },
  },

  // Oppgave 2.46.3
  {
    id: "clewxjrn3000108l9b38d9m54",
    title: "Oppgave 2.46.3a",
    description:
      "Funksjonsuttrykket math$R(x)=-60x^2+300x& viser sammenhengen mellom høyde over bakken i kilometer og tid i minutter som en rakett bruker under oppskytning til den internasjonale romstasjonen (ISS), der R er høyde fra jorden i kilometer og x er tid i minutter. Tegn grafen til funksjonen R(x) når math$0 \\leqq x \\leqq 3& og en lineær graf fra startpunktet til grafens toppunkt. Finn gjennomsnittsfarten til raketten. Oppgi kun tallet for km/min.",
    answer: "150",
    points: 150,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
    prevTask: { connect: { id: "clewx59sf000008mc2hdg4efn" } },
  },
  {
    id: "clewxjrn3000108l9b38d9m54",
    title: "Oppgave 2.46.3b",
    description:
      "Basert på forrige oppgave, uttrykk gjennomsnittsfarten i kilometer per time. Oppgi kun tallet for km/h.",
    answer: "9000",
    points: 100,
    category: { connect: { id: "cler3oqyo000308kxe2au80ds" } },
    prevTask: { connect: { id: "clewx59sf000008mc2hdg4efn" } },
  },
  // Oppgave 2.47.1
  // Oppgave 2.47.2
  // Oppgave 2.47.3
  // Oppgave 2.48
  {
    id: "clewy4key000008jr0buo3wv9",
    title: "Oppgave 2.48",
    description:
      "Ved hjelp av en graftegner, tegn grafen math$y=3^x&. Når x = 3, hva er y?",
    answer: "y=27",
    placeholder: "y=\\placeholder[blank1]{}",
    points: 50,
    category: { connect: { id: "cleebx9wi000508jt5ik9fgpx" } },
  },
  // Oppgave 2.49
  {
    id: "clewy8ggy000108jrdge450l4",
    title: "Oppgave 2.49a",
    description:
      "Ved hjelp av en graftegner, tegn grafen math$f(x)=1.2^x&. Hva er f(4)?",
    answer: "2.07",
    hint: "DECIMAL",
    points: 50,
    category: { connect: { id: "cleebx9wi000508jt5ik9fgpx" } },
    prevTask: { connect: { id: "clewy4key000008jr0buo3wv9" } },
  },
  {
    id: "clewyb9y3000208jrcc16av3p",
    title: "Oppgave 2.49b",
    description:
      "Ved hjelp av en graftegner, tegn grafen math$f(x)=1.2^x&. Hva er x når f(x) = 10?",
    answer: "x=8",
    placeholder: "x=\\placeholder[blank1]{}",
    points: 75,
    category: { connect: { id: "cleebx9wi000508jt5ik9fgpx" } },
    prevTask: { connect: { id: "clewy8ggy000108jrdge450l4" } },
  },

  // Oppgave 2.50
  {
    id: "clewycnb0000308jre07sgbj6",
    title: "Oppgave 2.50a",
    description:
      "Ved hjelp av en graftegner, tegn grafen math$y=20*0.8^x&. Hva er verdien av når x = 1.5?",
    answer: "14.31",
    hint: "DECIMAL",
    points: 75,
    category: { connect: { id: "cleebx9wi000508jt5ik9fgpx" } },
  },
  {
    id: "clewyfq1z000408jr41gvg2t0",
    title: "Oppgave 2.50b",
    description:
      "Ved hjelp av en graftegner, tegn grafen math$y=20*0.8^x&. Hva er x når verdien av funksjonen er 10?",
    answer: "x=3.11",
    placeholder: "x=\\placeholder[blank1]{}",
    hint: "DECIMAL",
    points: 100,
    category: { connect: { id: "cleebx9wi000508jt5ik9fgpx" } },
    prevTask: { connect: { id: "clewycnb0000308jre07sgbj6" } },
  },

  // Oppgave 2.51.1
  {
    id: "clex0zu0l000008l0csji7r9m",
    title: "Oppgave 2.51.1a",
    description:
      "Ved hjelp av en graftegner, tegn grafen math$f(x)=1.5^x&. Hva er f(2)?",
    answer: "2.25",
    hint: "DECIMAL",
    points: 50,
    category: { connect: { id: "cleebx9wi000508jt5ik9fgpx" } },
  },
  {
    id: "clex12yom000108l0aiud2mgw",
    title: "Oppgave 2.51.1b",
    description:
      "Ved hjelp av en graftegner, tegn grafen math$f(x)=1.5^x&. Hva er x når verdien av funksjonen er 5?",
    answer: "x=3.97",
    placeholder: "x=\\placeholder[blank1]{}",
    hint: "DECIMAL",
    points: 50,
    category: { connect: { id: "cleebx9wi000508jt5ik9fgpx" } },
    prevTask: { connect: { id: "clex0zu0l000008l0csji7r9m" } },
  },

  // Oppgave 2.51.2
  {
    id: "clex15vei000208l0heykfwnt",
    title: "Oppgave 2.51.2a",
    description:
      "Ved hjelp av en graftegner, tegn grafen math$f(x)=3 \\cdot 2^x& når math$-1 \\leqq x \\leqq 4&. Hva er f(0)?",
    answer: "3",
    points: 75,
    category: { connect: { id: "cleebx9wi000508jt5ik9fgpx" } },
    prevTask: { connect: { id: "clex12yom000108l0aiud2mgw" } },
  },
  {
    id: "clex12yom000108l0aiud2mgw",
    title: "Oppgave 2.51.2b",
    description:
      "Ved hjelp av en graftegner, tegn grafen math$f(x)=3 \\cdot 2^x& når math$-1 \\leqq x \\leqq 4&. Hva er x når verdien av funksjonen er 25?",
    answer: "x=3.06",
    placeholder: "x=\\placeholder[blank1]{}",
    hint: "DECIMAL",
    points: 75,
    category: { connect: { id: "cleebx9wi000508jt5ik9fgpx" } },
    prevTask: { connect: { id: "clex15vei000208l0heykfwnt" } },
  },

  // Oppgave 2.51.3
  {
    id: "clex1bsjp000308l0gv5m83ym",
    title: "Oppgave 2.51.3a",
    description:
      "Ved hjelp av en graftegner, tegn grafen math$f(x)=1200 \\cdot 1.05^x& når math$-5 \\leqq x \\leqq 30&. Hva er f(20)? Ta med alle desimaler.",
    answer: "3183.96",
    hint: "DECIMAL",
    points: 90,
    category: { connect: { id: "cleebx9wi000508jt5ik9fgpx" } },
    prevTask: { connect: { id: "clex12yom000108l0aiud2mgw" } },
  },
  {
    id: "clex1bwxa000408l078dk3vb7",
    title: "Oppgave 2.51.3b",
    description:
      "Ved hjelp av en graftegner, tegn grafen math$f(x)=1200 \\cdot 1.05^x& når math$-5 \\leqq x \\leqq 30&. Hva er x når verdien av funksjonen er 2000?",
    answer: "x=10.47",
    placeholder: "x=\\placeholder[blank1]{}",
    hint: "DECIMAL",
    points: 90,
    category: { connect: { id: "cleebx9wi000508jt5ik9fgpx" } },
    prevTask: { connect: { id: "clex1bsjp000308l0gv5m83ym" } },
  },

  // Oppgave 2.52.1
  {
    id: "clex1hlpt000608l0b4lvgu5g",
    title: "Oppgave 2.52.1",
    description:
      "I en kommune er folketallet 10 000. Det er beregnet en befolkningsøkning på 2% per år. Hva er folketallet beregnet til etter ett år? Oppgi bare tallet.",
    answer: "10200",
    points: 50,
    category: { connect: { id: "cleebx9wi000508jt5ik9fgpx" } },
  },

  // Oppgave 2.52.2
  {
    id: "clex1hrtt000708l0ehd25j2r",
    title: "Oppgave 2.52.2a",
    description:
      "I en kommune er folketallet 10 000. Det er beregnet en befolkningsøkning på 2% per år. Hva er folketallet beregnet til etter ett år? Finn et funksjonsuttrykk F(x) som viser folketallet F etter x år.",
    answer: "F(x)=10000 \\cdot 1.02^x",
    placeholder: "F(x)=\\placeholder[blank1]{}",
    hint: "DECIMAL",
    points: 75,
    category: { connect: { id: "cleebx9wi000508jt5ik9fgpx" } },
    prevTask: { connect: { id: "clex1hlpt000608l0b4lvgu5g" } },
  },
  {
    id: "clex1mfmf000808l0chinfqpy",
    title: "Oppgave 2.52.2b",
    description:
      "Ved hjelp av funksjonsuttrykket fra forrige oppgave, - hva er folketallet etter 8 år?",
    answer: "11716",
    points: 75,
    category: { connect: { id: "cleebx9wi000508jt5ik9fgpx" } },
    prevTask: { connect: { id: "clex1hrtt000708l0ehd25j2r" } },
  },

  // Oppgave 2.52.3
  {
    id: "clex1oa59000908l06h8l16dv",
    title: "Oppgave 2.52.3",
    description:
      "Gitt funksjonen math$F(x)=10000 \\cdot 1.02^x&, hva blir gjennomsnittlig veksthastighet for den lineære funksjonen som går gjennom punktene math$(0,10000)& og math$(10,12190)&? Oppgi bare tallet for innbyggere/år.",
    answer: "219",
    points: 150,
    category: { connect: { id: "cleebx9wi000508jt5ik9fgpx" } },
    prevTask: { connect: { id: "clex1mfmf000808l0chinfqpy" } },
  },

  // Oppgave 2.53.1
  {
    id: "clex1tg78000a08l09ffl46e3",
    title: "Oppgave 2.53.1a",
    description:
      "Et spillselskap selger 8 millioner dataspill et år. Selskapet tror omsetningen i årene fremover vil øke med 4% per år. Hvor mange dataspill selger selskapet etter 2 år? Oppgi bare tallet i millioner.",
    answer: "8.6528",
    hint: "DECIMAL",
    points: 50,
    category: { connect: { id: "cleebx9wi000508jt5ik9fgpx" } },
  },
  {
    id: "clex1yzr4000b08l08ztg2m2x",
    title: "Oppgave 2.53.1b",
    description:
      "Et spillselskap selger 8 millioner dataspill et år. Selskapet tror omsetningen i årene fremover vil øke med 4% per år. Hvor mange år har det gått når salget ER over 9 millioner solgte spill?",
    answer: "4",
    points: 50,
    category: { connect: { id: "cleebx9wi000508jt5ik9fgpx" } },
    prevTask: { connect: { id: "clex1tg78000a08l09ffl46e3" } },
  },

  // Oppgave 2.53.2
  {
    id: "clex204on000c08l01776bw1f",
    title: "Oppgave 2.53.2a",
    description:
      "Et spillselskap selger 8 millioner dataspill et år. Selskapet tror omsetningen i årene fremover vil øke med 4% per år. Finn et funksjonsuttrykk S(x) som viser hvor stort salget S er etter x år i antall millioner.",
    answer: "S(x)=8 \\cdot 1.04^x",
    placeholder: "S(x)=\\placeholder[blank1]{}",
    hint: "DECIMAL",
    points: 75,
    category: { connect: { id: "cleebx9wi000508jt5ik9fgpx" } },
    prevTask: { connect: { id: "clex1yzr4000b08l08ztg2m2x" } },
  },
  {
    id: "clex21t7f000d08l00mubdajc",
    title: "Oppgave 2.53.2b",
    description:
      "Et spillselskap selger 8 millioner dataspill et år. Selskapet tror omsetningen i årene fremover vil øke med 4% per år. Hvor mange hele år har det gått når salget BLIR over 9 millioner solgte spill?",
    answer: "3",
    points: 75,
    category: { connect: { id: "cleebx9wi000508jt5ik9fgpx" } },
    prevTask: { connect: { id: "clex204on000c08l01776bw1f" } },
  },

  // Oppgave 2.53.3
  {
    id: "clex25svs000e08l082n79o9w",
    title: "Oppgave 2.53.3a",
    description:
      "Gitt funksjonen math$S(x)=8 \\cdot 1.04^x&, hvor mange spill selges etter 8 år? Oppgi bare tallet i millioner.",
    answer: "10.95",
    hint: "DECIMAL",
    points: 75,
    category: { connect: { id: "cleebx9wi000508jt5ik9fgpx" } },
    prevTask: { connect: { id: "clex21t7f000d08l00mubdajc" } },
  },
  {
    id: "clex2b3lq000f08l09d2m9p49",
    title: "Oppgave 2.53.3b",
    description:
      "Gitt funksjonen math$S(x)=8 \\cdot 1.04^x&, hvor mange år har det gått når salget overstiger 10 millioner solgte spill? Rund opp uten desimaler.",
    answer: "6",
    points: 100,
    category: { connect: { id: "cleebx9wi000508jt5ik9fgpx" } },
    prevTask: { connect: { id: "clex25svs000e08l082n79o9w" } },
  },

  // Oppgave 2.54.1
  {
    id: "clex2gn88000g08l00w573kdf",
    title: "Oppgave 2.54.1",
    description:
      "Espen kjøper en brukt elbil til 450 000 kr. Han regner med at bilen taper seg i verdi med 12 % hvert år siden han kjøpte den. Verdien V av bilen etter x år blir da math$V(x)=450000 \\cdot 0.88^x&. Hvor mye er bilen verdt etter 5 år? Oppgi bare tallet i hele kroner.",
    answer: "237479",
    points: 50,
    category: { connect: { id: "cleebx9wi000508jt5ik9fgpx" } },
  },

  // Oppgave 2.54.2
  {
    id: "clex2rw4a000008lacfv1ahvo",
    title: "Oppgave 2.54.2",
    description:
      "Espen kjøper en brukt elbil til 450 000 kr. Han regner med at bilen taper seg i verdi med 12 % hvert år siden han kjøpte den. Verdien V av bilen etter x år blir da math$V(x)=450000 \\cdot 0.88^x&. Etter hvor mange år blir verdien av bilen under 200 000 kr? Oppgi bare tallet i år.",
    answer: "6.34",
    hint: "DECIMAL",
    points: 75,
    category: { connect: { id: "cleebx9wi000508jt5ik9fgpx" } },
    prevTask: { connect: { id: "clex2gn88000g08l00w573kdf" } },
  },

  // Oppgave 2.54.3
  {
    id: "clex2sfm6000108ladjlx9w14",
    title: "Oppgave 2.54.3a",
    description:
      "Espen kjøper en brukt elbil til 450 000 kr. Han regner med at bilen taper seg i verdi med 12 % hvert år siden han kjøpte den. Verdien V av bilen etter x år blir da math$V(x)=450000 \\cdot 0.88^x&. Hvor mange år går det før bilen er verdt mindre enn 200 000 kr? Oppgi bare tallet i år.",
    answer: "6.34",
    hint: "DECIMAL",
    points: 75,
    category: { connect: { id: "cleebx9wi000508jt5ik9fgpx" } },
    prevTask: { connect: { id: "clex2rw4a000008lacfv1ahvo" } },
  },
  {
    id: "clex2uv31000208la4chj4rbf",
    title: "Oppgave 2.54.3b",
    description:
      "Espen kjøper en brukt elbil til 450 000 kr. Han regner med at bilen taper seg i verdi med 12 % hvert år siden han kjøpte den. Verdien V av bilen etter x år blir da math$V(x)=450000 \\cdot 0.88^x&. Hvor gammel var bilen da Espen kjøpte bilen hvis nypris på bilen var 660 000 kr? Oppgi bare tallet i år.",
    answer: "3",
    points: 125,
    category: { connect: { id: "cleebx9wi000508jt5ik9fgpx" } },
    prevTask: { connect: { id: "clex2sfm6000108ladjlx9w14" } },
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
