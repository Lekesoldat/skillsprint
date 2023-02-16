import type { Faker } from "@faker-js/faker";
import type { Prisma, PrismaClient } from "@prisma/client";
import argon2 from "argon2";
import { users } from "./ids";

export async function createUsers({
  prismaClient,
}: {
  prismaClient: PrismaClient;
  faker: Faker;
}) {
  console.info("\n🎓 Seeding users...");
  const data: Prisma.UserCreateInput[] = [
    {
      id: "cle2wz3id0000fxpb8bgt5f3f",
      name: "anhkha",
      password: await argon2.hash("hunter2"),
    },
    {
      id: "cle2wz3id0002fxpb0digx7tv",
      name: "magnus",
      password: await argon2.hash("holtet"),
    },
    {
      id: "cle78e7g2000008lgen46erji",
      name: "mathias",
      password: await argon2.hash("fossum"),
    },
    {
      id: "cle78frxv000108lg79eu7d5b",
      name: "johanne",
      password: await argon2.hash("tronstad"),
    },
    {
      id: "cle78g83p000208lgdy2m3o0w",
      name: "øyvind",
      password: await argon2.hash("schjerven"),
    },
    {
      id: "cle78gkpq000308lghus0fu6s",
      name: "kristoffer",
      password: await argon2.hash("nyvoll"),
    },
    {
      id: "cle78hhqv000408lgg89n28b9",
      name: "carl",
      password: await argon2.hash("smestad"),
    },
    {
      id: "cle78hnzv000508lg0i9yc4rz",
      name: "andreas",
      password: await argon2.hash("amundsen"),
    },
    {
      id: "cle78hrrb000608lg8z2x68wr",
      name: "kristine",
      password: await argon2.hash("larssen"),
    },
    {
      id: "cle78jrxx000708lgglob19m9",
      name: "hilde",
      password: await argon2.hash("haug"),
    },
    {
      id: "cle79f67w000c08ml2leeejzg",
      name: "markus",
      password: await argon2.hash("hauge"),
    },
    {
      id: "cle79fd58000d08mlfqj8efzr",
      name: "kristian",
      password: await argon2.hash("gran"),
    },
  ];

  users.forEach(async (u) => {
    data.push({
      name: u.username,
      password: await argon2.hash(u.password),
    });
  });

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
