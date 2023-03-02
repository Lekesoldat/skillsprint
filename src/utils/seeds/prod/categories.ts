import type { Prisma, PrismaClient } from "@prisma/client";
import { differenceInSeconds } from "date-fns";

const categories: Prisma.CategoryCreateInput[] = [
  // From school book
  { id: "cler3mpi9000108kxdzogagj4", name: "Funksjon og graf" },
  { id: "cldacdi520001sbxekmyct9yd", name: "Lineære funksjoner" },
  { id: "cler3o0ps000208kxhg7u2v0n", name: "Brøkfunksjoner" },
  { id: "cler3oqyo000308kxe2au80ds", name: "Andregradsfunksjoner" },
  { id: "cleebx9wi000508jt5ik9fgpx", name: "Eksponentialfunksjoner" },

  // Other
  // { id: "cldacdi520000sbxe8eyqu26y", name: "Algebra" },
  // { id: "cleeb63a5000008judykn4061", name: "Kvadratiske funksjoner" },
  // {
  //   id: "cleeckaww000108l4h4gjekif",
  //   name: "Omvendt proporsjonale funksjoner",
  // },
  // { id: "cldacdi530002sbxeu6rgijzl", name: "Likninger" },
  // { id: "cldx7ez8a000008juf4sl1wdq", name: "Økonomi" },
  { id: "cle791t0y000308ml7zsw59wo", name: "Noobs" },
];

export async function createCategories({
  prismaClient,
}: {
  prismaClient: PrismaClient;
}) {
  const timer = new Date();
  console.info("\n📒 Seeding categories...");

  const data = await prismaClient.$transaction(
    categories.map((category) =>
      prismaClient.category.upsert({
        where: { id: category.id },
        create: category,
        update: category,
      })
    )
  );

  console.log(`Took ${differenceInSeconds(new Date(), timer)}s`);

  return data;
}
