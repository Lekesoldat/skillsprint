import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import argon2 from "argon2";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const authRouter = createTRPCRouter({
  signup: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password1: z.string(),
        password2: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (input.password1 !== input.password2) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Passwords do not match",
        });
      }
      try {
        const hash = await argon2.hash(input.password1);
        const user = await ctx.prisma.user.create({
          data: {
            name: input.username,
            password: hash,
          },
        });
        return user;
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          cause: err,
        });
      }
    }),
  login: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          name: input.username,
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid Login",
        });
      }
      const valid = await argon2.verify(user.password, input.password);
      if (!valid) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid password",
        });
      }
      return user;
    }),

  me: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
  }),
});
