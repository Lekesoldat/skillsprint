import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(async ({ input, ctx }) => {
      const lmao = await ctx.db.nextauth_users.getFirst();
      if (!lmao) {
        throw new TRPCError({
          code: "NOT_FOUND",
          cause: "User not found",
        });
      }
      return {
        hei: lmao.name,
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
});
