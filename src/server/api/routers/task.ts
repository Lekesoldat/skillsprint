import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const taskRouter = createTRPCRouter({
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
      const attempt = await ctx.prisma.taskAttempt.findUniqueOrThrow({
        where: {
          userId_taskId: { userId: ctx.session.user.id, taskId: task.id },
        },
      });
      const res = await ctx.prisma.taskAttempt.update({
        where: {
          userId_taskId: { taskId: attempt.taskId, userId: attempt.userId },
        },
        data: {
          result: input.answer === task.answer ? "SUCCESS" : "FAIL",
          elapsedTime: new Date().getTime() - attempt.createdAt.getTime(),
        },
      });

      return res;
    }),
});