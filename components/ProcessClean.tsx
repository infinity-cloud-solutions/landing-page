'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useI18n } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const icons = ['search', 'design_services', 'rocket_launch', 'trending_up'] as const

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
            start: 'top 75%',
            end: 'bottom 65%',
            scrub: true,
          },
        })
      }

      gsap.from('[data-step-card]', {
        y: 22,
        opacity: 0,
        duration: 0.55,
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
    <section id="process" ref={rootRef} className="section-wrap">
      <p className="eyebrow">{t.process.eyebrow}</p>
      <h2 className="section-title mt-4 max-w-3xl text-3xl md:text-5xl">{t.process.title}</h2>

      <div className="relative mt-12">
        <svg className="pointer-events-none absolute left-0 right-0 top-10 hidden h-8 w-full md:block" viewBox="0 0 1200 120" fill="none">
          <path
            data-process-line
            d="M40 60 C 260 60, 300 20, 520 20 C 740 20, 780 100, 1020 100 C 1080 100, 1120 80, 1160 70"
            stroke="url(#process-gradient)"
            strokeWidth={6}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="process-gradient" x1="40" x2="1160" y1="0" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3B82F6" />
              <stop offset="1" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>

        <div className="grid gap-5 md:grid-cols-4">
          {t.process.steps.map((step, index) => (
            <article key={step.title} data-step-card className="relative rounded-3xl border border-slate-700/50 bg-slate-900/45 p-6">
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border-4 border-blue-500 text-sm font-bold text-slate-100">
                  {index + 1}
                </span>
                <span className="icon-outlined text-violet-300">{icons[index]}</span>
              </div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
