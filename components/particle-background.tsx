"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  baseVx: number
  baseVy: number
  vx: number
  vy: number
  size: number
  baseSize: number
  opacity: number
  baseOpacity: number
  hue: number
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const smoothMouseRef = useRef({ x: -1000, y: -1000 })
  const particlesRef = useRef<Particle[]>([])
  const animRef = useRef<number>(0)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      
      // Reinitialize particles on resize
      const count = Math.min(100, Math.floor(window.innerWidth / 12))
      particlesRef.current = Array.from({ length: count }, () => {
        const baseVx = (Math.random() - 0.5) * 0.3
        const baseVy = (Math.random() - 0.5) * 0.3
        const baseSize = Math.random() * 2.5 + 0.5
        const baseOpacity = Math.random() * 0.4 + 0.15
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseVx,
          baseVy,
          vx: baseVx,
          vy: baseVy,
          size: baseSize,
          baseSize,
          opacity: baseOpacity,
          baseOpacity,
          hue: 180 + Math.random() * 40,
        }
      })
    }
    resize()
    window.addEventListener("resize", resize)

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", handleMouse)

    const animate = () => {
      timeRef.current += 0.005
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const particles = particlesRef.current
      const mouse = mouseRef.current
      const smooth = smoothMouseRef.current

      // Smooth mouse interpolation (lerp)
      smooth.x += (mouse.x - smooth.x) * 0.08
      smooth.y += (mouse.y - smooth.y) * 0.08

      // Draw cursor glow
      if (mouse.x > 0 && mouse.y > 0) {
        const gradient = ctx.createRadialGradient(smooth.x, smooth.y, 0, smooth.x, smooth.y, 250)
        gradient.addColorStop(0, "rgba(56, 199, 220, 0.06)")
        gradient.addColorStop(0.5, "rgba(56, 199, 220, 0.02)")
        gradient.addColorStop(1, "rgba(56, 199, 220, 0)")
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      particles.forEach((p) => {
        const dx = smooth.x - p.x
        const dy = smooth.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const mouseRadius = 250

        if (dist < mouseRadius) {
          const force = 1 - dist / mouseRadius
          const angle = Math.atan2(dy, dx)

          // Magnetic attraction when close, orbit when medium distance
          if (dist < 80) {
            // Repel close particles
            p.vx -= Math.cos(angle) * force * 0.8
            p.vy -= Math.sin(angle) * force * 0.8
          } else {
            // Orbital pull - tangential + slight attraction
            const tangentAngle = angle + Math.PI / 2
            p.vx += Math.cos(tangentAngle) * force * 0.15 + Math.cos(angle) * force * 0.03
            p.vy += Math.sin(tangentAngle) * force * 0.15 + Math.sin(angle) * force * 0.03
          }

          // Grow and brighten near cursor
          p.size += (p.baseSize * (1 + force * 1.5) - p.size) * 0.1
          p.opacity += (p.baseOpacity * (1 + force * 2) - p.opacity) * 0.1
          p.hue = 180 + force * 60 // shift toward purple near cursor
        } else {
          // Restore defaults
          p.size += (p.baseSize - p.size) * 0.05
          p.opacity += (p.baseOpacity - p.opacity) * 0.05
          p.hue += (180 + Math.random() * 20 - p.hue) * 0.01
        }

        // Apply damping and base velocity
        p.vx *= 0.96
        p.vy *= 0.96
        p.vx += p.baseVx * 0.04
        p.vy += p.baseVy * 0.04

        // Add subtle sine wave drift for constant movement
        p.x += p.vx + Math.sin(timeRef.current + p.y * 0.005) * 0.15
        p.y += p.vy + Math.cos(timeRef.current + p.x * 0.005) * 0.15

        // Wrap around edges
        if (p.x < -20) p.x = canvas.width + 20
        if (p.x > canvas.width + 20) p.x = -20
        if (p.y < -20) p.y = canvas.height + 20
        if (p.y > canvas.height + 20) p.y = -20

        // Draw particle with glow
        ctx.save()
        ctx.shadowBlur = 8
        ctx.shadowColor = `hsla(${p.hue}, 90%, 60%, ${p.opacity * 0.5})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 90%, 65%, ${p.opacity})`
        ctx.fill()
        ctx.restore()
      })

      // Draw connections with gradient lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = 160
          if (dist < maxDist) {
            const alpha = 0.12 * (1 - dist / maxDist)
            // Check if either particle is near mouse for brighter lines
            const midX = (particles[i].x + particles[j].x) / 2
            const midY = (particles[i].y + particles[j].y) / 2
            const mouseDist = Math.sqrt((smooth.x - midX) ** 2 + (smooth.y - midY) ** 2)
            const boost = mouseDist < 200 ? (1 - mouseDist / 200) * 2 : 0

            const gradient = ctx.createLinearGradient(
              particles[i].x,
              particles[i].y,
              particles[j].x,
              particles[j].y
            )
            gradient.addColorStop(0, `hsla(${particles[i].hue}, 90%, 60%, ${alpha + alpha * boost})`)
            gradient.addColorStop(1, `hsla(${particles[j].hue}, 90%, 60%, ${alpha + alpha * boost})`)

            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = gradient
            ctx.lineWidth = 0.5 + boost * 0.5
            ctx.stroke()
          }
        }
      }

      animRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouse)
      cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
