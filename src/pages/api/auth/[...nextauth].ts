import argon2 from "argon2";
import NextAuth, { type NextAuthOptions } from "next-auth";
import { prisma } from "../../../server/db";

import type { User } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import { posthogClient } from "../../../lib/posthog-server";
// Prisma adapter for NextAuth, optional and can be removed

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, token }) {
      /* eslint-disable */
      if (token.user) {
        session.user = token.user as User;
      }
      return session;
    },
    jwt({ token, user }) {
      if (user) {
        if ("password" in user) {
          user.password = undefined;
        }
        token.user = user;
      }
      return token;
    },
  },
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

        posthogClient.identify({
          distinctId: user.id,
          properties: {
            username: user.name,
            image: user.image,
          },
        });
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
