'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useI18n } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger)

const icons = ['search', 'design_services', 'rocket_launch', 'trending_up'] as const

// Zigzag offsets (px) derived from the SVG path y-values [60, 20, 100, 70]
// Baseline = min y (20); scale = 64px / (100 - 20); applied on md+ only
const STEP_OFFSETS = [32, 0, 64, 38] // px

export function Process() {
  const { t } = useI18n()
  const rootRef = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      if (!rootRef.current) return
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduceMotion) return

      const line = rootRef.current.querySelector<SVGPathElement>('[data-process-line]')
      if (line) {
        const length = line.getTotalLength()
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length })
        gsap.to(line, {
          strokeDashoffset: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 74%',
            end: 'bottom 62%',
            scrub: true,
          },
        })
      }

      gsap.from('[data-step-card]', {
        y: 28,
        opacity: 0,
        duration: 0.6,
        stagger: 0.13,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 76%',
          once: true,
        },
      })
    },
    { scope: rootRef }
  )

  return (
    <section id="process" ref={rootRef} className="section-wrap">
      <p className="eyebrow">{t.process.eyebrow}</p>
      <h2 className="section-title mt-4 max-w-3xl text-3xl md:text-5xl">{t.process.title}</h2>

      <div className="relative mt-14">
        {/* Animated connecting path — gold to teal, taller for visual impact */}
        <svg
          className="pointer-events-none absolute left-0 right-0 top-4 hidden h-20 w-full md:block"
          viewBox="0 0 1200 120"
          fill="none"
          aria-hidden="true"
        >
          <path
            data-process-line
            d="M40 60 C 260 60, 300 20, 520 20 C 740 20, 780 100, 1020 100 C 1080 100, 1120 80, 1160 70"
            stroke="url(#process-gradient-gold)"
            strokeWidth={4}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="process-gradient-gold" x1="40" x2="1160" y1="0" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="oklch(74% 0.15 58)" />
              <stop offset="0.5" stopColor="oklch(82% 0.12 90)" />
              <stop offset="1" stopColor="oklch(70% 0.14 192)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Step cards — zigzag vertical offsets follow the SVG wave on md+ */}
        <div className="grid gap-5 md:grid-cols-4 md:items-start">
          {t.process.steps.map((step, index) => (
            <article
              key={step.title}
              data-step-card
              className="cosmic-card relative rounded-2xl p-6 group"
              style={{
                // Offset applied server-side for md+ via inline; CSS handles breakpoint
                '--step-offset': `${STEP_OFFSETS[index]}px`,
              } as React.CSSProperties}
            >
              {/* Step number */}
              <div className="mb-5 flex items-center gap-3">
                <span
                  className="font-display font-black text-5xl leading-none"
                  style={{ color: 'oklch(74% 0.15 58 / 0.2)', letterSpacing: '-0.04em' }}
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span
                  className="icon-outlined text-2xl"
                  style={{ color: index < 2 ? 'var(--accent-gold)' : 'var(--accent-teal)' }}
                >
                  {icons[index]}
                </span>
              </div>
              <h3
                className="font-bold text-xl"
                style={{ color: 'var(--text-primary)' }}
              >
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {step.description}
              </p>

              {/* Hover top accent */}
              <div
                className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: index < 2 ? 'var(--accent-gold)' : 'var(--accent-teal)' }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
