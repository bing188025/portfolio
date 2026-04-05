"use client"

import { ScrollAnimation } from './scroll-animation'
import { cn } from '@/lib/utils'

const techCategories = [
  {
    title: "AI / ML",
    color: "from-primary to-chart-2",
    technologies: [
      { name: "Python", icon: "🐍" },
      { name: "PyTorch", icon: "🔥" },
      { name: "TensorFlow", icon: "🧠" },
      { name: "OpenAI", icon: "✨" },
      { name: "LangChain", icon: "🔗" },
      { name: "Hugging Face", icon: "🤗" },
      { name: "CUDA", icon: "⚡" },
      { name: "OpenCV", icon: "👁️" },
    ]
  },
  {
    title: "Frontend",
    color: "from-chart-2 to-chart-3",
    technologies: [
      { name: "React", icon: "⚛️" },
      { name: "Next.js", icon: "▲" },
      { name: "TypeScript", icon: "📘" },
      { name: "Tailwind CSS", icon: "🎨" },
      { name: "Flutter", icon: "💙" },
      { name: "Three.js", icon: "🎮" },
    ]
  },
  {
    title: "Backend",
    color: "from-chart-3 to-chart-4",
    technologies: [
      { name: "Node.js", icon: "🟢" },
      { name: "FastAPI", icon: "⚡" },
      { name: "PostgreSQL", icon: "🐘" },
      { name: "MongoDB", icon: "🍃" },
      { name: "Redis", icon: "🔴" },
      { name: "GraphQL", icon: "◈" },
    ]
  },
  {
    title: "Infrastructure",
    color: "from-chart-4 to-primary",
    technologies: [
      { name: "Docker", icon: "🐳" },
      { name: "Kubernetes", icon: "☸️" },
      { name: "AWS", icon: "☁️" },
      { name: "Vercel", icon: "▲" },
      { name: "Linux", icon: "🐧" },
      { name: "Git", icon: "📂" },
    ]
  },
]

export function TechStackSection() {
  return (
    <section id="tech" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-secondary/30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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
                      <span className="text-lg opacity-70 group-hover:opacity-100 transition-opacity">
                        {tech.icon}
                      </span>
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
                { top: '50%', left: '85%', icon: '⚛️', delay: '0s' },
                { top: '80.3%', left: '67.5%', icon: '🐍', delay: '0.5s' },
                { top: '80.3%', left: '32.5%', icon: '▲', delay: '1s' },
                { top: '50%', left: '15%', icon: '🐳', delay: '1.5s' },
                { top: '19.7%', left: '32.5%', icon: '🔥', delay: '2s' },
                { top: '19.7%', left: '67.5%', icon: '☁️', delay: '2.5s' },
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
                  <span className="text-lg">{item.icon}</span>
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
