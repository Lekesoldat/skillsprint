import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { nb } from "date-fns/locale";
import { getSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export const FooterContent = () => {
  const { data: sessionData } = useQuery({
    queryKey: ["session"],
    queryFn: () => getSession(),
  });

  return (
    <div className="flex w-full items-center justify-between px-8 text-brand-white">
      {sessionData?.user?.name && <div>👋, {sessionData?.user?.name}</div>}

      <Link href={"/survey"}>
        <div>{format(new Date(), "eeee do MMMM", { locale: nb })}</div>
      </Link>

      <button
        className="rounded-md py-2 px-4 transition-colors hover:bg-purple-300"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Logg ut" : "Logg inn"}
      </button>
    </div>
  );
};
