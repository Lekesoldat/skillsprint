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
      const [tasks, successes] = await ctx.prisma.$transaction([
        ctx.prisma.category.findMany({
          include: {
            task: {
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
        }),
        ctx.prisma.taskAttempt.findMany({
          select: {
            taskId: true,
          },
          where: {
            AND: [
              {
                userId: ctx.session.user.id,
                result: "SUCCESS",
              },
            ],
          },
        }),
      ]);

      const transformedTasks = tasks.map((cat) => ({
        id: cat.id,
        name: cat.name,
        tasks: cat.task.map((t) => ({
          id: t.id,
          title: t.title,
          points: t.points,
        })),
      }));

      return {
        tasks: transformedTasks,
        successes: successes.flatMap((s) => s.taskId),
      };
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
