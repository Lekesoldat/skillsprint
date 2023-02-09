import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const categoryRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.category.findMany();
    } catch (error) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        cause: error,
      });
    }
  }),

  getCategoriesAndTasks: protectedProcedure.query(async ({ ctx }) => {
    try {
      const res = await ctx.prisma.category.findMany({
        include: {
          Task: {
            select: {
              id: true,
              title: true,
              points: true,
            },

            orderBy: {
              title: "asc",
            },
          },
        },
      });

      return res.map((cat) => ({
        id: cat.id,
        name: cat.name,
        tasks: cat.Task.map((t) => ({
          id: t.id,
          title: t.title,
          points: t.points,
        })),
      }));
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        cause: error,
      });
    }
  }),

  getById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input: { id } }) => {
      try {
        return await ctx.prisma.category.findUniqueOrThrow({ where: { id } });
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          cause: error,
        });
      }
    }),
});
