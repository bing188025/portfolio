import { SITE_CONFIG } from '@/lib/config'

export type IconName =
  | 'BarChart3'
  | 'Code2'
  | 'Smartphone'
  | 'Brain'
  | 'Server'
  | 'Workflow'
  | 'Cloud'
  | 'ShieldCheck'
  | 'MessagesSquare'
  | 'Rocket'
  | 'ClipboardCheck'
  | 'Layers'
  | 'LifeBuoy'
  | 'Target'
  | 'Users'

export interface Service {
  slug: string
  title: string
  summary: string
  description: string
  icon: IconName
  deliverables: string[]
}

export interface CaseStudy {
  title: string
  category: string
  summary: string
  image: string
  services: string[]
  outcomes: string[]
}

export interface ProcessStep {
  title: string
  summary: string
  details: string[]
}

export interface Strength {
  title: string
  summary: string
  icon: IconName
}

export interface ProofMetric {
  value: string
  label: string
  summary: string
}

export interface EngagementModel {
  title: string
  summary: string
  bestFor: string
  duration: string
  includes: string[]
}

export interface Faq {
  question: string
  answer: string
}

export const navigationLinks = [
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Case Studies' },
  { href: '/process', label: 'Process' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
]

export const services: Service[] = [
  {
    slug: 'web-development',
    title: 'Web Development',
    summary: 'Modern websites, dashboards, portals, and SaaS products built for conversion, usability, and scale.',
    description:
      'We build responsive web platforms with clear information architecture, accessible interfaces, secure integrations, and maintainable codebases that can evolve with your business.',
    icon: 'Code2',
    deliverables: ['Marketing websites and landing pages', 'SaaS dashboards and portals', 'E-commerce and payment flows', 'CMS and admin experiences'],
  },
  {
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    summary: 'Practical mobile applications for customers, teams, and operations across iOS and Android.',
    description:
      'From product planning to app-store-ready releases, we help teams ship mobile experiences that are fast, reliable, and aligned with real user workflows.',
    icon: 'Smartphone',
    deliverables: ['Cross-platform mobile apps', 'Product prototypes and MVPs', 'API-backed mobile experiences', 'Release support and iteration'],
  },
  {
    slug: 'ai-llm-development',
    title: 'AI / LLM Development',
    summary: 'AI assistants, RAG systems, workflow agents, and LLM features designed for measurable business use cases.',
    description:
      'We design AI systems around your data, users, and risk profile so the result is useful in production instead of a disconnected demo.',
    icon: 'Brain',
    deliverables: ['AI agents and assistants', 'RAG and knowledge search', 'Prompt and evaluation systems', 'Computer vision workflows'],
  },
  {
    slug: 'backend-api-development',
    title: 'Backend & API Development',
    summary: 'Reliable APIs, integrations, databases, and service architecture for products that need to grow.',
    description:
      'We create backend systems with clean contracts, secure data handling, strong observability, and practical documentation for future teams.',
    icon: 'Server',
    deliverables: ['REST and GraphQL APIs', 'Database design and optimization', 'Third-party integrations', 'Authentication and permissions'],
  },
  {
    slug: 'automation',
    title: 'Automation',
    summary: 'Workflow automation that removes repetitive work from teams and connects business systems cleanly.',
    description:
      'We identify bottlenecks, map the right automation boundaries, and build resilient workflows that reduce manual operations without creating fragile shortcuts.',
    icon: 'Workflow',
    deliverables: ['Internal tool automation', 'Data collection and reporting', 'CRM and operations workflows', 'Scheduled jobs and alerts'],
  },
  {
    slug: 'infrastructure-devops',
    title: 'Infrastructure & DevOps',
    summary: 'Cloud deployment, CI/CD, monitoring, and infrastructure support for stable production delivery.',
    description:
      'We set up deployment pipelines, cloud environments, monitoring, and release practices that make software easier to ship and safer to operate.',
    icon: 'Cloud',
    deliverables: ['Cloud architecture and deployment', 'CI/CD pipelines', 'Containerization and hosting', 'Monitoring and incident readiness'],
  },
  {
    slug: 'maintenance-support',
    title: 'Maintenance & Support',
    summary: 'Ongoing development, bug fixes, security updates, and improvement cycles for existing products.',
    description:
      'We help teams stabilize existing systems, keep dependencies current, improve performance, and continue delivering useful product changes.',
    icon: 'LifeBuoy',
    deliverables: ['Bug fixing and enhancements', 'Performance improvements', 'Security and dependency updates', 'Roadmap support'],
  },
  {
    slug: 'consulting',
    title: 'Consulting',
    summary: 'Technical planning, architecture reviews, product discovery, and delivery guidance before or during a build.',
    description:
      'We help leaders clarify scope, reduce risk, choose the right architecture, and turn uncertain ideas into practical execution plans.',
    icon: 'MessagesSquare',
    deliverables: ['Product and technical discovery', 'Architecture review', 'Implementation planning', 'Team advisory and audits'],
  },
]

export const proofMetrics: ProofMetric[] = [
  {
    value: '30+',
    label: 'project types delivered',
    summary: 'Web platforms, AI workflows, automation, operations tools, mobile apps, and backend systems.',
  },
  {
    value: '6+',
    label: 'years building software',
    summary: 'Experience across planning, implementation, launch support, and long-term product iteration.',
  },
  {
    value: '8',
    label: 'core service lines',
    summary: 'A practical coverage model for teams that need more than a single narrow development skill.',
  },
  {
    value: '1 day',
    label: 'inquiry response target',
    summary: 'Project requests are reviewed with clear next-step guidance before a build is proposed.',
  },
]

export const engagementModels: EngagementModel[] = [
  {
    title: 'Discovery Sprint',
    summary: 'Clarify scope, risks, users, architecture, and estimate path before committing to a build.',
    bestFor: 'Early ideas, unclear scope, inherited products',
    duration: '1-2 weeks',
    includes: ['Stakeholder intake', 'Feature and risk map', 'Architecture direction', 'Delivery estimate path'],
  },
  {
    title: 'MVP / Product Build',
    summary: 'Plan, design, implement, and launch a focused product version with production foundations.',
    bestFor: 'New SaaS, portals, booking systems, internal tools',
    duration: '4-12+ weeks',
    includes: ['UX and product flow', 'Frontend and backend build', 'Integrations', 'Launch support'],
  },
  {
    title: 'AI & Automation Sprint',
    summary: 'Add practical AI, LLM, data-processing, or workflow automation capabilities to a business process.',
    bestFor: 'Knowledge search, assistants, reporting, operations',
    duration: '2-6 weeks',
    includes: ['Use-case design', 'Prototype and evaluation', 'Workflow integration', 'Human review path'],
  },
  {
    title: 'Dedicated Product Team',
    summary: 'Extend your team with ongoing product, engineering, QA, and technical leadership capacity.',
    bestFor: 'Growing products, roadmap execution, technical debt',
    duration: 'Monthly',
    includes: ['Sprint planning', 'Feature delivery', 'Code review', 'Progress reporting'],
  },
  {
    title: 'Maintenance Retainer',
    summary: 'Keep existing systems reliable, secure, updated, and ready for incremental improvements.',
    bestFor: 'Live products, legacy codebases, support needs',
    duration: 'Monthly',
    includes: ['Bug fixes', 'Dependency updates', 'Performance work', 'Small improvements'],
  },
]

export const strengths: Strength[] = [
  {
    title: 'Business-first delivery',
    summary: 'We connect technical decisions to commercial goals, customer needs, and operating constraints.',
    icon: 'ClipboardCheck',
  },
  {
    title: 'Full product lifecycle',
    summary: 'Planning, UX, engineering, launch, and ongoing improvement are handled as one coherent delivery path.',
    icon: 'Rocket',
  },
  {
    title: 'Maintainable engineering',
    summary: 'Code, documentation, deployment, and handoff practices are designed for long-term ownership.',
    icon: 'Layers',
  },
  {
    title: 'Security-aware foundations',
    summary: 'Authentication, permissions, data handling, and infrastructure choices are considered from the start.',
    icon: 'ShieldCheck',
  },
]

export const deliveryPrinciples: Strength[] = [
  {
    title: 'Scope before speed',
    summary: 'We define the smallest useful release, unresolved decisions, and acceptance criteria before development accelerates.',
    icon: 'Target',
  },
  {
    title: 'Senior review loops',
    summary: 'Architecture, implementation, and release readiness are reviewed so shortcuts do not become hidden operating costs.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Weekly operating rhythm',
    summary: 'Clients get visible progress, blockers, next decisions, and working increments instead of vague status updates.',
    icon: 'BarChart3',
  },
  {
    title: 'Ownership-friendly handoff',
    summary: 'Code, environments, documentation, and implementation context are prepared for long-term ownership.',
    icon: 'Users',
  },
]

export const processSteps: ProcessStep[] = [
  {
    title: 'Discover',
    summary: 'Clarify the business goal, user needs, technical constraints, and success metrics.',
    details: ['Stakeholder intake', 'Current-state review', 'Risk and dependency mapping'],
  },
  {
    title: 'Plan',
    summary: 'Translate the idea into a practical scope, architecture direction, delivery plan, and estimate.',
    details: ['Feature definition', 'Technical approach', 'Milestones and priorities'],
  },
  {
    title: 'Design',
    summary: 'Shape the product experience, workflows, and interface patterns before production engineering begins.',
    details: ['Information architecture', 'Responsive UX', 'Clickable flow review'],
  },
  {
    title: 'Build',
    summary: 'Implement the product with regular progress reviews, clean code, and production-minded practices.',
    details: ['Frontend and backend delivery', 'Integrations', 'QA and iteration'],
  },
  {
    title: 'Launch',
    summary: 'Prepare the release, deploy the system, validate the production path, and support handoff.',
    details: ['Deployment readiness', 'Monitoring setup', 'Launch support'],
  },
  {
    title: 'Improve',
    summary: 'Continue refining performance, reliability, features, and operational workflows after launch.',
    details: ['Maintenance', 'Analytics-informed iteration', 'Roadmap planning'],
  },
]

export const caseStudies: CaseStudy[] = [
  {
    title: 'Crowdfunding Platform',
    category: 'Full-Stack Product',
    summary:
      'A campaign funding platform with project pages, backer workflows, payment integration, and administrative operations.',
    image: '/images/projects/crowdfunding.jpg',
    services: ['Web Development', 'Backend & API Development', 'Infrastructure'],
    outcomes: ['Clear funding workflow', 'Secure payment-ready architecture', 'Admin-ready operational model'],
  },
  {
    title: 'AI Learning Platform',
    category: 'AI Product',
    summary:
      'A learning experience using AI-assisted feedback, adaptive content flows, and responsive web interfaces.',
    image: '/images/projects/ai-learning.jpg',
    services: ['AI / LLM Development', 'Web Development', 'Automation'],
    outcomes: ['Personalized learner experience', 'AI-assisted feedback loop', 'Scalable product foundation'],
  },
  {
    title: 'Marine Tourism Reservation',
    category: 'Booking System',
    summary:
      'A reservation platform concept for availability, booking management, customer communication, and payment-ready flows.',
    image: '/images/projects/marine-tourism.jpg',
    services: ['Web Development', 'Backend & API Development', 'Consulting'],
    outcomes: ['Streamlined booking journey', 'Operational dashboard direction', 'Integration-ready architecture'],
  },
  {
    title: 'Infrastructure Crack Detection',
    category: 'Computer Vision',
    summary:
      'A computer vision workflow for detecting structural cracks and supporting review of inspection imagery.',
    image: '/images/projects/crack-detection.jpg',
    services: ['AI / LLM Development', 'Automation', 'Backend & API Development'],
    outcomes: ['Image analysis workflow', 'Review-oriented outputs', 'Foundation for inspection automation'],
  },
  {
    title: 'VPS Hosting Platform',
    category: 'Cloud Operations',
    summary:
      'A hosting service interface concept with provisioning workflows, resource visibility, and operations support.',
    image: '/images/projects/vps-hosting.jpg',
    services: ['Infrastructure & DevOps', 'Web Development', 'Backend & API Development'],
    outcomes: ['Provisioning workflow model', 'Customer-facing dashboard', 'Operations-ready service structure'],
  },
  {
    title: 'AI Agent App',
    category: 'Automation & Agents',
    summary:
      'An autonomous task assistant concept using planning, tool use, and workflow execution for business operations.',
    image: '/images/projects/ai-agent.jpg',
    services: ['AI / LLM Development', 'Automation', 'Consulting'],
    outcomes: ['Agent workflow model', 'Task orchestration path', 'Business automation foundation'],
  },
]

export const faqs: Faq[] = [
  {
    question: 'What types of clients do you work with?',
    answer:
      'We work with startups, small and mid-sized businesses, internal teams, and founders who need a reliable technical partner for product planning, software delivery, AI features, automation, or ongoing support.',
  },
  {
    question: 'Can you help if we only have an idea and no technical specification?',
    answer:
      'Yes. We can start with a discovery engagement to clarify the product, define an initial scope, identify risks, and produce a practical delivery plan before development begins.',
  },
  {
    question: 'Do you take over existing projects?',
    answer:
      'Yes. We can review an existing codebase, stabilize urgent issues, document the current architecture, and plan improvements or new features without forcing a full rebuild.',
  },
  {
    question: 'How do you estimate cost and timeline?',
    answer:
      'We estimate after understanding the business goal, required workflows, integrations, technical complexity, and launch expectations. For larger builds, we often recommend a discovery phase before committing to a full implementation estimate.',
  },
  {
    question: 'Do you provide support after launch?',
    answer:
      'Yes. We can provide maintenance, monitoring support, bug fixes, performance improvements, security updates, and roadmap-based feature development after launch.',
  },
  {
    question: 'Can you build AI features responsibly?',
    answer:
      'We design AI features around measurable workflows, data boundaries, evaluation, user controls, and fallback behavior. The goal is reliable business value rather than a novelty integration.',
  },
]

export const budgetRanges = [
  'Under $5k',
  '$5k-$15k',
  '$15k-$50k',
  '$50k-$100k',
  '$100k+',
  'Not sure yet',
]

export const timelineOptions = [
  'ASAP',
  '2-4 weeks',
  '1-3 months',
  '3-6 months',
  'Flexible / planning stage',
]

export const preferredContactMethods = ['Email', 'Phone', 'Video call']

export const legalDocuments = {
  privacy: {
    title: 'Privacy Policy',
    description: `How ${SITE_CONFIG.name} collects, uses, and protects information submitted through this website.`,
  },
  terms: {
    title: 'Terms of Service',
    description: `General website terms and service engagement expectations for ${SITE_CONFIG.name}.`,
  },
  cookies: {
    title: 'Cookie Policy',
    description: `How cookies, analytics, and similar technologies may be used on the ${SITE_CONFIG.name} website.`,
  },
  disclaimer: {
    title: 'Disclaimer',
    description: `Important limitations for website content, case-study descriptions, estimates, and legal drafts.`,
  },
}
