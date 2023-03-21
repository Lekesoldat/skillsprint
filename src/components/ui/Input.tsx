import React from "react";
import { cn } from "../../utils/classnames";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      className={cn(
        "flex w-full rounded-md border border-black bg-white py-2 px-4 text-xl shadow-2-hard",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
