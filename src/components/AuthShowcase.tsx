import { useQuery } from "@tanstack/react-query";
import { getSession, signIn } from "next-auth/react";

export default function AuthShowcase() {
  const { data: sessionData } = useQuery({
    queryKey: ["session"],
    queryFn: () => getSession(),
  });

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {sessionData && (
        <>
          <p className="text-2xl text-blue-500">
            Velkommen, {sessionData?.user?.name} 👋
          </p>
        </>
      )}
      {!sessionData ? (
        <button
          className="rounded-md border border-black bg-violet-50 px-4 py-2 text-xl shadow-lg hover:bg-violet-100"
          onClick={() => signIn()}
        >
          Logg inn
        </button>
      ) : null}
    </div>
  );
}
