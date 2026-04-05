"use client"

import {
  Flame,
  BrainCircuit,
  Sparkles,
  Link,
  Bot,
  Zap,
  Eye,
  Atom,
  Triangle,
  Code2,
  Palette,
  Smartphone,
  Box,
  Server,
  Workflow,
  Database,
  Layers,
  Network,
  Container,
  Cloud,
  Terminal,
  GitBranch,
} from 'lucide-react'
import { ScrollAnimation } from './scroll-animation'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

const techCategories: {
  title: string
  color: string
  technologies: { name: string; Icon: LucideIcon }[]
}[] = [
  {
    title: "AI / ML",
    color: "from-primary to-chart-2",
    technologies: [
      { name: "Python",       Icon: Code2        },
      { name: "PyTorch",      Icon: Flame        },
      { name: "TensorFlow",   Icon: BrainCircuit },
      { name: "OpenAI",       Icon: Sparkles     },
      { name: "LangChain",    Icon: Link         },
      { name: "Hugging Face", Icon: Bot          },
      { name: "CUDA",         Icon: Zap          },
      { name: "OpenCV",       Icon: Eye          },
    ]
  },
  {
    title: "Frontend",
    color: "from-chart-2 to-chart-3",
    technologies: [
      { name: "React",        Icon: Atom         },
      { name: "Next.js",      Icon: Triangle     },
      { name: "TypeScript",   Icon: Code2        },
      { name: "Tailwind CSS", Icon: Palette      },
      { name: "Flutter",      Icon: Smartphone   },
      { name: "Three.js",     Icon: Box          },
    ]
  },
  {
    title: "Backend",
    color: "from-chart-3 to-chart-4",
    technologies: [
      { name: "Node.js",    Icon: Server   },
      { name: "FastAPI",    Icon: Workflow  },
      { name: "PostgreSQL", Icon: Database  },
      { name: "MongoDB",    Icon: Layers    },
      { name: "Redis",      Icon: Zap       },
      { name: "GraphQL",    Icon: Network   },
    ]
  },
  {
    title: "Infrastructure",
    color: "from-chart-4 to-primary",
    technologies: [
      { name: "Docker",     Icon: Container },
      { name: "Kubernetes", Icon: Network   },
      { name: "AWS",        Icon: Cloud     },
      { name: "Vercel",     Icon: Triangle  },
      { name: "Linux",      Icon: Terminal  },
      { name: "Git",        Icon: GitBranch },
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
        style={{ zIndex: 0, opacity: 0.15 }}
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

      {/* Background */}
      <div className="absolute inset-0 bg-secondary/30" style={{ zIndex: 1 }} />

      {/* Scrim over video */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background: 'linear-gradient(to bottom, rgba(5,8,20,0.55) 0%, rgba(5,8,20,0.2) 50%, rgba(5,8,20,0.55) 100%)',
        }}
      />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" style={{ zIndex: 2 }} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" style={{ zIndex: 2 }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 3 }}>
        <ScrollAnimation>
          <div className="text-center mb-16">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Technologies</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-balance">
              Tech
              <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent"> Stack</span>
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
              <div className="glass border border-border rounded-2xl p-6 lg:p-8 h-full">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={cn(
                    "w-1 h-8 rounded-full bg-gradient-to-b",
                    category.color
                  )} />
                  <h3 className="text-xl font-semibold text-foreground">{category.title}</h3>
                </div>

                {/* Technologies Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {category.technologies.map((tech, techIndex) => (
                    <div
                      key={tech.name}
                      className="group flex items-center gap-3 p-3 rounded-xl bg-background/50 border border-transparent hover:border-primary/30 hover:bg-primary/5 transition-all cursor-default"
                      style={{ animationDelay: `${techIndex * 50}ms` }}
                    >
                      <tech.Icon
                        size={18}
                        className="shrink-0 opacity-70 group-hover:opacity-100 group-hover:text-primary transition-all"
                      />
                      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
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
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center shadow-lg shadow-primary/30">
                <span className="text-2xl font-bold text-primary-foreground">AI</span>
              </div>

              {/* Orbiting Elements - Pre-calculated positions to avoid hydration mismatch */}
              {[
                { top: '50%',   left: '85%',   Icon: Atom,      delay: '0s'   },
                { top: '80.3%', left: '67.5%', Icon: Code2,     delay: '0.5s' },
                { top: '80.3%', left: '32.5%', Icon: Triangle,  delay: '1s'   },
                { top: '50%',   left: '15%',   Icon: Container, delay: '1.5s' },
                { top: '19.7%', left: '32.5%', Icon: Flame,     delay: '2s'   },
                { top: '19.7%', left: '67.5%', Icon: Cloud,     delay: '2.5s' },
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
                  <item.Icon size={20} className="text-primary/80" />
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
