// Hotjar

"use client";

import Script from "next/script";
import { AppCustomisation } from "../app/customisation";

export default function Hotjar({
    
}) {
    // Alternatively, instead of setting an environment
    // variable, you can directly set the ID here.
    const hotjarId = AppCustomisation.tools.hotjar.hotjarId; 
    const hotjar_enabled = AppCustomisation.tools.hotjar.enabled && (hotjarId !== "");

    // If no hotjarId is set, we won’t enable Hotjar.
    if (!hotjarId || !hotjar_enabled) return null;

    return (
        <Script strategy="lazyOnload" id="hotjar-script">
            {`
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:${hotjarId},hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `}
        </Script>
    )
} 