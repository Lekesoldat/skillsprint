import { ComputeEngine } from "@cortex-js/compute-engine";
import { TRPCError } from "@trpc/server";
import { differenceInSeconds, format } from "date-fns";
import { z } from "zod";
import {
  roundToTenthMinute,
  sortAndAggretatePoints,
} from "../../../utils/dates";
import { createTRPCRouter, protectedProcedure } from "../trpc";

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

  getSuccessGrouped: protectedProcedure.query(async ({ ctx }) => {
    try {
      const [tasks, attempts] = await ctx.prisma.$transaction([
        ctx.prisma.task.findMany(),
        ctx.prisma.taskAttempt.findMany({
          where: {
            result: {
              equals: "SUCCESS",
            },
          },
        }),
      ]);

      const taskToPoints = new Map(tasks.map((t) => [t.id, t.points]));

      const groupAttempts = new Map<string, number>();
      const groupAttemptsCounter = new Map<string, number>();

      const userAttempts = new Map<string, number>();

      attempts.forEach((a) => {
        const rounded = roundToTenthMinute(a.createdAt);
        const timestamp = format(rounded, "HH:mm");
        const points = taskToPoints.get(a.taskId) || 0;

        // Group Attempts
        const entry = groupAttempts.get(timestamp);
        const entryCounter = groupAttemptsCounter.get(timestamp);

        if (entry && entryCounter) {
          groupAttempts.set(timestamp, entry + points);
          groupAttemptsCounter.set(timestamp, entryCounter + 1);
        } else {
          groupAttempts.set(timestamp, points);
          groupAttemptsCounter.set(timestamp, 1);
        }

        // User Attempts
        if (ctx.session.user.id === a.userId) {
          const entry = userAttempts.get(timestamp);

          if (entry) {
            userAttempts.set(timestamp, entry + points);
          } else {
            userAttempts.set(timestamp, points);
          }
        }
      });

      // Calculate average points at each timestamp
      const averageGroupAttempts = new Map<string, number>();

      groupAttempts.forEach((points, time) => {
        const counter = groupAttemptsCounter.get(time);

        if (counter) {
          averageGroupAttempts.set(time, points / counter);
        }
      });

      const userList = sortAndAggretatePoints(userAttempts);
      const groupList = sortAndAggretatePoints(averageGroupAttempts);

      return {
        userList,
        groupList,
      };
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        cause: error,
      });
    }
  }),
});
