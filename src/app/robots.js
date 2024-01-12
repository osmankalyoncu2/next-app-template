export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: ['/'],
            },
        ],
        //sitemap: 'https://acme.com/sitemap.xml', // TODO: Add support for sitemaps
    }
}