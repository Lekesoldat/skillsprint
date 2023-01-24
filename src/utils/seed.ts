import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

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

// await createCategories();

async function createDefaultUsers() {
  await prisma.user.createMany({
    data: [
      {
        name: "anhkha",
        password: await argon2.hash("hunter2"),
      },
      {
        name: "holtet",
        password: await argon2.hash("hunter2"),
      },
    ],
  });
}

// await createDefaultUsers();
