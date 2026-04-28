import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { ContentSection, CTASection, PageHero, SectionHeading, StrengthGrid } from '@/components/marketing'
import { SITE_CONFIG } from '@/lib/config'
import { strengths } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about DevForge Studio, a development team focused on practical software planning, delivery, launch, and maintenance.',
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About DevForge Studio"
        title="A practical development partner for businesses building digital products."
        description="We help clients move from unclear requirements to reliable software. Our work combines product thinking, engineering discipline, clear communication, and long-term maintainability."
        compact
        actions={
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/contact">Talk to the team</Link>
          </Button>
        }
      />

      <ContentSection>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="rounded-3xl border border-primary/25 bg-primary/10 p-8">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">Operating principle</p>
            <h2 className="mt-4 text-3xl font-semibold text-foreground">Useful software starts with clear business context.</h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              We do not treat engineering as an isolated task list. We work to understand what the product needs to achieve, who depends on it, and how it will be operated after launch.
            </p>
          </div>
          <div className="space-y-6 text-sm leading-7 text-muted-foreground">
            <p>
              {SITE_CONFIG.name} supports companies, startups, founders, and internal teams that need experienced help planning and delivering software. Engagements can begin with product discovery, a focused development sprint, an AI/automation initiative, or ongoing maintenance for an existing system.
            </p>
            <p>
              Our team works across frontends, backends, mobile experiences, AI workflows, cloud deployment, integrations, and operational tooling. The common thread is practical delivery: clear scope, maintainable code, and communication that helps stakeholders make decisions.
            </p>
            <p>
              We are best suited for clients who want a thoughtful technical partner, not just a vendor taking tickets. We can help define the roadmap, build the first version, improve existing systems, and stay involved as the product grows.
            </p>
          </div>
        </div>
      </ContentSection>

      <ContentSection>
        <SectionHeading
          eyebrow="Strengths"
          title="The qualities clients need from a development partner."
          description="Reliable delivery depends on technical skill, but also on communication, prioritization, and long-term thinking."
        />
        <StrengthGrid strengths={strengths} />
      </ContentSection>

      <CTASection
        title="Looking for a team that can own the technical path?"
        description="Share your current challenge and we will help determine whether discovery, development, automation, or maintenance support is the right next step."
      />
    </>
  )
}
