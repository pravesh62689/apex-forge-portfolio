import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/api/',          // Blocks scanning internal backend service engines
                '/_next/',        // Blocks internal framework dependencies
                '/static/',       // Blocks raw static assets folders
            ],
        },
        sitemap: 'https://apexforgetechnologies.com/sitemap.xml', // Direct path to the sitemap built above
    };
}