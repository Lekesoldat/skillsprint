import { Prisma, PrismaClient } from "@prisma/client";
import argon2 from "argon2";
import { faker } from "@faker-js/faker";

faker.seed(69);
const prisma = new PrismaClient();
await prisma.$connect();

async function createCategories() {
  console.info("Creating default categories");
  const data: Prisma.CategoryCreateInput[] = [
    { id: "cldacdi520000sbxe8eyqu26y", name: "Algebra" },
    { id: "cldacdi520001sbxekmyct9yd", name: "Grafer og funksjone" },
    { id: "cldacdi530002sbxeu6rgijzl", name: "Likninger og likningssett" },
  ];
  return await prisma.$transaction(
    data.map((category) =>
      prisma.category.upsert({
        where: { id: category.id },
        create: category,
        update: category,
      })
    )
  );
}

const categories = await createCategories();

async function createDefaultUsers() {
  console.info("Creating default users");
  const data: Prisma.UserCreateInput[] = [
    {
      name: "anhkha",
      password: await argon2.hash("hunter2"),
    },
    {
      name: "holtet",
      password: await argon2.hash("hunter2"),
    },
  ];
  for (let i = 0; i < 5; i++) {
    data.push({
      name: faker.name.firstName(),
      password: faker.internet.password(),
    });
  }

  return await prisma.$transaction(
    data.map((user) =>
      prisma.user.upsert({
        where: { name: user.name },
        create: user,
        update: user,
      })
    )
  );
}

const users = await createDefaultUsers();

async function createDefaultAchievements() {
  const data: Prisma.AchievementCreateInput[] = [
    {
      id: "cldd5ejes0000tlzydlvd651d",
      icon: "🏕️",
      title: "Leirbål",
      description: "Fullfør 3 oppgaver på rad",
      requirement: 3,
      color: "PINK",
    },
    {
      id: "cldd5ejes0001tlzy3je4q6bc",
      icon: "🔥",
      title: "Skogbrann",
      description: "Fullfør 5 oppgaver på rad",
      requirement: 5,
      color: "YELLOW",
    },
    {
      id: "cldd5ejes0002tlzyh9ub0ndz",
      icon: "👀",
      title: "Pionér",
      description: "Prøv 1 oppgave fra <kategorinavn>",
      requirement: 1,
      color: "PINK",
    },
    {
      id: "cldd5ejes0003tlzy5fw3uef8",
      icon: "💯",
      title: "Profesjonell",
      description: "Fullfør en hel kategori",
      requirement: 1,
      color: "ORANGE",
    },
    {
      id: "cldd5ejes0004tlzyh8a7gdt4",
      icon: "🕵🏻",
      title: "Utforsker",
      description: "Løs 1 oppgave i hver kategori",
      requirement: 3,
      color: "BLUE",
    },
    {
      id: "cldd5ejes0005tlzyu6adx7pk",
      icon: "🏆",
      title: "Winner Winner",
      description: "Chicken Dinner",
      requirement: 1,
      color: "GREEN",
    },
  ];
  console.info("Creating default achievements");
  return await prisma.$transaction(
    data.map((achievement) =>
      prisma.achievement.upsert({
        where: { id: achievement.id },
        create: achievement,
        update: achievement,
      })
    )
  );
}

const achievements = await createDefaultAchievements();

async function createDefaultTasks() {
  console.info("Creating default tasks");
  const data: Prisma.TaskCreateInput[] = [
    {
      id: "cldiog5kk000008l29k73fx8g",
      title: "Oppgave 1",
      description: "Beskrivelse av oppgave 1",
      category: { connect: { id: faker.helpers.arrayElement(categories).id } },
      points: 400,
      answer: "42",
    },
    {
      id: "cldioiaq9000f08l27ek850k3",
      title: "Oppgave 1a",
      description: "Beskrivelse av oppgave 1a",
      category: { connect: { id: faker.helpers.arrayElement(categories).id } },
      points: 350,
      answer: "32",
      prevTask: { connect: { id: "cldiog5kk000008l29k73fx8g" } },
    },
  ];
  return await prisma.$transaction(
    data.map((task) =>
      prisma.task.upsert({
        where: { id: task.id },
        create: task,
        update: task,
      })
    )
  );
}

await createDefaultTasks();
