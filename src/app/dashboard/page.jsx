"use client";

import Button from "@/components/Button";
import Title from "@/components/Title";
import TextInput from "@/components/Input";
import { switchTheme } from "@/lib/theme/themeManager";

export default function Dashboard({

}) {
    return (
        <main
            className="h-screen w-full p-4"
        >
            <Title
                title={"Dashboard"}
                subtitle={"Welcome to your dashboard!"}
            />
            <div
                className="flex flex-col gap-y-4 mt-4 w-fit"
            >
                <Button
                    className=""
                    onClick={() => {
                        switchTheme("midnight");
                    }}
                >
                    Switch to Midnight Theme
                </Button>
                <Button
                    className=""
                    onClick={() => {
                        switchTheme("default");
                    }}
                >
                    No Theme
                </Button>
                <Button
                    className=""
                    onClick={() => {
                        switchTheme("tokyo");
                    }}
                >
                    Switch to Tokyo Theme
                </Button>
                <TextInput
                    label={"Test Input"}
                    className=""
                    placeholder="Placeholder"
                />
                <div
                    className="h-screen"
                ></div>
            </div>
        </main>
    )
}