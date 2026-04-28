import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/config'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_CONFIG.url
const routes = ['', '/services', '/projects', '/process', '/about', '/faq', '/contact', '/privacy', '/terms', '/cookies', '/disclaimer']

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/contact' ? 0.9 : 0.7,
  }))
}
