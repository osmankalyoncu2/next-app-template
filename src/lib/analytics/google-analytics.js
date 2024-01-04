// Google Analytics 4

import Script from 'next/script'

export default function GoogleAnalytics({

}) {
    // Alternatively, instead of setting an environment
    // variable, you can directly set the ID here.
    const ga_id = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID; // Includes "G-" prefix

    // If no hotjarId is set, we won’t enable Google Analytics Tracking.
    if (!ga_id) return null;

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