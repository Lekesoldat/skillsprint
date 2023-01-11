"use client";
import { useQuery } from "@tanstack/react-query";
import { signOut, signIn, getSession } from "next-auth/react";
import { api } from "../utils/api";

export default function AuthShowcase() {
  const { data: sessionData } = useQuery({
    queryKey: ["session"],
    queryFn: () => getSession(),
  });
  const { data: message } = api.example.getSecretMessage.useQuery(undefined, {
    enabled: !!sessionData?.user,
  });

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {sessionData && (
        <p className="text-2xl text-blue-500">
          Logged in as {sessionData?.user?.name}
        </p>
      )}
      {message && <p className="text-2xl text-blue-500">{message}</p>}
      <button
        className="rounded-md border border-black bg-violet-50 px-4 py-2 text-xl shadow-lg hover:bg-violet-100"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
