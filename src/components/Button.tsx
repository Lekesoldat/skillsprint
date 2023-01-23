import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

interface ButtonProps {
  text: string;
  type?: VariantProps<typeof buttonStyle>["type"];
}

export const Button = (props: ButtonProps) => {
  return (
    <button type="button" className={buttonStyle({ type: props.type })}>
      {props.text}
    </button>
  );
};

const buttonStyle = cva(
  [
    // Text
    "text-brand-black",
    "font-bold",
    "uppercase",

    // Border
    "border",
    "border-brand-black",

    // Size
    "min-w-[150px]",

    // Misc
    "rounded",
    "bg-brand-yellow",
  ],
  {
    variants: {
      size: {
        xs: "text-xs px-2.5 py-1.5",
        sm: "text-sm px-3 py-2",
        md: "text-md px-3.5 py-2.5",
        lg: "text-lg px-4 py-3",
      },
      type: {
        shadow: ["shadow-brand-black", "shadow-4-skew"],
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
);
