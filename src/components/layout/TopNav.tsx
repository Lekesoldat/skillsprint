import { BookOpen, LineChart, Medal, Trophy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { api } from "../../utils/api";
const links = [
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
  const { data: user } = api.auth.me.useQuery(undefined, {
    staleTime: Infinity,
  });
  return (
    <header className="mx-auto w-full max-w-screen-lg px-4 sm:px-9">
      <div className="flex h-16">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="logo" width={60} height={60} />
        </Link>
        <NavigationMenu />
        <div className="flex flex-grow items-center justify-end md:flex-grow-0">
          <span className="flex min-w-[150px] justify-between border-2 border-brand-black bg-brand-pink py-3 px-5 font-bold shadow-4-right shadow-brand-black">
            <div>{user ? <>🎉 {user.points} p</> : "🎉 0 p"}</div>
            <div className="ml-2 border-l-2 border-brand-black pl-2">
              {user ? user.streak : 0} 🚀
            </div>
          </span>
        </div>
      </div>
    </header>
  );
};

const NavigationMenu = () => {
  return (
    <nav className="relative z-10 ml-6 flex w-min flex-1 items-center md:flex">
      <ul className="group flex flex-1 list-none items-center justify-start">
        {links.map((link) => (
          <li
            key={link.text}
            className="text-md inline-flex h-10 items-center justify-center rounded-md bg-transparent py-2 px-4 font-semibold transition-colors hover:bg-purple-100"
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
