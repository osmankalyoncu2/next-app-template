"use client";

import { useRouter } from "next/navigation";

export default function CTACard({
    title = "Contact support",
    subtitle = "Get in touch with our support team for help with your account.",
    button = "Get in touch &rarr;",
    href = "#",
}) {
    const router = useRouter();

    return (
        <div
            className="py-10 px-6 border-2 border-primary-700 ring-2 ring-primary-900 ring-offset-2 ring-offset-primary-800 rounded-xl"
        >
            <div
                className="flex flex-row items-center justify-between"
            >
                <div
                    className="flex flex-col"
                >
                    <h3
                        className="text-2xl font-semibold text-white"
                    >
                        {title}
                    </h3>
                    <p
                        className="mt-0 text-primary-200 text-sm"
                    >
                        {subtitle}
                    </p>
                </div>
                <div
                    className="flex flex-col h-full justify-center items-center"
                >
                    <button
                        onClick={() => {
                            router.push(`${href}`);
                        }}
                        className="px-4 py-2 bg-primary-900 text-white rounded-lg font-semibold text-sm hover:bg-primary-800 transition duration-200 ease-in-out"
                    >
                        {button}
                    </button>
                </div>
            </div>
        </div>
    )
}