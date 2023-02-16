import { cva } from "class-variance-authority";
import type { RouterOutputs } from "../utils/api";
import { Progress } from "./ui/Progress";

type Achievements = RouterOutputs["achievement"]["getAll"]; // Achievement[]

type Achievement = Achievements[number]; // Achievement
interface AchievementListProps {
  list: Achievements;
}
export const AchievementList = ({ list }: AchievementListProps) => {
  return (
    <div className="m-10 w-fit rounded-xl border-2 border-brand-lightGray bg-brand-white py-1">
      {list.map((a) => (
        <Achievement key={a.title} {...a} />
      ))}
    </div>
  );
};

const Achievement = ({
  title,
  icon,
  description,
  color,
  requirement,
}: Achievements[number]) => {
  return (
    <div className="flex border-t-2 border-brand-lightGray px-4 py-4 first:border-t-0">
      {/* Left side */}
      {/* Icon */}
      <div className={iconStyle({ color })}>
        {/* <div> */}
        <div>{icon}</div>
      </div>

      {/* Right side */}
      <div className="ml-2 flex-grow">
        {/* Title and requirement */}
        <div className="flex justify-between">
          <p className="font-bold uppercase">{title}</p>
          <p>2 av {requirement}</p>
        </div>

        {/* Progress */}
        <Progress value={(2 / requirement) * 100} />

        {/* Description */}
        <p className="text-brand-gray">{description}</p>
      </div>
    </div>
  );
};

const iconStyle = cva(
  "flex items-center p-4 rounded-xl shadow-achievment shadow-brand-black/20",
  {
    variants: {
      color: {
        GREEN: "bg-brand-green",
        BLUE: "bg-brand-blue",
        RED: "bg-brand-red",
        PINK: "bg-brand-pink",
        YELLOW: "bg-brand-yellow",
        PURPLE: "bg-brand-purple",
        GRAY: "bg-brand-gray",
        LIGHTGRAY: "bg-brand-lightGray",
        ORANGE: "bg-brand-orange",
      },
    },
  }
);
