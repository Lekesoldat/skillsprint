import { ComputeEngine } from "@cortex-js/compute-engine";
import { TRPCError } from "@trpc/server";
import { differenceInSeconds, format } from "date-fns";
import { z } from "zod";
import {
  roundToFifthMinute,
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
        return { ...recentAttempt, result: result };
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
        const rounded = roundToFifthMinute(a.createdAt);
        const timestamp = format(rounded, "HH:mm");

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

      return sortAndAggretatePoints(respondentsAtTime, pointsAtTime);
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
