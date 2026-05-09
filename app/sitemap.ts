import type { MetadataRoute } from 'next'

const BASE = 'https://infinitycloudsolutions.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      lastModified: new Date('2026-05-01'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE}/privacidad`,
      lastModified: new Date('2026-05-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE}/terminos`,
      lastModified: new Date('2026-05-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
