// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
// export default withAuth({
//   callbacks: {
//     authorized({ req, token }) {
//       return !!token;
//     },
//   },
// });

export { default } from "next-auth/middleware";

export const config = {
  // runtime: "nodejs",
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    // "/((?!api|_next/static|_next/image|calculator.svg).*)",
    "/tasks",
    "/tasks/:path*",
    "/insight",
    "/achievements",
    "/leaderboard",
  ],
};
