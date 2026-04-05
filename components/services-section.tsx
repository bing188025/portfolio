"use client"

import { ScrollAnimation } from './scroll-animation'
import { TiltCard } from './tilt-card'
import { Button } from '@/components/ui/button'
import { Check, Brain, Globe, Bot, Cpu, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const services = [
  {
    icon: Brain,
    title: "AI System Development",
    description: "End-to-end design and implementation of production-ready AI systems — RAG pipelines, LLM integrations, fine-tuning, and intelligent search.",
    features: [
      "Custom LLM integrations (OpenAI, Claude, Gemini)",
      "RAG & vector search pipelines",
      "Model fine-tuning & evaluation",
      "AI API design & deployment",
    ],
    highlight: false,
  },
  {
    icon: Bot,
    title: "AI Agent & Automation",
    description: "Autonomous agents that handle complex multi-step workflows — from data collection and processing to decision-making and reporting.",
    features: [
      "Multi-agent orchestration (LangChain, CrewAI)",
      "Browser & API automation",
      "Scheduled workflow pipelines",
      "Tool-use & function-calling agents",
    ],
    highlight: true,
  },
  {
    icon: Globe,
    title: "Full-Stack Web Platforms",
    description: "Scalable, modern web applications built with Next.js, TypeScript, and robust backend systems — from MVPs to enterprise platforms.",
    features: [
      "Next.js / React frontend",
      "REST & GraphQL APIs",
      "Database design (PostgreSQL, MongoDB)",
      "Payment integrations (Stripe)",
    ],
    highlight: false,
  },
  {
    icon: Cpu,
    title: "Computer Vision Systems",
    description: "Real-time image and video analysis systems — object detection, face recognition, defect detection, and 3D reconstruction.",
    features: [
      "Object detection & tracking (YOLO, DETR)",
      "Face recognition & biometrics",
      "3D / 4D Gaussian splatting",
      "Medical & industrial inspection AI",
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
            <span className="text-primary font-medium text-sm tracking-wider uppercase">What I Offer</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-balance">
              Services &
              <span className="bg-linear-to-r from-primary to-chart-2 bg-clip-text text-transparent"> Expertise</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From intelligent AI systems to production-ready web platforms — 
              I deliver complete solutions that drive real business value.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    Most Requested
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
                    Get Started
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
