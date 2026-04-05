"use client"

import { ScrollAnimation } from './scroll-animation'
import { AnimatedCounter } from './animated-counter'
import { TiltCard } from './tilt-card'
import { Brain, Code2, Cpu, Rocket } from 'lucide-react'

const stats = [
  { value: 6, suffix: "+", label: "Years Experience" },
  { value: 30, suffix: "+", label: "Projects Delivered" },
  { value: 15, suffix: "+", label: "Technologies" },
]

const capabilities = [
  {
    icon: Brain,
    title: "AI System Architecture",
    description: "Designing and implementing scalable AI systems with LLMs, RAG pipelines, and intelligent agents."
  },
  {
    icon: Code2,
    title: "Full-Stack Development",
    description: "Building modern web applications with React, Next.js, and robust backend systems."
  },
  {
    icon: Cpu,
    title: "Automation & Agents",
    description: "Creating autonomous AI agents that handle complex workflows and decision-making."
  },
  {
    icon: Rocket,
    title: "Scalable Infrastructure",
    description: "Deploying production-ready systems with Docker, cloud platforms, and CI/CD pipelines."
  }
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-32 relative">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">About Me</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-balance">
              Crafting the Future with
              <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent"> AI & Code</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              With over 6 years of experience, I specialize in building production-ready AI systems 
              and full-stack applications that solve real-world problems at scale.
            </p>
          </div>
        </ScrollAnimation>

        {/* Stats */}
        <ScrollAnimation delay={100}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
            {stats.map((stat, index) => (
              <TiltCard key={index} className="glass border border-border p-8 text-center">
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </TiltCard>
            ))}
          </div>
        </ScrollAnimation>

        {/* Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((capability, index) => (
            <ScrollAnimation key={index} delay={index * 100}>
              <TiltCard className="glass border border-border p-6 lg:p-8 h-full group hover:border-primary/30 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <capability.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{capability.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{capability.description}</p>
                  </div>
                </div>
              </TiltCard>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
