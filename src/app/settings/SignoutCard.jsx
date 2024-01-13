"use client";

import Button from "@/components/aui/Button";
import Card from "@/components/aui/Card";

import { signOut } from "next-auth/react"

export default function SignoutCard({

}) {
    return (
        <Card>
            <h1 className="text-2xl text-primary-50">
                Signout
            </h1>
            <p className="mt-2 text-sm text-primary-200">
                Keep your account extra secure by signing out after each session.
            </p>
            <Button
                className="mt-4"
                onClick={async () => {
                    console.warn("Signing out...");
                    await new Promise((resolve, reject) => {
                        setTimeout(() => {
                            signOut({ callbackUrl: '/' })
                            resolve();
                        }, 2000);
                    });
                }}
            >
                Sign me out &rarr;
            </Button>
        </Card>
    )
}