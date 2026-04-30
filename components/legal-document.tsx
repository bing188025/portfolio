import { ContentSection, PageHero } from '@/components/marketing'
import { SITE_CONFIG } from '@/lib/config'

export interface LegalSection {
  title: string
  paragraphs: string[]
}

export function LegalDocument({
  title,
  description,
  sections,
}: {
  title: string
  description: string
  sections: LegalSection[]
}) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} description={description} compact />
      <ContentSection>
        <article className="mx-auto max-w-4xl rounded-3xl border border-border/60 bg-card/55 p-6 shadow-xl shadow-black/20 sm:p-10">
          <p className="text-sm text-muted-foreground">Last updated: {SITE_CONFIG.legalUpdated}</p>
          <div className="mt-8 space-y-9">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
                <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </ContentSection>
    </>
  )
}
