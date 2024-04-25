export const metadata = {
    title: "Settings",
}

import Heading from "@/components/aui/Heading";
import ThemeSwitcher from "@/lib/theme/ThemeSwitcher";

import ChangeEmailCard from "./ChangeEmailCard";
import DeleteAccountCard from "./DeleteAccountCard";
import SettingsTitle from "./SettingsTitle";
import SignoutCard from "./SignoutCard";
import ChangeNameCard from "./ChangeNameCard";

export default function SettingsPage() {
    return (
        <main>
            <SettingsTitle />
            <Heading heading="Customisation" />
            <ThemeSwitcher />
            <Heading heading="Account" />
            <div
                className="flex flex-col gap-4"
            >
                <SignoutCard />
                <ChangeNameCard />
                <ChangeEmailCard />
                <DeleteAccountCard />
            </div>
        </main>
    )
}