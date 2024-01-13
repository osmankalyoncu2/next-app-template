"use client";

import Button from "@/components/aui/Button";
import Card from "@/components/aui/Card";
import {
    switchTheme,
    getTheme,
} from '@/lib/theme/themeManager'
import { useEffect, useState } from "react";
import {
    AppCustomisation
} from "@/lib/app/customisation";

export default function ThemeSwitcher({
    themes = AppCustomisation.branding.themes
}) {
    const [currentTheme, setCurrentTheme] = useState(null);

    useEffect(() => {
        setCurrentTheme(getTheme());
    }, []);

    return (
        <Card

        >
            <h1 className="text-2xl text-primary-50">
                Change Theme
            </h1>
            <p className="mt-2 text-sm text-primary-200">
                Change the look and feel of the app.
            </p>
            <div className="mt-4">
                <div className="flex flex-col space-y-2 w-full max-w-xs">
                    {themes.map((theme) => (
                        <Button
                            key={theme}
                            onClick={() => {
                                switchTheme(theme);
                                setCurrentTheme(theme);
                            }}
                            disabled={currentTheme === theme}
                        >
                            {currentTheme === theme ? (
                                <span>Using</span>
                            ) : (
                                <span>Switch to</span>
                            )}{' '}                            
                            {theme.split("-").map(word => word[0].toUpperCase() + word.slice(1)).join(" ")} Theme
                        </Button>
                    ))}
                </div>
            </div>
        </Card>
    )
}