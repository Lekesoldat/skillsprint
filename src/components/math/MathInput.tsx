import type { MathfieldElement } from "mathlive";
import type { FC } from "react";
import { useEffect, useRef } from "react";
import type { UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";
import type { FormValues } from "../../pages/tasks/[id]";

// export interface MathProps extends MathfieldElementAttributes {}
function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

export const MathInput: FC<
  UseControllerProps<FormValues> & { placeholder?: string }
> = (props) => {
  const ref = useRef<MathfieldElement>(null);

  const { field } = useController(props);

  useEffect(() => {
    import("mathlive");
    if (ref.current) {
      ref.current.onchange = field.onChange;
      ref.current.onblur = field.onBlur;
      ref.current.virtualKeyboardTheme = "apple";
      ref.current.virtualKeyboardMode = isTouchDevice() ? "auto" : "manual";
      ref.current.focus();
    }
  }, [field]);

  return (
    <math-field
      name={field.name}
      sounds-directory="https://unpkg.com/mathlive@0.87.1/dist/sounds/"
      fonts-directory="https://unpkg.com/mathlive@0.87.1/dist/fonts/"
      class="min-w-[300px] rounded-md border border-black bg-white py-2 px-4 text-xl shadow-2-hard"
      ref={ref}
    >
      {field.value}
    </math-field>
  );
};
