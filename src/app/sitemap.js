import { AppCustomisation } from "@/lib/app/customisation"
import { sitemapPages } from "@/auth/paths"

export async function generateSitemaps() {
    return [
        {
            id: 0
        }
    ]
}

export default async function sitemap({ id }) {
    const BASE_URL = AppCustomisation.base_url

    // Only marketing and signin/signup pages should be included in the sitemap

    return sitemapPages.map((page) => ({
        url: `${BASE_URL}/${page}`,
        lastModified: new Date().toISOString(),
    }))
}