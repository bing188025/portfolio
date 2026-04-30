import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { Analytics } from '@vercel/analytics/next'
import { Footer } from '@/components/footer'
import { Navigation } from '@/components/navigation'
import { SITE_CONFIG } from '@/lib/config'
import './globals.css'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_CONFIG.url

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: ['Software Development Agency', 'Web Development', 'Mobile App Development', 'AI Development', 'LLM', 'Backend APIs', 'Automation', 'DevOps', 'Consulting'],
  authors: [{ name: SITE_CONFIG.name }],
  openGraph: {
    type: 'website',
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
