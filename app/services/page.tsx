import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  ContentSection,
  CTASection,
  EngagementModelCards,
  IconBadge,
  PageHero,
  SectionHeading,
} from '@/components/marketing'
import { SITE_CONFIG } from '@/lib/config'
import { engagementModels, services } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Services',
  description: `${SITE_CONFIG.name} provides global web, mobile, AI, backend, automation, cloud infrastructure, maintenance, and consulting services for businesses that need a development partner.`,
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Flexible global delivery models for software, AI, cloud, and operations work."
        description="Start with discovery, move into a focused build, add AI or automation, or retain a team for ongoing product delivery. Each model is designed to make scope, timeline, risk, ownership, and launch readiness clear."
        compact
        imageSrc="/images/projects/vps-hosting.jpg"
        actions={
          <>
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/contact">Request a Project Estimate</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary/30 bg-background/30">
              <Link href="/process">How we work</Link>
            </Button>
          </>
        }
      />

      <ContentSection>
        <SectionHeading
          eyebrow="Engagement models"
          title="How clients typically work with us."
          description="These models help you choose the right starting point before we prepare a tailored estimate for your product, market, timeline, and operating needs."
        />
        <EngagementModelCards models={engagementModels} />
      </ContentSection>

      <ContentSection className="pt-0">
        <SectionHeading
          eyebrow="Capabilities"
          title="Service capabilities that combine into one global delivery plan."
          description="Each service can stand alone or combine into a full product engagement covering planning, design, implementation, deployment, technical SEO, analytics, and maintenance."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.slug}
              id={service.slug}
              className="scroll-mt-28 rounded-2xl border border-border/60 bg-card/55 p-6 shadow-xl shadow-black/20 lg:p-8"
            >
              <div className="flex flex-col gap-5 sm:flex-row">
                <IconBadge icon={service.icon} />
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">{service.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{service.description}</p>
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {service.deliverables.map((deliverable) => (
                  <div key={deliverable} className="rounded-xl border border-border/50 bg-background/45 p-4 text-sm text-foreground/75">
                    {deliverable}
                  </div>
                ))}
              </div>
              <Link href="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
                Discuss this service
                <ArrowRight className="size-4" />
              </Link>
            </article>
          ))}
        </div>
      </ContentSection>

      <CTASection
        title="Need help choosing the right service?"
        description="Send a short project description and we will recommend whether you need discovery, a focused build, AI automation, ongoing support, or a phased global roadmap."
      />
    </>
  )
}
