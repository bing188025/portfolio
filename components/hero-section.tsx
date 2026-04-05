"use client"

import { useState, useRef, useEffect } from 'react'
import { TypingEffect } from './typing-effect'
import { ScatteredTextReveal } from './scattered-text-reveal'
import { Button } from '@/components/ui/button'
import { ArrowRight, Github, Linkedin } from 'lucide-react'

const specialties = [
  "AI Agents",
  "LLM Systems",
  "Computer Vision",
  "Full-Stack Platforms"
]

const headlineLines = [
  { text: "AI Full-Stack Engineer", className: "text-foreground" },
  { text: "building intelligent systems", className: "text-muted-foreground" },
  { text: "that scale", className: "text-muted-foreground" },
]

export function HeroSection() {
  const [revealDone, setRevealDone] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0, opacity: 0.28 }}
      >
        <source
          src="https://cdn.pixabay.com/video/2017/11/02/12716-241674181_large.mp4"
          type="video/mp4"
        />
        <source
          src="https://cdn.pixabay.com/video/2023/04/15/159049-818026306_large.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark gradient scrim so text stays readable */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background: 'linear-gradient(to bottom, rgba(5,8,20,0.55) 0%, rgba(5,8,20,0.3) 50%, rgba(5,8,20,0.75) 100%)',
        }}
      />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" style={{ zIndex: 2 }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-chart-2/20 rounded-full blur-3xl animate-pulse-glow" style={{ zIndex: 2, animationDelay: '1.5s' }} />
      
      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          zIndex: 2,
          backgroundImage: `linear-gradient(rgba(56, 189, 248, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(56, 189, 248, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center" style={{ zIndex: 3 }}>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-muted-foreground">Available for new projects</span>
        </div>

        {/* Main Headline — scattered character reveal */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          <ScatteredTextReveal lines={headlineLines} onComplete={() => setRevealDone(true)} />
        </h1>

        {/* Typing Effect */}
        <div
          className="h-12 flex items-center justify-center mb-8"
          style={{
            opacity: revealDone ? 1 : 0,
            transform: revealDone ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
          }}
        >
          <span className="text-lg sm:text-xl text-muted-foreground mr-2">Specializing in</span>
          <TypingEffect 
            words={specialties} 
            className="text-lg sm:text-xl font-semibold text-primary"
          />
        </div>

        {/* Subheadline */}
        <p
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{
            opacity: revealDone ? 1 : 0,
            transform: revealDone ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s',
          }}
        >
          Transforming complex ideas into production-ready AI systems. 
          From intelligent agents to scalable full-stack platforms.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          style={{
            opacity: revealDone ? 1 : 0,
            transform: revealDone ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s',
          }}
        >
          <Button 
            asChild
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg group"
          >
            <a href="#projects">
              View Projects
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
          <Button 
            asChild
            size="lg" 
            variant="outline" 
            className="border-border hover:bg-secondary px-8 py-6 text-lg"
          >
            <a href="#contact">
              Hire Me
            </a>
          </Button>
        </div>

        {/* Social Links */}
        <div
          className="flex items-center justify-center gap-4"
          style={{
            opacity: revealDone ? 1 : 0,
            transform: revealDone ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s',
          }}
        >
          <a 
            href="#" 
            className="p-3 rounded-full glass border border-border hover:border-primary/50 hover:bg-primary/10 transition-all"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5 text-muted-foreground hover:text-foreground" />
          </a>
          <a 
            href="#" 
            className="p-3 rounded-full glass border border-border hover:border-primary/50 hover:bg-primary/10 transition-all"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground" />
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
            <div className="w-1.5 h-2.5 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
