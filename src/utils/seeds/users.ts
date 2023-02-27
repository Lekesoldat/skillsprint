import type { Prisma, PrismaClient } from "@prisma/client";
import argon2 from "argon2";
import { users } from "./ids";

const generateRandomUsers = async () => {
  const userPromises = users.map(async (u) => {
    const name = u.username;
    const password = await argon2.hash(u.password);

    return {
      name,
      password,
    };
  });

  return await Promise.all(userPromises);
};

interface CreateUsersOptions {
  prismaClient: PrismaClient;
  withFriends?: boolean;
  onlyFriends?: boolean;
}

export async function createUsers({
  onlyFriends = false,
  withFriends = false,
  prismaClient,
}: CreateUsersOptions) {
  console.info(
    `\n🎓 Seeding users ${withFriends ? "with friends " : ""}${
      onlyFriends ? "only with friends " : ""
    }...`
  );
  const friends: Prisma.UserCreateInput[] = [
    {
      id: "cle2wz3id0000fxpb8bgt5f3f",
      name: "anhkha",
      image:
        "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/icons/avatars/047-turkey.svg",
      password: await argon2.hash("hunter2"),
    },
    {
      id: "cle2wz3id0002fxpb0digx7tv",
      name: "magnus",
      image:
        "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/icons/avatars/048-vulture.svg",
      password: await argon2.hash("holtet"),
    },
    // {
    //   id: "cle78e7g2000008lgen46erji",
    //   name: "mathias",
    //   password: await argon2.hash("fossum"),
    // },
    // {
    //   id: "cle78frxv000108lg79eu7d5b",
    //   name: "johanne",
    //   password: await argon2.hash("tronstad"),
    // },
    // {
    //   id: "cle78g83p000208lgdy2m3o0w",
    //   name: "øyvind",
    //   password: await argon2.hash("schjerven"),
    // },
    // {
    //   id: "cle78gkpq000308lghus0fu6s",
    //   name: "kristoffer",
    //   password: await argon2.hash("nyvoll"),
    // },
    // {
    //   id: "cle78hhqv000408lgg89n28b9",
    //   name: "carl",
    //   password: await argon2.hash("smestad"),
    // },
    // {
    //   id: "cle78hnzv000508lg0i9yc4rz",
    //   name: "andreas",
    //   password: await argon2.hash("amundsen"),
    // },
    // {
    //   id: "cle78hrrb000608lg8z2x68wr",
    //   name: "kristine",
    //   password: await argon2.hash("larssen"),
    // },
    // {
    //   id: "cle78jrxx000708lgglob19m9",
    //   name: "hilde",
    //   password: await argon2.hash("haug"),
    // },
    // {
    //   id: "cle79f67w000c08ml2leeejzg",
    //   name: "markus",
    //   password: await argon2.hash("hauge"),
    // },
    // {
    //   id: "cle79fd58000d08mlfqj8efzr",
    //   name: "kristian",
    //   password: await argon2.hash("gran"),
    // },
    // {
    //   id: "cle8i692f000008mp1tmz5liy",
    //   name: "alexander",
    //   password: await argon2.hash("orvik"),
    // },
    // {
    //   id: "cle8i7e0g000108mpaawh9cw0",
    //   name: "øystein",
    //   password: await argon2.hash("bjørkeng"),
    // },
    // {
    //   id: "clecore5x000008mq56fa3dzo",
    //   name: "adrian",
    //   password: await argon2.hash("snell"),
    // },
    // {
    //   id: "clehfbnni000008jn5tdz1ild",
    //   name: "natten",
    //   password: await argon2.hash("jonas"),
    // },
    // {
    //   id: "clehfbshs000108jnb8is71fd",
    //   name: "carlsen",
    //   password: await argon2.hash("jonas"),
    // },
    {
      id: "cleidrxes000008lf5b55f45t",
      name: "synne",
      image:
        "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/icons/avatars/049-bird.svg",
      password: await argon2.hash("markmanrud"),
    },
  ];

  let output = await generateRandomUsers();

  if (withFriends) {
    output = [...output, ...friends];
  }

  if (onlyFriends) {
    output = [...friends];
  }

  return await prismaClient.$transaction(
    output.map((user) =>
      prismaClient.user.upsert({
        where: { name: user.name },
        create: user,
        update: user,
      })
    )
  );
}
