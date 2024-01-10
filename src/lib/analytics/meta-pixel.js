// Meta (Facebook) Pixel

"use client";

import Script from "next/script";
import { AppCustomisation } from "../app/customisation";

export default function MetaPixel({

}) {
    // Alternatively, instead of setting an environment
    // variable, you can directly set the ID here.
    const pixelId = AppCustomisation.tools.pixel.pixelId;
    const pixel_enabled = AppCustomisation.tools.pixel.enabled && (pixelId !== "");

    // If no pixelId is set, we won’t enable Hotjar.
    if (!pixelId || !pixel_enabled) return null;

    return (
        <Script strategy="lazyOnload" id="pixel-script">
            {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${pixelId}');
                fbq('track', 'PageView');
            `}
        </Script>
    )
} 