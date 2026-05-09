import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Infinity AI Cloud Solutions — Automatización e IA para PyMEs en México'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          background: '#0b0f1c',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Gold glow — top left */}
        <div style={{
          position: 'absolute',
          top: -180,
          left: -180,
          width: 640,
          height: 640,
          borderRadius: 9999,
          background: 'radial-gradient(circle at center, rgba(212,144,16,0.28) 0%, rgba(212,144,16,0.08) 45%, transparent 70%)',
          display: 'flex',
        }} />

        {/* Teal glow — bottom right */}
        <div style={{
          position: 'absolute',
          bottom: -140,
          right: -100,
          width: 540,
          height: 540,
          borderRadius: 9999,
          background: 'radial-gradient(circle at center, rgba(45,200,180,0.22) 0%, rgba(45,200,180,0.06) 45%, transparent 70%)',
          display: 'flex',
        }} />

        {/* Orbit ring decorations — right side */}
        <div style={{
          position: 'absolute',
          right: -100,
          top: '50%',
          marginTop: -220,
          width: 440,
          height: 440,
          borderRadius: 9999,
          border: '1px solid rgba(212,144,16,0.14)',
          display: 'flex',
        }} />
        <div style={{
          position: 'absolute',
          right: 40,
          top: '50%',
          marginTop: -150,
          width: 300,
          height: 300,
          borderRadius: 9999,
          border: '1px solid rgba(212,144,16,0.09)',
          display: 'flex',
        }} />

        {/* Content */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, bottom: 0,
          width: 980,
          display: 'flex',
          flexDirection: 'column',
          padding: '60px 80px',
          justifyContent: 'space-between',
        }}>

          {/* Brand row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {/* Rocket icon box */}
            <div style={{
              width: 40,
              height: 40,
              background: '#d49010',
              borderRadius: 9,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                width: 12,
                height: 20,
                background: '#0b0f1c',
                borderRadius: '50% 50% 20% 20% / 60% 60% 40% 40%',
                display: 'flex',
              }} />
            </div>
            <span style={{
              color: 'rgba(245,240,232,0.42)',
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: '0.1em',
              display: 'flex',
            }}>
              INFINITY AI CLOUD SOLUTIONS
            </span>
          </div>

          {/* Headline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{
              display: 'flex',
              fontSize: 92,
              fontWeight: 900,
              color: '#f0ebe0',
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
            }}>
              TU NEGOCIO TRABAJA
            </div>
            <div style={{
              display: 'flex',
              fontSize: 92,
              fontWeight: 900,
              color: '#d49010',
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
            }}>
              AUNQUE TÚ NO ESTÉS
            </div>
          </div>

          {/* Trust pills */}
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            {[
              '120+ proyectos entregados',
              '+12 industrias',
              'Resultados desde semana 2',
            ].map((item) => (
              <div
                key={item}
                style={{
                  display: 'flex',
                  fontSize: 17,
                  color: '#d49010',
                  background: 'rgba(212,144,16,0.1)',
                  border: '1px solid rgba(212,144,16,0.28)',
                  borderRadius: 999,
                  padding: '7px 18px',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
