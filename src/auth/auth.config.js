import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

// Send Email
import SendEmail from "@/emails/SendEmail";

// Database Connection
import { app_database, next_auth_database } from "@/lib/database/connect";

import {
    restrictedPathnames,
    adminPathnames,
    marketingPages,
    authPages
} from "./paths"

export {
    restrictedPathnames,
    adminPathnames,
    marketingPages,
    authPages
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

async function checkForUserDeletion(user) {
    if (!user) return;
    const id = user.id

    const { data, error } = await app_database
        .from('scheduled')
        .select('action, variables')
        .eq('action', 'delete_user')
        .overlaps('variables', [
            id
        ])

    if (error) {
        console.error(error)
        return;
    }

    if (data) {
        // remove the row
        await app_database
            .from('scheduled')
            .delete()
            .eq('action', 'delete_user')
            .overlaps('variables', [
                id
            ])
    }

    return;
}

export function checkPathnamesValid() {
    // Check for duplicate pathnames in restrictedPathnames, adminPathnames and the keys of marketingPages

    const allPathnames = restrictedPathnames.concat(adminPathnames).concat(Object.keys(marketingPages))

    const duplicates = allPathnames.filter((item, index) => allPathnames.indexOf(item) !== index)

    if (duplicates.length > 0) {
        throw new Error(`Duplicate pathnames found: ${duplicates.join(', ')}`)
    }
}

const authConfig = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),

        // Custom Email Provider
        {
            id: 'email',
            name: 'Email',
            type: 'email',
            async sendVerificationRequest({
                identifier: email,
                url,
            }) {
                return SendEmail({
                    to: email,
                    from: null,
                    subject: `Sign in to Make Next App`,
                    ReactTemplate: () => (
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
            }
        }
    ],
    callbacks: {
        async session({ session, token }) {
            const email = session?.user?.email || null;

            if (!email) return session;

            session.user.id = token?.sub || null;

            const data = await fetchUserData(email);

            session.user.role = data?.role || false;
            return session;
        },
        async jwt({ token, user, newUser, trigger, session = null }) {
            const isSignIn = (user) ? true : false;
            const isNewUser = (newUser) ? true : false;

            if (isSignIn) {
                const email = user.email;
                const data = await fetchUserData(email);

                token.role = data?.role || false;

                token.uid = user.id;

                // If this user was scheduled for deletion, we need to cancel it
                checkForUserDeletion(user);
            }

            if (isNewUser) {
                token.newUser = true;
            } else {
                token.newUser = false;
            }

            if (trigger === "update" && session?.name) {
                token.name = session.name;
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
    pages: authPages,
}

export default authConfig;