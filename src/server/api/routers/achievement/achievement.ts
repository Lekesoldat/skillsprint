import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { Achievement, achievements } from "./achievement-data";

export const achievementRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const [categories, attempts] = await Promise.all([
      ctx.prisma.category.findMany({
        include: {
          task: true,
        },
      }),
      ctx.prisma.taskAttempt.findMany({
        where: {
          userId: userId,
        },
        orderBy: {
          createdAt: "asc",
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
      console.log(attempt.result);
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
    for (const achievement of achievements) {
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

            console.log({ solvedCount, availableTaskCount });
            if (solvedCount >= availableTaskCount) {
              solvedFullCategoriesCount += 1;
            }
          }
          updateAndCapProgress(achievement, solvedFullCategoriesCount);
          break;
        }
      }
    }

    return achievements;
  }),
});

const updateAndCapProgress = (achievement: Achievement, progress: number) => {
  if (progress >= achievement.requirement) {
    achievement.progress = achievement.requirement;
  } else {
    achievement.progress = progress;
  }
};
