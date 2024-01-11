// NextAuth.js
import NextAuth from "next-auth";

import authConfig from "./auth.config";

// Supabase Adapter
import { SupabaseAdapter } from "@auth/supabase-adapter"

export const { handlers: { GET, POST }, auth } = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    adapter: SupabaseAdapter({
        url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        secret: process.env.SUPABASE_SERVICE_ROLE_KEY,
    }),
    session: {
        strategy: 'jwt'
    },
    ...authConfig
})