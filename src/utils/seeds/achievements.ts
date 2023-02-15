import type { Prisma } from "@prisma/client";
import { prismaClient } from "./seed";

export async function createAchievements() {
  console.info("\n🏆 Seeding achievements...");

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

  return await prismaClient.$transaction(
    data.map((achievement) =>
      prismaClient.achievement.upsert({
        where: { id: achievement.id },
        create: achievement,
        update: achievement,
      })
    )
  );
}
