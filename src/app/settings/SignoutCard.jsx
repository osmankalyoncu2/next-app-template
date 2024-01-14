"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import Spinner from "@/components/aui/Loader";
import { cn } from "@/lib/utils/utils";

import { signOut } from "next-auth/react"
import { useState } from "react";

export default function SignoutCard({

}) {
    const [isWorking, setIsWorking] = useState(false);

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Signout
                </CardTitle>
                <CardDescription>
                    Keep your account extra secure by signing out after each session.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button
                    onClick={async () => {
                        setIsWorking(true);
                        toast.warning("Signing you out...");
                        await new Promise((resolve, reject) => {
                            setTimeout(() => {
                                signOut({ callbackUrl: '/' })
                                resolve();
                            }, 2000);
                        });
                        setIsWorking(false);
                    }}
                >
                    <Spinner color="text-primary-foreground" className={cn(
                        !isWorking && "hidden"
                    )} />
                    Sign me out &rarr;
                </Button>
            </CardContent>
        </Card>
    )
}