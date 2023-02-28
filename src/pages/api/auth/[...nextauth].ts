import NextAuth, { type NextAuthOptions } from "next-auth";
import { prisma } from "../../../server/db";
import argon2 from "argon2";

import CredentialsProvider from "next-auth/providers/credentials";
// Prisma adapter for NextAuth, optional and can be removed
import { serverEnv } from "../../../env/schema.mjs";
import { proxyClient } from "../../../utils/api";

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
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "brukernavn og passord",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Brukernavn",
          type: "text",
          placeholder: "bumi-bever",
        },
        password: {
          label: "Passord",
          type: "password",
          placeholder: "********",
        },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            name: credentials.username,
          },
        });

        if (!user) {
          return null;
        }
        const valid = await argon2.verify(user.password, credentials.password);
        if (!valid) {
          return null;
        }

        return user;
      },
    }),
  ],
};

export default NextAuth(authOptions);
