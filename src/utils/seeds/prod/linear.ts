import type { Prisma, PrismaClient } from "@prisma/client";

const PROPERTIES_1_1_URL =
  "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/linear-functions/properties/1-1.svg";

const PROPERTIES_2_1_URL =
  "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/linear-functions/properties/2-1.svg";

const FUNCTION_1_1_URL =
  "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/linear-functions/function/1-1.svg";

const FUNCTION_1_2_URL =
  "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/linear-functions/function/1-2.svg";

const VALUE_TABLE_2_1_URL =
  "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/linear-functions/value-table/2-1.png";

const VALUE_TABLE_2_2_URL =
  "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/task-images/linear-functions/value-table/2-2.png";

export async function createLinearTasks({
  prismaClient,
}: {
  prismaClient: PrismaClient;
}) {
  console.info("\n📝 Seeding linear tasks...");
  const data: Prisma.TaskCreateInput[] = [
    // Oppgave 1 (LAV) - https://www.matematika.no/egenskaper-til-lineaere-funksjoner-2-spor-i/
    {
      id: "clee2cpn2000008kzevn87azv",
      title: "Oppgave 1a - 1",
      description:
        "Finn funksjonsuttrykket til alle grafene. Hva er funksjonsuttrykket til den RØDE?",
      image: PROPERTIES_1_1_URL,
      category: { connect: { id: "cldacdi520001sbxekmyct9yd" } },
      points: 25,
      hint: "FUNCTION",
      answer: "-\\frac{1}{2}x+2",
    },
    {
      id: "clee4l0x5000308mkhvhj73ag",
      title: "Oppgave 1a - 2",
      description:
        "Finn funksjonsuttrykket til alle grafene. Hva er funksjonsuttrykket til den BLÅ?",
      image: PROPERTIES_1_1_URL,
      category: { connect: { id: "cldacdi520001sbxekmyct9yd" } },
      points: 25,
      hint: "FUNCTION",
      answer: "2x+2",
      prevTask: { connect: { id: "clee2cpn2000008kzevn87azv" } },
    },
    {
      id: "clee4nicj000508mk9sjl3ysr",
      title: "Oppgave 1a - 3",
      description:
        "Finn funksjonsuttrykket til alle grafene. Hva er funksjonsuttrykket til den GRØNNE?",
      image: PROPERTIES_1_1_URL,
      category: { connect: { id: "cldacdi520001sbxekmyct9yd" } },
      points: 25,
      hint: "FUNCTION",
      answer: "2x",
      prevTask: { connect: { id: "clee4l0x5000308mkhvhj73ag" } },
    },
    {
      id: "clee4nn30000608mk61de7snf",
      title: "Oppgave 1a - 4",
      description:
        "Finn funksjonsuttrykket til alle grafene. Hva er funksjonsuttrykket til den SORTE?",
      image: PROPERTIES_1_1_URL,
      category: { connect: { id: "cldacdi520001sbxekmyct9yd" } },
      points: 25,
      hint: "FUNCTION",
      answer: "\\frac{1}{2}x-2",
      prevTask: { connect: { id: "clee4nicj000508mk9sjl3ysr" } },
    },
    {
      id: "clee9bdxx000108lf52yo6lfc",
      title: "Oppgave 1b",
      description:
        "To av grafene er parallelle. Hvordan kommer dette fram i funksjonsuttrykket?",
      image: PROPERTIES_1_1_URL,
      category: { connect: { id: "cldacdi520001sbxekmyct9yd" } },
      points: 75,
      hint: "FLAG",
      answer: "panda-ape",
      prevTask: { connect: { id: "clee4nn30000608mk61de7snf" } },
    },
    {
      id: "clee9bt7g000208lf1tyvcq82",
      title: "Oppgave 1c",
      description:
        "To av grafene skjærer math$y-aksen& i samme punkt. Hvordan kommer dette fram i funksjonsuttrykket?",
      image: PROPERTIES_1_1_URL,
      category: { connect: { id: "cldacdi520001sbxekmyct9yd" } },
      points: 75,
      hint: "FLAG",
      answer: "panda-sjimpanse",
      prevTask: { connect: { id: "clee9bdxx000108lf52yo6lfc" } },
    },

    // Oppgave 2 (LAV) - https://www.matematika.no/egenskaper-til-lineaere-funksjoner-2-spor-ii/
    {
      id: "clee9f4qw000308lf4r7k1fyz",
      title: "Oppgave 2a - 1",
      description:
        "Finn funksjonsuttrykket til alle grafene. Hva er funksjonsuttrykket til den RØDE?",
      image: PROPERTIES_2_1_URL,
      category: { connect: { id: "cldacdi520001sbxekmyct9yd" } },
      points: 25,
      hint: "FUNCTION",
      answer: "-\\frac{1}{2}x+2",
    },
    {
      id: "clee9iwdv000408lf0i3j8dk5",
      title: "Oppgave 2a - 2",
      description:
        "Finn funksjonsuttrykket til alle grafene. Hva er funksjonsuttrykket til den BLÅ?",
      image: PROPERTIES_2_1_URL,
      category: { connect: { id: "cldacdi520001sbxekmyct9yd" } },
      points: 25,
      hint: "FUNCTION",
      answer: "2x+2",
      prevTask: { connect: { id: "clee9f4qw000308lf4r7k1fyz" } },
    },
    {
      id: "clee9jc7s000508lf67mk8mnc",
      title: "Oppgave 2a - 3",
      description:
        "Finn funksjonsuttrykket til alle grafene. Hva er funksjonsuttrykket til den GRØNN?",
      image: PROPERTIES_2_1_URL,
      category: { connect: { id: "cldacdi520001sbxekmyct9yd" } },
      points: 25,
      hint: "FUNCTION",
      answer: "2x-2",
      prevTask: { connect: { id: "clee9iwdv000408lf0i3j8dk5" } },
    },
    {
      id: "clee9jmw5000608lf86ha8oad",
      title: "Oppgave 2a - 4",
      description:
        "Finn funksjonsuttrykket til alle grafene. Hva er funksjonsuttrykket til den SORTE?",
      image: PROPERTIES_2_1_URL,
      category: { connect: { id: "cldacdi520001sbxekmyct9yd" } },
      points: 25,
      hint: "FUNCTION",
      answer: "-\\frac{1}{2}x-2",
      prevTask: { connect: { id: "clee9jc7s000508lf67mk8mnc" } },
    },
    // {
    //   id: "clee9kz4p000708lf2tlfda8b",
    //   title: "Oppgave 2b",
    //   description:
    //     "Hvilke av grafene er parallelle. Hvordan kommer dette fram i funksjonsuttrykket?",
    //   image: PROPERTIES_2_1_URL,
    //   category: { connect: { id: "cldacdi520001sbxekmyct9yd" } },
    //   points: 75,
    //   answer: "-\\frac{1}{2}x-2",
    //   prevTask: { connect: { id: "clee9jmw5000608lf86ha8oad" } },
    // },
    // {
    //   id: "clee9l6a6000808lfadyn8nvb",
    //   title: "Oppgave 2c",
    //   description:
    //     "Hvilke av grafene skjærer y-aksen i samme punkt. Hvordan kommer dette fram i funksjonsuttrykket? ",
    //   image: PROPERTIES_2_1_URL,
    //   category: { connect: { id: "cldacdi520001sbxekmyct9yd" } },
    //   points: 75,
    //   hint: "FUNCTION",
    //   answer: "-\\frac{1}{2}x-2",
    //   prevTask: { connect: { id: "clee9kz4p000708lf2tlfda8b" } },
    // },

    // Oppgave 3 - https://www.matematika.no/funksjonsuttrykket-til-lineaere-funksjoner-2-spor-i/
    {
      id: "clee9rl1n000908lf0gma283p",
      title: "Oppgave 3a",
      description: "Finn funksjonsuttrykket til den lineære funksjonen.",
      image: FUNCTION_1_1_URL,
      category: { connect: { id: "cldacdi520001sbxekmyct9yd" } },
      points: 50,
      hint: "FUNCTION",
      answer: "2x-1",
    },
    {
      id: "cleeaap7l000408jzbf9xahbq",
      title: "Oppgave 3b",
      description: "Finn funksjonsuttrykket til den lineære funksjonen.",
      image: FUNCTION_1_2_URL,
      category: { connect: { id: "cldacdi520001sbxekmyct9yd" } },
      points: 50,
      hint: "FUNCTION",
      answer: "2x-1",
      prevTask: { connect: { id: "clee9rl1n000908lf0gma283p" } },
    },

    // Oppgave 4 - https://www.matematika.no/verditabell-2-spor-ii/
    {
      id: "clee9s1wi000a08lf0lvvg1qs",
      title: "Oppgave 4a",
      description:
        "Hva slags y-verdi vil funksjonsmaskinen sende ut hvis du putter inn math$x=2&?",
      image: VALUE_TABLE_2_1_URL,
      category: { connect: { id: "cldacdi520001sbxekmyct9yd" } },
      points: 50,
      answer: "11",
    },
    {
      id: "cleea1eir000008l72fy9977z",
      title: "Oppgave 4b",
      description:
        "Hvis funksjonsmaskinen sender ut math$y=1&, hva slags math$x-verdi& har du puttet inn i maskinen?",
      image: VALUE_TABLE_2_1_URL,
      category: { connect: { id: "cldacdi520001sbxekmyct9yd" } },
      points: 50,
      answer: "-3",
      prevTask: { connect: { id: "clee9s1wi000a08lf0lvvg1qs" } },
    },
    {
      id: "cleea21so000108l77ocu6896",
      title: "Oppgave 4c - 1",
      description:
        "Finn ut hva funksjonsmaskinen gjør med tallene som puttes inn, og skriv ned funksjonsuttrykket som passer til hver verditabell. For tabell A:",
      image: VALUE_TABLE_2_2_URL,
      category: { connect: { id: "cldacdi520001sbxekmyct9yd" } },
      points: 25,
      hint: "FUNCTION",
      answer: "2x+2",
      prevTask: { connect: { id: "cleea1eir000008l72fy9977z" } },
    },
    {
      id: "cleea7vkc000108jzavuy7ezh",
      title: "Oppgave 4c - 2",
      description:
        "Finn ut hva funksjonsmaskinen gjør med tallene som puttes inn, og skriv ned funksjonsuttrykket som passer til hver verditabell. For tabell B:",
      image: VALUE_TABLE_2_2_URL,
      category: { connect: { id: "cldacdi520001sbxekmyct9yd" } },
      points: 25,
      hint: "FUNCTION",
      answer: "3x",
      prevTask: { connect: { id: "cleea21so000108l77ocu6896" } },
    },
    {
      id: "cleea80k3000208jz039c5djl",
      title: "Oppgave 4c - 3",
      description:
        "Finn ut hva funksjonsmaskinen gjør med tallene som puttes inn, og skriv ned funksjonsuttrykket som passer til hver verditabell. For tabell C:",
      image: VALUE_TABLE_2_2_URL,
      category: { connect: { id: "cldacdi520001sbxekmyct9yd" } },
      points: 25,
      hint: "FUNCTION",
      answer: "2x-3",
      prevTask: { connect: { id: "cleea7vkc000108jzavuy7ezh" } },
    },
    {
      id: "cleea89hx000308jz7h5vd15n",
      title: "Oppgave 4c - 4",
      description:
        "Finn ut hva funksjonsmaskinen gjør med tallene som puttes inn, og skriv ned funksjonsuttrykket som passer til hver verditabell. For tabell D:",
      image: VALUE_TABLE_2_2_URL,
      category: { connect: { id: "cldacdi520001sbxekmyct9yd" } },
      points: 25,
      hint: "FUNCTION",
      answer: "4x+4",
      prevTask: { connect: { id: "cleea80k3000208jz039c5djl" } },
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
