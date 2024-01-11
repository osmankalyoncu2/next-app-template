"use client";

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"

import { AppCustomisation } from '@/lib/app/customisation';

export default function VercelAnalytics({

}) {
    const speed_insights_enabled = AppCustomisation.tools.vercel.speed_insights || false;
    const analytics_enabled = AppCustomisation.tools.vercel.analytics || false;

    return (
        <>
            {speed_insights_enabled && <SpeedInsights />}
            {analytics_enabled && <Analytics />}
        </>
    )
}