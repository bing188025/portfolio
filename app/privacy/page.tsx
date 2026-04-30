import type { Metadata } from 'next'

import { LegalDocument } from '@/components/legal-document'
import { SITE_CONFIG } from '@/lib/config'
import { legalDocuments } from '@/lib/site-data'

export const metadata: Metadata = {
  title: legalDocuments.privacy.title,
  description: legalDocuments.privacy.description,
}

export default function PrivacyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      description="This Privacy Policy explains how DevForge Studio collects, uses, and protects information submitted through this website and project inquiry forms."
      sections={[
        {
          title: 'Overview',
          paragraphs: [
            `${SITE_CONFIG.name} provides software development, consulting, automation, AI, infrastructure, and maintenance services. This policy describes how we handle information collected through our website, contact forms, and related communications.`,
            'This draft is provided for general business use and should be reviewed by qualified legal counsel before relying on it for production legal compliance.',
          ],
        },
        {
          title: 'Information We Collect',
          paragraphs: [
            'We may collect contact details such as name, email address, phone number, company name, role, company website, preferred contact method, project description, budget range, timeline, service interests, and other information you choose to provide.',
            'We may also collect basic technical information such as browser type, device information, pages visited, referring URLs, approximate location inferred from IP address, and analytics events if analytics tools are enabled.',
          ],
        },
        {
          title: 'How We Use Information',
          paragraphs: [
            'We use submitted information to respond to inquiries, evaluate project fit, prepare estimates, schedule consultations, provide services, improve our website, maintain business records, and protect against misuse or security issues.',
            'We do not sell personal information. We may share information with service providers that help operate the website, process forms, send email, host infrastructure, or provide analytics, only as needed for those business purposes.',
          ],
        },
        {
          title: 'Data Retention and Security',
          paragraphs: [
            'We retain inquiry and communication records for as long as reasonably necessary to respond, manage business relationships, meet legal obligations, resolve disputes, and improve our services.',
            'We use reasonable administrative, technical, and organizational safeguards, but no website or transmission method can be guaranteed to be completely secure.',
          ],
        },
        {
          title: 'Your Choices',
          paragraphs: [
            `You may request access, correction, or deletion of information you have submitted by contacting ${SITE_CONFIG.email}. We may need to retain certain records where required for legitimate business, security, or legal reasons.`,
            'You may disable cookies through your browser settings. Doing so may affect analytics or some website functionality.',
          ],
        },
        {
          title: 'Contact',
          paragraphs: [
            `Questions about this Privacy Policy can be sent to ${SITE_CONFIG.email}.`,
          ],
        },
      ]}
    />
  )
}
