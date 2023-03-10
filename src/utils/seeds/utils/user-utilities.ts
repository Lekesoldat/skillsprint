import type { Prisma, PrismaClient } from "@prisma/client";
import argon2 from "argon2";
import { differenceInSeconds } from "date-fns";

const hashPasswords = async (userList: Prisma.UserCreateInput[]) => {
  const userPromises = userList.map(async (user) => {
    const hashedPassword = await argon2.hash(user.password);

    return {
      ...user,
      password: hashedPassword,
    };
  });

  return await Promise.all(userPromises);
};

const admins: Prisma.UserCreateInput[] = [
  {
    id: "cle2wz3id0000fxpb8bgt5f3f",
    name: "anhkha",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/icons/avatars/047-turkey.svg",
    password: "hunter2",
  },
  {
    id: "cle2wz3id0002fxpb0digx7tv",
    name: "magnus",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/icons/avatars/048-vulture.svg",
    password: "holtet",
  },
  {
    id: "cle78jrxx000708lgglob19m9",
    name: "hilde",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/icons/avatars/049-bird.svg",
    password: "haug",
  },

  {
    id: "cle8i7e0g000108mpaawh9cw0",
    name: "oskar",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/icons/avatars/049-bird.svg",
    password: "olsen",
  },
  {
    id: "cleidrxes000008lf5b55f45t",
    name: "synne",
    image:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/icons/avatars/049-bird.svg",
    password: "markmanrud",
  },
];

interface CreateUsersOptions {
  prismaClient: PrismaClient;
  users: Prisma.UserCreateInput[];
  withAdmins?: boolean;
}

export async function createUsers({
  prismaClient,
  users,
  withAdmins,
}: CreateUsersOptions) {
  const timer = new Date();
  console.info(`\n🎓 Seeding users ${withAdmins ? "and admins " : ""}!`);

  if (withAdmins) {
    users.push(...admins);
  }

  const output = await hashPasswords(users);

  const data = await prismaClient.$transaction(
    output.map((user) => {
      return prismaClient.user.upsert({
        where: { name: user.name },
        create: user,
        update: user,
      });
    })
  );

  console.log(`Took ${differenceInSeconds(new Date(), timer)}s`);

  return data;
}
