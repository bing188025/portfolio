import type { Metadata } from 'next'

import { LegalDocument } from '@/components/legal-document'
import { SITE_CONFIG } from '@/lib/config'
import { legalDocuments } from '@/lib/site-data'

export const metadata: Metadata = {
  title: legalDocuments.disclaimer.title,
  description: legalDocuments.disclaimer.description,
}

export default function DisclaimerPage() {
  return (
    <LegalDocument
      title="Disclaimer"
      description="This Disclaimer explains the limits of website information, case-study descriptions, estimates, and legal draft materials."
      sections={[
        {
          title: 'General Information Only',
          paragraphs: [
            'The information on this website is provided for general business and informational purposes. It should not be treated as professional legal, financial, compliance, security, or technical advice for your specific situation.',
            'You should consult appropriate professional advisors before making decisions that depend on legal, regulatory, financial, or specialized technical requirements.',
          ],
        },
        {
          title: 'No Guaranteed Outcomes',
          paragraphs: [
            'References to services, representative projects, workflows, outcomes, or processes do not guarantee identical results for any future project. Results depend on scope, budget, timeline, collaboration, technical constraints, market conditions, and other factors.',
          ],
        },
        {
          title: 'Estimates and Availability',
          paragraphs: [
            'Any estimate, timeline, recommendation, or availability statement discussed before a written agreement is preliminary and non-binding. Final commitments must be documented in a signed agreement or statement of work.',
          ],
        },
        {
          title: 'Third-Party Links and Tools',
          paragraphs: [
            'This website may reference or link to third-party tools, platforms, examples, or services. We are not responsible for third-party content, policies, uptime, security, or changes.',
          ],
        },
        {
          title: 'Legal Draft Notice',
          paragraphs: [
            'The Privacy Policy, Terms of Service, Cookie Policy, and Disclaimer pages are initial business drafts and are not legal advice. They should be reviewed and adapted by qualified legal counsel before production reliance.',
          ],
        },
        {
          title: 'Contact',
          paragraphs: [
            `Questions about this Disclaimer can be sent to ${SITE_CONFIG.email}.`,
          ],
        },
      ]}
    />
  )
}
