"use client"

import { useState } from 'react'
import { ScrollAnimation } from './scroll-animation'
import { TiltCard } from './tilt-card'
import { cn } from '@/lib/utils'
import { ExternalLink, Github, Brain, Boxes, Globe, Smartphone } from 'lucide-react'
import Image from 'next/image'

const categories = [
  { id: "all", label: "All Projects", icon: Boxes },
  { id: "ai", label: "AI / ML", icon: Brain },
  { id: "graphics", label: "3D / 4D", icon: Boxes },
  { id: "fullstack", label: "Full-Stack", icon: Globe },
  { id: "apps", label: "Apps & Tools", icon: Smartphone },
]

const projects = [
  // AI / ML Systems
  {
    title: "AI Agent App",
    description: "Autonomous AI agent capable of executing complex multi-step tasks with planning and reasoning capabilities.",
    tech: ["Python", "LangChain", "OpenAI", "FastAPI"],
    category: "ai",
    featured: true,
    image: "/images/projects/ai-agent.jpg"
  },
  {
    title: "AI English Learning System",
    description: "Intelligent language learning platform with adaptive curriculum and real-time pronunciation feedback.",
    tech: ["Python", "NLP", "Speech Recognition", "React"],
    category: "ai",
    image: "/images/projects/ai-learning.jpg"
  },
  {
    title: "AI Healthcare Diagnosis Agent",
    description: "Voice-powered diagnostic system that converts symptoms to disease predictions and insurance codes.",
    tech: ["Python", "LLM", "Voice AI", "Medical NLP"],
    category: "ai",
    featured: true,
    image: "/images/projects/healthcare-ai.jpg"
  },
  {
    title: "Face Recognition Library",
    description: "High-performance facial recognition library with real-time detection and embedding generation.",
    tech: ["Python", "OpenCV", "dlib", "TensorFlow"],
    category: "ai",
    image: "/images/projects/face-recognition.jpg"
  },
  {
    title: "Crack Detection AI System",
    description: "Computer vision system for automated infrastructure crack detection and severity classification.",
    tech: ["Python", "YOLO", "PyTorch", "OpenCV"],
    category: "ai",
    image: "/images/projects/crack-detection.jpg"
  },
  {
    title: "4D Gaussian Splatting Generator",
    description: "Novel view synthesis system using 4D Gaussian splatting for dynamic scene reconstruction.",
    tech: ["Python", "CUDA", "PyTorch", "3D Graphics"],
    category: "ai",
    featured: true,
    image: "/images/projects/gaussian-splatting.jpg"
  },
  {
    title: "Horse Racing Prediction AI",
    description: "Machine learning system for race outcome prediction using historical data and real-time factors.",
    tech: ["Python", "XGBoost", "Feature Engineering", "API"],
    category: "ai",
    image: "/images/projects/horse-racing.jpg"
  },
  {
    title: "Blueprint Material Estimation",
    description: "AI-powered system for automatic material quantity estimation from architectural blueprints.",
    tech: ["Python", "Computer Vision", "OCR", "ML"],
    category: "ai",
    image: "/images/projects/blueprint.jpg"
  },

  // Advanced Graphics / 3D / 4D
  {
    title: "3D/4D Rendering Engine",
    description: "Local model-based rendering system for high-quality 3D and 4D content generation.",
    tech: ["Python", "OpenGL", "CUDA", "Neural Rendering"],
    category: "graphics",
    image: "/images/projects/3d-rendering.jpg"
  },
  {
    title: "4D Gaussian Splatting Viewer",
    description: "Interactive viewer for visualizing and exploring 4D Gaussian splatting reconstructions.",
    tech: ["WebGL", "Three.js", "React", "WASM"],
    category: "graphics",
    image: "/images/projects/4d-viewer.jpg"
  },
  {
    title: "PCD to PLY Conversion System",
    description: "Point cloud data conversion pipeline with optimization and format transformation.",
    tech: ["Python", "Open3D", "NumPy", "CLI"],
    category: "graphics",
    image: "/images/projects/point-cloud.jpg"
  },

  // Full-Stack Platforms
  {
    title: "Crowdfunding Platform",
    description: "Full-featured crowdfunding system with campaign management, payments, and backer dashboards.",
    tech: ["Next.js", "PostgreSQL", "Stripe", "TypeScript"],
    category: "fullstack",
    featured: true,
    image: "/images/projects/crowdfunding.jpg"
  },
  {
    title: "Marine Tourism Reservation",
    description: "Comprehensive booking platform for marine tourism with real-time availability and payments.",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    category: "fullstack",
    image: "/images/projects/marine-tourism.jpg"
  },
  {
    title: "Phone Number Search System",
    description: "High-performance phone number lookup service with carrier identification and validation.",
    tech: ["Node.js", "Redis", "PostgreSQL", "API"],
    category: "fullstack",
    image: "/images/projects/phone-search.jpg"
  },
  {
    title: "eSIM Sales Platform",
    description: "Digital eSIM marketplace with instant activation, global coverage, and subscription management.",
    tech: ["Next.js", "Prisma", "Stripe", "REST API"],
    category: "fullstack",
    image: "/images/projects/esim.jpg"
  },
  {
    title: "Corporate Business System",
    description: "Enterprise resource planning system with modules for HR, finance, and project management.",
    tech: ["React", "Node.js", "PostgreSQL", "Docker"],
    category: "fullstack",
    image: "/images/projects/corporate-system.jpg"
  },
  {
    title: "VPS Hosting Platform",
    description: "Cloud hosting management platform with automated provisioning and resource monitoring.",
    tech: ["Next.js", "Docker", "Kubernetes", "API"],
    category: "fullstack",
    image: "/images/projects/vps-hosting.jpg"
  },

  // Apps & Tools
  {
    title: "Android Live Wallpaper App",
    description: "Dynamic live wallpaper application with customizable animations and themes.",
    tech: ["Kotlin", "Android SDK", "OpenGL ES", "Firebase"],
    category: "apps",
    image: "/images/projects/live-wallpaper.jpg"
  },
  {
    title: "Discord Bot with Payments",
    description: "Feature-rich Discord bot with integrated payment processing and subscription management.",
    tech: ["Node.js", "Discord.js", "Stripe", "MongoDB"],
    category: "apps",
    image: "/images/projects/discord-bot.jpg"
  },
]

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(p => p.category === activeCategory)

  return (
    <section id="projects" className="py-24 lg:py-32 relative">
      {/* Background accents */}
      <div className="absolute top-1/3 left-0 w-1/3 h-1/3 bg-chart-2/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-1/4 h-1/4 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollAnimation>
          <div className="text-center mb-12">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Portfolio</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-balance">
              Featured
              <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent"> Projects</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A collection of AI systems, full-stack platforms, and innovative applications 
              built with cutting-edge technologies.
            </p>
          </div>
        </ScrollAnimation>

        {/* Category Filter */}
        <ScrollAnimation delay={100}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "glass border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                )}
              >
                <category.icon className="h-4 w-4" />
                {category.label}
              </button>
            ))}
          </div>
        </ScrollAnimation>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ScrollAnimation key={project.title} delay={index * 50}>
              <TiltCard 
                className={cn(
                  "glass border border-border h-full group hover:border-primary/30 transition-all duration-300 overflow-hidden",
                  project.featured && "md:col-span-1 ring-1 ring-primary/20"
                )}
              >
                {/* Project Image */}
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  {project.featured && (
                    <span className="absolute top-3 left-3 px-2 py-1 text-xs font-medium bg-primary/90 text-primary-foreground rounded">
                      Featured
                    </span>
                  )}
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 rounded-lg bg-background/80 backdrop-blur-sm hover:bg-background transition-colors" aria-label="View GitHub">
                      <Github className="h-4 w-4 text-foreground" />
                    </button>
                    <button className="p-2 rounded-lg bg-background/80 backdrop-blur-sm hover:bg-background transition-colors" aria-label="View Demo">
                      <ExternalLink className="h-4 w-4 text-foreground" />
                    </button>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
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
