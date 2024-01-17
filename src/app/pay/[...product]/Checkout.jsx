"use client";

import * as React from 'react'
import {
    useStripe,
    useElements,
    PaymentElement,
    Elements,
} from '@stripe/react-stripe-js'

import { formatAmountForDisplay } from '@/lib/stripe/stripe-helpers'
import getStripe from '@/lib/stripe/get-stripe'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { createPaymentIntent } from '@/app/api/payments/route'

import { AnimatePresence, motion } from 'framer-motion'

import { getStyleVariable } from '@/lib/theme/getStyleVariable';

import {
    CheckCircleIcon,
    ExclamationTriangleIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'

export default function Checkout({
    amount = 0,
    currency = 'usd',
    type = 'payment', // payment | setup | subscription
    product_uid = null,
}) {
    const { data: session, status } = useSession();

    if (status === 'loading') return null;
    if (status === 'unauthenticated') redirect('/');

    const user_email = session.user.email;
    const user_id = session.user.id;

    const appearance = {
        theme: 'stripe', // night, flat or stripe
        variables: {
            colorPrimary: getStyleVariable('--primary', true),
            colorText: getStyleVariable('--foreground', true),
            colorBackground: getStyleVariable('--background', true),
            colorDanger: getStyleVariable('--destructive', true),
            borderRadius: getStyleVariable('--radius'),
        }

    };
    
    return (
        <Elements
            stripe={getStripe()}
            options={{
                currency: currency,
                mode: type,
                amount: amount.toString().includes('.') ? amount * 100 : amount,
                appearance: appearance,
            }}
        >
            <CheckoutForm
                currency={currency}
                user_email={user_email}
                user_id={user_id}
                amount={amount}
                product_uid={product_uid}
            />
        </Elements>
    )
}

function CheckoutForm({ user_email, amount, name, currency, product_uid, user_id }) {
    const [input, setInput] = React.useState({
        cardholderName: name || '',
    })
    const [paymentType, setPaymentType] = React.useState('')
    const [payment, setPayment] = React.useState({ status: 'initial' }) //initial
    const [errorMessage, setErrorMessage] = React.useState('')

    const stripe = useStripe()
    const elements = useElements()

    const PaymentStatus = ({ status }) => {
        switch (status) {
            case 'processing':
            case 'requires_payment_method':
            case 'requires_confirmation':
                return (
                    <>
                        <section
                            id='payment-status'
                            className='absolute inset-0 flex items-center justify-center w-full h-full bg-white bg-opacity-50 z-50'
                        >
                            <div>
                                <svg class="animate-spin h-12 w-12 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                        </section>
                    </>
                )

            case 'requires_action':
                return (
                    <>
                        <section
                            id='payment-status'
                            className='absolute inset-0 flex items-center justify-center w-full h-full bg-white bg-opacity-50 z-50'
                            onClick={() => setPayment({ status: 'initial' })}
                        >
                            <div className='flex flex-col items-center justify-center border border-neutral-200 rounded-3xl p-8 backdrop-blur-sm'>
                                <ExclamationTriangleIcon className="w-12 h-12 text-yellow-500" />
                                <h2 className="text-xl font-bold text-center">Additional action required</h2>
                            </div>
                        </section>
                    </>
                )

            case 'succeeded':
                return (
                    <>
                        <section
                            id='payment-status'
                            className='absolute inset-0 flex items-center justify-center w-full h-full bg-white bg-opacity-50 z-50'
                            onClick={() => setPayment({ status: 'initial' })}
                        >
                            <div className='flex flex-col items-center justify-center border border-neutral-200 rounded-3xl p-8 backdrop-blur-sm'>
                                <CheckCircleIcon className="w-12 h-12 text-green-500" />
                                <h2 className="text-xl font-bold text-center">
                                    Whoop whoop! Payment succeeded!
                                </h2>
                            </div>
                        </section>
                    </>
                )

            case 'error':
                return (
                    <>
                        <section
                            id='payment-status'
                            className='absolute inset-0 flex items-center justify-center w-full h-full bg-white bg-opacity-50 z-50'
                            onClick={() => setPayment({ status: 'initial' })}
                        >
                            <div className='flex flex-col items-center justify-center border border-neutral-200 rounded-3xl p-8 backdrop-blur-sm'>
                                <XMarkIcon className="w-12 h-12 text-red-500" />
                                <h2 className="text-xl font-bold text-center">Payment failed :(</h2>
                                <p className="text-center">{errorMessage}</p>
                            </div>
                        </section>
                    </>
                )

            default:
                return null
        }
    }

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.currentTarget.name]: e.currentTarget.value,
        })
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            // Abort if form isn't valid
            if (!e.currentTarget.reportValidity()) return
            if (!elements || !stripe) return

            setPayment({ status: 'processing' })

            let { error: submitError } = await elements.submit()

            if (submitError) {
                setPayment({ status: 'error' })
                setErrorMessage(submitError.message ?? 'An unknown error occurred')

                return
            }

            // Create a PaymentIntent with the specified amount.
            const { client_secret: clientSecret } = await createPaymentIntent(
                new FormData(e.target)
            )

            // Use your card Element with other Stripe.js APIs
            const { error: confirmError } = await stripe.confirmPayment({
                elements,
                clientSecret,
                confirmParams: {
                    return_url: `${window.location.origin}/pay/${product_uid}/success`,
                    payment_method_data: {
                        billing_details: {
                            name: input.cardholderName,
                            email: input.receipt_email
                        },
                    },
                },
            })

            if (confirmError) {
                setPayment({ status: 'error' })
                setErrorMessage(confirmError.message ?? 'An unknown error occurred')
            }
        } catch (err) {
            const { message } = err

            setPayment({ status: 'error' })
            setErrorMessage(message ?? 'An unknown error occurred')
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div
                    className='rounded-3xl p-8 border border-neutral-200'
                >
                    <input type='hidden' name='product_uid' defaultValue={product_uid} />
                    <input type='hidden' name='user_email' defaultValue={user_email} />
                    <input type='hidden' name='user_id' defaultValue={user_id} />
                    <fieldset className="">
                        {paymentType === 'card' ? (
                            <>
                                <label
                                    className="block mb-0 text-[0.93rem] ]"
                                    htmlFor="cardholderName"
                                >
                                    Cardholder name
                                </label>
                                <input
                                    placeholder="My cool name"
                                    className="p-3 border border-[#e6e6e6] rounded-md w-full mb-4 text-sm"
                                    type="Text"
                                    name="cardholderName"
                                    onChange={handleInputChange}
                                    required
                                />
                            </>
                        ) : null}
                        <div className="">
                            <PaymentElement
                                onChange={(e) => {
                                    setPaymentType(e.value.type)
                                }}
                            />
                        </div>
                    </fieldset>
                </div>
                <button
                    className="mt-4 w-full py-3 text-sm font-bold text-white bg-neutral-950 hover:bg-neutral-900 rounded-3xl disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-500 transition duration-200 ease-in-out"
                    type="submit"
                    disabled={
                        !['initial', 'succeeded', 'error'].includes(payment.status) ||
                        !stripe
                    }
                >
                    Purchase for {formatAmountForDisplay(amount, currency)}
                </button>
            </form>
            <AnimatePresence>
                {['succeeded', 'error'].includes(payment.status) && (
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center w-full h-full bg-white bg-opacity-50 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <PaymentStatus status={payment.status} />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}