"use client"

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useI18n } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function About() {
  const { t } = useI18n()
  const rootRef = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      if (!rootRef.current) return
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduceMotion) return

      gsap.from('[data-about-card]', {
        y: 26,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
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
    <section id="about" ref={rootRef} className="section-wrap">
      <p className="eyebrow">{t.about.eyebrow}</p>
      <h2 className="section-title mt-4 max-w-3xl text-3xl md:text-5xl">{t.about.title}</h2>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {t.about.cards.map((card) => (
          <article key={card.title} data-about-card className="rounded-3xl border border-slate-700/50 bg-slate-900/45 p-6 backdrop-blur-sm">
            <span className="icon-outlined text-3xl text-blue-300">{card.icon}</span>
            <h3 className="mt-4 text-xl font-semibold">{card.title}</h3>
            <p className="mt-3 text-sm text-slate-300">{card.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
