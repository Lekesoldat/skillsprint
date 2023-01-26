import type { ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...classes: ClassValue[]): string => {
  return twMerge(clsx(classes));
};

export const capitalize = (str: string) =>
  str[0] ? str[0].toUpperCase() + str.slice(1) : str.slice(1);
