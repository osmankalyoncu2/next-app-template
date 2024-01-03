"use client";

import {
    classNames
} from "@/lib/utils/classNames";

export default function Card({
    children,
    className = "",
    ...props
}) {
    return (
        <div
            className={classNames(
                "bg-primary-950 rounded-xl px-6 py-8 border border-primary-800",
                className,
            )}
            {...props}
        >
            {children}
        </div>
    )
}