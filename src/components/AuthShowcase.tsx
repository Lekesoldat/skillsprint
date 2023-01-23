"use client";
import type { Session } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useSupabase } from "../context/AuthContext";

interface AuthProps {
  session: Session | null;
}
export const AuthShowcase: FC<AuthProps> = (props) => {
  const { supabase } = useSupabase();
  return (
    <div>
      <div className="break-normal break-all">
        {JSON.stringify(props.session, null, 2)}
      </div>
      {props.session == null ? (
        <button>Login</button>
      ) : (
        <button
          onClick={async () => {
            await supabase.auth.signOut();
          }}
        >
          Logout
        </button>
      )}
    </div>
  );
};
