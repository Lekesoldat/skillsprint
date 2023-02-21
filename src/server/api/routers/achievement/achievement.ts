import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { achievements } from "./achievement-data";

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
          if (
            achievement.progress < longestStreak &&
            longestStreak <= achievement.requirement
          )
            achievement.progress = longestStreak;
          break;
        }
        case "SOLVED": {
          let counter = 0;
          solved.forEach((val) => (counter += val));
          achievement.progress =
            counter >= achievement.requirement
              ? achievement.requirement
              : counter;
          break;
        }
        case "CATEGORIES_ATTEMPED": {
          if (achievement.progress <= solved.size) {
            achievement.progress = solved.size;
          }
          break;
        }
        case "FULL_CATEGORY": {
          for (const [category, solvedCount] of solved.entries()) {
            const availableTaskCount =
              categories.find((cat) => cat.id === category)?.task.length || 0;
            console.log({ availableTaskCount, solvedCount });
            if (solvedCount >= availableTaskCount) {
              achievement.progress = achievement.requirement;
            }
          }
        }
      }
    }

    return achievements;
  }),
});
