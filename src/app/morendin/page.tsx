import { getSession } from "next-auth/react";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import { createContextInner } from "../../server/trpc/context";
import { appRouter } from "../../server/trpc/router/_app";
import AuthShowcase from "./components/page";

export const getCaller = async () => {
  const session = await getSession();
  const context = await createContextInner({ session });
  return appRouter.createCaller(context);
};

export default async function MorenDin(props: PropsWithChildren) {
  const caller = await getCaller();
  const hello = await caller.example.hello({ text: "World" });

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
        Create <span className="text-purple-300">T3</span> App
      </h1>
      <p className="text-2xl text-gray-700">This stack uses:</p>
      <div className="mt-3 grid gap-3 pt-3 text-center md:grid-cols-3 lg:w-2/3">
        <TechnologyCard
          name="NextJS"
          description="The React framework for production"
          documentation="https://nextjs.org/"
        />
        <TechnologyCard
          name="TypeScript"
          description="Strongly typed programming language that builds on JavaScript, giving you better tooling at any scale"
          documentation="https://www.typescriptlang.org/"
        />
        <TechnologyCard
          name="TailwindCSS"
          description="Rapidly build modern websites without ever leaving your HTML"
          documentation="https://tailwindcss.com/"
        />
        <TechnologyCard
          name="tRPC"
          description="End-to-end typesafe APIs made easy"
          documentation="https://trpc.io/"
        />
        <TechnologyCard
          name="Next-Auth"
          description="Authentication for Next.js"
          documentation="https://next-auth.js.org/"
        />
        <TechnologyCard
          name="Prisma"
          description="Build data-driven JavaScript & TypeScript apps in less time"
          documentation="https://www.prisma.io/docs/"
        />
      </div>
      <div className="flex w-full items-center justify-center pt-6 text-2xl text-blue-500">
        {hello ? (
          <p>
            {hello.greeting} {hello.hei}
          </p>
        ) : (
          <p>Loading..</p>
        )}
      </div>
      <AuthShowcase />
    </main>
  );
}

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

const TechnologyCard = ({
  name,
  description,
  documentation,
}: TechnologyCardProps) => {
  return (
    <section className="flex flex-col justify-center rounded border-2 border-gray-500 p-6 shadow-xl duration-500 motion-safe:hover:scale-105">
      <h2 className="text-lg text-gray-700">{name}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <Link
        className="m-auto mt-3 w-fit text-sm text-violet-500 underline decoration-dotted underline-offset-2"
        href={documentation}
        target="_blank"
        rel="noreferrer"
      >
        Documentation
      </Link>
    </section>
  );
};
