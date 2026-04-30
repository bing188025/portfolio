import type { Metadata } from 'next'

import { LegalDocument } from '@/components/legal-document'
import { SITE_CONFIG } from '@/lib/config'
import { legalDocuments } from '@/lib/site-data'

export const metadata: Metadata = {
  title: legalDocuments.terms.title,
  description: legalDocuments.terms.description,
}

export default function TermsPage() {
  return (
    <LegalDocument
      title="Terms of Service"
      description="These Terms of Service describe general rules for using this website and high-level expectations for service discussions with DevForge Studio."
      sections={[
        {
          title: 'Acceptance of Terms',
          paragraphs: [
            `By accessing this website or submitting a project inquiry, you agree to these Terms of Service. If you do not agree, do not use the website or submit information through it.`,
            'These terms govern website use and preliminary communications only. Any paid software development, consulting, maintenance, or related work will require a separate written agreement or statement of work.',
          ],
        },
        {
          title: 'Website Content',
          paragraphs: [
            'Website content is provided for general informational purposes. It may describe service capabilities, representative work, common processes, and general business practices, but it is not a binding offer or guarantee of specific outcomes.',
            'We may update, remove, or revise website content at any time without notice.',
          ],
        },
        {
          title: 'Project Inquiries and Estimates',
          paragraphs: [
            'Submitting a project inquiry does not create a client relationship, service agreement, confidentiality agreement, or obligation for either party to proceed.',
            'Any estimates, timelines, or recommendations discussed before a signed agreement are preliminary and depend on scope, technical requirements, dependencies, availability, and other factors.',
          ],
        },
        {
          title: 'Acceptable Use',
          paragraphs: [
            'You agree not to misuse the website, submit unlawful or harmful content, attempt unauthorized access, interfere with website operations, or use the site to distribute spam, malware, or abusive communications.',
          ],
        },
        {
          title: 'Intellectual Property',
          paragraphs: [
            `The website design, text, graphics, branding, and other materials are owned by or licensed to ${SITE_CONFIG.name}, unless otherwise noted. You may not copy, modify, or redistribute website materials except as permitted by law or written permission.`,
            'Ownership of deliverables for paid services will be governed by the applicable written agreement.',
          ],
        },
        {
          title: 'Limitation of Liability',
          paragraphs: [
            'To the maximum extent permitted by law, the website is provided as is and without warranties. We are not liable for damages arising from website use, reliance on informational content, or inability to access the website.',
          ],
        },
        {
          title: 'Contact',
          paragraphs: [
            `Questions about these Terms can be sent to ${SITE_CONFIG.email}.`,
          ],
        },
      ]}
    />
  )
}
