import { TRPCError } from "@trpc/server";
import { differenceInSeconds } from "date-fns";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { ComputeEngine } from "@cortex-js/compute-engine";

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

export const taskAttemptRouter = createTRPCRouter({
  startAttempt: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const attempt = await ctx.prisma.taskAttempt.findFirst({
        where: {
          userId: ctx.session.user.id,
          taskId: input,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      });

      if (
        attempt &&
        (attempt.result === "PENDING" || attempt.result === "SUCCESS")
      ) {
        return attempt;
      } else {
        return ctx.prisma.taskAttempt.create({
          data: {
            result: "PENDING",
            taskId: input,
            userId: ctx.session.user.id,
            elapsedTime: 0,
            createdAt: new Date(),
          },
        });
      }
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
          createdAt: "asc",
        },
        take: 1,
      });
      if (!attempt) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User had not started an attempt",
        });
      }
      const ce = new ComputeEngine();
      const answer = ce.parse(input.answer);
      const solution = ce.parse(task.answer);

      console.log({
        answer: answer.toString(),
        solution: solution.toString(),
        same: answer.isSame(solution),
      });
      const result = answer.isSame(solution) ? "SUCCESS" : "FAIL";

      return await ctx.prisma.taskAttempt.update({
        where: {
          id: attempt.id,
        },
        data: {
          result,
          elapsedTime: differenceInSeconds(new Date(), attempt.createdAt),
        },
      });
    }),
});
