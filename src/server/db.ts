import { env } from "../env/server.mjs";
import { XataClient } from "../lib/xata/xata";

declare global {
  // eslint-disable-next-line no-var
  var xata: XataClient | undefined;
}

export const xata = global.xata || new XataClient();

if (env.NODE_ENV !== "production") {
  global.xata = xata;
}
