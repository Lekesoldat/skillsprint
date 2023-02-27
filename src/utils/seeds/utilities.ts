import type { Prisma } from "@prisma/client";
import argon2 from "argon2";

export const hashPasswords = async (userList: Prisma.UserCreateInput[]) => {
  const userPromises = userList.map(async ({ name, password }) => {
    const hashedPassword = await argon2.hash(password);

    return {
      name,
      password: hashedPassword,
    };
  });

  return await Promise.all(userPromises);
};
