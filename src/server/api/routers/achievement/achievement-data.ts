type Color =
  | "GREEN"
  | "BLUE"
  | "RED"
  | "PINK"
  | "YELLOW"
  | "PURPLE"
  | "GRAY"
  | "LIGHTGRAY"
  | "ORANGE";

export type Achievement = {
  title: string;
  icon: string;
  description: string;
  progress: number;
  requirement: number;
  color: Color;
  type: "STREAK" | "SOLVED" | "CATEGORIES_ATTEMPED" | "FULL_CATEGORY";
};

export const achievements: Achievement[] = [
  {
    icon: "🏕️",
    title: "Leirbål",
    description: "Fullfør 3 oppgaver på rad",
    progress: 0,
    requirement: 3,
    color: "PINK",
    type: "STREAK",
  },
  {
    icon: "🔥",
    title: "Skogbrann",
    description: "Fullfør 5 oppgaver på rad",
    progress: 0,
    requirement: 5,
    color: "YELLOW",
    type: "STREAK",
  },
  {
    icon: "🌱",
    title: "Spire",
    description: "Løs din første oppgave",
    progress: 0,
    requirement: 1,
    color: "PINK",
    type: "SOLVED",
  },
  {
    icon: "🧠",
    title: "Dreven",
    description: "Fullfør 5 oppgaver",
    progress: 0,
    requirement: 5,
    color: "BLUE",
    type: "SOLVED",
  },
  {
    icon: "🚀",
    title: "Rakett",
    description: "Fullfør 10 oppgaver",
    progress: 0,
    requirement: 10,
    color: "GREEN",
    type: "SOLVED",
  },
  {
    icon: "💡",
    title: "Skolelys",
    description: "Fullfør 15 oppgaver",
    progress: 0,
    requirement: 15,
    color: "PURPLE",
    type: "SOLVED",
  },
  {
    icon: "🏆",
    title: "Mester",
    description: "Fullfør 20 oppgaver",
    progress: 0,
    requirement: 20,
    color: "BLUE",
    type: "SOLVED",
  },
  // {
  //   icon: "👀",
  //   title: "Pionér",
  //   description: "Prøv 1 oppgave fra <kategorinavn>",
  //   progress: 0,
  //   requirement: 1,
  //   color: "PINK",
  //   type: "CATEGORIES_ATTEMPED",
  // },
  {
    icon: "💯",
    title: "Profesjonell",
    description: "Fullfør en hel kategori",
    progress: 0,
    requirement: 1,
    color: "ORANGE",
    type: "FULL_CATEGORY",
  },
  {
    icon: "🤖",
    title: "Ferdigstiller",
    description: "Fullfør alle 5 kategoriene",
    progress: 0,
    requirement: 5,
    color: "RED",
    type: "FULL_CATEGORY",
  },
  {
    icon: "🕵🏻",
    title: "Utforsker",
    description: "Løs 1 oppgave i 4 kategorier",
    progress: 0,
    requirement: 4,
    color: "BLUE",
    type: "CATEGORIES_ATTEMPED",
  },
];
