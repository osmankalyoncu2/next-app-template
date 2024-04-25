"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { signOut } from "next-auth/react";

export default function DeleteAccountCard() {
    return (
        <AlertDialog>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Delete Account
                    </CardTitle>
                    <CardDescription>
                        Permanently remove your account and all of its data from our servers.
                    </CardDescription>
                </CardHeader>
                <CardContent>

                    <AlertDialogTrigger asChild>
                        <Button
                            variant="destructive"
                            size="sm"
                        >
                            Request Account Deletion
                        </Button>
                    </AlertDialogTrigger>
                </CardContent>
            </Card>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
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
                        Delete Account
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}