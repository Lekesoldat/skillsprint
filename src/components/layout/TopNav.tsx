import { BookOpen, LineChart, Loader2, Medal, Trophy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { api } from "../../utils/api";
import { cn } from "../../utils/classnames";

const links = [
  {
    icon: <BookOpen />,
    path: "/tasks",
    text: "Oppgaver",
  },
  {
    icon: <Trophy />,
    path: "/leaderboard",
    text: "Ledertavle",
  },
  {
    icon: <Medal />,
    path: "/achievements",
    text: "Prestasjoner",
  },
  {
    icon: <LineChart />,
    path: "/insight",
    text: "Innsikt",
  },
];
export const TopNav = () => {
  const currentPath = usePathname();
  const { data: user } = api.auth.me.useQuery();

  return (
    <nav className="container mx-auto flex items-center justify-between">
      {/* Brand Icon */}
      <Link href="/">
        <Image src={"/Logo.svg"} alt="logo" width={40} height={40} />
      </Link>

      {/* Links */}
      <ul className="flex gap-x-16 uppercase md:flex-row">
        {links.map((link) => (
          <Link key={link.path} href={link.path}>
            <li
              className={cn(
                "flex gap-x-2",
                currentPath === link.path && "border-b-2 border-brand-black"
              )}
            >
              {link.icon}
              {link.text}
            </li>
          </Link>
        ))}
      </ul>

      {/* Points */}
      <span className="grid min-w-[150px] place-content-center border-2 border-brand-black bg-brand-purple py-3 px-5 font-bold shadow-4-right shadow-brand-black">
        {user ? <>🎉 {user.points} p</> : <Loader2 className="animate-spin" />}
      </span>
    </nav>
  );
};
