import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Layout } from "../components/layout";
import { Analytics } from "@vercel/analytics/react";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

import "../styles/globals.css";
import "../styles/mathlive-fonts.css";

import { api } from "../utils/api";
import { Toaster } from "../components/ui/Toaster";
import { env } from "../env/client.mjs";
import { useEffect } from "react";
import { useRouter } from "next/router";

// Check that PostHog is client-side (used to handle Next.js SSR)
if (typeof window !== "undefined") {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
    // Disable in development
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") posthog.opt_out_capturing();
    },
  });
}

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();

  useEffect(() => {
    // Track page views
    const handleRouteChange = () => posthog.capture("$pageview");
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return (
    <SessionProvider session={session}>
      <PostHogProvider client={posthog}>
        <Layout>
          <Component {...pageProps} />
          <Toaster />
          <Analytics />
        </Layout>
      </PostHogProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
