import { ComputeEngine } from "@cortex-js/compute-engine";
import { TRPCError } from "@trpc/server";
import { format } from "date-fns";
import { z } from "zod";
import {
  roundToTenthMinute,
  sortAndAggretatePoints
} from "../../../utils/attempt-helpers";
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
      const groupAttemptsCounter = new Map<string, number>();

      const pointsAtTime = new Map<
        string,
        { groupPoints: number; userPoints: number }
      >();

      attempts.forEach((a) => {
        // Round timestamp to nearest tenth and extract HH:mm
        const rounded = roundToTenthMinute(a.createdAt);
        const timestamp = format(rounded, "HH:mm");

        const points = taskToPoints.get(a.taskId) || 0;

        // Get points at time as well as counter
        const entry = pointsAtTime.get(timestamp);
        const counter = groupAttemptsCounter.get(timestamp);

        // If timestamp and counter exists, increase counter and update points
        if (entry && counter) {
          groupAttemptsCounter.set(timestamp, counter + 1);

          // If current user is the task solver, update user and tasks
          if (ctx.session.user.id === a.userId) {
            pointsAtTime.set(timestamp, {
              groupPoints: entry.groupPoints + points,
              userPoints: entry.userPoints + points,
            });

            // Else only update group points
          } else {
            pointsAtTime.set(timestamp, {
              groupPoints: entry.groupPoints + points,
              userPoints: entry.userPoints,
            });
          }

          // If entry does not exist, add to map and increase counter
        } else {
          groupAttemptsCounter.set(timestamp, 1);

          // If current user is the task solver, add points to user and group
          if (ctx.session.user.id === a.userId) {
            pointsAtTime.set(timestamp, {
              groupPoints: points,
              userPoints: points,
            });

            // Else only add to group
          } else {
            pointsAtTime.set(timestamp, {
              groupPoints: points,
              userPoints: 0,
            });
          }
        }
      });

      // Calculate Averages
      const averageAdjusted = new Map<
        string,
        { groupPoints: number; userPoints: number }
      >();

      pointsAtTime.forEach((points, timestamp) => {
        const counter = groupAttemptsCounter.get(timestamp);

        if (counter) {
          averageAdjusted.set(timestamp, {
            userPoints: points.userPoints,
            groupPoints: points.groupPoints / counter,
          });
        }
      });

      const sortedAndAggregated = sortAndAggretatePoints(averageAdjusted);

      return sortedAndAggregated;
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        cause: error,
      });
    }
  }),
});
