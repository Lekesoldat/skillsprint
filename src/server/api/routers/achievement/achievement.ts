import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import type { Achievement } from "./achievement-data";
import { achievements } from "./achievement-data";

export const achievementRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const [categories, attempts, user] = await ctx.prisma.$transaction([
      ctx.prisma.category.findMany({
        include: {
          task: true,
        },
      }),
      ctx.prisma.taskAttempt.findMany({
        where: {
          userId: ctx.session.user.id,
        },
        orderBy: {
          createdAt: "asc",
        },
      }),
      ctx.prisma.user.findUniqueOrThrow({
        where: {
          id: ctx.session.user.id,
        },
      }),
    ]);
    const taskToCategory = new Map<string, string>();
    for (const category of categories) {
      for (const t of category.task) {
        taskToCategory.set(t.id, category.id);
      }
    }

    let longestStreak = 0;
    let streak = 0;
    const solved = new Map<string, number>();
    for (const attempt of attempts) {
      if (attempt.result === "SUCCESS") {
        streak += 1;
        if (streak > longestStreak) {
          longestStreak = streak;
        }
        const category = taskToCategory.get(attempt.taskId);
        if (category) {
          solved.set(category, (solved.get(category) || 0) + 1);
        }
      } else if (attempt.result === "FAIL") {
        longestStreak = streak;
        streak = 0;
      }
    }

    const locked: Achievement[] = [];
    const unlocked: Achievement[] = [];

    for (const achievement of achievements) {
      if (user.unlockedAchievements.includes(achievement.title)) {
        unlocked.push({
          ...achievement,
          progress: achievement.requirement,
          unlocked: true,
        });
        continue;
      }
      switch (achievement.type) {
        case "STREAK": {
          updateAndCapProgress(achievement, longestStreak);
          break;
        }
        case "SOLVED": {
          let counter = 0;
          solved.forEach((val) => (counter += val));
          updateAndCapProgress(achievement, counter);
          break;
        }
        case "CATEGORIES_ATTEMPED": {
          updateAndCapProgress(achievement, solved.size);
          break;
        }
        case "FULL_CATEGORY": {
          let solvedFullCategoriesCount = 0;
          for (const [category, solvedCount] of solved.entries()) {
            const availableTaskCount =
              categories.find((cat) => cat.id === category)?.task.length || 0;

            if (solvedCount >= availableTaskCount) {
              solvedFullCategoriesCount += 1;
            }
          }
          updateAndCapProgress(achievement, solvedFullCategoriesCount);
          break;
        }
      }
      locked.push(achievement);
    }
    return [...locked, ...unlocked].sort((a, b) => {
      const typeSort = b.type.localeCompare(a.type);
      if (typeSort === 0) {
        return a.requirement - b.requirement;
      } else {
        return typeSort;
      }
    });
  }),
  unlock: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUniqueOrThrow({
        where: {
          id: ctx.session.user.id,
        },
      });
      if (user.unlockedAchievements.includes(input.title)) {
        return;
      }

      const achievement = achievements.find((ach) => ach.title === input.title);

      if (achievement) {
        await ctx.prisma.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            points2: {
              increment: 200,
            },
            unlockedAchievements: {
              push: achievement?.title,
            },
          },
        });
      }
    }),
});

const updateAndCapProgress = (achievement: Achievement, progress: number) => {
  if (progress >= achievement.requirement) {
    achievement.progress = achievement.requirement;
  } else {
    achievement.progress = progress;
  }
};
