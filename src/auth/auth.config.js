import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

// Send Email
import SendEmail from "@/emails/SendEmail";

// Database Connection
import { app_database } from "@/lib/database/connect";

// Stripe
import { stripe } from "@/lib/stripe/stripe";

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

async function fetchUserData(user) {
    const user_id = user.id;

    const { data, error } = await app_database
        .from('users')
        .select('role')
        .eq('user_id', user_id)
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

async function configureAppForUser(user) {
    const { data: user_data, error: user_error } = await app_database
        .from('users')
        .select('*')
        .eq('user_id', user.id)

    if (user_error) {
        console.error("Error 1: " + user_error)
        return;
    }

    if (!user_data || user_data.length === 0) {
        // user doesn't exist, insert user_id and role = "user"
        await app_database
            .from('users')
            .insert({
                user_id: user.id,
                role: 'user'
            })
    }

    const { data: user_customer, error } = await app_database
        .from('users')
        .select('customer_id')
        .eq('user_id', user.id)
        .single()

    if (error) {
        console.error("Error 2: " + error)
        return;
    }

    if (user_customer.customer_id === null) {
        // create the new customers
        const customer = await stripe.customers.create({
            name: user.name,
            email: user.email,
            metadata: {
                user_id: user.id
            }
        })

        // update the user
        await app_database
            .from('users')
            .update({
                customer_id: customer.id
            })
            .eq('user_id', user.id)
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

            if (!session.user.id) return session;

            await configureAppForUser(session.user);

            const data = await fetchUserData(session?.user);

            session.user.role = data?.role || false;
            return session;
        },
        async jwt({ token, user, newUser, trigger, session = null }) {
            const isSignIn = (user) ? true : false;
            const isNewUser = (newUser) ? true : false;

            if (isSignIn) {
                await configureAppForUser(user);

                const data = await fetchUserData(user);

                token.role = data?.role || false;

                token.uid = user.id;

                // If this user was scheduled for deletion, we need to cancel it
                await checkForUserDeletion(user);
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