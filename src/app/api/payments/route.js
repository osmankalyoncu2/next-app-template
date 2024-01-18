'use server';

import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

import { formatAmountForStripe } from '@/lib/stripe/stripe-helpers'
import { stripe } from '@/lib/stripe/stripe'
import {
    app_database,
    money_database
} from '@/lib/database/connect'

export async function getPaymentOptions() {
    // GET Request to /api/payments
    // Only returns the pricing plans
    const pricing = [];

    const { data: pricing_data, error: pricing_error } = await money_database
        .from('products')
        .select('product_name, product_uid, type, stripe_id')

    if (pricing_error) {
        console.error(pricing_error)
        return;
    }

    if (!pricing_data || pricing_data.length === 0) {
        return;
    }

    // for each stripe_id, get the price and currency
    for (let product of pricing_data) {
        const stripe_id = product.stripe_id;

        const price = await stripe.prices.retrieve(stripe_id);

        product.price = price.unit_amount / 100;

        product.currency = price.currency;

        product.recurring = price.recurring;

        //delete product.stripe_id;

        pricing.push(product);
    }

    return pricing
}

export async function getPaymentMethods(user_id) {
    const customer_id = await getUserDetails(user_id);

    if (!customer_id) {
        return null;
    }

    const paymentMethods = await stripe.paymentMethods.list({
        customer: customer_id,
        type: 'card',
    })
    
    return paymentMethods.data
}

export async function getUserDetails(user_id) {
    const { data: user_data, error: user_error } = await app_database
        .from('users')
        .select('customer_id')
        .eq('user_id', user_id)
        .single()

    if (user_error || !user_data || user_data.length === 0 || user_data.customer_id === null) {
        return null;
    }

    return user_data.customer_id
}

export async function createPaymentIntent(
    data
) {
    const coupon = data.get('coupon', '')

    const pricing_plans = await getPaymentOptions()

    const CURRENCY = 'gbp' // TODO: Use database to store currency for the specific product
    const PRODUCT = pricing_plans.find(x => x.product_uid === data.get('product_uid'))
    const STRIPE_TYPE = PRODUCT.type === 'subscription' ? 'subscription' : 'payment' // donations and usage based payments are considered as payments
    const user_id = data.get('user_id')

    const customer_id = await getUserDetails(user_id);

    if (!customer_id) {
        return {
            error: 'User not found'
        }
    }

    switch (STRIPE_TYPE) {
        case 'payment':
            let price = PRODUCT.price;

            if (coupon) {
                const promotionCodes = await stripe.promotionCodes.list({
                    active: true,
                    code: coupon,
                    limit: 1,
                })

                if (promotionCodes.data.length > 0) {
                    const promotionCode = promotionCodes.data[0]

                    // amount off coupon
                    if (promotionCode.amount_off) {
                        price = price - promotionCode.amount_off / 100
                    } else if (promotionCode.percent_off) {
                        price = price * (1 - promotionCode.percent_off / 100)
                    }
                }
            }

            const paymentIntent = await stripe.paymentIntents.create(
                {
                    metadata: {
                        product_uid: data.get('product_uid'),
                        user_id: user_id,
                        user_email: data.get('user_email'),
                    },
                    amount: formatAmountForStripe(
                        price,
                        CURRENCY
                    ),

                    customer: customer_id,
                    automatic_payment_methods: { enabled: true },
                    currency: CURRENCY,
                    receipt_email: data.get('user_email'),
                }
            )

            return { client_secret: paymentIntent.client_secret }

        case 'subscription':
            const subscription = await stripe.subscriptions.create({
                customer: customer_id,
                items: [
                    {
                        price: PRODUCT.stripe_id,
                    },
                ],
                promotion_code: coupon,
                payment_behavior: 'default_incomplete',
                payment_settings: { save_default_payment_method: 'on_subscription' },
                expand: ['latest_invoice.payment_intent'],
            })

            return {
                subscriptionId: subscription.id,
                client_secret: subscription.latest_invoice.payment_intent.client_secret,
            }

        default:
            return {

            }
    }
}