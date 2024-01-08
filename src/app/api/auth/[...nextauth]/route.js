// NextAuth.js
import NextAuth from "next-auth";

// NextAuth Providers
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

// Supabase Adapter
import { SupabaseAdapter } from "@auth/supabase-adapter"

// Database Connection
import { next_auth_database } from "@/lib/database/connect";

// Consistent Configuration for NextAuth & Middleware
import {
  pages
} from "@/lib/auth/consistent-config";

import SendEmail from "@/emails/SendEmail";

async function fetchUserData(email) {
  const { data, error } = await next_auth_database
    .from('users')
    .select('role')
    .eq('email', email)
    .single();

  if (error) {
    console.error(error)
    return;
  }

  return data;
}

const THIRTY_DAYS = 30 * 24 * 60 * 60
const THIRTY_MINUTES = 30 * 60

const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: THIRTY_DAYS,
    updateAge: THIRTY_MINUTES
  },
  // connection string
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY,
  }),
  providers: [
    EmailProvider({
      sendVerificationRequest: ({
        identifier: email,
        url,
      }) => {
        const link = `${url}`;

        return SendEmail({
          to: email,
          from: null,
          subject: `Sign in to Next App Template`,
          ReactTemplate: () => (
            <>
              <p>
                Someone tried to sign in to your account from a new device.
              </p>
              <p>
                If this was you, please click the link below to verify your account.
              </p>
              <p>
                <a href={link}>{link}</a>
              </p>
              <p>
                If you did not request this, please ignore this email.
              </p>
            </>
          ),
        })
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      const email = session?.user?.email || null;

      if (!email) return session;

      const data = await fetchUserData(email);

      session.user.role = data?.role || false;
      return session;
    },
    async jwt({ token, user, newUser }) {
      const isSignIn = (user) ? true : false;
      const isNewUser = (newUser) ? true : false;

      if (isSignIn) {
        const email = user.email;
        const data = await fetchUserData(email);

        token.role = data?.role || false;
        console.warn("User role: ", data?.role)
      }

      if (isNewUser) {
        token.newUser = true;
      } else {
        token.newUser = false;
      }

      return token;
    }
  },
  pages: pages,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
export { authOptions };