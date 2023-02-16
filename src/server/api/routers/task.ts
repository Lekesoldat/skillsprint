import { TRPCError } from "@trpc/server";
import { addSeconds, compareDesc } from "date-fns";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const taskRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.task.findMany();
    } catch (error) {
      throw new TRPCError({
        code: "BAD_REQUEST",
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
        return await ctx.prisma.task.findUniqueOrThrow({ where: { id } });
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          cause: error,
        });
      }
    }),

  getByIdIncludeCategory: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input: { id } }) => {
      try {
        return await ctx.prisma.task.findUniqueOrThrow({
          where: { id },
          include: { category: true },
        });
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          cause: error,
        });
      }
    }),

  getLastSolvedTasks: protectedProcedure.query(async ({ ctx }) => {
    try {
      const res = await ctx.prisma.taskAttempt.findMany({
        take: -5,
        where: {
          userId: ctx.session.user.id,
          result: "SUCCESS",
        },
        include: {
          task: {
            select: {
              id: true,
              title: true,
              category: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      return res
        .map((r) => ({
          taskId: r.task.id,
          title: r.task.title,
          category: r.task.category.name,
          createdAt: r.createdAt,
          elapsedTime: r.elapsedTime,
          finishedAt: addSeconds(r.createdAt, r.elapsedTime),
        }))
        .sort((a, b) => compareDesc(a.finishedAt, b.finishedAt));
    } catch (error) {
      throw new TRPCError({
        code: "NOT_FOUND",
        cause: error,
      });
    }
  }),
});
