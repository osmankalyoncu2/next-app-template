// Note: This button comes prebuilt with a loading/disabled state.
// To properply utilise it, you need the onClick function to be an async function.
// Normal functions won't notify the user that the button/process is loading.

"use client";

import { classNames } from "@/lib/utils/classNames";
import { useState } from "react";
import Spinner from "./Loader";

export default function Button({
    children,
    disabled = null,
    onClick = () => { },
    variant = "default",
    className = "",
    smaller = false,
    ...props
}) {
    const [loading, setLoading] = useState(false);
    let scheme;
    let size;

    if (variant === "danger") {
        scheme = "text-red-200 bg-red-800/75 hover:bg-red-700/75 hover:ring-2 ring-red-600 disabled:bg-red-700/50 disabled:text-red-200/50 disabled:ring-red-600/70";
    } else {
        scheme = "ring-primary-600 text-primary-100 bg-primary-800 hover:bg-primary-700 hover:ring-2 ring-primary-600 disabled:bg-primary-700/50 disabled:text-primary-100/50";
    }

    if (smaller) {
        size = "px-2 py-1";
    } else {
        size = "px-3 py-2";
    }

    return (
        <button
            className={classNames(
                "relative border border-transparent disabled:cursor-not-allowed focus:ring-2 focus-visible:outline-none focus-visible:ring-2 rounded-md transition duration-200 ease-in-out text-sm font-semibold",
                scheme,
                size,
                className
            )}
            onClick={async (e) => {
                setLoading(true);
                await onClick(e);
                setLoading(false);
            }}
            disabled={disabled || loading}
            {...props}
        >
            {children}
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <Spinner color="text-red-50" />
                </div>
            )}
        </button>
    )
}