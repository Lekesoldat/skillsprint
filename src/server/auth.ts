import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";

export const getServerAuthSession = async (
  ctx: Pick<CreateNextContextOptions, "req" | "res">
) => {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
};
