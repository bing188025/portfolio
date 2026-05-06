"use client"

import Image from 'next/image'
import { Github, Linkedin, Mail } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/config'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 border-t border-border/40 bg-background/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 flex items-center justify-center">
              <Image src="/logo.png" alt={`${SITE_CONFIG.name} logo`} width={32} height={32} className="object-contain" />
            </div>
            <span className="text-sm text-foreground/50">
              © {currentYear} {SITE_CONFIG.name}. All rights reserved.
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a 
              href={SITE_CONFIG.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-foreground/50 hover:text-foreground hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href={SITE_CONFIG.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-foreground/50 hover:text-foreground hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href={`mailto:${SITE_CONFIG.email}`}
              className="p-2 rounded-lg text-foreground/50 hover:text-foreground hover:bg-primary/10 border border-transparent hover:border-primary/20 transition-all"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
