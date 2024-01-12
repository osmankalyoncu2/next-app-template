# Sitemaps with Make Next App

Sitemap generation occurs inside of `/src/app/sitemap.js`.

If you want to generate multiple sitemaps, you’ll need to use the following code but adapt it to your needs:

```js
import { sitemapPages } from "@/auth/paths"

// For generating multiple sitemaps:
export async function generateSitemaps() {
    // Here you need to get the ids of the sitemaps you want to generate
    return [
        {
            id: 0
        }
    ]
}

export default async function sitemap({ id }) {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_AUTH_URL || 'http://localhost:3000';

    // Now do something with the `id`

    let sitemapEntries = [];

    for (const key of Object.keys(sitemapPages)) {
        const path = key.startsWith('/') ? key.substring(1) : key;
        sitemapEntries.push({
            url: `${BASE_URL}/${path}`,
            lastModified: new Date().toISOString(),
        });
    }

    return sitemapEntries;
}

```