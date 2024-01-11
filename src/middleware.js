// This file is created to prevent a user accessing certain pages without proper authorization.

import { auth } from "@/auth/auth";
import {
    checkPathnamesValid,
    adminPathnames,
    restrictedPathnames,
    marketingPages,
    pages
} from "@/auth/auth.config";
import { NextResponse } from "next/server"

export default auth((req) => {
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
        url.pathname = pages.signIn // Redirect to sign in page
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

/*export const config = {
    matcher: matcher
}*/

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}