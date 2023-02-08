import { BookOpen, LineChart, Medal, Trophy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../utils/classnames";
import { Points } from "../ui/Points";

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
      <Points points={1231} />
    </nav>
  );
};
