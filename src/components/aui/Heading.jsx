"use client";

import { classNames } from "@/lib/utils/classNames";

// Prop Types
import PropTypes from 'prop-types'

Heading.propTypes = {
    heading: PropTypes.string,
    className: PropTypes.string,
};

export default function Heading({
    heading = "Section Heading",
    className = "",
}) {
    return (
        <div
            className="flex flex-col my-6"
        >
            <h2
                className={classNames(
                    "text-2xl text-primary font-semibold",
                    className,
                )}
            >
                {heading}
            </h2>
        </div>
    )
}