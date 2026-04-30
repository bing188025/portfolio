import type { Metadata } from 'next'
import { Mail, MessageSquare, Timer, type LucideIcon } from 'lucide-react'

import { ContentSection, PageHero } from '@/components/marketing'
import { ProjectInquiryForm } from '@/components/project-inquiry-form'
import { SITE_CONFIG } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Request a project estimate or consultation from DevForge Studio.',
}

export default function ContactPage() {
  const contactNotes: Array<[string, string, LucideIcon]> = [
    ['Response time', 'We review project requests and respond within one business day.', Timer],
    ['Best for', 'New builds, AI features, web/mobile products, backend systems, automation, and maintenance.', MessageSquare],
    ['Direct email', SITE_CONFIG.email, Mail],
  ]

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you want to build, improve, automate, or maintain."
        description="Use the form below to share project context, service needs, timeline, and budget range. We will review your request and respond within one business day."
        compact
      />

      <ContentSection>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.3fr]">
          <aside className="space-y-5">
            {contactNotes.map(([title, description, Icon]) => (
              <div key={title} className="rounded-2xl border border-border/60 bg-card/55 p-6">
                <Icon className="size-6 text-primary" />
                <h2 className="mt-4 text-lg font-semibold text-foreground">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
              </div>
            ))}
          </aside>
          <div className="rounded-3xl border border-border/60 bg-card/55 p-5 shadow-xl shadow-black/25 sm:p-8">
            <ProjectInquiryForm />
          </div>
        </div>
      </ContentSection>
    </>
  )
}
