"use client";

export default function Title({
    title,
    subtitle = null,
}) {
    return (
        <div
            className="flex flex-col"
        >
            <h1
                className="text-3xl text-primary-50 font-semibold"
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