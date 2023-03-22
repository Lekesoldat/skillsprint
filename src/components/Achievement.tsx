import { cva } from "class-variance-authority";
import { CheckCircleIcon } from "lucide-react";
import Image from "next/image";
import { useToast } from "../hooks/use-toast";
import type { RouterOutputs } from "../utils/api";
import { api } from "../utils/api";
import { starsConfetti } from "../utils/confetti";
import { Button } from "./ui/Button";
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
  unlocked,
}: Achievement) => {
  const utils = api.useContext();
  const { toast } = useToast();
  const { mutate } = api.achievement.unlock.useMutation({
    onSuccess: () => {
      toast({
        title: "Du har løst inn en achievement! + 200 poeng",
        variant: "success",
      });
      starsConfetti();
      void utils.achievement.getAll.invalidate();
      void utils.auth.me.invalidate();
    },
  });
  const canUnlock = progress >= requirement;

  return (
    // <div className="flex border-t-2 border-brand-lightGray px-4 py-4 first:border-t-0">
    <div className="flex min-h-[125px] rounded-xl border border-brand-lightGray bg-brand-white p-4">
      {/* Left side */}
      <div className={iconStyle({ color: unlocked ? "YELLOW" : color })}>
        <Image src={avatar} width={50} height={50} alt="Avatar" />
      </div>

      {/* Right side */}
      <div className="ml-2 flex flex-grow flex-col justify-around gap-2">
        {/* Title and requirement */}
        <div className="flex justify-between">
          <p className="font-bold uppercase">{title}</p>
          {!unlocked ? (
            <p>
              {progress} av {requirement}
            </p>
          ) : (
            <CheckCircleIcon color="#22CA94" />
          )}
        </div>

        {!unlocked && !canUnlock && (
          <Progress value={(progress / requirement) * 100} />
        )}
        <p className="lg:text-md text-sm text-brand-gray">{description}</p>
        {canUnlock && !unlocked && (
          <div className="flex w-full justify-end">
            <Button size="xs" onClick={() => mutate({ title })}>
              Løs inn 200 poeng
            </Button>
          </div>
        )}
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
