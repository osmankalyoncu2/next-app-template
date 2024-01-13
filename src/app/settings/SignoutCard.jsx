"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { signOut } from "next-auth/react"

export default function SignoutCard({

}) {
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
            </CardContent>
        </Card>
    )
}