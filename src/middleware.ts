import { withAuth } from "next-auth/middleware";

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      console.log("🚀 ~ authorized ~ token:", token);
      // console.log(req.nextUrl.pathname);

      if (req.nextUrl.pathname === "/") {
        return true;
      }
      // `/admin` requires admin role

      // `/me` only requires the user to be logged in
      return !!token;
    },
  },
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
