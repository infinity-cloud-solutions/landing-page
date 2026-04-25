"use client"

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useI18n } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger)

export function About() {
  const { t } = useI18n()
  const rootRef = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      if (!rootRef.current) return
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduceMotion) return

      gsap.from('[data-about-card]', {
        y: 32,
        opacity: 0,
        duration: 0.65,
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

  const accentColors = [
    { icon: 'var(--accent-gold)', bg: 'oklch(74% 0.15 58 / 0.1)', border: 'oklch(74% 0.15 58 / 0.2)' },
    { icon: 'var(--accent-teal)', bg: 'oklch(70% 0.14 192 / 0.1)', border: 'oklch(70% 0.14 192 / 0.2)' },
    { icon: 'var(--accent-gold)', bg: 'oklch(74% 0.15 58 / 0.1)', border: 'oklch(74% 0.15 58 / 0.2)' },
  ]

  return (
    <section id="about" ref={rootRef} className="section-wrap">
      <p className="eyebrow">{t.about.eyebrow}</p>
      <h2 className="section-title mt-4 max-w-3xl text-3xl md:text-5xl">{t.about.title}</h2>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {t.about.cards.map((card, index) => {
          const colors = accentColors[index % accentColors.length]
          return (
            <article
              key={card.title}
              data-about-card
              className="cosmic-card group relative overflow-hidden rounded-2xl p-7"
            >
              {/* Icon box */}
              <div
                className="mb-6 inline-flex h-13 w-13 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
              >
                <span
                  className="icon-outlined text-2xl"
                  style={{ color: colors.icon }}
                >
                  {card.icon}
                </span>
              </div>

              <h3
                className="font-bold text-xl"
                style={{ color: 'var(--text-primary)' }}
              >
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {card.description}
              </p>

              {/* Hover bottom bar */}
              <div
                className="absolute bottom-0 left-0 w-full h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                style={{ background: colors.icon }}
              />
            </article>
          )
        })}
      </div>
    </section>
  )
}
