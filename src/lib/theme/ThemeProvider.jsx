"use client";

import { resolveTheme } from "@/lib/theme/themeManager";

export default function ThemeProvider({
    children,
}) {
    resolveTheme();

    return children;
}