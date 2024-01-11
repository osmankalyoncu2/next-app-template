import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
//import Email from "next-auth/providers/email"

// Send Email
//import SendEmail from "@/emails/SendEmail";

// Database Connection
import { next_auth_database } from "@/lib/database/connect";

import {
    restrictedPathnames,
    adminPathnames,
    marketingPages,
} from "./paths"

export {
    restrictedPathnames,
    adminPathnames,
    marketingPages
}

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

export function checkPathnamesValid() {
    // Check for duplicate pathnames in restrictedPathnames, adminPathnames and the keys of marketingPages

    const allPathnames = restrictedPathnames.concat(adminPathnames).concat(Object.keys(marketingPages))

    const duplicates = allPathnames.filter((item, index) => allPathnames.indexOf(item) !== index)

    if (duplicates.length > 0) {
        throw new Error(`Duplicate pathnames found: ${duplicates.join(', ')}`)
    }
}

export const pages = {
    signIn: "/login",
    verifyRequest: "/verify",
    newUser: "/welcome",
}

export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        /*Email({
            sendVerificationRequest: ({
                identifier: email,
                url,
            }) => {
                const link = `${url}`;
            },
        }),*/
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
            }

            if (isNewUser) {
                token.newUser = true;
            } else {
                token.newUser = false;
            }

            return token;
        },
        authorized: ({ auth, request: { nextUrl } }) => {
            if (
                !restrictedPathnames.includes(nextUrl.pathname) &&
                !adminPathnames.includes(nextUrl.pathname)
            ) {
                return true;
            }

            return !!auth?.user;
        }
    },
    pages: pages,
}