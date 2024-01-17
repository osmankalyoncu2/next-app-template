'use server';

import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

import { formatAmountForStripe } from '@/lib/stripe/stripe-helpers'
import { stripe } from '@/lib/stripe/stripe'

function validateRestrictions(restrictions, data) {
    // restrictions are an array of strings. For example, expiry:2021-12-31 means the code expires on 31st December 2021
    // uses:[n] means the code can only be used [n] times

    for (let restriction of restrictions) {
        const [key, value] = restriction.split(':')
        if (key === 'expiry') {
            if (new Date(value) < new Date()) {
                return false
            }
        } else if (key === 'uses') {
            if (data.get('uses') > value) {
                return false
            }
        } /*else if (key === 'user') {
            if (data.get('user') !== "") {
                return false
            }
        }*/
    }

    return true
}

// TODO: Use database to store coupons
const valid_coupons = [
    {
        coupon_uid: "launch",
        coupon_name: "Product Launch Coupon",
        coupon_value: 50, // 50% off, if amount off then in currency cents
        coupon_type: "percentage", // or fixed amount off in currency cents
        code: "LAUNCH",
        restrictions: [], // empty array means no restrictions
        products: [] // empty array means all products
    }
]

// TODO: Use database to store pricing plans
// Note that the below structure is similar to database structure
const pricing_plans = [
    {
        product_uid: "basic_plan",
        product_name: "Basic Plan",
        type: "subscription",
        stripe_type: "subscription", // payment | setup | subscription
        recurring: "monthly",
        price: 9.99,
        currency: "gbp",
    }
]

export async function getPaymentOptions() {
    // GET Request to /api/payments
    // Only returns the pricing plans
    return pricing_plans
}

export async function createPaymentIntent(
    data
) {
    let discount = 1
    const coupon = data.get('coupon', '')

    if (coupon) {
        const coupon_data = valid_coupons.find(x => x.code === coupon)

        if (coupon_data) {
            if (validateRestrictions(coupon_data.restrictions, data)) {
                if (coupon_data.products.length === 0 || coupon_data.products.includes(data.get('product_uid'))) {
                    if (coupon_data.coupon_type === 'percentage') {
                        discount = 1 - (coupon_data.coupon_value / 100)
                    } else {
                        discount = 1 - (coupon_data.coupon_value / pricing_plans.find(x => x.product_uid === data.get('product_uid')).price)
                    }
                }
            }
        }
    }

    const CURRENCY = 'gbp' // TODO: Use database to store currency for the specific product
    const paymentIntent = await stripe.paymentIntents.create(
        {
            metadata: {
                product_uid: data.get('product_uid'),
                user_id: data.get('user_id'),
                user_email: data.get('user_email'),
            },
            amount: formatAmountForStripe(
                Number(pricing_plans.find(x => x.product_uid === data.get('product_uid')).price * discount),
                CURRENCY
            ),
            automatic_payment_methods: { enabled: true },
            currency: CURRENCY,
            receipt_email: data.get('user_email'),
        }
    )

    return { client_secret: paymentIntent.client_secret }
}