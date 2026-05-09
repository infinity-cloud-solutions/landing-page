import Link from 'next/link'

export default function NotFound() {
  return (
    <main
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 text-center"
      style={{ background: 'oklch(7% 0.014 265)' }}
    >
      {/* Nebula glows */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div style={{
          position: 'absolute',
          top: '-12%',
          left: '-10%',
          width: '52vw',
          height: '52vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, oklch(74% 0.15 58 / 0.16) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-8%',
          width: '44vw',
          height: '44vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, oklch(70% 0.14 192 / 0.13) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }} />
      </div>

      {/* Orbit rings */}
      <div className="pointer-events-none absolute" aria-hidden="true">
        <svg width="580" height="580" viewBox="0 0 580 580" fill="none">
          <ellipse cx="290" cy="290" rx="282" ry="282"
            stroke="oklch(74% 0.15 58 / 0.07)" strokeWidth="1" />
          <ellipse cx="290" cy="290" rx="220" ry="220"
            stroke="oklch(74% 0.15 58 / 0.05)" strokeWidth="1" />
          <circle cx="290" cy="8" r="4"
            fill="oklch(74% 0.15 58)" opacity="0.6" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <span
          className="block font-display font-black uppercase leading-none"
          style={{
            fontSize: 'clamp(7rem, 22vw, 16rem)',
            color: 'oklch(74% 0.15 58)',
            letterSpacing: '-0.04em',
          }}
          aria-hidden="true"
        >
          404
        </span>

        <h1
          className="font-display font-black uppercase tracking-tight"
          style={{
            fontSize: 'clamp(1.3rem, 3vw, 2.4rem)',
            color: 'oklch(96% 0.008 90)',
            marginTop: '-0.25rem',
          }}
        >
          Esta página se perdió en el espacio
        </h1>

        <p
          className="mx-auto mt-4 max-w-xs text-sm md:text-base"
          style={{ color: 'oklch(56% 0.016 265)', lineHeight: 1.7 }}
        >
          La ruta que buscas no existe o fue movida a otra órbita.
        </p>

        <Link
          href="/"
          className="gold-button mt-8 inline-block rounded-full px-8 py-3.5 text-sm font-bold tracking-wide"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  )
}
