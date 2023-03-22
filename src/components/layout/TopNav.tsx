import { BookOpen, Home, LineChart, Medal, Trophy } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { posthog } from "posthog-js";
import { api } from "../../utils/api";
import { Spinner } from "../ui/loaders/Spinner";
const links = [
  {
    icon: <Home height={20} />,
    path: "/",
    text: "",
  },
  {
    icon: <BookOpen height={20} />,
    path: "/tasks",
    text: "Oppgaver",
  },
  {
    icon: <Trophy height={20} />,
    path: "/leaderboard",
    text: "Ledertavle",
  },
  {
    icon: <Medal height={20} />,
    path: "/achievements",
    text: "Prestasjoner",
  },
  {
    icon: <LineChart height={20} />,
    path: "/insight",
    text: "Innsikt",
  },
];

export const TopNav = () => {
  const { data } = useSession();
  const { data: user, isLoading } = api.auth.me.useQuery(undefined, {
    staleTime: Infinity,
    enabled: !!data?.user,
    onSuccess: (data) => {
      if (data) {
        posthog.identify(data.id);
      }
    },
  });

  return (
    <header className="mx-auto mt-2 w-full max-w-screen-lg ">
      <div className="flex h-16 items-center justify-between px-10 lg:px-0">
        {/* <Link href="/" className="flex items-center">
          <Image
            src="https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/icons/achievements/049-mortarboard.svg"
            alt="logo"
            width={60}
            height={60}
          />
        </Link> */}
        <NavigationMenu />
        <div className="flex flex-grow items-center justify-end md:flex-grow-0">
          <span className="flex min-w-[150px] justify-around rounded-md border-2 border-brand-black bg-brand-pink py-3 px-5 font-bold shadow-4-right shadow-brand-black">
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <div>{user ? <>{user.points2} p</> : "0 p"}</div>
                <div>{user ? user.streak : 0} 🔥</div>
              </>
            )}
          </span>
        </div>
      </div>
    </header>
  );
};

const NavigationMenu = () => {
  return (
    <nav className="relative z-10 flex w-min items-center md:flex">
      <ul className="group flex flex-1 list-none items-center justify-start">
        {links.map((link) => (
          <li
            key={link.text}
            className="text-md inline-flex h-10 items-center justify-center rounded-md bg-transparent py-2 px-2 font-semibold transition-colors hover:bg-purple-100"
          >
            <Link
              href={link.path}
              className="grid grid-flow-col items-center gap-2 text-stone-800"
            >
              {link.icon}
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
