"use client";

import {
    HomeIcon,
    QuestionMarkCircleIcon,
    KeyIcon,
    CogIcon,
    AdjustmentsHorizontalIcon
} from '@heroicons/react/16/solid'

export const AppCustomisation = {
    branding: {
        // You can change Metadata inside of `/src/app/layout.js`
        logos: {
            // Mini Logos are smaller logos that are used in the sidebar navigation.
            mini: {
                src: '/icon',
                alt: 'Make Next App Logo',
            },
            default: {
                src: '/icon',
                alt: 'Make Next App Logo',
            }
        },
        themes: [
            "default",
            "midnight",
            "tokyo"
        ]
    },
    navigation: [
        {
            name: 'Dashboard',
            keywords: ['home', 'dashboard'],
            href: '/dashboard',
            icon: HomeIcon
        },
        {
            name: 'API Keys',
            keywords: ['api', 'keys', 'tokens'],
            href: '/keys',
            icon: KeyIcon
        },
        {
            name: 'Help',
            keywords: ['help', 'support', 'contact'],
            href: '/help',
            icon: QuestionMarkCircleIcon
        },
        {
            name: 'Settings',
            keywords: ['settings', 'account', 'preferences'],
            href: '/settings',
            no_display: true, // This value should be true to hide the navigation item.
            icon: CogIcon,
        }
    ],
    admin: [
        {
            name: 'Admin',
            keywords: ['admin', 'administration', 'users', 'roles', 'permissions'],
            href: '/admin',
            icon: AdjustmentsHorizontalIcon,
        }
    ],
    marketing_pages: {
        "/pricing": "/pricing",
    },
    settings: {
        page: {
            name: 'Settings',
            href: '/settings',
            subtext: 'Manage your account settings.'
        }
    },
    tools: {
        intercom: {
            enabled: false, // Override to disable Intercom
            api_url: "https://api-iam.intercom.io",
            app_id: "l44tyq2y", // If this is set, Intercom will be enabled unless `enabled` is set to false.
        },
        hotjar: {
            enabled: false, // Override to disable Hotjar
            hotjarId: "", // Required if `enabled` is set to true.
        },
        google_analytics: {
            enabled: false, // Override to disable Google Analytics
            ga_id: "G-", // Must start with "G-" and is required if `enabled` is set to true.
        },
        pixel: {
            // Meta Pixel
            enabled: false, // Override to disable Meta Pixel
            pixelId: "", // Required if `enabled` is set to true.
        },
        vercel: {
            // Vercel Analytics
            analytics: false, // Override to disable Vercel Analytics
            speed_insights: false, // Override to disable Vercel Speed Insights
        },
    }
}