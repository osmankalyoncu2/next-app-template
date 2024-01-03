"use client";

import {
    HomeIcon,
} from '@heroicons/react/16/solid'

export const AppCustomisation = {
    branding: {
        // You can change Metadata inside of `/src/app/layout.js`
        logos: {
            // Mini Logos are smaller logos that are used in the sidebar navigation.
            mini: {
                src: '/make-next-app-mini-logo.svg',
                alt: 'Make Next App Logo',
            },
            default: {
                src: '/make-next-app-logo.svg',
                alt: 'Make Next App Logo',
            }
        }
    },
    navigation: [
        {
            name: 'Dashboard',
            href: '/dashboard',
            icon: HomeIcon,
            current: true
        },
    ],
    settings: {
        page: {
            title: 'Settings',
            subtitle: 'Manage your account settings.'
        }
    }
}