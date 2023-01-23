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
