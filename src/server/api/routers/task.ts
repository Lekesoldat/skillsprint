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
      const recentAttempt = await ctx.prisma.taskAttempt.findFirst({
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
        recentAttempt &&
        (recentAttempt.result === "PENDING" ||
          recentAttempt.result === "SUCCESS")
      ) {
        return recentAttempt;
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
      const userId = ctx.session.user.id;
      const recentAttempt = await ctx.prisma.taskAttempt.findFirst({
        where: {
          userId,
          taskId: task.id,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      });
      if (!recentAttempt) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User had not started an attempt",
        });
      }

      const alreadyAnswered = recentAttempt.result === "SUCCESS";

      const ce = new ComputeEngine();
      const answer = ce.parse(input.answer);
      const solution = ce.parse(task.answer);

      console.log({
        answer: answer.toString(),
        solution: solution.toString(),
        same: answer.isSame(solution),
      });
      const result: "SUCCESS" | "FAIL" = answer.isSame(solution)
        ? "SUCCESS"
        : "FAIL";

      if (alreadyAnswered) {
        return { ...recentAttempt, status: result };
      } else if (result === "SUCCESS") {
        await ctx.prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            points: {
              increment: task.points,
            },
          },
        });
      }

      return ctx.prisma.taskAttempt.update({
        where: {
          id: recentAttempt.id,
        },
        data: {
          result,
          elapsedTime: differenceInSeconds(new Date(), recentAttempt.createdAt),
        },
      });
    }),
});
