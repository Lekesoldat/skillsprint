import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import React from "react";
import { cn } from "../../utils/classnames";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ size, variant }), className)}
        ref={ref}
        {...props}
      >
        {props.children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

const buttonVariants = cva(
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
      variant: {
        shadow: ["shadow-brand-black", "shadow-4-right"],
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
);
