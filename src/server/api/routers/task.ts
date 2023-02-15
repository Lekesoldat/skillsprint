import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const taskRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.task.findMany();
    } catch (error) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        cause: error,
      });
    }
  }),

  getById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input: { id } }) => {
      try {
        return await ctx.prisma.task.findUniqueOrThrow({ where: { id } });
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          cause: error,
        });
      }
    }),

  getByIdIncludeCategory: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input: { id } }) => {
      try {
        return await ctx.prisma.task.findUniqueOrThrow({
          where: { id },
          include: { category: true },
        });
      } catch (error) {
        throw new TRPCError({
          code: "NOT_FOUND",
          cause: error,
        });
      }
    }),
  getAllAvailableTaskIds: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.task.findMany({
      select: { id: true },
    });
  }),
});
