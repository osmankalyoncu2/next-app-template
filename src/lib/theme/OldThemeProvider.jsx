"use client";

import { resolveTheme } from "@/lib/theme/themeManager";
import { useEffect } from "react";

export default function ThemeProvider({
    children,
}) {
    useEffect(() => {
        resolveTheme();
    }, []);

    return children;
}