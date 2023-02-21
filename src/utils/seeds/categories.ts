import type { Prisma, PrismaClient } from "@prisma/client";

export async function createCategories({
  prismaClient,
}: {
  prismaClient: PrismaClient;
}) {
  console.info("\n📒 Seeding categories...");
  const data: Prisma.CategoryCreateInput[] = [
    { id: "cldacdi520000sbxe8eyqu26y", name: "Algebra" },
    { id: "cldacdi520001sbxekmyct9yd", name: "Lineære funksjoner" },
    { id: "cleeb63a5000008judykn4061", name: "Kvadratiske funksjoner" },
    { id: "cleebx9wi000508jt5ik9fgpx", name: "Eksponentialfunksjon" },
    {
      id: "cleeckaww000108l4h4gjekif",
      name: "Omvendt proporsjonale funksjoner",
    },
    { id: "cldacdi530002sbxeu6rgijzl", name: "Likninger" },
    { id: "cldx7ez8a000008juf4sl1wdq", name: "Økonomi" },
    { id: "cle791t0y000308ml7zsw59wo", name: "Noobs" },
  ];

  return await prismaClient.$transaction(
    data.map((category) =>
      prismaClient.category.upsert({
        where: { id: category.id },
        create: category,
        update: category,
      })
    )
  );
}
