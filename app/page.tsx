import Link from 'next/link'
import { ArrowRight, CalendarDays } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  CaseStudyCard,
  ContentSection,
  CTASection,
  FaqList,
  PageHero,
  ProcessTimeline,
  SectionHeading,
  ServiceCard,
  StrengthGrid,
} from '@/components/marketing'
import { caseStudies, faqs, processSteps, services, strengths } from '@/lib/site-data'

export default function HomePage() {
  return (
    <>
      <PageHero
        eyebrow="Software development partner"
        title="Plan, build, launch, and maintain software with a reliable development team."
        description="DevForge Studio helps businesses turn complex product ideas into practical web, mobile, AI, automation, backend, and cloud systems. We combine product thinking, strong engineering, and clear communication from discovery through long-term support."
        actions={
          <>
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/contact">
                Request a Project Estimate
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary/30 bg-background/30">
              <Link href="/process">
                Schedule a Consultation
                <CalendarDays className="size-4" />
              </Link>
            </Button>
          </>
        }
      />

      <ContentSection>
        <div className="grid gap-4 rounded-3xl border border-border/60 bg-card/45 p-5 shadow-xl shadow-black/20 sm:grid-cols-3 lg:p-8">
          {[
            ['Discovery to launch', 'Structured delivery from idea validation through production release.'],
            ['Business-ready systems', 'Interfaces, APIs, AI workflows, and infrastructure built for real use.'],
            ['Ongoing partnership', 'Maintenance, improvements, and technical guidance after launch.'],
          ].map(([title, description]) => (
            <div key={title} className="rounded-2xl border border-border/50 bg-background/45 p-5">
              <h2 className="text-lg font-semibold text-foreground">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection className="pt-6">
        <SectionHeading
          eyebrow="Services"
          title="Development support for the full product lifecycle."
          description="Choose a focused build, bring us into an existing project, or use us as an ongoing technical partner across product, engineering, AI, automation, and infrastructure."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.slice(0, 4).map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="outline" className="border-primary/30">
            <Link href="/services">View all services</Link>
          </Button>
        </div>
      </ContentSection>

      <ContentSection>
        <SectionHeading
          eyebrow="Why clients work with us"
          title="A practical technical partner, not just extra hands."
          description="We help teams reduce ambiguity, protect delivery quality, and make technical choices that fit the business."
        />
        <StrengthGrid strengths={strengths} />
      </ContentSection>

      <ContentSection>
        <SectionHeading
          eyebrow="Process"
          title="A clear path from early idea to production system."
          description="Our delivery model keeps strategy, design, engineering, testing, launch, and improvement connected."
        />
        <ProcessTimeline steps={processSteps} />
      </ContentSection>

      <ContentSection>
        <SectionHeading
          eyebrow="Case studies"
          title="Representative work across products, AI, and operations."
          description="These examples show the types of software systems and workflows we can help plan and build."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.slice(0, 3).map((study) => (
            <CaseStudyCard key={study.title} study={study} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="outline" className="border-primary/30">
            <Link href="/projects">View case studies</Link>
          </Button>
        </div>
      </ContentSection>

      <ContentSection>
        <SectionHeading
          eyebrow="FAQ"
          title="Common questions before starting a project."
          description="A few practical answers about scope, support, estimates, and working with our team."
        />
        <div className="mx-auto max-w-4xl">
          <FaqList faqs={faqs.slice(0, 4)} />
        </div>
      </ContentSection>

      <CTASection />
    </>
  )
}
