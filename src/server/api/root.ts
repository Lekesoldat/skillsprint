import { createTRPCRouter } from "./trpc";
import { authRouter } from "./routers/auth";
import { achievementRouter } from "./routers/achievement";
import { taskRouter } from "./routers/task";
import { categoryRouter } from "./routers/category";
import { taskAttemptRouter } from "./routers/taskAttempt";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  achievement: achievementRouter,
  taskAttempt: taskAttemptRouter,
  task: taskRouter,
  category: categoryRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
