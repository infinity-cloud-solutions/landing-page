'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useI18n } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const icons = ['smart_toy', 'account_tree', 'insights', 'settings_suggest'] as const

export function Services() {
  const { t } = useI18n()
  const rootRef = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      if (!rootRef.current) return
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduceMotion) return

      gsap.from('[data-service-card]', {
        y: 30,
        opacity: 0,
        duration: 0.65,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 80%',
          once: true,
        },
      })
    },
    { scope: rootRef }
  )

  return (
    <section id="services" ref={rootRef} className="section-wrap">
      <p className="eyebrow">{t.services.eyebrow}</p>
      <h2 className="section-title mt-4 max-w-3xl text-3xl md:text-5xl">{t.services.title}</h2>
      <p className="mt-6 max-w-2xl text-[color:var(--text-muted)]">{t.services.intro}</p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {t.services.items.map((item, index) => (
          <article
            key={item.title}
            data-service-card
            className="group relative overflow-hidden rounded-3xl theme-card p-6"
          >
            <div className="absolute inset-0 rounded-3xl border border-transparent transition group-hover:border-blue-500/60" />
            <span className="icon-outlined text-3xl text-[color:var(--icon-accent)]">{icons[index]}</span>
            <h3 className="mt-5 text-xl font-semibold text-[color:var(--text-primary)]">{item.title}</h3>
            <p className="mt-3 text-sm text-[color:var(--text-muted)]">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
