import * as React from 'react'

import { getPaymentMethods, getPaymentOptions } from '@/app/api/payments/route'
import Checkout from './Checkout';
import { auth } from '@/auth/auth';

export const metadata = {
    title: "Paying",
}

const status_types = [
    "success",
    "error",
]

export default async function PayPage({
    params
}) {
    const user = await auth();

    const product_uid = params.product.join('/');
    let status_type = null;

    if (params.product[1]) {
        status_type = params.product[1];
    }

    if (!status_types.includes(status_type)) {
        status_type = null;
    }

    if (status_type) {
        return (
            <div>
                {status_type === "success" && (
                    <h1>Payment Successful</h1>
                )}
            </div>
        );
    }

    const paymentOptions = await getPaymentOptions();
    const paymentMethods = await getPaymentMethods(user.user.id);

    const amount = paymentOptions.find(x => x.product_uid === product_uid)?.price || null;
    const currency = paymentOptions.find(x => x.product_uid === product_uid)?.currency || null;
    const type = paymentOptions.find(x => x.product_uid === product_uid)?.type === 'subscription' ? 'subscription' : 'payment';

    if (!amount || !currency) {
        return (
            <div>
                <h1>Pay</h1>
                <p>Product: {product_uid}</p>
                <p>Product not found</p>
            </div>
        );
    }

    return <Checkout user={user} amount={amount} currency={currency} type={type} product_uid={product_uid} payment_methods={paymentMethods} />;
}