import { ComputeEngine } from "@cortex-js/compute-engine";
import { TRPCError } from "@trpc/server";
import { differenceInSeconds, format } from "date-fns";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const GroupedAndAggregatedPointsSchema = z
  .object({
    timestamp: z.date(),
    user_sum: z.number().nullable(),
    group_sum: z.number(),
  })
  .array();

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

  getGroupedAndAggregatedPoints: protectedProcedure.query(async ({ ctx }) => {
    try {
      const res = await ctx.prisma.$queryRaw`
        WITH group_results AS (
          SELECT 
            date_trunc('hour', ta."created_at") as timestamp, 
            extract(minute FROM ta."created_at")::int/5 + 1 as five_min, 
            sum(t.points), 
            count(distinct u)
          FROM "TaskAttempt" ta
          JOIN "Task" t ON t."id" = ta."task_id"
          JOIN "User" u On u."id"=ta."user_id"
          WHERE result = 'SUCCESS'
          GROUP BY 1,2
          ORDER BY 1,2
        ),

        user_results AS (
          SELECT 
            date_trunc('hour', ta."created_at") as timestamp, 
            extract(minute FROM ta."created_at")::int/5 + 1 as five_min, 
            sum(t.points), 
            count(*)
          FROM "TaskAttempt" ta
          JOIN "Task" t ON t."id" = ta."task_id"
          WHERE result = 'SUCCESS'
          AND ta."user_id" = ${ctx.session.user.id}
          GROUP BY 1,2
          ORDER BY 1,2
        )

        SELECT 
          gr.timestamp + (gr.five_min * interval '5 minutes') as timestamp,
          sum(gr.sum/gr.count) OVER (ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)::int as group_sum,
          sum(ur.sum) OVER (ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)::int as user_sum
        FROM group_results gr
        LEFT JOIN user_results ur ON ur.timestamp = gr.timestamp AND ur.five_min = gr.five_min
      `;

      const validated = GroupedAndAggregatedPointsSchema.parse(res);

      const transformed = validated.map((x) => ({
        timestamp: format(new Date(x.timestamp), "HH:mm"),
        user_sum: x.user_sum ?? 0,
        group_sum: x.group_sum ?? 0,
      }));

      return transformed;
    } catch (error) {
      console.error(error);
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
