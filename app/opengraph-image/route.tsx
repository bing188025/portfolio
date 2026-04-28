import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'
import { SITE_CONFIG } from '@/lib/config'

export const runtime = 'nodejs'

export const alt = 'DevForge Studio software development services'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export async function GET() {
  const logoBuffer = readFileSync(join(process.cwd(), 'public', 'logo.png'))
  const logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          background: '#050814',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          position: 'relative',
          fontFamily: 'sans-serif',
          color: '#fff',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(56,189,248,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.08) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '-140px',
            right: '-100px',
            width: '560px',
            height: '560px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(56,189,248,0.22) 0%, transparent 70%)',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '42px' }}>
          <img src={logoBase64} alt="DevForge Studio logo" width={76} height={76} style={{ objectFit: 'contain' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '30px', fontWeight: 800 }}>{SITE_CONFIG.name}</span>
            <span style={{ fontSize: '18px', color: 'rgba(255,255,255,0.62)' }}>Software development partner</span>
          </div>
        </div>
        <div style={{ fontSize: '68px', fontWeight: 850, lineHeight: 1.06, maxWidth: '940px' }}>
          Plan, build, launch, and maintain software products.
        </div>
        <div style={{ marginTop: '28px', fontSize: '30px', color: '#38bdf8', fontWeight: 650 }}>
          Web · Mobile · AI / LLM · Backend · Automation · Infrastructure
        </div>
      </div>
    ),
    { ...size },
  )
}
