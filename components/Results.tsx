"use client"

import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useI18n } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type Metric = {
  label: string
  value: number
  suffix: string
}

function MetricCard({ metric }: { metric: Metric }) {
  const countRef = useRef<HTMLSpanElement | null>(null)
  const [display, setDisplay] = useState(0)

  useGSAP(
    () => {
      if (!countRef.current) return
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduceMotion) {
        setDisplay(metric.value)
        return
      }

      const counter = { value: 0 }
      gsap.to(counter, {
        value: metric.value,
        duration: 1.2,
        ease: 'power2.out',
        onUpdate: () => setDisplay(Math.round(counter.value)),
        scrollTrigger: {
          trigger: countRef.current,
          start: 'top 85%',
          once: true,
        },
      })
    },
    { scope: countRef, dependencies: [metric.value] }
  )

  return (
    <article className="rounded-3xl theme-card p-6">
      <span ref={countRef} className="text-4xl font-extrabold text-[color:var(--metric-accent)] md:text-5xl">
        {display}
        {metric.suffix}
      </span>
      <p className="mt-3 text-sm text-[color:var(--text-muted)]">{metric.label}</p>
    </article>
  )
}

export function Results() {
  const { t } = useI18n()

  return (
    <section id="results" className="section-wrap">
      <p className="eyebrow">{t.results.eyebrow}</p>
      <h2 className="section-title mt-4 max-w-3xl text-3xl md:text-5xl">{t.results.title}</h2>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {t.results.metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </div>

      <div className="mt-10 rounded-3xl theme-card p-7">
        <div className="mb-4 flex gap-1 text-[color:var(--star-color)]">
          <span className="icon-outlined">star</span>
          <span className="icon-outlined">star</span>
          <span className="icon-outlined">star</span>
          <span className="icon-outlined">star</span>
          <span className="icon-outlined">star</span>
        </div>
        {t.results.testimonial && (
          <>
            <blockquote className="text-lg text-[color:var(--text-primary)]">"{t.results.testimonial.quote}"</blockquote>
            <p className="mt-4 font-semibold">{t.results.testimonial.author}</p>
            <p className="text-sm text-[color:var(--text-muted)]">{t.results.testimonial.role}</p>
          </>
        )}
      </div>
    </section>
  )
}
