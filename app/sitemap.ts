import type { MetadataRoute } from 'next'

// Update BASE_URL to your deployed domain
const BASE_URL = 'https://masterai.dev'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
