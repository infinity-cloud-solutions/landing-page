'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useI18n } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger)

const icons = ['smart_toy', 'account_tree', 'insights', 'settings_suggest'] as const
const numbers = ['01', '02', '03', '04'] as const

function TiltCard({
  children,
}: {
  children: React.ReactNode
  index?: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    // Update CSS vars for inner glow position
    el.style.setProperty('--mx', `${(x + 0.5) * 100}%`)
    el.style.setProperty('--my', `${(y + 0.5) * 100}%`)
    gsap.to(el, {
      rotateX: -y * 13,
      rotateY: x * 13,
      transformPerspective: 650,
      duration: 0.28,
      ease: 'power1.out',
    })
  }

  const onLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.45,
      ease: 'power3.out',
    })
  }

  return (
    <div
      ref={cardRef}
      className="tilt-root"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  )
}

export function Services() {
  const { t } = useI18n()
  const rootRef = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      if (!rootRef.current) return
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduceMotion) return

      gsap.from('[data-service-card]', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.14,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 78%',
          once: true,
        },
      })
    },
    { scope: rootRef }
  )

  return (
    <section id="services" ref={rootRef} className="section-wrap">
      <p className="eyebrow">{t.services.eyebrow}</p>
      <h2
        className="section-title mt-4 max-w-3xl text-3xl md:text-5xl"
        style={{ letterSpacing: '-0.01em' }}
      >
        {t.services.title}
      </h2>
      <p className="mt-6 max-w-2xl text-lg md:text-xl" style={{ color: 'var(--text-primary)', lineHeight: 1.65, opacity: 0.85 }}>
        {t.services.intro}
      </p>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {t.services.items.map((item, index) => (
          <TiltCard key={item.title}>
            <article
              data-service-card
              className="cosmic-card group relative overflow-hidden rounded-2xl p-6 h-full"
            >
              {/* Large background number watermark */}
              <span
                className="pointer-events-none absolute bottom-3 right-4 select-none font-display font-black leading-none"
                style={{
                  fontSize: '5rem',
                  color: 'var(--accent-gold)',
                  opacity: 0.06,
                  letterSpacing: '-0.04em',
                }}
                aria-hidden="true"
              >
                {numbers[index]}
              </span>

              {/* Icon */}
              <div
                className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: 'oklch(74% 0.15 58 / 0.12)', border: '1px solid oklch(74% 0.15 58 / 0.2)' }}
              >
                <span
                  className="icon-outlined text-2xl"
                  style={{ color: 'var(--accent-gold)' }}
                >
                  {icons[index]}
                </span>
              </div>

              <h3
                className="font-bold text-lg"
                style={{ color: 'var(--text-primary)' }}
              >
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {item.description}
              </p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px transition-all duration-500 group-hover:h-[2px]"
                style={{ background: 'linear-gradient(90deg, transparent, var(--accent-gold), transparent)', opacity: 0.3 }}
              />
            </article>
          </TiltCard>
        ))}
      </div>
    </section>
  )
}
