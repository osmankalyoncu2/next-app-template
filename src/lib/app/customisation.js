"use client";

import {
    HomeIcon,
    QuestionMarkCircleIcon,
    KeyIcon
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
            no_display: true // This value should be true to hide the navigation item.
        }
    ],
    settings: {
        page: {
            name: 'Settings',
            href: '/settings',
            subtext: 'Manage your account settings.'
        }
    }
}