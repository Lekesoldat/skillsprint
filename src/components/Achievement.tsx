import { cva } from "class-variance-authority";
import Image from "next/image";
import type { RouterOutputs } from "../utils/api";
import { api } from "../utils/api";
import { Skeleton } from "./ui/loaders/Skeleton";
import { Progress } from "./ui/Progress";

type Achievements = RouterOutputs["achievement"]["getAll"]; // Achievement[]

type Achievement = Achievements[number]; // Achievement
export const AchievementList = () => {
  const { data } = api.achievement.getAll.useQuery();

  if (!data)
    return (
      <div>
        <Skeleton />
      </div>
    );

  return (
    <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8">
      {data.map((a) => (
        <Achievement key={a.title} {...a} />
      ))}
    </div>
  );
};

const Achievement = ({
  title,
  avatar,
  description,
  progress,
  color,
  requirement,
}: Achievement) => {
  return (
    // <div className="flex border-t-2 border-brand-lightGray px-4 py-4 first:border-t-0">
    <div className="flex rounded-xl border border-brand-lightGray bg-brand-white px-4 py-4">
      {/* Left side */}
      <div className={iconStyle({ color })}>
        <Image src={avatar} width={40} height={40} alt="Avatar" />
      </div>

      {/* Right side */}
      <div className="ml-2 flex-grow">
        {/* Title and requirement */}
        <div className="flex justify-between">
          <p className="font-bold uppercase">{title}</p>
          <p>
            {progress} av {requirement}
          </p>
        </div>

        {/* Progress */}
        <Progress value={(progress / requirement) * 100} />

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
        LIGHTRED: "bg-brand-red/80",
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
