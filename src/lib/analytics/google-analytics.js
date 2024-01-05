// Google Analytics 4

"use client";

import Script from 'next/script'
import { AppCustomisation } from '../app/customisation'

export default function GoogleAnalytics({

}) {
    // Alternatively, instead of setting an environment
    // variable, you can directly set the ID here.
    const ga_id = AppCustomisation.tools.google_analytics.ga_id; // Includes "G-" prefix
    const ga_enabled = AppCustomisation.tools.google_analytics.enabled && (ga_id !== "");

    // If no hotjarId is set, we won’t enable Google Analytics Tracking.
    if (!ga_id || !ga_enabled) return null;

    return (
        <>
            <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${ga_id}`} />
            <Script
                id='google-analytics'
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${ga_id}', {
                            page_path: window.location.pathname,
                        });
                    `,
                }}
            />
        </>
    )
}