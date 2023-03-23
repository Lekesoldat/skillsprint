import { TRPCError } from "@trpc/server";
import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const RankedUserSchema = z
  .object({
    id: z.string(),
    rank: z.string(),
    name: z.string(),
    avatar: z.string().nullable(),
    points: z.coerce.number(),
    best_streak: z.number(),
  })
  .array();

export const userRouter = createTRPCRouter({
  getTopFive: protectedProcedure
    .input(z.number().default(1))
    .query(async ({ ctx, input }) => {
      try {
        let res: unknown;
        if (input === 2) {
          res = await ctx.prisma.$queryRaw`
          SELECT
            id,
            ROW_NUMBER() OVER (ORDER BY points2 DESC, best_streak2 DESC)::text as rank,
            name,
            image as avatar,
            points2 as points,
            best_streak2 as best_streak
          FROM "User"
          WHERE "User"."session" = ${ctx.session.user.session}
          ORDER BY points2 DESC, best_streak2 DESC
          -- LIMIT 5
          `;
        } else {
          res = await ctx.prisma.$queryRaw`
          SELECT
            id,
            ROW_NUMBER() OVER (ORDER BY (points + points2) DESC, best_streak DESC)::text as rank,
            name,
            image as avatar,
            (points + points2) as points,
            best_streak,
          FROM "User"
          WHERE "User"."session" = ${ctx.session.user.session}
          ORDER BY (points + points2) DESC, best_streak DESC
          -- LIMIT 5
          `;
        }

        const data = RankedUserSchema.parse(res);

        const user = data.find((u) => u.id === ctx.session.user.id);

        const topFive = data.slice(0, 5);

        if (user && !topFive.includes(user)) {
          topFive.push(user);
        }

        return { rows: topFive };
      } catch (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: error,
        });
      }
    }),
});
