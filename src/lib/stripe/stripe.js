import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(
    process.env.STRIPE_SECRET_KEY,
    {
        apiVersion: process.env.STRIPE_API_VERSION,
        appInfo: {
            name: process.env.STRIPE_APP_NAME,
            url: process.env.STRIPE_APP_URL,
        },
        httpClient: Stripe.createFetchHttpClient()
    }
)