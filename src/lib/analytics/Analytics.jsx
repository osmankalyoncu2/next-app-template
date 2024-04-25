"use client";

import GoogleAnalytics from "./google-analytics";
import Hotjar from "./hotjar";
import MetaPixel from "./meta-pixel";
import VercelAnalytics from "./vercel";

export default function Analytics() {
    if (process.env.NODE_ENV !== "production") {
        console.warn("Analytics is disabled in development mode.");
        return null;
    }

    return (
        <>
            <GoogleAnalytics />
            <Hotjar />
            <MetaPixel />
            <VercelAnalytics />
        </>
    )
}