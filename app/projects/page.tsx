import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { CaseStudyCard, ContentSection, CTASection, PageHero, SectionHeading } from '@/components/marketing'
import { caseStudies } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Projects and Case Studies',
  description: 'Representative software, AI, automation, infrastructure, and product work from DevForge Studio.',
}

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="Examples of software systems and workflows we can help deliver."
        description="Our work spans product platforms, AI-enabled tools, operations systems, booking workflows, infrastructure interfaces, and automation. These examples focus on the type of problem solved rather than inflated claims."
        compact
        actions={
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/contact">Start a similar project</Link>
          </Button>
        }
      />

      <ContentSection>
        <SectionHeading
          eyebrow="Representative work"
          title="Built around business workflows, not just screens."
          description="Each project type combines planning, engineering, integrations, and maintainability so the product can support real operations."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.title} study={study} />
          ))}
        </div>
      </ContentSection>

      <CTASection
        title="Have a product or workflow like these?"
        description="Tell us the outcome you need, the users involved, and where the current process breaks down. We will help shape the right build path."
      />
    </>
  )
}
