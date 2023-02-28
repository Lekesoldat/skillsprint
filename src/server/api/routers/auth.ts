import { createTRPCRouter, protectedProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  me: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.user.findUnique({
      select: {
        id: true,
        points: true,
        name: true,
        streak: true,
        bestStreak: true,
        email: true,
        image: true,
        password: false,
      },
      where: {
        id: ctx.session.user.id,
      },
    });
  }),
});
