import { BookOpen, LineChart, Medal, Trophy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Points } from "../Points";

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
  return (
    <nav className="w-full py-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Brand Icon */}
        <Link href="/">
          <Image src={"/Logo.svg"} alt="logo" width={40} height={40} />
        </Link>

        {/* Links */}
        <ul className="flex gap-x-16 uppercase md:flex-row">
          {links.map((link) => (
            <Link key={link.path} href={link.path}>
              <li className="flex gap-x-2">
                {link.icon}
                {link.text}
              </li>
            </Link>
          ))}
        </ul>

        {/* Points */}
        <Points points={1231} />
      </div>
    </nav>
  );
};
