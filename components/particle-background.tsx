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
  sparklePhase: number       // unique phase offset so each atom twinkles independently
  sparkleSpeed: number       // how fast the sparkle pulses
  sparkleArms: number        // number of star arms (4 or 6)
}

// Each recorded position in the cursor trail history
interface TrailPoint {
  x: number
  y: number
}

const TRAIL_LENGTH = 80  // number of historical positions to keep

// Draws a sleek pointer-arrow cursor icon matching the comet trail aesthetic
function drawCursorIcon(ctx: CanvasRenderingContext2D, x: number, y: number) {
  // Classic pointer arrow: tip at (x, y), angled 11° clockwise from vertical
  const angle = (11 * Math.PI) / 180
  const len = 20   // total arrow height
  const w = 7      // half-width at the base

  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(angle)

  // Arrow path: tip at origin, body going downward
  ctx.beginPath()
  ctx.moveTo(0, 0)                        // tip
  ctx.lineTo(-w, len)                     // bottom-left
  ctx.lineTo(-w * 0.25, len - w * 0.9)   // inner notch
  ctx.lineTo(w * 0.25, len - w * 0.9)    // inner notch right
  ctx.lineTo(w, len)                      // bottom-right
  ctx.closePath()

  // Glowing fill
  ctx.shadowBlur = 16
  ctx.shadowColor = "rgba(56, 210, 230, 0.85)"
  ctx.fillStyle = "rgba(200, 245, 255, 0.92)"
  ctx.fill()

  // Crisp cyan outline
  ctx.shadowBlur = 0
  ctx.strokeStyle = "rgba(56, 210, 230, 0.7)"
  ctx.lineWidth = 1.2
  ctx.lineJoin = "round"
  ctx.stroke()

  ctx.restore()
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // Separate top-layer canvas exclusively for the cursor icon
  const cursorCanvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const smoothMouseRef = useRef({ x: -1000, y: -1000 })
  const particlesRef = useRef<Particle[]>([])
  const animRef = useRef<number>(0)
  const timeRef = useRef(0)
  // Ring buffer for trail positions
  const trailRef = useRef<TrailPoint[]>([])
  const mouseActiveRef = useRef(false)
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const cursorCanvas = cursorCanvasRef.current
    if (!cursorCanvas) return
    const cctx = cursorCanvas.getContext("2d")
    if (!cctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      cursorCanvas.width = window.innerWidth
      cursorCanvas.height = window.innerHeight
      
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
          sparklePhase: Math.random() * Math.PI * 2,
          sparkleSpeed: 0.04 + Math.random() * 0.06,
          sparkleArms: Math.random() < 0.5 ? 4 : 6,
        }
      })
    }
    resize()
    window.addEventListener("resize", resize)

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      mouseActiveRef.current = true
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
      idleTimerRef.current = setTimeout(() => {
        mouseActiveRef.current = false
      }, 150)
    }
    window.addEventListener("mousemove", handleMouse)

    const animate = () => {
      timeRef.current += 0.005
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const particles = particlesRef.current
      const mouse = mouseRef.current
      const smooth = smoothMouseRef.current

      // Smooth mouse interpolation (lerp)
      smooth.x += (mouse.x - smooth.x) * 0.12
      smooth.y += (mouse.y - smooth.y) * 0.12

      // Record trail position every frame
      if (mouse.x > -500) {
        trailRef.current.push({ x: smooth.x, y: smooth.y })
        if (trailRef.current.length > TRAIL_LENGTH) {
          trailRef.current.shift()
        }
      }

      // ── Draw cursor trail ──────────────────────────────────────────────
      const trail = trailRef.current
      if (trail.length > 1) {
        for (let i = 1; i < trail.length; i++) {
          // t goes 0 (oldest/tail end) → 1 (newest/head)
          const t = i / (trail.length - 1)
          const tPrev = (i - 1) / (trail.length - 1)

          // Interpolate hue: cyan (195) at head → purple (260) at tail
          const hue = 195 + (1 - t) * 65
          const hueP = 195 + (1 - tPrev) * 65

          // Opacity and width taper toward the tail
          const alpha = t * 0.55
          const alphaP = tPrev * 0.55
          const lineWidth = t * 3.5

          const grad = ctx.createLinearGradient(
            trail[i - 1].x, trail[i - 1].y,
            trail[i].x, trail[i].y,
          )
          grad.addColorStop(0, `hsla(${hueP}, 90%, 65%, ${alphaP})`)
          grad.addColorStop(1, `hsla(${hue}, 90%, 65%, ${alpha})`)

          ctx.save()
          ctx.shadowBlur = 12 * t
          ctx.shadowColor = `hsla(${hue}, 90%, 70%, ${alpha * 0.8})`
          ctx.beginPath()
          ctx.moveTo(trail[i - 1].x, trail[i - 1].y)
          ctx.lineTo(trail[i].x, trail[i].y)
          ctx.strokeStyle = grad
          ctx.lineWidth = lineWidth
          ctx.lineCap = "round"
          ctx.stroke()
          ctx.restore()
        }

        // Bright glowing head dot
        const head = trail[trail.length - 1]
        const headGrad = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 10)
        headGrad.addColorStop(0, "rgba(56, 210, 230, 0.9)")
        headGrad.addColorStop(0.4, "rgba(56, 210, 230, 0.4)")
        headGrad.addColorStop(1, "rgba(56, 210, 230, 0)")
        ctx.save()
        ctx.shadowBlur = 20
        ctx.shadowColor = "rgba(56, 210, 230, 0.8)"
        ctx.beginPath()
        ctx.arc(head.x, head.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(200, 245, 255, 0.95)"
        ctx.fill()
        ctx.restore()

        // Ambient glow around head
        const ambientGrad = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 180)
        ambientGrad.addColorStop(0, "rgba(56, 199, 220, 0.05)")
        ambientGrad.addColorStop(0.5, "rgba(56, 199, 220, 0.02)")
        ambientGrad.addColorStop(1, "rgba(56, 199, 220, 0)")
        ctx.fillStyle = ambientGrad
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      // ── Cursor icon on top-layer canvas ───────────────────────────────
      cctx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height)
      const mx = mouse.x
      const my = mouse.y
      if (mx > -500) {
        drawCursorIcon(cctx, mx, my)
      }
      // ──────────────────────────────────────────────────────────────────

      particles.forEach((p) => {
        const dx = smooth.x - p.x
        const dy = smooth.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const mouseRadius = 250

        if (dist < mouseRadius) {
          const force = 1 - dist / mouseRadius
          const angle = Math.atan2(dy, dx)

          if (dist < 80) {
            p.vx -= Math.cos(angle) * force * 0.8
            p.vy -= Math.sin(angle) * force * 0.8
          } else {
            const tangentAngle = angle + Math.PI / 2
            p.vx += Math.cos(tangentAngle) * force * 0.15 + Math.cos(angle) * force * 0.03
            p.vy += Math.sin(tangentAngle) * force * 0.15 + Math.sin(angle) * force * 0.03
          }

          p.size += (p.baseSize * (1 + force * 1.5) - p.size) * 0.1
          p.opacity += (p.baseOpacity * (1 + force * 2) - p.opacity) * 0.1
          p.hue = 180 + force * 60
        } else {
          p.size += (p.baseSize - p.size) * 0.05
          p.opacity += (p.baseOpacity - p.opacity) * 0.05
          p.hue += (180 + Math.random() * 20 - p.hue) * 0.01
        }

        p.vx *= 0.96
        p.vy *= 0.96
        p.vx += p.baseVx * 0.04
        p.vy += p.baseVy * 0.04

        p.x += p.vx + Math.sin(timeRef.current + p.y * 0.005) * 0.15
        p.y += p.vy + Math.cos(timeRef.current + p.x * 0.005) * 0.15

        if (p.x < -20) p.x = canvas.width + 20
        if (p.x > canvas.width + 20) p.x = -20
        if (p.y < -20) p.y = canvas.height + 20
        if (p.y > canvas.height + 20) p.y = -20

        // Advance this atom's sparkle phase
        p.sparklePhase += p.sparkleSpeed

        // Pulsing sparkle intensity: 0 → 1 → 0 on a sine wave
        const sparkleIntensity = (Math.sin(p.sparklePhase) + 1) / 2

        ctx.save()
        ctx.shadowBlur = 8
        ctx.shadowColor = `hsla(${p.hue}, 90%, 60%, ${p.opacity * 0.5})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 90%, 65%, ${p.opacity})`
        ctx.fill()
        ctx.restore()

        // ── Sparkle star around the atom ──────────────────────────────────
        if (sparkleIntensity > 0.05) {
          const arms = p.sparkleArms
          // Outer arm length scales with atom size and intensity
          const outerR = p.size * (2.5 + sparkleIntensity * 3.5)
          // Inner notch is a fraction of outer
          const innerR = p.size * 0.55
          const sparkleAlpha = sparkleIntensity * p.opacity * 1.6

          ctx.save()
          ctx.translate(p.x, p.y)
          // Slowly rotate the star over time for extra liveliness
          ctx.rotate(timeRef.current * 0.6 + p.sparklePhase * 0.25)

          // Glowing halo behind the star
          ctx.shadowBlur = 10 + sparkleIntensity * 14
          ctx.shadowColor = `hsla(${p.hue}, 100%, 75%, ${sparkleAlpha * 0.7})`

          ctx.beginPath()
          for (let a = 0; a < arms * 2; a++) {
            const r = a % 2 === 0 ? outerR : innerR
            const theta = (a / (arms * 2)) * Math.PI * 2
            if (a === 0) ctx.moveTo(Math.cos(theta) * r, Math.sin(theta) * r)
            else ctx.lineTo(Math.cos(theta) * r, Math.sin(theta) * r)
          }
          ctx.closePath()

          // Gradient fill: bright centre → transparent tips
          const starGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, outerR)
          starGrad.addColorStop(0,   `hsla(${p.hue}, 100%, 92%, ${sparkleAlpha})`)
          starGrad.addColorStop(0.35, `hsla(${p.hue}, 95%, 75%, ${sparkleAlpha * 0.65})`)
          starGrad.addColorStop(1,   `hsla(${p.hue}, 90%, 65%, 0)`)
          ctx.fillStyle = starGrad
          ctx.fill()

          ctx.restore()
        }
        // ─────────────────────────────────────────────────────────────────
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
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    }
  }, [])

  return (
    <>
      {/* Particle / trail background layer */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 1000 }}
      />
      {/* Cursor icon — always on top of every component */}
      <canvas
        ref={cursorCanvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 99999 }}
      />
    </>
  )
}
