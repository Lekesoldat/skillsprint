import { useEffect, useRef, useState } from "react";
import type { MathfieldElement } from "mathlive";

const MathInput = () => {
  const ref = useRef<MathfieldElement>(null);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    import("mathlive");
  }, []);

  useEffect(() => {
    console.log(ref.current);
    const el = ref.current;
    if (el) {
      el.virtualKeyboardMode = "manual";
      el.onchange = () => {
        setValue(el.value);
        console.log(el.value);
      };
    }
  }, [ref]);

  return (
    <div>
      <math-field
        sounds-directory="https://unpkg.com/mathlive@0.87.1/dist/sounds/"
        fonts-directory="https://unpkg.com/mathlive@0.87.1/dist/fonts/"
        ref={ref}
        class="border border-black"
        // virtual-keyboard-mode="manual"
      ></math-field>
    </div>
  );
};
export default MathInput;
