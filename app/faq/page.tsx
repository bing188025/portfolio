import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { ContentSection, CTASection, FaqList, PageHero, SectionHeading } from '@/components/marketing'
import { faqs } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Answers to common questions about working with DevForge Studio on software, AI, automation, and maintenance projects.',
}

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Questions clients usually ask before starting."
        description="A practical overview of how we scope, estimate, deliver, and support software development projects."
        compact
        actions={
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/contact">Ask about your project</Link>
          </Button>
        }
      />

      <ContentSection>
        <SectionHeading
          eyebrow="Answers"
          title="Project fit, scope, support, and delivery."
          description="If your question is not covered here, send a short project note and we will respond with the right next step."
        />
        <div className="mx-auto max-w-4xl">
          <FaqList faqs={faqs} />
        </div>
      </ContentSection>

      <CTASection />
    </>
  )
}
