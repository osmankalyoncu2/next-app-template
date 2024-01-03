"use client";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Heading from "@/components/Heading";
import Title from "@/components/Title";
import {
    AppCustomisation
} from "@/lib/app/customisation";

export default function SettingsPage({

}) {
    return (
        <main>
            <Title
                // Modify these props directly, or in the src/lib/app/customisation.js file.
                // Note that you can also modify them in the admin page, but this will require a rebuild.
                title={AppCustomisation.settings.page.title}
                subtitle={AppCustomisation.settings.page.subtitle}
            />
            <Heading
                heading="Account"
            />
            <Card
                className=""
            >
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
        </main>
    )
}