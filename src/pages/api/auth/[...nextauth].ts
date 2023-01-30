import NextAuth, { type NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
// Prisma adapter for NextAuth, optional and can be removed
import { serverEnv } from "../../../env/schema.mjs";
import { appRouter } from "../../../server/api/root";
import { createInnerTRPCContext } from "../../../server/api/trpc";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user, token }) {
      const id = token.sub;
      if (id) {
        user = {
          id,
          name: token.name,
          image: token.picture,
        };
        if (session.user) {
          session.user.id = id;
        }
      }

      return session;
    },
    // async jwt({ token, user }) {
    //   if (token.id) {
    //     user = {
    //       id: token.sub,
    //       name: token.name,
    //       image: token.picture,
    //     };
    //   }
    //   return Promise.resolve(token);
    // },
  },
  // Configure one or more authentication providers
  session: {
    strategy: "jwt",
  },
  secret: serverEnv.JWT_SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "bumi_bever",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const caller = appRouter.createCaller(
          createInnerTRPCContext({ session: null })
        );
        const user = await caller.auth.login({
          username: credentials?.username || "",
          password: credentials?.password || "",
        });
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  debug: true,
};

export default NextAuth(authOptions);
