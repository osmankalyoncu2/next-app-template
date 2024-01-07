// This file is created to prevent a user accessing certain pages without proper authorization.

import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

// Consistent Configuration for NextAuth & Middleware
import {
    pages
} from "@/lib/auth/consistent-config";

// Note that you can use `:path*` to match any path that follows `/dashboard` like so `/dashboard/:path*`
// See more details at https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
const marketingPages = {
    "/": "/home",
}
const restrictedPathnames = [
    '/welcome',
    '/dashboard',
    '/settings',
    '/settings/:path*',
]
const adminPathnames = [
    '/admin'
]

function checkPathnamesValid() {
    // Check for duplicate pathnames in restrictedPathnames, adminPathnames and the keys of marketingPages

    const allPathnames = restrictedPathnames.concat(adminPathnames).concat(Object.keys(marketingPages))

    const duplicates = allPathnames.filter((item, index) => allPathnames.indexOf(item) !== index)

    if (duplicates.length > 0) {
        throw new Error(`Duplicate pathnames found: ${duplicates.join(', ')}`)
    }
}

export default withAuth(
    function middleware(req) {
        checkPathnamesValid()
        if (
            adminPathnames.includes(req.nextUrl.pathname) &&
            req.nextauth.token?.role !== 'admin'
        ) {
            const url = req.nextUrl.clone()
            url.pathname = '/unauthorized'
            return NextResponse.redirect(url)
        } else if (
            restrictedPathnames.includes(req.nextUrl.pathname) &&
            req.nextauth.token?.role !== 'user' &&
            req.nextauth.token?.role !== 'admin'
        ) {
            const url = req.nextUrl.clone()
            url.pathname = pages.signIn // Redirect to sign in page
            return NextResponse.redirect(url)
        } else if (
            marketingPages[req.nextUrl.pathname] &&
            req.nextauth.token?.role !== 'user' &&
            req.nextauth.token?.role !== 'admin'
        ) {
            const url = req.nextUrl.clone()
            url.pathname = marketingPages[req.nextUrl.pathname]
            return NextResponse.rewrite(url)
        } else {
            return NextResponse.next()
        }
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                if (
                    !restrictedPathnames.includes(req.nextUrl.pathname) &&
                    !adminPathnames.includes(req.nextUrl.pathname)
                ) {
                    return true;
                }

                return !!token;
            }
        },
        pages: pages,
    }
);

const matcher = restrictedPathnames.concat(adminPathnames)

export const config = {
    matcher: matcher,
}