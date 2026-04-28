import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import {
  Brain,
  CheckCircle2,
  ClipboardCheck,
  Cloud,
  Code2,
  Layers,
  LifeBuoy,
  MessagesSquare,
  Rocket,
  Server,
  ShieldCheck,
  Smartphone,
  Workflow,
  ArrowRight,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import type { CaseStudy, Faq, IconName, ProcessStep, Service, Strength } from '@/lib/site-data'

const iconMap = {
  Brain,
  CheckCircle2,
  ClipboardCheck,
  Cloud,
  Code2,
  Layers,
  LifeBuoy,
  MessagesSquare,
  Rocket,
  Server,
  ShieldCheck,
  Smartphone,
  Workflow,
}

export function IconBadge({
  icon,
  className,
}: {
  icon: IconName
  className?: string
}) {
  const Icon = iconMap[icon]

  return (
    <div
      className={cn(
        'flex size-12 items-center justify-center rounded-xl border border-primary/25 bg-primary/12 text-primary shadow-lg shadow-primary/10',
        className,
      )}
    >
      <Icon className="size-6" />
    </div>
  )
}

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  compact = false,
}: {
  eyebrow: string
  title: string
  description: string
  actions?: ReactNode
  compact?: boolean
}) {
  return (
    <section className={cn('relative overflow-hidden', compact ? 'pt-32 pb-16' : 'pt-36 pb-24 lg:pt-44 lg:pb-32')}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.14),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(124,58,237,0.12),transparent_28%),linear-gradient(180deg,rgba(5,8,20,0.96),rgba(5,8,20,1))]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.045)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_72%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <Badge className="mb-6 border-primary/30 bg-primary/10 text-primary" variant="outline">
            {eyebrow}
          </Badge>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
            {description}
          </p>
          {actions && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{actions}</div>}
        </div>
      </div>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}: {
  eyebrow: string
  title: string
  description: string
  align?: 'left' | 'center'
}) {
  return (
    <div className={cn('mb-12', align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl')}>
      <span className="text-sm font-medium uppercase tracking-wider text-primary">{eyebrow}</span>
      <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">{description}</p>
    </div>
  )
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-border/60 bg-card/55 p-6 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-primary/45 hover:bg-card/75">
      <IconBadge icon={service.icon} />
      <h3 className="mt-6 text-xl font-semibold text-foreground">{service.title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{service.summary}</p>
      <ul className="mt-6 space-y-3">
        {service.deliverables.slice(0, 4).map((item) => (
          <li key={item} className="flex gap-3 text-sm text-foreground/70">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <Link
        href={`/services#${service.slug}`}
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary"
      >
        Explore service
        <ArrowRight className="size-4 transition group-hover:translate-x-1" />
      </Link>
    </article>
  )
}

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border/60 bg-card/60 shadow-xl shadow-black/25 transition hover:-translate-y-1 hover:border-primary/45">
      <div className="relative h-52 overflow-hidden">
        <Image
          src={study.image}
          alt={study.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/35 to-transparent" />
        <Badge className="absolute left-4 top-4 bg-background/80 text-foreground backdrop-blur" variant="outline">
          {study.category}
        </Badge>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-foreground">{study.title}</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{study.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {study.services.map((service) => (
            <span key={service} className="rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs text-foreground/70">
              {service}
            </span>
          ))}
        </div>
        <ul className="mt-5 space-y-2">
          {study.outcomes.map((outcome) => (
            <li key={outcome} className="flex gap-2 text-sm text-foreground/70">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
              {outcome}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export function StrengthGrid({ strengths }: { strengths: Strength[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {strengths.map((strength) => (
        <article key={strength.title} className="rounded-2xl border border-border/60 bg-card/55 p-6">
          <IconBadge icon={strength.icon} className="size-11" />
          <h3 className="mt-5 text-lg font-semibold text-foreground">{strength.title}</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{strength.summary}</p>
        </article>
      ))}
    </div>
  )
}

export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {steps.map((step, index) => (
        <article key={step.title} className="relative rounded-2xl border border-border/60 bg-card/55 p-6">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">{step.summary}</p>
          <ul className="mt-5 space-y-2">
            {step.details.map((detail) => (
              <li key={detail} className="flex gap-2 text-sm text-foreground/70">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                {detail}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  )
}

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <Accordion type="single" collapsible className="rounded-2xl border border-border/60 bg-card/55 px-4 sm:px-6">
      {faqs.map((item, index) => (
        <AccordionItem key={item.question} value={`faq-${index}`}>
          <AccordionTrigger className="py-5 text-base text-foreground hover:no-underline">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-sm leading-7 text-muted-foreground">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export function CTASection({
  title = 'Ready to discuss your software project?',
  description = 'Tell us what you are planning, where you are blocked, or what you need to launch. We will review your request and recommend a practical next step.',
}: {
  title?: string
  description?: string
}) {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-primary/25 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.18),transparent_30%),linear-gradient(135deg,rgba(18,26,42,0.96),rgba(8,12,24,0.96))] p-8 shadow-2xl shadow-primary/10 sm:p-10 lg:p-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-balance text-3xl font-semibold text-foreground sm:text-4xl">{title}</h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">{description}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/contact">Request a Project Estimate</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary/30 bg-background/30">
              <Link href="/process">View Our Process</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ContentSection({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <section className={cn('px-4 py-16 sm:px-6 lg:px-8 lg:py-24', className)}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  )
}
