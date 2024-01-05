# Early Fraud Warning in Next App Template

Ocassionally, Stripe will send an early fraud warning to the webhook endpoint. This is a warning that the payment may be fraudulent.

The template has this functionality because sometimes these warnings turn into chargebacks. If you refund the payment before the chargeback, you will not be charged the chargeback fee!

> Note: Chargebacks don’t always occur after a warning. Sometimes the payment is legitimate and the customer is just using a new card or something.

## How it works

> Note: If 3D Secure is enabled, the template will **not** refund the payment because of the [Liability Shift](https://stripe.com/docs/payments/3d-secure#disputed-payments) rule.

This template looks for the environment variable `STRIPE_AUTO_REFUND_WARNINGS` which is by default `true`.

By default the template will refund the payment, and do the following things:

1. It will refund the payment.

2. It will revoke access to the product.

3. It will send an email to the customer.

4. It will send an email to you.

Alternatively, you can set the environment variable `STRIPE_AUTO_REFUND_WARNINGS` to `false` and the template will not refund the payment, but will:

1. Revoke access to the product.

2. Send an email to the customer asking them to contact you.

3. Send an email to you to let you know that the payment was flagged.

Then, you can manually look into each case and decide whether to refund the payment or not.