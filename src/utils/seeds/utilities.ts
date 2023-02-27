import type { Prisma } from "@prisma/client";
import argon2 from "argon2";

export const hashPasswords = async (userList: Prisma.UserCreateInput[]) => {
  const userPromises = userList.map(async (user) => {
    const hashedPassword = await argon2.hash(user.password);

    return {
      ...user,
      password: hashedPassword,
    };
  });

  return await Promise.all(userPromises);
};
