import { PostHog } from "posthog-node";
import { env } from "../env/client.mjs";

export const posthogClient = new PostHog(
  env.NEXT_PUBLIC_POSTHOG_KEY,
  { host: env.NEXT_PUBLIC_POSTHOG_HOST } // You can omit this line if using PostHog Cloud
);
