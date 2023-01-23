import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

interface BadgeProps {
  text: string;
  color?: VariantProps<typeof badgeStyle>["color"];
}

export const Badge = (props: BadgeProps) => {
  return (
    <span className={badgeStyle({ color: props.color })}>{props.text}</span>
  );
};

const badgeStyle = cva(
  [
    // Text
    "text-brand-black",
    "capitalize",

    // Border
    "border",
    "border-brand-black",

    // Spacing
    "py-1.5",
    "px-2.5",

    // Misc
    "rounded-md",
  ],
  {
    variants: {
      size: {
        xs: "text-xs px-2.5 py-1.5",
        sm: "text-sm px-3 py-2",
        md: "text-md px-3.5 py-2.5",
        lg: "text-lg px-4 py-3",
      },
      color: {
        blue: "bg-brand-blue",
        red: "bg-brand-red",
        green: "bg-brand-green",
        pink: "bg-brand-pink",
        yellow: "bg-brand-yellow",
        purple: "bg-brand-purple",
      },
    },
    defaultVariants: {
      color: "pink",
    },
  }
);
