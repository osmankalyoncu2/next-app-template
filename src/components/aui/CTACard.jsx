"use client";

import { useRouter } from "next/navigation";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button";

export default function CTACard({
    title = "Contact support",
    subtitle = "Get in touch with our support team for help with your account.",
    button = "Get in touch &rarr;",
    href = "#",
}) {
    const router = useRouter();

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {title}
                </CardTitle>
                <CardDescription>
                    {subtitle}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button
                    variant="default"
                    onClick={() => {
                        router.push(`${href}`);
                    }}
                >
                    {button}
                </Button>
            </CardContent>
        </Card >
    )
}