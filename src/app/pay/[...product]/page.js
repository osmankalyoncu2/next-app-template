import * as React from 'react'

import { getPaymentOptions } from '@/app/api/payments/route'
import Checkout from './Checkout';

const status_types = [
    "success",
    "error",
]

export default async function PayPage({
    params
}) {
    const product_id = params.product.join('/');
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

    const amount = paymentOptions.find(x => x.product_uid === product_id)?.price || null;
    const currency = paymentOptions.find(x => x.product_uid === product_id)?.currency || null;
    const type = paymentOptions.find(x => x.product_uid === product_id)?.stripe_type || null;

    if (!amount || !currency || !type) {
        return (
            <div>
                <h1>Pay</h1>
                <p>Product: {product_id}</p>
                <p>Product not found</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Pay</h1>
            <p>Product: {product_id}</p>
            <Checkout amount={amount} currency={currency} type={type} />
        </div>
    );
}