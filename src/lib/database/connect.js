import { createClient } from '@supabase/supabase-js'

const next_auth_options = {
    db: {
        schema: 'next_auth'
    }
}

export const next_auth_database = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    next_auth_options
)

const app_options = {
    db: {
        schema: 'app'
    }
}

export const app_database = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    app_options
)