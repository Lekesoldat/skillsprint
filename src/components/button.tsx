import { cva } from "class-variance-authority";

export const Button = () => {
  return <button className={button({ color: "blue" })}>Hello World</button>;
};

const button = cva("font-semibold border rounded", {
  variants: {
    color: {
      blue: "bg-blue-500",
      red: "bg-red-500",
    },
  },
});
