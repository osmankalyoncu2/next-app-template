"use client";

import { classNames } from "@/lib/utils/classNames";
import { useId } from "react";

export default function TextInput({
    id = null,
    label = null,
    className = "",
    smaller = false,
    ...props
}) {
    const temp_id = useId();
    if (!id) {
        id = temp_id;
    }

    return (
        <div
            className="flex flex-col w-full"
        >
            {label && (
                <label
                    className="text-neutral-400 text-sm mb-2 w-full"
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <input
                id={id}
                type="text"
                className={classNames(
                    "bg-primary-800 border-neutral-700 outline-none focus-visible:outline-none ring-0 focus-visible:ring-2 focus-visible:ring-primary-600 rounded-md shadow-xl flex flex-col justify-center items-center text-primary w-full placeholder-primary-200 text-sm transition duration-200 ease-in-out",
                    smaller ? "px-smaller-size-x py-smaller-size-y" : "px-size-x py-size-y",
                    className
                )}
                {...props}
            />
        </div>
    )
}
