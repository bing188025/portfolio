"use client"

import { ArrowRight, ClipboardCheck, FileSearch, Layers3, LifeBuoy, Rocket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollAnimation } from './scroll-animation'
import { TiltCard } from './tilt-card'

const processSteps = [
  {
    icon: FileSearch,
    title: "Discover",
    summary: "Clarify the business goal, users, constraints, existing systems, risks, and success criteria before committing to a build.",
  },
  {
    icon: ClipboardCheck,
    title: "Plan",
    summary: "Turn the request into a practical scope, architecture direction, milestone path, and estimate that can be reviewed clearly.",
  },
  {
    icon: Layers3,
    title: "Build",
    summary: "Design and implement the product through visible progress reviews, integration checks, QA, and production-minded engineering.",
  },
  {
    icon: Rocket,
    title: "Launch",
    summary: "Prepare deployment, validate the production path, connect analytics or monitoring, and support the release window.",
  },
  {
    icon: LifeBuoy,
    title: "Improve",
    summary: "Continue with maintenance, performance work, security updates, feature iteration, and roadmap support after launch.",
  },
]

const operatingPoints = [
  "Clear scope and acceptance criteria before engineering accelerates",
  "Weekly progress visibility with blockers, decisions, and next steps",
  "Production handoff with code, environment, and implementation context",
]

export function ProcessSection() {
  return (
    <section id="process" className="py-24 lg:py-32 relative overflow-hidden border-y border-border/30 bg-background/65">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.04)_1px,transparent_1px)] bg-[size:72px_72px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollAnimation>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end mb-14">
            <div>
              <span className="text-primary font-medium text-sm tracking-wider uppercase">Delivery Process</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-balance">
                A delivery rhythm clients can
                <span className="bg-linear-to-r from-primary to-chart-2 bg-clip-text text-transparent"> actually follow</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Every project moves through concrete checkpoints so scope, ownership, budget, and launch readiness stay visible.
              </p>
            </div>

            <div className="glass border border-border/60 rounded-2xl p-6 shadow-xl shadow-black/25">
              <h3 className="text-lg font-semibold text-foreground mb-4">How we reduce delivery risk</h3>
              <ul className="space-y-3">
                {operatingPoints.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-6 text-foreground/70">
                    <span className="mt-2 h-2 w-2 rounded-full bg-primary shadow-sm shadow-primary/50 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollAnimation>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step, index) => (
            <ScrollAnimation key={step.title} delay={index * 80}>
              <TiltCard className="glass border border-border/60 h-full p-5 shadow-lg shadow-black/20 hover:border-primary/40 transition-colors" glowOnHover={false}>
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div className="p-3 rounded-xl bg-primary/15 text-primary">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold text-foreground/40">0{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm leading-6 text-foreground/60">{step.summary}</p>
              </TiltCard>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation delay={250}>
          <div className="mt-10 flex justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20">
              <a href="#contact">
                Start With a Project Review
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
