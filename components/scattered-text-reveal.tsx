"use client"

import { useEffect, useRef, useState } from 'react'

interface Line {
  text: string
  className: string
}

interface ScatteredTextRevealProps {
  lines: Line[]
  onComplete?: () => void
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

interface CharMeta {
  char: string
  isSpace: boolean
  offsetX: number
  offsetY: number
  rotation: number
  appearDelay: number
  settleDelay: number
}

function buildMeta(lines: Line[]): CharMeta[] {
  const meta: CharMeta[] = []

  // Count total chars to build a shuffled reveal order
  let total = 0
  for (const line of lines) total += line.text.length

  const shuffledOrder = Array.from({ length: total }, (_, i) => i)
  for (let i = shuffledOrder.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffledOrder[i], shuffledOrder[j]] = [shuffledOrder[j], shuffledOrder[i]]
  }

  let flatIdx = 0
  for (const line of lines) {
    for (const char of line.text) {
      const isSpace = char === ' '
      const rank = shuffledOrder[flatIdx]
      meta.push({
        char,
        isSpace,
        offsetX: isSpace ? 0 : rand(-380, 380),
        offsetY: isSpace ? 0 : rand(-220, 220),
        rotation: isSpace ? 0 : rand(-25, 25),
        appearDelay: isSpace ? 0 : rank * 22,
        settleDelay: flatIdx * 3,
      })
      flatIdx++
    }
  }
  return meta
}

export function ScatteredTextReveal({ lines, onComplete }: ScatteredTextRevealProps) {
  // null = not yet initialised (SSR / first paint), avoids hydration mismatch
  const [meta, setMeta] = useState<CharMeta[] | null>(null)
  const [phase, setPhase] = useState<'scatter' | 'settle' | 'done'>('scatter')
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  // Build random metadata only on the client, after mount
  useEffect(() => {
    setMeta(buildMeta(lines))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const maxAppearDelay = meta
    ? Math.max(0, ...meta.filter(m => !m.isSpace).map(m => m.appearDelay))
    : 0

  // Scatter → Settle
  useEffect(() => {
    if (!meta || phase !== 'scatter') return
    const t = setTimeout(() => setPhase('settle'), maxAppearDelay + 180)
    return () => clearTimeout(t)
  }, [meta, phase, maxAppearDelay])

  // Settle → Done
  useEffect(() => {
    if (phase !== 'settle') return
    const t = setTimeout(() => {
      setPhase('done')
      onCompleteRef.current?.()
    }, 750)
    return () => clearTimeout(t)
  }, [phase])

  // Before client hydration: render invisible placeholder so layout is stable
  if (!meta) {
    return (
      <>
        {lines.map((line, lineIdx) => (
          <span key={lineIdx} className={line.className} style={{ display: 'block', visibility: 'hidden' }}>
            {line.text}
          </span>
        ))}
      </>
    )
  }

  let charIndex = 0

  return (
    <>
      {lines.map((line, lineIdx) => {
        const spans = line.text.split('').map(() => {
          const m = meta[charIndex]
          const idx = charIndex
          charIndex++

          if (m.isSpace) {
            return <span key={idx} style={{ display: 'inline-block', width: '0.3em' }} />
          }

          if (phase === 'scatter') {
            return (
              <span
                key={idx}
                className="scatter-char"
                style={{
                  display: 'inline-block',
                  transform: `translate(${m.offsetX}px, ${m.offsetY}px) rotate(${m.rotation}deg) scale(0.7)`,
                  opacity: 0,
                  animationDelay: `${m.appearDelay}ms`,
                }}
              >
                {m.char}
              </span>
            )
          }

          return (
            <span
              key={idx}
              style={{
                display: 'inline-block',
                transform: 'translate(0,0) rotate(0deg) scale(1)',
                opacity: 1,
                transition: phase === 'settle'
                  ? `transform 0.6s cubic-bezier(0.22,1,0.36,1) ${m.settleDelay}ms, opacity 0.4s ease ${m.settleDelay}ms`
                  : 'none',
              }}
            >
              {m.char}
            </span>
          )
        })

        return (
          <span key={lineIdx} className={line.className} style={{ display: 'block' }}>
            {spans}
          </span>
        )
      })}
    </>
  )
}
