"use client";

import { classNames } from "@/lib/utils/classNames";

export default function Button({
    children,
    onClick = () => { },
    variant = "default",
    className = "",
    smaller = false,
    ...props
}) {
    let scheme;
    let size;

    if (variant === "danger") {
        scheme = "text-red-200 bg-red-800/75 hover:bg-red-700/75 hover:ring-2 ring-red-600";
    } else {
        scheme = "ring-primary-600 text-primary-100 bg-primary-800 hover:bg-primary-700";
    }

    if (smaller) {
        size = "px-2 py-1";
    } else {
        size = "px-3 py-2";
    }

    return (
        <button
            className={classNames(
                "border border-transparent disabled:opacity-75 disabled:cursor-not-allowed focus:ring-2 focus-visible:outline-none focus-visible:ring-2 rounded-md transition duration-200 ease-in-out text-sm font-semibold",
                scheme,
                size,
                className
            )}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    )
}