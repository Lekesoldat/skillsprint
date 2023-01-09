import { httpBatchLink, loggerLink } from "@trpc/client";
import type { CreateTRPCClientOptions } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { createTRPCReact } from "@trpc/react-query";
import { type GetInferenceHelpers } from "@trpc/server";
import superjson from "superjson";

import { type AppRouter } from "../server/trpc/router/_app";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

/**
 * Inference helpers
 * @example type HelloOutput = RouterTypes['example']['hello']['output']
 **/

export const trpcConfig: CreateTRPCClientOptions<AppRouter> = {
  transformer: superjson,
  links: [
    loggerLink({
      enabled: (opts) =>
        process.env.NODE_ENV === "development" ||
        (opts.direction === "down" && opts.result instanceof Error),
    }),
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
};

// For /app/
export const trpc = createTRPCReact<AppRouter>({
  unstable_overrides: {
    useMutation: {
      async onSuccess(opts) {
        await opts.originalFn();
        await opts.queryClient.invalidateQueries();
      },
    },
  },
});

// For /pages/
export const trpcNext = createTRPCNext<AppRouter>({
  config() {
    return trpcConfig;
  },
  ssr: false,
});

/**
 * Inference helpers
 * @example type HelloOutput = RouterTypes['example']['hello']['output']
 **/
export type RouterTypes = GetInferenceHelpers<AppRouter>;
