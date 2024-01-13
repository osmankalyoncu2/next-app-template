"use client";

import {
    HomeIcon,
    QuestionMarkCircleIcon,
    KeyIcon,
    CogIcon,
    AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline'

import {
    marketingPages,
} from '@/auth/paths'

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
            "dark",
            "light",
            "tokyo",
            "orange",
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
        },
        // TODO: Add more admin pages here such as `/admin/users` and `/admin/analytics`.
    ],
    marketing_pages: marketingPages,
    settings: {
        page: {
            name: 'Settings',
            href: '/settings',
            icon: CogIcon,
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
            analytics: true, // Override to disable Vercel Analytics
            speed_insights: true, // Override to disable Vercel Speed Insights
        },
    }
}