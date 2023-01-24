"use client";
import { useQuery } from "@tanstack/react-query";
import { getSession, signIn, signOut } from "next-auth/react";

export default function AuthShowcase() {
  const { data: sessionData } = useQuery({
    queryKey: ["session"],
    queryFn: () => getSession(),
  });

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {sessionData && (
        <p className="text-blue-500 text-2xl">
          Logged in as {sessionData?.user?.name}
        </p>
      )}
      {JSON.stringify(sessionData)}
      <button
        className="border-black bg-violet-50 hover:bg-violet-100 rounded-md border px-4 py-2 text-xl shadow-lg"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
