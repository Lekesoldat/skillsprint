import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";

interface RankedUser {
  id: string;
  rank: string;
  name: string;
  avatar: string | null;
  points: number;
  best_streak: number;
}

export const userRouter = createTRPCRouter({
  getTopFive: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.$queryRaw<RankedUser[]>`
      SELECT
        id,
        ROW_NUMBER() OVER (ORDER BY points DESC, best_streak DESC)::text as rank,
        name,
        image as avatar,
        points, 
        best_streak
      FROM "User"
      ORDER BY points DESC, best_streak DESC
      LIMIT 5
    `;
    } catch (error) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        cause: error,
      });
    }
  }),
});
