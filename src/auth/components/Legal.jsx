"use client";

import Link from "next/link";

export default function Legal({

}) {
    return (
        <div
            className="mt-6 w-full"
        >
            <p
                className="text-secondary-foreground text-left text-xs"
            >
                By signing in, you agree to our{' '}
                <Link
                    href="/terms"
                    className="font-bold"
                >
                    Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                    href="/privacy"
                    className="font-bold"
                >
                    Privacy Policy
                </Link>.
            </p>
        </div>
    )
}