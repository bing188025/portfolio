import type { Metadata } from 'next'

import { LegalDocument } from '@/components/legal-document'
import { SITE_CONFIG } from '@/lib/config'
import { legalDocuments } from '@/lib/site-data'

export const metadata: Metadata = {
  title: legalDocuments.cookies.title,
  description: legalDocuments.cookies.description,
}

export default function CookiesPage() {
  return (
    <LegalDocument
      title="Cookie Policy"
      description="This Cookie Policy explains how cookies and similar technologies may be used on the DevForge Studio website."
      sections={[
        {
          title: 'Overview',
          paragraphs: [
            'Cookies are small files or similar technologies used by websites to remember information, measure usage, support security, and improve functionality.',
            'This website may use cookies or similar technologies directly or through service providers such as hosting, analytics, form handling, and security tools.',
          ],
        },
        {
          title: 'Types of Cookies We May Use',
          paragraphs: [
            'Essential cookies support core website functions such as page delivery, security, and form behavior.',
            'Analytics cookies help us understand aggregate usage patterns, such as which pages are viewed and how visitors navigate the site.',
            'Preference cookies may remember display or interaction preferences if such features are enabled in the future.',
          ],
        },
        {
          title: 'Third-Party Services',
          paragraphs: [
            'The website may rely on third-party providers for analytics, hosting, form submission, fonts, and related operations. These providers may set cookies or process technical information according to their own policies.',
          ],
        },
        {
          title: 'Managing Cookies',
          paragraphs: [
            'Most browsers allow you to block, delete, or manage cookies through browser settings. Blocking some cookies may affect website functionality or analytics accuracy.',
          ],
        },
        {
          title: 'Contact',
          paragraphs: [
            `Questions about this Cookie Policy can be sent to ${SITE_CONFIG.email}.`,
          ],
        },
      ]}
    />
  )
}
