"use client";

// Prop Types
import PropTypes from 'prop-types'

Title.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
};

export default function Title({
    title,
    subtitle = null,
}) {
    return (
        <div
            className="flex flex-col"
        >
            <h1
                className="text-3xl text-primary font-semibold"
            >
                {title}
            </h1>
            {subtitle && (
                <h2
                    className="text-sm text-primary-200 font-semibold"
                >
                    {subtitle}
                </h2>
            )}
        </div>
    )
}