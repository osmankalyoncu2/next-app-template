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
import Spinner from "@/components/aui/Loader";
import { cn } from "@/lib/utils/utils";
import { toast } from "sonner";

function isNameOkay({ currentName, newName }) {
    if (newName.length === 0) return false;
    // check if name is different
    if (currentName === newName) return false;

    return true;
}

export default function ChangeNameCard({

}) {
    const { data: session, status, update } = useSession();
    const [newName, setNewName] = useState("");
    const [nameIsOkay, setNameIsOkay] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        const originalName = session?.user?.name;

        if (isNameOkay({ currentName: originalName, newName })) {
            setNameIsOkay(true);
        } else {
            setNameIsOkay(false);
        }
    }, [
        newName,
        session?.user?.name
    ]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Change Name
                </CardTitle>
                <CardDescription>
                    Change your name.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    className="flex flex-col gap-1.5"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        setIsUpdating(true);
                        await update({ name: newName });
                        setIsUpdating(false);
                        toast.success("Name updated successfully!");
                    }}
                >
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        className="max-w-xs"
                        placeholder={session?.user?.name}
                        autoComplete="name"
                        defaultValue={session?.user?.name}
                        onChange={(e) => {
                            setNewName(e.target.value);
                        }}
                    />
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    className="w-full max-w-xs"
                                    variant="default"
                                    type="submit"
                                    disabled={!nameIsOkay}
                                >
                                    <Spinner color="text-primary-foreground" className={cn(
                                        !isUpdating && "hidden"
                                    )} />
                                    Change Name
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                                <p>
                                    {nameIsOkay ? "Name is okay" : "Name is not okay"}
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </form>
            </CardContent>
        </Card>
    )
};