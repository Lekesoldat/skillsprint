import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import z from "zod";

const RankedUserSchema = z
  .object({
    id: z.string(),
    rank: z.string(),
    name: z.string(),
    avatar: z.string().nullable(),
    points: z.number(),
    best_streak: z.number(),
  })
  .array();

export const userRouter = createTRPCRouter({
  getTopFive: protectedProcedure.query(async ({ ctx }) => {
    try {
      const res = await ctx.prisma.$queryRaw`
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

      return RankedUserSchema.parse(res);
    } catch (error) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        cause: error,
      });
    }
  }),
});