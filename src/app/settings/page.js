"use client";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Heading from "@/components/Heading";
import TextInput from "@/components/Input";
import Title from "@/components/Title";
import {
    AppCustomisation
} from "@/lib/app/customisation";
import ThemeSwitcher from "@/lib/theme/ThemeSwitcher";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SettingsPage({

}) {
    return (
        <main>
            <Title
                // Modify these props directly, or in the src/lib/app/customisation.js file.
                // Note that you can also modify them in the admin page, but this will require a rebuild.
                title={AppCustomisation.settings.page.name}
                subtitle={AppCustomisation.settings.page.subtext}
            />
            <Heading
                heading="Customisation"
            />
            <ThemeSwitcher themes={AppCustomisation.branding.themes} />
            <Heading
                heading="Account"
            />
            <div
                className="flex flex-col gap-4"
            >
                <ChangeEmailCard />
                <DeleteAccountCard />
            </div>
        </main>
    )
}

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

function ChangeEmailCard({

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
    }, [newEmail]);

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

function DeleteAccountCard({

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
            >
                Request Account Deletion
            </Button>
        </Card>
    )
}