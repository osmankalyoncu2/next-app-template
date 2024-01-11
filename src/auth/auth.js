// NextAuth.js
import NextAuth from "next-auth";

import authConfig from "./auth.config";

// Supabase Adapter
import { SupabaseAdapter } from "@auth/supabase-adapter"

const THIRTY_DAYS = 30 * 24 * 60 * 60
const THIRTY_MINUTES = 30 * 60

export const { handlers: { GET, POST }, auth } = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    adapter: SupabaseAdapter({
        url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        secret: process.env.SUPABASE_SERVICE_ROLE_KEY,
    }),
    session: {
        strategy: 'jwt',
        maxAge: THIRTY_DAYS,
        updateAge: THIRTY_MINUTES
    },
    ...authConfig
})