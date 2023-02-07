import { FC, forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import type { MathfieldElement, MathfieldElementAttributes } from "mathlive";
import {
  useController,
  UseControllerProps,
  UseFormRegister,
} from "react-hook-form";
import { FormValues } from "../../pages/tasks/[id]";

// export interface MathProps extends MathfieldElementAttributes {}

export const MathInput: FC<UseControllerProps<FormValues>> = (props) => {
  const ref = useRef<MathfieldElement>(null);

  const { field } = useController(props);

  useEffect(() => {
    import("mathlive");
    if (ref.current) {
      ref.current.onchange = field.onChange;
      ref.current.onblur = field.onBlur;
    }
  }, [field]);

  return (
    <math-field
      name={field.name}
      sounds-directory="https://unpkg.com/mathlive@0.87.1/dist/sounds/"
      fonts-directory="https://unpkg.com/mathlive@0.87.1/dist/fonts/"
      virtual-keyboard-mode="manual"
      class="min-w-[300px] rounded-md border border-black bg-white py-2 px-4 text-xl shadow-2-hard"
      ref={ref}
    >
      {field.value}
    </math-field>
  );
};
