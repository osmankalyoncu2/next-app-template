"use client";

import Title from "@/components/aui/Title";
import {
    AppCustomisation
} from "@/lib/app/customisation";

export default function SettingsTitle({

}) {
    return (
        <Title
            // Modify these props directly, or in the src/lib/app/customisation.js file.
            // Note that you can also modify them in the admin page, but this will require a rebuild.
            title={AppCustomisation.settings.page.name}
            subtitle={AppCustomisation.settings.page.subtext}
        />
    )
}