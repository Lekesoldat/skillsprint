import type { Prisma } from "@prisma/client";

import { prismaClient } from "./seed";

export async function createCategories() {
  console.info("\n📒 Seeding categories...");
  const data: Prisma.CategoryCreateInput[] = [
    { id: "cldacdi520000sbxe8eyqu26y", name: "Algebra" },
    { id: "cldacdi520001sbxekmyct9yd", name: "Grafer og funksjoner" },
    { id: "cldacdi530002sbxeu6rgijzl", name: "Likninger og likningssett" },
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
