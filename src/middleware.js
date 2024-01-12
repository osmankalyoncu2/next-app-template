// This file is created to prevent a user accessing certain pages without proper authorization.

//export { auth as middleware } from "@/auth/auth"

import { auth } from "@/auth/auth"
import {
    checkPathnamesValid,
    adminPathnames,
    restrictedPathnames,
    marketingPages,
    authPages
} from "@/auth/auth.config";
import { NextResponse } from "next/server"

const middleware = auth((req) => {
    checkPathnamesValid()
    if (
        adminPathnames.includes(req.nextUrl.pathname) &&
        req?.auth?.user?.role !== 'admin'
    ) {
        const url = req.nextUrl.clone()
        url.pathname = '/unauthorized'
        return NextResponse.redirect(url)
    } else if (
        restrictedPathnames.includes(req.nextUrl.pathname) &&
        req?.auth?.user?.role !== 'user' &&
        req?.auth?.user?.role !== 'admin'
    ) {
        const url = req.nextUrl.clone()
        url.pathname = authPages.signIn // Redirect to sign in page
        return NextResponse.redirect(url)
    } else if (
        marketingPages[req.nextUrl.pathname] &&
        req?.auth?.user?.role !== 'user' &&
        req?.auth?.user?.role !== 'admin'
    ) {
        const url = req.nextUrl.clone()
        url.pathname = marketingPages[req.nextUrl.pathname]
        return NextResponse.rewrite(url)
    } else {
        return NextResponse.next()
    }
})

export default middleware;

/*
 * Match all request paths except for the ones starting with:
 * - api (API routes)
 * - _next/static (static files)
 * - _next/image (image optimization files)
 * - favicon.ico (favicon file)
 */

/*
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
*/