export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/tasks",
    "/tasks/:path*",
    "/insight",
    "/achievements",
    "/leaderboard",
    "/survey",
  ],
};
