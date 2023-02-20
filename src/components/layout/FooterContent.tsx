import { useQuery } from "@tanstack/react-query";
import { getSession } from "next-auth/react";
import { format } from "date-fns";
import { nb } from "date-fns/locale";

export const FooterContent = () => {
  const { data: sessionData } = useQuery({
    queryKey: ["session"],
    queryFn: () => getSession(),
  });

  return (
    <div className="flex w-full items-center justify-between px-8 text-brand-white">
      <div>👋, {sessionData?.user?.name}</div>
      {/* <div className="flex flex-1 justify-center">
        Anh-Kha & Magnus&apos; masteroppgave @ NTNU
      </div> */}
      <div>{format(new Date(), "eeee Mo MMMM", { locale: nb })}</div>
    </div>
  );
};
