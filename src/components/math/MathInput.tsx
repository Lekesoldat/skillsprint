import { FC, useEffect, useRef, useState } from "react";
import type { MathfieldElement } from "mathlive";

interface MathInputProps {
  onChange: (value: string) => void;
}

const MathInput: FC<MathInputProps> = ({ onChange }) => {
  const ref = useRef<MathfieldElement>(null);

  useEffect(() => {
    import("mathlive");
  }, []);

  useEffect(() => {
    console.log(ref.current);
    const el = ref.current;
    if (el) {
      el.virtualKeyboardMode = "onfocus";
      el.onchange = () => {
        onChange(el.value);
      };
    }
  }, [ref]);

  return (
    <math-field
      sounds-directory="https://unpkg.com/mathlive@0.87.1/dist/sounds/"
      fonts-directory="https://unpkg.com/mathlive@0.87.1/dist/fonts/"
      ref={ref}
      // virtual-keyboard-mode="manual"
      class="min-w-[300px] rounded-md border border-black bg-white py-2 px-4 text-xl shadow-2-hard"
    ></math-field>
  );
};
export default MathInput;
