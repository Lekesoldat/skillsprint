import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();
await prisma.$connect();

async function createCategories() {
  console.info("Creating categories");
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
  console.info("Creating default users");
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

async function createDefaultAchievements() {
  console.info("Creating default achievements");
  await prisma.achievement.createMany({
    data: [
      {
        icon: "🏕️",
        title: "Leirbål",
        description: "Fullfør 3 oppgaver på rad",
        requirement: 3,
        color: "PINK",
      },
      {
        icon: "🔥",
        title: "Skogbrann",
        description: "Fullfør 5 oppgaver på rad",
        requirement: 5,
        color: "YELLOW",
      },
      {
        icon: "👀",
        title: "Pionér",
        description: "Prøv 1 oppgave fra <kategorinavn>",
        requirement: 1,
        color: "PINK",
      },
      {
        icon: "💯",
        title: "Profesjonell",
        description: "Fullfør en hel kategori",
        requirement: 1,
        color: "ORANGE",
      },
      {
        icon: "🕵🏻",
        title: "Utforsker",
        description: "Løs 1 oppgave i hver kategori",
        requirement: 3,
        color: "BLUE",
      },
      {
        icon: "🏆",
        title: "Winner Winner",
        description: "Chicken Dinner",
        requirement: 1,
        color: "GREEN",
      },
    ],
  });
}

// await createDefaultAchievements();
