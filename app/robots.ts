import type { MetadataRoute } from 'next'

// Update BASE_URL to your deployed domain
const BASE_URL = 'https://masterai.dev'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
