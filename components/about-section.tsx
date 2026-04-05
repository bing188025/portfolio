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
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden">
      {/*
        Background video:
          Primary  — "AGI's potential to enrich lives" by XK Studio / Google DeepMind
                     Pexels #18069830 · UHD 2560×1440 · free under Pexels Licence
                     Abstract AI animation depicting human-AI collaboration and enrichment —
                     directly mirrors the About section's message of building AI that helps people
          Fallback — Google DeepMind "Visualising AI" companion piece
                     Pexels #18069862 · UHD 2560×1440 · free under Pexels Licence
      */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0, opacity: 0.25 }}
      >
        <source
          src="https://videos.pexels.com/video-files/18069830/18069830-uhd_2560_1440_24fps.mp4"
          type="video/mp4"
        />
        <source
          src="https://videos.pexels.com/video-files/18069862/18069862-uhd_2560_1440_24fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Deep vignette scrim */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(5,8,20,0.35) 0%, rgba(5,8,20,0.78) 65%, rgba(5,8,20,0.95) 100%)',
        }}
      />
      {/* Top/bottom edge fades for seamless section blending */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background: 'linear-gradient(to bottom, rgba(5,8,20,0.9) 0%, rgba(5,8,20,0.15) 20%, rgba(5,8,20,0.15) 80%, rgba(5,8,20,0.9) 100%)',
        }}
      />
      {/* Subtle cyan tint to tie video into site palette */}
      <div
        className="absolute inset-0"
        style={{ zIndex: 1, background: 'rgba(56, 189, 248, 0.03)' }}
      />

      {/* Background accent orbs */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/8 rounded-full blur-3xl" style={{ zIndex: 2 }} />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-chart-2/6 rounded-full blur-3xl" style={{ zIndex: 2 }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 3 }}>
        <ScrollAnimation>
          <div className="text-center mb-16">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">About Me</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-balance">
              Crafting the Future with
              <span className="bg-linear-to-r from-primary to-chart-2 bg-clip-text text-transparent"> AI & Code</span>
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
              <TiltCard key={index} className="glass border border-border/60 p-8 text-center shadow-xl shadow-black/30 hover:border-primary/40 transition-colors">
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2 glow-text">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-foreground/70 font-medium">{stat.label}</div>
              </TiltCard>
            ))}
          </div>
        </ScrollAnimation>

        {/* Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((capability, index) => (
            <ScrollAnimation key={index} delay={index * 100}>
              <TiltCard className="glass border border-border/60 p-6 lg:p-8 h-full group hover:border-primary/40 transition-all shadow-xl shadow-black/20">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/15 text-primary group-hover:bg-primary/25 transition-colors shadow-md shadow-primary/10">
                    <capability.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{capability.title}</h3>
                    <p className="text-foreground/60 leading-relaxed">{capability.description}</p>
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
