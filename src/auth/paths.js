// Note that you can use `:path*` to match any path that follows `/dashboard` like so `/dashboard/:path*`
// See more details at https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const restrictedPathnames = [
    '/welcome',
    '/dashboard',
    '/settings',
    '/settings/:path*',
]
export const adminPathnames = [
    '/admin'
]

export const marketingPages = {
    "/": "/home",
};

export const authPages = {
    signUp: "/signup",
    signIn: "/login",
    verifyRequest: "/verify",
    newUser: "/welcome",
};

export const sitemapPages = {
    ...marketingPages,
    ...Object.keys(authPages).reduce((acc, key) => {
        const path = authPages[key];
        if (key !== 'verifyRequest' && key !== 'newUser') {
            acc[path] = path;
        }
        return acc;
    }, {})
};