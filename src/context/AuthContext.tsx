"use client";
import type { Session, SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { createContext, useContext, useState } from "react";
import type { Database } from "../types/supabase.codegen";

type SupabaseContext = {
  supabase: SupabaseClient<Database>;
  session: Session | null;
};

const Context = createContext<SupabaseContext | null>(null);

interface SupabaseProps {
  session: Session | null;
  children: React.ReactNode;
}

export default function SupabaseProvider({ children, session }: SupabaseProps) {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <Context.Provider value={{ supabase, session }}>
      <>{children}</>
    </Context.Provider>
  );
}

export const useSupabase = () => {
  const ctx = useContext(Context);
  if (!ctx) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }
  return ctx;
};
