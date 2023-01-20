import { PrismaClient } from "@prisma/client";
import { create } from "domain";

const prisma = new PrismaClient();
await prisma.$connect();

async function createCategories() {
  await prisma.category.createMany({
    data: [
      { name: "Algebra" },
      { name: "Grafer og funksjone" },
      { name: "Likninger og likningssett" },
    ],
  });
}
