import { MetadataRoute } from 'next';
import { ServiceModel } from '@/models/Service';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nexgenworkforce.com';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/industries`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/get-a-quote`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];

  try {
    const services = await ServiceModel.getAllActive();
    const serviceRoutes: MetadataRoute.Sitemap = services.map(s => ({
      url: `${baseUrl}/services/${s.slug}`,
      lastModified: new Date(s.updated_at || new Date()),
      changeFrequency: 'weekly',
      priority: 0.85,
    }));

    return [...staticRoutes, ...serviceRoutes];
  } catch (err) {
    console.error('Sitemap generation error:', err);
    return staticRoutes;
  }
}
