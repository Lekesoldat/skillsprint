import type { Prisma } from "@prisma/client";
import argon2 from "argon2";

import { prismaClient, faker } from "./seed";

export async function createUsers() {
  console.info("\n🎓 Seeding users...");
  const data: Prisma.UserCreateInput[] = [
    {
      id: "cle2wz3id0000fxpb8bgt5f3f",
      name: "anhkha",
      password: await argon2.hash("hunter2"),
    },
    {
      id: "cle2wz3id0002fxpb0digx7tv",
      name: "holtet",
      password: await argon2.hash("hunter2"),
    },
  ];

  for (let i = 0; i < 20; i++) {
    data.push({
      name: faker.name.firstName(),
      password: await argon2.hash(faker.internet.password()),
    });
  }

  return await prismaClient.$transaction(
    data.map((user) =>
      prismaClient.user.upsert({
        where: { name: user.name },
        create: user,
        update: user,
      })
    )
  );
}
