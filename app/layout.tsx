import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { Analytics } from '@vercel/analytics/next'
import { Footer } from '@/components/footer'
import { Navigation } from '@/components/navigation'
import { SITE_CONFIG } from '@/lib/config'
import { services } from '@/lib/site-data'
import './globals.css'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_CONFIG.url
const CANONICAL_URL = BASE_URL.replace(/\/$/, '')
const SAME_AS_LINKS = [
  SITE_CONFIG.github,
  SITE_CONFIG.linkedin,
  SITE_CONFIG.facebook,
  SITE_CONFIG.instagram,
].filter(Boolean)

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${CANONICAL_URL}#organization`,
      name: SITE_CONFIG.name,
      url: CANONICAL_URL,
      logo: `${CANONICAL_URL}/logo.png`,
      email: `mailto:${SITE_CONFIG.email}`,
      sameAs: SAME_AS_LINKS,
    },
    {
      '@type': 'WebSite',
      '@id': `${CANONICAL_URL}#website`,
      url: CANONICAL_URL,
      name: SITE_CONFIG.name,
      description: SITE_CONFIG.description,
      publisher: {
        '@id': `${CANONICAL_URL}#organization`,
      },
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${CANONICAL_URL}#professional-service`,
      name: SITE_CONFIG.name,
      url: CANONICAL_URL,
      image: `${CANONICAL_URL}/logo.png`,
      email: `mailto:${SITE_CONFIG.email}`,
      areaServed: SITE_CONFIG.serviceArea,
      description: SITE_CONFIG.description,
      slogan: SITE_CONFIG.tagline,
      knowsAbout: SITE_CONFIG.keywords,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Global software development services',
        itemListElement: services.map((service, index) => ({
          '@type': 'Offer',
          position: index + 1,
          itemOffered: {
            '@type': 'Service',
            name: service.title,
            description: service.summary,
            url: `${CANONICAL_URL}/services#${service.slug}`,
          },
        })),
      },
    },
  ],
}

const structuredDataJson = JSON.stringify(structuredData).replace(/</g, '\\u003c')

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  applicationName: SITE_CONFIG.name,
  category: 'Software Development Services',
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  authors: [{ name: SITE_CONFIG.name }],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: '/',
    locale: 'en_US',
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} software development services`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: ['/opengraph-image'],
    creator: SITE_CONFIG.twitterHandle,
  },
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0f1a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredDataJson }}
        />
        <Navigation />
        <main className="min-h-screen overflow-x-hidden bg-background">
          {children}
        </main>
        <Footer />
        {process.env.VERCEL === '1' && <Analytics />}
      </body>
    </html>
  )
}
