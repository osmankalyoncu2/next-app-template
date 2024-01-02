import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { SupabaseAdapter } from "@auth/supabase-adapter"
import { createClient } from '@supabase/supabase-js'

import SendEmail from "@/emails/SendEmail";

const supabase_options = {
  db: {
    schema: 'next_auth',
  },
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  supabase_options
)

async function fetchUserData(email) {
  const { data, error } = await supabase
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
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        name: process.env.EMAIL_SERVER_NAME,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: ({
        identifier: email,
        url,
        token,
        baseUrl,
        provider: { server, from }
      }) => {
        return SendEmail({
          to: email,
          from,
          subject: `Sign in to ${baseUrl}`,
          ReactTemplate: ({ url, baseUrl }) => (
            <>
              <p>
                Someone tried to sign in to your account from a new device.
              </p>
              <p>
                If this was you, please click the link below to verify your account.
              </p>
              <p>
                <a href={url}>{url}</a>
              </p>
              <p>
                If you did not request this, please ignore this email.
              </p>
            </>
          ),
        })
      },
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
    async jwt({ token, user }) {
      const isSignIn = (user) ? true : false;

      if (isSignIn) {
        const email = user.email;
        const data = await fetchUserData(email);

        token.role = data?.role || false;
      }

      return token;
    }
  },
  pages: {
    signIn: "/signin",
    verifyRequest: "/verify",
    newUser: "/welcome",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
export { authOptions };