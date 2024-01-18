"use client";

import * as React from 'react'
import {
    useStripe,
    useElements,
    PaymentElement,
    Elements,
    linkAuthenticationElement
} from '@stripe/react-stripe-js'

import { formatAmountForDisplay } from '@/lib/stripe/stripe-helpers'
import getStripe from '@/lib/stripe/get-stripe'
import { createPaymentIntent } from '@/app/api/payments/route'

import { getStyleVariable } from '@/lib/theme/getStyleVariable';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';

export default function Checkout({
    payment_methods = null,
    user = null,
    amount = 0,
    currency = 'usd',
    type = 'payment', // payment | setup | subscription
    product_uid = null,
}) {
    if (!user) return null;

    const user_email = user.email;
    const user_id = user.id;

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

    const loader = 'auto';

    return (
        <div className='max-w-md mx-auto'>
            <Accordion
                type="single"
                collapsible
                defaultValue={
                    payment_methods && payment_methods.length > 0
                        ? 'saved-card'
                        : 'new-card'
                }
            >
                <AccordionItem value="saved-card">
                    <AccordionTrigger>
                        Use previously saved card
                    </AccordionTrigger>
                    <AccordionContent>
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    Select a card
                                </CardTitle>
                                <CardDescription>
                                    Choose a previously saved card to use for this payment.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>

                            </CardContent>
                        </Card>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="new-card">
                    <AccordionTrigger>
                        Use a new payment method
                    </AccordionTrigger>
                    <AccordionContent>
                        <Elements
                            stripe={getStripe()}
                            options={{
                                currency: currency,
                                mode: type,
                                amount: amount.toString().includes('.') ? Number(amount.toString().replace('.', '')) : amount,
                                appearance: appearance,
                                loader: loader,
                                // TODO: Add custom font to Stripe
                                /*fonts: [
                                    {
                                        cssSrc: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
                                    }
                                ]*/
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
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

function CheckoutForm({ user_email, amount, currency, product_uid, user_id }) {
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
                    <AlertDialog defaultOpen={payment !== "initial"}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Processing payment
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Please wait while we process your payment.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel asChild>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setTimeout(() => {
                                                setPayment({ status: 'initial' })
                                            }, 50)
                                        }}
                                    >
                                        Continue
                                    </Button>
                                </AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )

            case 'requires_action':
                return (
                    <>
                        <AlertDialog defaultOpen={payment !== "initial"}>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Additional action required
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        We need additional information to authenticate your payment. You will be redirected to your bank's website to complete this process.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel asChild>
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                setTimeout(() => {
                                                    setPayment({ status: 'initial' })
                                                }, 50)
                                            }}
                                        >
                                            Continue
                                        </Button>
                                    </AlertDialogCancel>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </>
                )

            case 'succeeded':
                return (
                    <>
                        <AlertDialog defaultOpen={payment !== "initial"}>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Payment successful
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Your payment was successful. You will receive an email confirmation shortly.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel asChild>
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                setTimeout(() => {
                                                    setPayment({ status: 'initial' })
                                                }, 50)
                                            }}
                                        >
                                            Continue
                                        </Button>
                                    </AlertDialogCancel>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </>
                )

            case 'error':
                return (
                    <>
                        <AlertDialog defaultOpen={payment !== "initial"}>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        An error occurred while processing your payment
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        {errorMessage}
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel asChild>
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                setTimeout(() => {
                                                    setPayment({ status: 'initial' })
                                                }, 50)
                                            }}
                                        >
                                            Continue
                                        </Button>
                                    </AlertDialogCancel>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </>
                )

            default:
                return null
        }
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

            if (!clientSecret) {
                // an error occured
                setPayment({ status: 'error' })
                setErrorMessage('An unknown error occurred')
                return;
            }

            // Use your card Element with other Stripe.js APIs
            const { error: confirmError } = await stripe.confirmPayment({
                elements,
                clientSecret,
                confirmParams: {
                    return_url: `${window.location.origin}/pay/${product_uid}/success`,
                    payment_method_data: {
                        billing_details: {
                            email: user_email,
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
                <Card>
                    <CardHeader>
                        <CardTitle>Payment Details</CardTitle>
                        <CardDescription>Enter your payment details below</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <input type='hidden' name='product_uid' defaultValue={product_uid} />
                        <input type='hidden' name='user_email' defaultValue={user_email} />
                        <input type='hidden' name='user_id' defaultValue={user_id} />
                        <PaymentElement />
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="w-full"
                            variant="default"
                            type="submit"
                            disabled={
                                !['initial', 'succeeded', 'error'].includes(payment.status) ||
                                !stripe
                            }
                        >
                            Purchase for {formatAmountForDisplay(amount, currency)}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
            {['succeeded', 'error'].includes(payment.status) && (
                <PaymentStatus status={payment.status} />
            )}
        </>
    )
}