type Color =
  | "GREEN"
  | "BLUE"
  | "RED"
  | "LIGHTRED"
  | "YELLOW"
  | "PURPLE"
  | "GRAY"
  | "LIGHTGRAY"
  | "LIGHTRED";

export type Achievement = {
  title: string;
  avatar: string;
  description: string;
  completeText: string;
  unlocked: boolean;
  progress: number;
  requirement: number;
  color: Color;
  type: "STREAK" | "SOLVED" | "CATEGORIES_ATTEMPED" | "FULL_CATEGORY";
};

export const achievements: Achievement[] = [
  // Streaks
  {
    title: "Skolebuss",
    avatar:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/icons/achievements/023-school%20bus.svg",
    description: "Fullfør 3 oppgaver på rad",
    completeText: "Du fullførte 3 oppgaver på rad!",
    progress: 0,
    unlocked: false,
    requirement: 3,
    color: "LIGHTRED",
    type: "STREAK",
  },
  {
    avatar:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/icons/achievements/014-solar%20system.svg",
    title: "Solsystem",
    description: "Fullfør 5 oppgaver på rad",
    completeText: "Du fullførte 5 oppgaver på rad!", // TODO
    progress: 0,
    unlocked: false,
    requirement: 5,
    color: "LIGHTRED",
    type: "STREAK",
  },
  {
    avatar:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/icons/achievements/038-easel.svg",
    title: "Staffeli",
    description: "Fullfør 7 oppgaver på rad",
    completeText: "Du fullførte 7 oppgaver på rad!",
    progress: 0,
    unlocked: false,
    requirement: 7,
    color: "LIGHTRED",
    type: "STREAK",
  },
  {
    avatar:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/icons/achievements/039-id%20card.svg",
    title: "ID-kort",
    description: "Fullfør 10 oppgaver på rad",
    completeText: "Du fullførte 10 oppgaver på rad!",
    progress: 0,
    unlocked: false,
    requirement: 10,
    color: "LIGHTRED",
    type: "STREAK",
  },
  {
    title: "Briller",
    avatar:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/icons/achievements/035-glasses.svg",
    description: "Løs din første oppgave",
    completeText: "Du fullførte din første oppgave!",
    progress: 0,
    unlocked: false,
    requirement: 1,
    color: "LIGHTRED",
    type: "SOLVED",
  },

  // Solved
  {
    avatar:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/icons/achievements/026-geography.svg",
    title: "Globus",
    description: "Fullfør 5 oppgaver",
    completeText: "Du fullførte 5 oppgaver på rad!",
    progress: 0,
    unlocked: false,
    requirement: 5,
    color: "GREEN",
    type: "SOLVED",
  },
  {
    avatar:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/icons/achievements/028-sculpture.svg",
    title: "Skulptur",
    description: "Fullfør 10 oppgaver",
    completeText: "Du fullførte 10 oppgaver på rad!",
    progress: 0,
    unlocked: false,
    requirement: 10,
    color: "GREEN",
    type: "SOLVED",
  },
  {
    avatar:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/icons/achievements/025-medal.svg",
    title: "Medalje",
    description: "Fullfør 15 oppgaver",
    completeText: "Du fullførte 15 oppgaver på rad!",
    progress: 0,
    unlocked: false,
    requirement: 15,
    color: "GREEN",
    type: "SOLVED",
  },
  {
    avatar:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/icons/achievements/037-trophy.svg",
    title: "Mester",
    description: "Fullfør 20 oppgaver",
    completeText: "Du fullførte 20 oppgaver på rad!",
    progress: 0,
    unlocked: false,
    requirement: 20,
    color: "GREEN",
    type: "SOLVED",
  },

  // Full category
  {
    avatar:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/icons/achievements/018-paper%20plane.svg",
    title: "Papirfly",
    description: "Fullfør en hel kategori",
    completeText: "Du fullførte en hel kategori!",
    progress: 0,
    unlocked: false,
    requirement: 1,
    color: "PURPLE",
    type: "FULL_CATEGORY",
  },
  {
    avatar:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/icons/achievements/019-exam.svg",
    title: "Eksamen",
    description: "Fullfør alle 5 kategoriene",
    completeText: "Du fullførte alle 5 kategoriene!",
    progress: 0,
    unlocked: false,
    requirement: 5,
    color: "PURPLE",
    type: "FULL_CATEGORY",
  },

  // Categories attemped
  {
    avatar:
      "https://tliacbojiuhirqtqavdn.supabase.co/storage/v1/object/public/icons/achievements/020-diploma.svg",
    title: "Diplom",
    description: "Løs én oppgave i hver kategori",
    completeText: "Du løste én oppgave i hver kategori!",
    progress: 0,
    unlocked: false,
    requirement: 4,
    color: "BLUE",
    type: "CATEGORIES_ATTEMPED",
  },
];
