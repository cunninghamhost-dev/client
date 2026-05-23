import type { MetadataRoute } from 'next';

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: '*',
      allow: '*',
      disallow: ['/authentication'],
    },
  ],
});

export default robots;

export const dynamic = 'error';
