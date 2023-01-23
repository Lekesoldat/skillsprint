import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";

export const getServerAuthSession = async (
  ctx: Pick<CreateNextContextOptions, "req" | "res">
) => {
  return await unstable_getServerSession(ctx.req, ctx.res, authOptions);
};
