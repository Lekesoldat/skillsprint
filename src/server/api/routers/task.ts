import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const taskAttemptRouter = createTRPCRouter({
  startAttempt: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const task = await ctx.prisma.task.findUnique({
        where: {
          id: input,
        },
      });
      if (!task) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid Task",
        });
      }
      const res = await ctx.prisma.taskAttempt.create({
        data: {
          result: "PENDING",
          taskId: task.id,
          userId: ctx.session.user.id,
          elapsedTime: 0,
        },
      });
      return res;
    }),

  attemptAnswer: protectedProcedure
    .input(
      z.object({
        taskId: z.string(),
        answer: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const task = await ctx.prisma.task.findUnique({
        where: {
          id: input.taskId,
        },
      });
      if (!task) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid Task",
        });
      }
      const attempt = await ctx.prisma.taskAttempt.findFirst({
        where: {
          userId: ctx.session.user.id,
          taskId: task.id,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      });
      if (!attempt) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User had not started an attempt",
        });
      }
      const res = await ctx.prisma.taskAttempt.update({
        where: {
          id: attempt.id,
        },
        data: {
          result: input.answer === task.answer ? "SUCCESS" : "FAIL",
          elapsedTime: new Date().getTime() - attempt.createdAt.getTime(),
        },
      });

      return res;
    }),
});

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
});
