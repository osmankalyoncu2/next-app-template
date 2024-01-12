"use client";

import GoogleAnalytics from "./google-analytics";
import Hotjar from "./hotjar";
import MetaPixel from "./meta-pixel";
import VercelAnalytics from "./vercel";

export default function Analytics() {
    return (
        <>
            <GoogleAnalytics />
            <Hotjar />
            <MetaPixel />
            <VercelAnalytics />
        </>
    )
}