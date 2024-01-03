"use client";

import Button from "@/components/Button";
import Card from "@/components/Card";

export default function DeleteAccountCard({

}) {
    return (
        <Card>
            <h1 className="text-2xl text-primary-50">
                Delete Account
            </h1>
            <p className="mt-2 text-sm text-primary-200">
                Permanently remove your account and all of its data from our servers.
            </p>
            <Button
                className="mt-4"
                variant="danger"
                smaller
                onClick={async () => {
                    console.warn("Not implemented yet.");
                    await new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve();
                        }, 2000);
                    });
                }}
            >
                Request Account Deletion
            </Button>
        </Card>
    )
}