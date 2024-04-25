"use client";

import { AppCustomisation } from "@/lib/app/customisation";

export default function Test() {
    return (
        <pre
            className="text-base font-medium text-primary-200"
        >
            {JSON.stringify(AppCustomisation.marketing_pages, null, 4)}
        </pre>
    )
}