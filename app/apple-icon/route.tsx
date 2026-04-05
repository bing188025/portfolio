import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const runtime = 'nodejs'
export const contentType = 'image/png'
export const size = { width: 180, height: 180 }

export async function GET() {
  const logoBuffer = readFileSync(join(process.cwd(), 'public', 'logo.png'))
  const logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0f1a',
          borderRadius: '40px',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoBase64} alt="Logo" width={150} height={150} style={{ objectFit: 'contain' }} />
      </div>
    ),
    { ...size }
  )
}
