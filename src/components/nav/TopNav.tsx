import { BookOpen, LineChart, Medal, Trophy } from "lucide-react";
import { Points } from "../Points";
export const TopNav = () => {
  return (
    <nav className="w-full py-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Brand Icon */}
        <div>Icon</div>

        {/* Links */}
        <ul className="flex gap-x-8 uppercase md:flex-row">
          <li className="flex gap-x-2">
            <BookOpen />
            Oppgaver
          </li>
          <li className="flex gap-x-2">
            <Trophy />
            Ledertavle
          </li>
          <li className="flex gap-x-2">
            <Medal />
            Prestasjoner
          </li>
          <li className="flex gap-x-2">
            <LineChart />
            Innsikt
          </li>
        </ul>

        {/* Points */}
        <Points points={1231} />
      </div>
    </nav>
  );
};
