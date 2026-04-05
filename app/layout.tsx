import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});
const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono"
});

// Update this to your deployed domain so OG/Twitter image URLs resolve correctly
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://masterai.dev'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'AI Full-Stack Engineer | Portfolio',
  description: 'Building intelligent systems that scale. Specializing in AI Agents, LLM Systems, Computer Vision, and Full-Stack Platforms.',
  keywords: ['AI Engineer', 'Full-Stack Developer', 'Machine Learning', 'LLM', 'Computer Vision', 'React', 'Next.js', 'Python'],
  authors: [{ name: 'masterAI' }],
  openGraph: {
    type: 'website',
    title: 'AI Full-Stack Engineer | Portfolio',
    description: 'Building intelligent systems that scale. Specializing in AI Agents, LLM Systems, Computer Vision, and Full-Stack Platforms.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'AI Full-Stack Engineer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Full-Stack Engineer | Portfolio',
    description: 'Building intelligent systems that scale. Specializing in AI Agents, LLM Systems, Computer Vision, and Full-Stack Platforms.',
    images: ['/opengraph-image'],
    creator: '@masterAI359',
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
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
