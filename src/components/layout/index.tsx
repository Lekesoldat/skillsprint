import type { PropsWithChildren } from "react";

import { Space_Grotesk } from "@next/font/google";
import { FooterContent } from "./FooterContent";
import { TopNav } from "./TopNav";

const spaceGrotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--space-grotesk",
  subsets: ["latin", "latin-ext"],
});

export function Layout(props: PropsWithChildren) {
  return (
    <main
      className={
        "flex h-full min-h-screen w-full flex-col font-space-grotesk" +
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
