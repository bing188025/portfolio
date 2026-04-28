"use client"

import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { Github, Linkedin, Mail } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/config'
import { navigationLinks, services } from '@/lib/site-data'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/40 bg-background/80 py-12 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center">
                <Image src="/logo.png" alt={`${SITE_CONFIG.name} logo`} width={36} height={36} className="object-contain" />
              </div>
              <span className="font-semibold text-foreground">{SITE_CONFIG.name}</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-foreground/60">
              A software development team helping clients plan, design, build, launch, and maintain practical digital products.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a href={SITE_CONFIG.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-foreground/50 hover:text-foreground hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
              <a href={SITE_CONFIG.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-foreground/50 hover:text-foreground hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href={`mailto:${SITE_CONFIG.email}`} className="p-2 rounded-lg text-foreground/50 hover:text-foreground hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <FooterColumn title="Company">
            {navigationLinks.map((link) => (
              <Link key={link.href} href={link.href}>{link.label}</Link>
            ))}
          </FooterColumn>

          <FooterColumn title="Services">
            {services.slice(0, 6).map((service) => (
              <Link key={service.slug} href={`/services#${service.slug}`}>{service.title}</Link>
            ))}
          </FooterColumn>

          <FooterColumn title="Legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/cookies">Cookie Policy</Link>
            <Link href="/disclaimer">Disclaimer</Link>
          </FooterColumn>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border/40 pt-6 text-sm text-foreground/50 md:flex-row md:items-center md:justify-between">
          <span>© {currentYear} {SITE_CONFIG.name}. All rights reserved.</span>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="hover:text-foreground">Request a project estimate</Link>
            <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-foreground">{SITE_CONFIG.email}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      <div className="mt-4 flex flex-col gap-3 text-sm text-foreground/60 [&_a]:transition-colors [&_a:hover]:text-foreground">
        {children}
      </div>
    </div>
  )
}
