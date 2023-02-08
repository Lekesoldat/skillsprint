import type { PropsWithChildren } from "react";

import { Space_Grotesk } from "@next/font/google";
import localFont from "@next/font/local";
import { FooterContent } from "./FooterContent";
import { TopNav } from "./TopNav";

const spaceGrotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--space-grotesk",
  subsets: ["latin", "latin-ext"],
});

// const katex = localFont({
//   src: [
//     {
//       path: "./Roboto-Regular.woff2",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "./Roboto-Italic.woff2",
//       weight: "400",
//       style: "italic",
//     },
//     {
//       path: "./Roboto-Bold.woff2",
//       weight: "700",
//       style: "normal",
//     },
//     {
//       path: "./Roboto-BoldItalic.woff2",
//       weight: "700",
//       style: "italic",
//     },
//   ],
// });

export function Layout(props: PropsWithChildren) {
  return (
    <main
      className={
        "flex h-full min-h-screen w-full flex-col bg-background font-space-grotesk" +
        ` ${spaceGrotesk.variable}`
      }
    >
      <header className="sticky w-full py-4">
        <TopNav />
      </header>

      <main className="mx-auto w-full max-w-7xl flex-grow">
        {props.children}
      </main>

      <footer className="mx-auto mb-0 w-full bg-[#29314D] py-4">
        <FooterContent />
      </footer>
    </main>
  );
}
