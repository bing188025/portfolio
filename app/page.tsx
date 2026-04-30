import Link from 'next/link'
import { ArrowRight, CalendarDays } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  CaseStudyCard,
  ContentSection,
  CTASection,
  EngagementModelCards,
  FaqList,
  HeroDeliveryPanel,
  PageHero,
  ProcessTimeline,
  ProofMetricGrid,
  SectionHeading,
  ServiceCard,
  StrengthGrid,
} from '@/components/marketing'
import {
  caseStudies,
  deliveryPrinciples,
  engagementModels,
  faqs,
  processSteps,
  proofMetrics,
  services,
  strengths,
} from '@/lib/site-data'

export default function HomePage() {
  return (
    <>
      <PageHero
        eyebrow="Software development partner"
        title="Senior product engineering for companies that need software shipped right."
        description="DevForge Studio helps businesses scope, design, build, launch, and maintain web platforms, mobile apps, AI workflows, backend systems, and automation. We make the delivery path clear before code starts and keep it visible through launch."
        imageSrc="/images/projects/corporate-system.jpg"
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
      >
        <HeroDeliveryPanel />
      </PageHero>

      <ContentSection className="pb-8">
        <ProofMetricGrid metrics={proofMetrics} />
      </ContentSection>

      <ContentSection className="pt-6">
        <SectionHeading
          eyebrow="Services"
          title="A complete service stack for business software delivery."
          description="Work with us on a single critical workflow, a full product build, or a longer-term roadmap that needs product, engineering, AI, automation, and infrastructure support."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </ContentSection>

      <ContentSection>
        <SectionHeading
          eyebrow="Engagement models"
          title="Choose the working model that matches your stage."
          description="Inspired by strong consulting and product-agency patterns, we package the work around outcomes: clarity, launch, automation, ongoing delivery, or maintenance."
        />
        <EngagementModelCards models={engagementModels.slice(0, 3)} />
        <div className="mt-8 text-center">
          <Button asChild variant="outline" className="border-primary/30">
            <Link href="/services">Compare all engagement models</Link>
          </Button>
        </div>
      </ContentSection>

      <ContentSection>
        <SectionHeading
          eyebrow="Trust model"
          title="Designed to reduce delivery risk before it becomes expensive."
          description="The best service websites make proof and process easy to understand. Our operating model is built around the same principle: visible scope, clear ownership, and practical progress."
        />
        <StrengthGrid strengths={deliveryPrinciples} />
      </ContentSection>

      <ContentSection>
        <SectionHeading
          eyebrow="Process"
          title="A delivery rhythm clients can follow."
          description="From the first project note to post-launch improvements, every phase has a concrete purpose and decision point."
        />
        <ProcessTimeline steps={processSteps} />
      </ContentSection>

      <ContentSection>
        <SectionHeading
          eyebrow="Case studies"
          title="Work examples organized by business workflow."
          description="Use these examples to understand the kinds of products, platforms, AI workflows, and operations systems we can help shape."
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
          eyebrow="Team strengths"
          title="What you should expect from the partnership."
          description="Clear technical communication, maintainable engineering, and an operating model that lets your team keep ownership."
        />
        <StrengthGrid strengths={strengths} />
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
