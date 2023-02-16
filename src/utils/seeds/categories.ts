import type { Prisma } from "@prisma/client";

import { prismaClient } from "./clients";

export async function createCategories() {
  console.info("\n📒 Seeding categories...");
  const data: Prisma.CategoryCreateInput[] = [
    { id: "cldacdi520000sbxe8eyqu26y", name: "Algebra" },
    { id: "cldacdi520001sbxekmyct9yd", name: "Funksjoner" },
    { id: "cldacdi530002sbxeu6rgijzl", name: "Likninger" },
    { id: "cldx7ez8a000008juf4sl1wdq", name: "Økonomi" },
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
