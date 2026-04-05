import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const runtime = 'nodejs'

export const alt = 'AI Full-Stack Engineer Portfolio'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export async function GET() {
  const logoBuffer = readFileSync(join(process.cwd(), 'public', 'logo.png'))
  const logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0f1a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(56,189,248,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.07) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Glow orb */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 70%)',
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(56,189,248,0.1)',
            border: '1px solid rgba(56,189,248,0.3)',
            borderRadius: '100px',
            padding: '8px 20px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#4ade80',
            }}
          />
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px' }}>
            Available for new projects
          </span>
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: '72px',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.1,
            marginBottom: '20px',
            letterSpacing: '-2px',
          }}
        >
          AI Full-Stack Engineer
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '36px',
            fontWeight: 600,
            color: '#38bdf8',
            marginBottom: '28px',
          }}
        >
          Building Intelligent Systems That Scale
        </div>

        {/* Specialties */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          {['AI Agents', 'LLM Systems', 'Computer Vision', 'Full-Stack Platforms'].map((s) => (
            <div
              key={s}
              style={{
                background: 'rgba(56,189,248,0.08)',
                border: '1px solid rgba(56,189,248,0.25)',
                borderRadius: '8px',
                padding: '8px 18px',
                color: 'rgba(255,255,255,0.65)',
                fontSize: '20px',
              }}
            >
              {s}
            </div>
          ))}
        </div>

        {/* Logo badge bottom right */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            right: '80px',
            width: '100px',
            height: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoBase64} alt="Logo" width={100} height={100} style={{ objectFit: 'contain' }} />
        </div>
      </div>
    ),
    { ...size }
  )
}
