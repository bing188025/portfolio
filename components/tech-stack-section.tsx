"use client"

import { ScrollAnimation } from './scroll-animation'
import { cn } from '@/lib/utils'
import {
  SiPython, SiPytorch, SiTensorflow, SiOpenai, SiLangchain, SiHuggingface, SiNvidia, SiOpencv,
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFlutter, SiThreedotjs,
  SiNodedotjs, SiFastapi, SiPostgresql, SiMongodb, SiRedis, SiGraphql,
  SiDocker, SiKubernetes, SiVercel, SiLinux, SiGit,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa'
import type { IconType } from 'react-icons'

interface Tech {
  name: string
  icon: IconType
  color: string
}

interface TechCategory {
  title: string
  color: string
  technologies: Tech[]
}

const techCategories: TechCategory[] = [
  {
    title: "AI / ML",
    color: "from-primary to-chart-2",
    technologies: [
      { name: "Python",       icon: SiPython,      color: "#3776AB" },
      { name: "PyTorch",      icon: SiPytorch,     color: "#EE4C2C" },
      { name: "TensorFlow",   icon: SiTensorflow,  color: "#FF6F00" },
      { name: "OpenAI",       icon: SiOpenai,      color: "#74AA9C" },
      { name: "LangChain",    icon: SiLangchain,   color: "#1C3C3C" },
      { name: "Hugging Face", icon: SiHuggingface, color: "#FFD21E" },
      { name: "CUDA",         icon: SiNvidia,      color: "#76B900" },
      { name: "OpenCV",       icon: SiOpencv,      color: "#5C3EE8" },
    ]
  },
  {
    title: "Frontend",
    color: "from-chart-2 to-chart-3",
    technologies: [
      { name: "React",        icon: SiReact,       color: "#61DAFB" },
      { name: "Next.js",      icon: SiNextdotjs,   color: "#FFFFFF" },
      { name: "TypeScript",   icon: SiTypescript,  color: "#3178C6" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Flutter",      icon: SiFlutter,     color: "#02569B" },
      { name: "Three.js",     icon: SiThreedotjs,  color: "#FFFFFF" },
    ]
  },
  {
    title: "Backend",
    color: "from-chart-3 to-chart-4",
    technologies: [
      { name: "Node.js",    icon: SiNodedotjs,   color: "#339933" },
      { name: "FastAPI",    icon: SiFastapi,     color: "#009688" },
      { name: "PostgreSQL", icon: SiPostgresql,  color: "#4169E1" },
      { name: "MongoDB",    icon: SiMongodb,     color: "#47A248" },
      { name: "Redis",      icon: SiRedis,       color: "#DC382D" },
      { name: "GraphQL",    icon: SiGraphql,     color: "#E10098" },
    ]
  },
  {
    title: "Infrastructure",
    color: "from-chart-4 to-primary",
    technologies: [
      { name: "Docker",     icon: SiDocker,      color: "#2496ED" },
      { name: "Kubernetes", icon: SiKubernetes,  color: "#326CE5" },
      { name: "AWS",        icon: FaAws,               color: "#FF9900" },
      { name: "Vercel",     icon: SiVercel,      color: "#FFFFFF" },
      { name: "Linux",      icon: SiLinux,       color: "#FCC624" },
      { name: "Git",        icon: SiGit,         color: "#F05032" },
    ]
  },
]

export function TechStackSection() {
  return (
    <section id="tech" className="py-24 lg:py-32 relative overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0, opacity: 0.2 }}
      >
        <source
          src="https://cdn.pixabay.com/video/2016/08/22/4760-179739327_large.mp4"
          type="video/mp4"
        />
        <source
          src="https://cdn.pixabay.com/video/2020/07/30/45961-447087612_large.mp4"
          type="video/mp4"
        />
      </video>

      {/* Vignette scrim */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(5,8,20,0.45) 0%, rgba(5,8,20,0.82) 65%, rgba(5,8,20,0.96) 100%)',
        }}
      />
      {/* Top/bottom edge fades + subtle secondary tint */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background: 'linear-gradient(to bottom, rgba(5,8,20,0.9) 0%, rgba(10,14,35,0.25) 20%, rgba(10,14,35,0.25) 80%, rgba(5,8,20,0.9) 100%)',
        }}
      />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" style={{ zIndex: 2 }} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" style={{ zIndex: 2 }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 3 }}>
        <ScrollAnimation>
          <div className="text-center mb-16">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Technologies</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-balance">
              Tech
              <span className="bg-linear-to-r from-primary to-chart-2 bg-clip-text text-transparent"> Stack</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A comprehensive toolkit spanning AI/ML, modern frontend frameworks, 
              scalable backends, and cloud infrastructure.
            </p>
          </div>
        </ScrollAnimation>

        {/* Tech Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {techCategories.map((category, categoryIndex) => (
            <ScrollAnimation key={category.title} delay={categoryIndex * 100}>
              <div className="glass border border-border/60 rounded-2xl p-6 lg:p-8 h-full shadow-xl shadow-black/30 hover:border-primary/30 transition-colors">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={cn(
                    "w-1 h-8 rounded-full bg-linear-to-b shadow-sm",
                    category.color
                  )} />
                  <h3 className="text-xl font-semibold text-foreground">{category.title}</h3>
                </div>

                {/* Technologies Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {category.technologies.map((tech, techIndex) => (
                    <div
                      key={tech.name}
                      className="group flex items-center gap-3 p-3 rounded-xl bg-background/60 border border-border/40 hover:border-primary/40 hover:bg-primary/8 transition-all cursor-default"
                      style={{ animationDelay: `${techIndex * 50}ms` }}
                    >
                      <tech.icon
                        className="shrink-0 opacity-75 group-hover:opacity-100 transition-opacity"
                        style={{ color: tech.color, fontSize: '1.25rem' }}
                      />
                      <span className="text-sm font-medium text-foreground/65 group-hover:text-foreground transition-colors">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Animated Orbit (Visual Element) */}
        <ScrollAnimation delay={400}>
          <div className="mt-16 relative h-64 hidden lg:block">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Center Core */}
              <div className="relative w-20 h-20 flex items-center justify-center">
                {/* Outer glow ring */}
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(0,220,200,0.35)_0%,rgba(0,180,220,0.15)_60%,transparent_100%)] blur-md scale-125" />
                {/* Main sphere */}
                <div
                  className="relative w-20 h-20 rounded-full flex items-center justify-center shadow-[0_0_32px_8px_rgba(0,210,200,0.45)]"
                  style={{
                    background: 'radial-gradient(circle at 38% 36%, #7af0e8 0%, #00c8d4 38%, #00a0c8 70%, #0070a0 100%)',
                  }}
                >
                  <span className="text-2xl font-bold text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]">AI</span>
                </div>
              </div>

              {/* Orbiting Elements - Pre-calculated positions to avoid hydration mismatch */}
              {[
                { top: '50%',   left: '85%',   Icon: SiReact,      color: '#61DAFB', delay: '0s'   },
                { top: '80.3%', left: '67.5%', Icon: SiPython,     color: '#3776AB', delay: '0.5s' },
                { top: '80.3%', left: '32.5%', Icon: SiNextdotjs,  color: '#FFFFFF', delay: '1s'   },
                { top: '50%',   left: '15%',   Icon: SiDocker,     color: '#2496ED', delay: '1.5s' },
                { top: '19.7%', left: '32.5%', Icon: SiPytorch,    color: '#EE4C2C', delay: '2s'   },
                { top: '19.7%', left: '67.5%', Icon: FaAws,               color: '#FF9900', delay: '2.5s' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="absolute w-12 h-12 rounded-full glass border border-border flex items-center justify-center animate-float"
                  style={{
                    top: item.top,
                    left: item.left,
                    transform: 'translate(-50%, -50%)',
                    animationDelay: item.delay,
                  }}
                >
                  <item.Icon style={{ color: item.color, fontSize: '1.375rem' }} />
                </div>
              ))}

              {/* Orbit Ring */}
              <div className="absolute w-72 h-72 rounded-full border border-dashed border-border/50 animate-spin" style={{ animationDuration: '30s' }} />
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
