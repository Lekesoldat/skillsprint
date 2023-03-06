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
      "En elbil har en batterikapasistet på 81 kWh (kilowattimer). Den bruker 1.8 kWh per mil. Tegn grafen til funksjonen når math$0<=x<=45$.",
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
      "I en kommune med 60 000 innbyggere skulle 90% av innbyggerne vaksineres mot covid-19. I gjennomsnitt ble det vaksinert 1500 personer hver uke. Tegn grafen til funksjonen når math$0<=x<=36&.",
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
