"use client";

import TextInput from "@/components/aui/Input";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Card from "@/components/aui/Card";
import Button from "@/components/aui/Button";

function isEmailOkay({ currentEmail, newEmail }) {
    // regex to check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
        return false;
    }

    // check if email is different
    if (currentEmail === newEmail) {
        return false;
    }

    return true;
}

export default function ChangeEmailCard({

}) {
    const { data: session, status } = useSession();
    const [newEmail, setNewEmail] = useState("");
    const [emailIsOkay, setEmailIsOkay] = useState(false);

    useEffect(() => {
        const originalEmail = session?.user?.email;

        if (isEmailOkay({ currentEmail: originalEmail, newEmail })) {
            setEmailIsOkay(true);
        } else {
            setEmailIsOkay(false);
        }
    }, [
        newEmail,
        session?.user?.email
    ]);

    return (
        <Card>
            <h1 className="text-2xl text-primary-50">
                Change Email
            </h1>
            <p className="mt-2 text-sm text-primary-200">
                Change the email address associated with your account.
            </p>
            <form
                className="flex flex-col mt-4"
            >
                <TextInput
                    className="max-w-xs"
                    label="Email"
                    placeholder={session?.user?.email}
                    autoComplete="email"
                    defaultValue={session?.user?.email}
                    onChange={(e) => {
                        setNewEmail(e.target.value);
                    }}
                />
                <Button
                    className="mt-4 w-full max-w-xs"
                    variant="primary"
                    type="submit"
                    disabled={!emailIsOkay}
                // TODO: If a user hovers over the button, show a tooltip explaining why it's disabled.
                >
                    Change Email
                </Button>
            </form>
        </Card>
    )
};