import * as React from 'react';

export const DisputeCreatedEmail = () => (
    <div>
        <h1>
            Hey, there!
        </h1>
        <p>
            A dispute was created against your business. Log in to your [Stripe](https://dashboard.stripe.com) account to view the details and respond to this dispute.
        </p>
        <p>
            Note: Even if the customer withdraws the dispute, you must respond to it.
        </p>
        <a href="https://stripe.com/docs/disputes/withdrawing#submit-evidence">
            Learn more about responding to disputes
        </a>
    </div>
);
