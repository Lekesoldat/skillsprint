"use client";

import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import type { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import { useSupabase } from "../context/AuthContext";

interface LoginProps {
  session: Session | null;
}
export const Login: FC<LoginProps> = (props) => {
  const { supabase } = useSupabase();
  const router = useRouter();
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.access_token !== props.session?.access_token) {
        router.refresh();
      }
    });
    return () => subscription.unsubscribe();
  }, [props.session?.access_token]);

  return (
    <div className="grid h-full w-full place-content-center">
      <div className="w-[400px]">
        <h1 className="text-center font-bold">Fragile Flower</h1>
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      </div>
    </div>
  );
};
