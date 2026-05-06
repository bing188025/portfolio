"use client"

import { ScrollAnimation } from './scroll-animation'
import { TiltCard } from './tilt-card'
import { Button } from '@/components/ui/button'
import { Check, Brain, Globe, Bot, Server, Cloud, MessagesSquare, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const services = [
  {
    icon: Globe,
    title: "Web Platforms & SaaS",
    description: "Modern websites, dashboards, portals, and SaaS products with responsive UI, clean workflows, and scalable foundations.",
    features: [
      "Next.js and React interfaces",
      "Customer portals and dashboards",
      "Payments, auth, and CMS integrations",
      "Conversion-focused landing pages",
    ],
    highlight: true,
  },
  {
    icon: Brain,
    title: "AI / LLM Development",
    description: "AI assistants, RAG systems, workflow copilots, and LLM features designed around useful production behavior.",
    features: [
      "Custom LLM integrations",
      "RAG and knowledge search",
      "Prompt, eval, and guardrail systems",
      "Computer vision workflows",
    ],
    highlight: true,
  },
  {
    icon: Server,
    title: "Backend & API Systems",
    description: "Reliable service architecture, databases, integrations, permissions, and APIs for products that need to grow.",
    features: [
      "REST and GraphQL APIs",
      "Database design and optimization",
      "Authentication and role permissions",
      "Third-party system integrations",
    ],
    highlight: true,
  },
  {
    icon: Bot,
    title: "Automation & Agents",
    description: "Workflow automation that removes repetitive work and connects business systems without creating fragile shortcuts.",
    features: [
      "Internal operations automation",
      "Scheduled reporting and alerts",
      "Browser and API automation",
      "Tool-use agents with review paths",
    ],
    highlight: false,
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "Deployment pipelines, hosting, observability, and release practices that make software easier to ship and operate.",
    features: [
      "Cloud deployment setup",
      "CI/CD pipelines",
      "Containerization and hosting",
      "Monitoring and incident readiness",
    ],
    highlight: false,
  },
  {
    icon: MessagesSquare,
    title: "Consulting & Maintenance",
    description: "Technical discovery, architecture review, existing-system support, roadmap planning, and ongoing improvement cycles.",
    features: [
      "Discovery and technical planning",
      "Architecture and codebase review",
      "Bug fixes and dependency updates",
      "Roadmap and handoff support",
    ],
    highlight: false,
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-1/3 w-1/2 h-1/2 bg-primary/6 rounded-full blur-3xl" style={{ zIndex: 0 }} />
      <div className="absolute bottom-0 right-1/4 w-1/3 h-1/3 bg-chart-2/6 rounded-full blur-3xl" style={{ zIndex: 0 }} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" style={{ zIndex: 1 }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 2 }}>
        <ScrollAnimation>
          <div className="text-center mb-16">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Services</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-balance">
              Complete support for
              <span className="bg-linear-to-r from-primary to-chart-2 bg-clip-text text-transparent"> software delivery</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Bring us in for a focused sprint, a full product build, an AI workflow, or ongoing maintenance for software that already exists.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ScrollAnimation key={service.title} delay={index * 80}>
              <TiltCard
                className={cn(
                  "glass border h-full p-6 lg:p-8 flex flex-col gap-5 shadow-xl shadow-black/30 transition-all duration-300",
                  service.highlight
                    ? "border-primary/50 ring-1 ring-primary/20 hover:border-primary/70"
                    : "border-border/60 hover:border-primary/40"
                )}
              >
                {service.highlight && (
                  <span className="self-start px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full shadow-md shadow-primary/30">
                    Core Service
                  </span>
                )}

                {/* Icon + Title */}
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "p-3 rounded-xl shrink-0 shadow-md",
                    service.highlight
                      ? "bg-primary/20 text-primary shadow-primary/20"
                      : "bg-primary/12 text-primary shadow-primary/10"
                  )}>
                    <service.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-1">{service.title}</h3>
                    <p className="text-foreground/60 text-sm leading-relaxed">{service.description}</p>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2 flex-1">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-foreground/70">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  asChild
                  variant={service.highlight ? 'default' : 'outline'}
                  className={cn(
                    "w-full group mt-auto",
                    service.highlight && "bg-primary hover:bg-primary/90 shadow-md shadow-primary/20"
                  )}
                >
                  <a href="#contact">
                    Discuss This Service
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </TiltCard>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
