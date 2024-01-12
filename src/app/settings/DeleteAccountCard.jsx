"use client";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { signOut } from "next-auth/react";

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
                    const response = await fetch("/api/users", {
                        method: "DELETE",
                        credentials: "include",
                    });

                    if (response.ok) {
                        await signOut();
                    }
                }}
            >
                Request Account Deletion
            </Button>
        </Card>
    )
}