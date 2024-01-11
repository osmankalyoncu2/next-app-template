

// Note that you can use `:path*` to match any path that follows `/dashboard` like so `/dashboard/:path*`
// See more details at https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const marketingPages = {
    "/": "/home",
}
export const restrictedPathnames = [
    '/welcome',
    '/dashboard',
    '/settings',
    '/settings/:path*',
]
export const adminPathnames = [
    '/admin'
]

export const matcher = restrictedPathnames.concat(adminPathnames)