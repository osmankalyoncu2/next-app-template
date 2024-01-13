"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

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
            <CardHeader>
                <CardTitle>
                    Change Email
                </CardTitle>
                <CardDescription>
                    Change the email address associated with your account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    className="flex flex-col gap-1.5"
                >
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        className="max-w-xs"
                        placeholder={session?.user?.email}
                        autoComplete="email"
                        defaultValue={session?.user?.email}
                        onChange={(e) => {
                            setNewEmail(e.target.value);
                        }}
                    />
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    className="w-full max-w-xs"
                                    variant="default"
                                    type="submit"
                                    disabled={!emailIsOkay}
                                >
                                    Change Email
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                                <p>
                                    This will send a verification email to your new email address.
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </form>
            </CardContent>
        </Card>
    )
};