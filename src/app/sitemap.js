import { sitemapPages } from "@/auth/paths"

export default function sitemap() {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_AUTH_URL || 'http://localhost:3000';

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
