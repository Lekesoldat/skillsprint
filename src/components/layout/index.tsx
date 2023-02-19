import type { FC, PropsWithChildren } from "react";

import { Space_Grotesk } from "@next/font/google";
import { FooterContent } from "./FooterContent";
import { TopNav } from "./TopNav";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";

const spaceGrotesk = Space_Grotesk({
  variable: "--space-grotesk",
  subsets: ["latin", "latin-ext"],
});

const variants = {
  hidden: { opacity: 0, x: 0, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -20 },
};

interface LayoutProps extends PropsWithChildren {
  title?: string;
}

export const Layout: FC<LayoutProps> = ({
  children,
  title = "Fragile Flower",
}) => {
  const router = useRouter();
  return (
    <div
      className={
        "flex h-full min-h-screen w-full flex-col justify-between bg-background font-space-grotesk" +
        ` ${spaceGrotesk.variable}`
      }
    >
      <Head>
        <title>{title}</title>
      </Head>

      <header className="sticky w-full py-4">
        <TopNav />
      </header>

      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <motion.main
          key={router.asPath}
          variants={variants} // Pass the variant object into Framer Motion
          initial="hidden" // Set the initial state to variants.hidden
          animate="enter" // Animated state to variants.enter
          exit="exit" // Exit state (used later) to variants.exit
          transition={{ type: "linear" }} // Set the transition to linear
          className="mx-auto flex w-full max-w-screen-lg flex-grow px-6 py-10"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <footer className="mx-auto mb-0 w-full bg-[#29314D] py-4">
        <FooterContent />
      </footer>
    </div>
  );
};
