import type { MetadataRoute } from 'next';

export const dynamic = 'error';

export default function sitemap(): MetadataRoute.Sitemap {
  const productionDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const baseUrl = productionDomain ? `https://${productionDomain}` : 'https://cunninghamglobaltravel.vercel.app';
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/authentication`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/flight`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/robots.txt`, // Linking robots.txt in sitemap
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.1,
    },
  ];
}
