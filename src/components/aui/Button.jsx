// Note: This button comes prebuilt with a loading/disabled state.
// To properply utilise it, you need the onClick function to be an async function.
// Normal functions won't notify the user that the button/process is loading.

"use client";

import { classNames } from "@/lib/utils/classNames";

// Prop Types
import PropTypes from 'prop-types'

Button.propTypes = {
    children: PropTypes.node,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    variant: PropTypes.oneOf(["default", "danger"]),
    className: PropTypes.string,
    smaller: PropTypes.bool
};

export default function Button({
    children,
    disabled = null,
    onClick = () => { },
    variant = "default",
    className = "",
    smaller = false,
    ...props
}) {
    let scheme;
    let size;

    if (variant === "danger") {
        scheme = "text-red-200 bg-red-800/75 hover:bg-red-700/75 hover:ring-2 ring-red-600 disabled:bg-red-700/50 disabled:text-red-200/50 disabled:ring-red-600/70";
    } else {
        scheme = "ring-primary-600 text-primary-100 bg-primary-800 hover:bg-primary-700 hover:ring-2 ring-primary-600 disabled:bg-primary-700/50 disabled:text-primary-100/50";
    }

    if (smaller) {
        size = "px-smaller-size-x py-smaller-size-y";
    } else {
        size = "px-size-x py-size-y";
    }

    return (
        <button
            className={classNames(
                "relative border border-transparent disabled:cursor-not-allowed focus:ring-2 focus-visible:outline-none focus-visible:ring-2 rounded-md transition duration-200 ease-in-out text-sm font-semibold",
                scheme,
                size,
                className
            )}
            onClick={onClick}
            disabled={disabled || loading}
            {...props}
        >
            {children}
        </button>
    )
}