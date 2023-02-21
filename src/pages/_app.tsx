import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Layout } from "../components/layout";
import { Analytics } from "@vercel/analytics/react";

import "../styles/globals.css";
import "../styles/mathlive-fonts.css";

import { api } from "../utils/api";
import { Toaster } from "../components/ui/Toaster";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
        <Toaster />
        <Analytics />
      </Layout>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
