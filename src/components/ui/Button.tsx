import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import React from "react";
import { cn } from "../../utils/classnames";
import { Spinner } from "./loaders/Spinner";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ size, variant }), className)}
        ref={ref}
        disabled={!!loading || props.disabled}
        {...props}
      >
        {loading ? <Spinner /> : props.children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      size: {
        xs: "text-xs px-2.5 py-1.5",
        sm: "text-sm px-3 py-2",
        md: "text-md px-3.5 py-2.5",
        lg: "text-lg px-4 py-3",
      },
      variant: {
        brand:
          "uppercase bg-brand-yellow text-brand-black border-brand-black font-bold border-2 shadow-brand",
        outline: "bg-white border-2 border-brand-black",
        ghost:
          "bg-transparent hover:bg-slate-100 data-[state=open]:bg-transparent",
        icon: "bg-brand-purple border-brand-black font-bold border-2 shadow-2-hard",
      },
    },
    defaultVariants: {
      size: "lg",
      variant: "brand",
    },
  }
);
