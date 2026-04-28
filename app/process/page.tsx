import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { ContentSection, CTASection, PageHero, ProcessTimeline, SectionHeading } from '@/components/marketing'
import { processSteps } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Development Process',
  description: 'How DevForge Studio plans, designs, builds, launches, and maintains software products.',
}

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Process"
        title="A delivery process designed to reduce ambiguity and keep projects moving."
        description="Good software delivery starts before code and continues after launch. Our process gives clients clear next steps, review points, and production-minded execution."
        compact
        actions={
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/contact">Schedule a Consultation</Link>
          </Button>
        }
      />

      <ContentSection>
        <SectionHeading
          eyebrow="How we work"
          title="From discovery to continuous improvement."
          description="The same structure can support a new product, an AI implementation, a platform rebuild, or ongoing maintenance."
        />
        <ProcessTimeline steps={processSteps} />
      </ContentSection>

      <ContentSection className="pt-0">
        <div className="grid gap-5 rounded-3xl border border-border/60 bg-card/45 p-6 lg:grid-cols-3 lg:p-8">
          {[
            ['Transparent scope', 'We define what is included, what is not, and which decisions still need evidence.'],
            ['Frequent review', 'Clients see progress through checkpoints, demos, and practical decision points.'],
            ['Launch readiness', 'Deployment, monitoring, documentation, and support are considered before release day.'],
          ].map(([title, description]) => (
            <article key={title} className="rounded-2xl border border-border/50 bg-background/45 p-5">
              <h2 className="text-lg font-semibold text-foreground">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>
      </ContentSection>

      <CTASection />
    </>
  )
}
