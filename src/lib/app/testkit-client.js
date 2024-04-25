"use client";

export default function TestkitClient() {
    return null;

    /**
     * This component is used to test the theme switcher in development.
     * 
     * import { useTheme } from "next-themes";
     * 
     * const possibleThemes = ["system", "light", "dark"];
     * 
     * const { theme, setTheme } = useTheme();
     * 
     * return (
        <div
            className="fixed bottom-0 right-0 z-50 w-12 h-12 p-3 bg-white rounded-tl-lg shadow-lg cursor-pointer dark:bg-black dark:text-white"
        >
            <button
                className="size-8"
                onClick={() => {
                    const i = possibleThemes.indexOf(theme);
                    const next = possibleThemes[(i + 1) % possibleThemes.length];
                    setTheme(next);
                }}
            >
                Theme
            </button>
        </div>
    );*/
}