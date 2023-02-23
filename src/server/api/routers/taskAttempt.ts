import { ComputeEngine } from "@cortex-js/compute-engine";
import type { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { differenceInSeconds, format, formatISO, subMinutes } from "date-fns";
import { z } from "zod";
import {
  roundToNthMinute,
  sortAndAggretatePoints,
} from "../../../utils/attempt-helpers";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const SuccessfullCategoriesSchema = z
  .object({
    name: z.string(),
    count: z.number(),
  })
  .array();

export const taskAttemptRouter = createTRPCRouter({
  startAttempt: protectedProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const recentAttempt = await ctx.prisma.taskAttempt.findFirst({
        where: {
          userId: ctx.session.user.id,
          taskId: input,
          result: { in: ["PENDING", "SUCCESS"] },
        },
        take: -1,
      });
      if (recentAttempt) {
        return recentAttempt;
      } else {
        return startNewAttempt(ctx.prisma, input, ctx.session.user.id);
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
      const userId = ctx.session.user.id;
      const [task, recentAttempt, user] = await ctx.prisma.$transaction([
        ctx.prisma.task.findUnique({
          where: {
            id: input.taskId,
          },
        }),
        ctx.prisma.taskAttempt.findFirst({
          where: {
            userId,
            taskId: input.taskId,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        }),
        ctx.prisma.user.findUnique({
          where: {
            id: userId,
          },
        }),
      ]);

      if (!task || !recentAttempt) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid Task",
        });
      }

      const alreadyAnswered = recentAttempt.result === "SUCCESS";

      const ce = new ComputeEngine();
      const answer = ce.parse(input.answer);
      const solution = ce.parse(task.answer);

      const result: "SUCCESS" | "FAIL" = answer.isSame(solution)
        ? "SUCCESS"
        : "FAIL";

      if (alreadyAnswered) {
        return { ...recentAttempt, result: result };
      }

      if (result === "SUCCESS") {
        await ctx.prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            points: {
              increment: task.points,
            },
            streak: {
              increment: 1,
            },
            bestStreak:
              user && user.streak === user.bestStreak
                ? { increment: 1 }
                : undefined,
          },
        });
      } else if (result === "FAIL") {
        // Reset streak and create a new attempt
        await ctx.prisma.$transaction([
          ctx.prisma.user.update({
            where: {
              id: userId,
            },
            data: {
              streak: 0,
            },
          }),
          startNewAttempt(ctx.prisma, input.taskId, userId),
        ]);
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

  getUserAttempts: protectedProcedure.query(async ({ ctx }) => {
    try {
      const res = await ctx.prisma.taskAttempt.groupBy({
        by: ["result"],
        where: {
          userId: ctx.session.user.id,
          OR: [{ result: "SUCCESS" }, { result: "FAIL" }],
        },
        _count: {
          result: true,
        },
      });

      return res.map((r) => ({
        result: r.result,
        count: r._count.result,
      }));
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        cause: error,
      });
    }
  }),

  getSuccessGrouped: protectedProcedure.query(async ({ ctx }) => {
    const GRAPH_INTERVAL = 1.5; // TODO: Go back to 5 for production

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
      const respondentsAtTime = new Map<string, string[]>();

      // Points aquired in a time interval
      const pointsAtTime = new Map<
        string,
        { groupPoints: number; userPoints: number }
      >();

      attempts.forEach((a) => {
        // Round timestamp to nearest fith and extract HH:mm
        const rounded = roundToNthMinute(a.createdAt, GRAPH_INTERVAL);
        const timestamp = formatISO(rounded);

        const points = taskToPoints.get(a.taskId) || 0;

        // Get points at time as well as counter
        const entry = pointsAtTime.get(timestamp);
        const respondents = respondentsAtTime.get(timestamp);

        // If timestamp and respondents list exists, update points at timestamp and respondents
        if (entry && respondents) {
          // If the user has not answered in this time interval
          if (!respondents.includes(a.userId)) {
            respondentsAtTime.set(timestamp, [...respondents, a.userId]);
          }

          // If current user is the task solver, update user points and group points
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

          // If time interval does not exist, add to points and respondents maps
        } else {
          respondentsAtTime.set(timestamp, [a.userId]);

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

      const sortedAndAggregated = sortAndAggretatePoints(
        respondentsAtTime,
        pointsAtTime
      );

      const first = sortedAndAggregated[0];

      if (first) {
        const newFirst = subMinutes(new Date(first.timestamp), GRAPH_INTERVAL);
        sortedAndAggregated.unshift({
          group_sum: 0,
          user_sum: 0,
          timestamp: newFirst.toISOString(),
        });
      }

      return sortedAndAggregated.map((s) => ({
        ...s,
        timestamp: format(new Date(s.timestamp), "HH:mm"),
      }));
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        cause: error,
      });
    }
  }),

  getCategoriesOfSuccesses: protectedProcedure.query(async ({ ctx }) => {
    try {
      const res = await ctx.prisma.$queryRaw`
        SELECT 
          name, 
          count(*)::int
        FROM "TaskAttempt" ta
        JOIN "Task" t ON t.id = ta."task_id" 
        JOIN "Category" cat ON cat.id = t."category_id"
        WHERE ta.result='SUCCESS' AND ta."user_id"=${ctx.session.user.id}
        GROUP BY 1
      `;

      return SuccessfullCategoriesSchema.parse(res);
    } catch (error) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", cause: error });
    }
  }),
});

const startNewAttempt = (
  prisma: PrismaClient,
  taskId: string,
  userId: string
) =>
  prisma.taskAttempt.create({
    data: {
      result: "PENDING",
      taskId,
      userId,
      elapsedTime: 0,
      createdAt: new Date(),
    },
  });
