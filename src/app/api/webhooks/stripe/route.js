// NOTE: Some of this code came from example code provided by Vercel:
// Demo: https://nextjs-typescript-react-stripe-js.vercel.app/
// Code: https://github.com/vercel/next.js/tree/canary/examples/with-typescript
// Guide: https://vercel.com/guides/getting-started-with-nextjs-typescript-stripe

import { NextResponse } from 'next/server'

// Stripe Library
import { stripe } from '@/lib/stripe/stripe'

export async function POST(req) {
    let event

    try {
        event = stripe.webhooks.constructEvent(
            await (await req.blob()).text(),
            req.headers.get('stripe-signature'),
            process.env.STRIPE_WEBHOOK_SECRET
        )
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        // On error, log and return the error message.
        if (err instanceof Error) console.log(err)
        console.log(`❌ Error message: ${errorMessage}`)
        return NextResponse.json(
            { message: `Webhook Error: ${errorMessage}` },
            { status: 400 }
        )
    }

    // Successfully constructed event.
    console.log('✅ Stripe Event Authenticated: ', event.id)

    const permittedEvents = [
        // Early Fraud Warning System (Radar)
        /*'radar.early_fraud_warning.created',

        // Disputes (Chargebacks) [DISABLED]
        'charge.dispute.created',
        'charge.dispute.closed',
        'charge.dispute.funds_reinstated',
        'charge.dispute.funds_withdrawn',*/

        // Subscription Events [DISABLED]
        /*'customer.subscription.created',
        'customer.subscription.deleted',
        'customer.subscription.updated',
        'customer.subscription.trial_will_end',
        'customer.subscription.paused',
        'customer.subscription.resumed',*/

        // Payment Intents
        'payment_intent.succeeded',
        'payment_intent.payment_failed',
        'payment_intent.requires_action',
    ]

    if (permittedEvents.includes(event.type)) {
        let data

        try {
            switch (event.type) {
                case 'radar.early_fraud_warning.created':
                    data = event.data.object;
                    console.log(`🚨 Early Fraud Warning created: ${data.id}`)

                    // This is where you would handle early fraud warnings.

                    break;
                case 'payment_intent.requires_action':
                    data = event.data.object;
                    console.log(`⚡ PaymentIntent requires action: ${data.id}`)

                    // This is where you would handle the case where a user needs to authenticate.

                    break;
                case 'payment_intent.payment_failed':
                    data = event.data.object;
                    console.log(`☹️ Payment failed: ${data.last_payment_error?.message}`)

                    // This is where you would handle failed payments.

                    break
                case 'payment_intent.succeeded':
                    data = event.data.object;
                    console.log(`💰 Payment received: ${data.id}`)

                    // This is where you would handle successful payments.
                    
                    break
                default:
                    throw new Error(`Unhandled event: ${event.type}`)
            }
        } catch (error) {
            console.log(error)
            return NextResponse.json(
                { message: 'Webhook handler failed' },
                { status: 500 }
            )
        }
    }
    // Return a response to acknowledge receipt of the event.
    return NextResponse.json({ message: 'Received' }, { status: 200 })
}