// This file is created to prevent a user accessing certain pages without proper authorization.

import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

// Note that you can use `:path*` to match any path that follows `/dashboard` like so `/dashboard/:path*`
const restrictedPathnames = [
    '/dashboard'
]

const adminPathnames = [
    '/admin'
]

export default withAuth(
    function middleware(req) {
        if (
            req.nextUrl.pathname in adminPathnames &&
            req.nextauth.token?.role !== 'admin'
        ) {
            return NextResponse.redirect("/unauthorized")
        }

        if (
            req.nextUrl.pathname in restrictedPathnames &&
            req.nextauth.token?.role !== 'user' &&
            req.nextauth.token?.role !== 'admin'
        ) {
            return NextResponse.redirect("/signin")
        }
    },
    {
        callbacks: {
            authorized: (params) => {
                let { token } = params;
                return !!token;
            }
        }
    }
);

export const config = {
    matcher: [
        ...restrictedPathnames,
        ...adminPathnames
    ]
}