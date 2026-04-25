"use client"

import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useI18n } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger)

type Metric = {
  label: string
  value: number
  suffix: string
}

// ── MetricItem — counting number, no card wrapper ─────────────────────────

function MetricItem({ metric, index }: { metric: Metric; index: number }) {
  const itemRef = useRef<HTMLDivElement>(null)
  const [display, setDisplay] = useState(0)

  useGSAP(
    () => {
      if (!itemRef.current) return
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduceMotion) {
        setDisplay(metric.value)
        gsap.set(itemRef.current, { opacity: 1 })
        return
      }

      gsap.set(itemRef.current, { opacity: 0, y: 20 })

      const counter = { value: 0 }
      gsap.to(counter, {
        value: metric.value,
        duration: 1.4,
        ease: 'power2.out',
        onUpdate: () => setDisplay(Math.round(counter.value)),
        scrollTrigger: { trigger: itemRef.current, start: 'top 84%', once: true },
      })

      gsap.to(itemRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: 'power2.out',
        scrollTrigger: { trigger: itemRef.current, start: 'top 84%', once: true },
      })
    },
    { scope: itemRef, dependencies: [metric.value] }
  )

  const isGold = index % 2 === 0

  return (
    <div
      ref={itemRef}
      className="flex flex-1 basis-1/2 flex-col items-center py-8 px-4 sm:basis-auto"
    >
      <span
        className="metric-value text-5xl md:text-6xl lg:text-7xl"
        style={{ color: isGold ? 'var(--accent-gold)' : 'var(--accent-teal)' }}
      >
        {display}
        {metric.suffix}
      </span>
      <p
        className="mt-3 text-center text-sm leading-relaxed"
        style={{ color: 'var(--text-muted)', maxWidth: '16ch' }}
      >
        {metric.label}
      </p>
    </div>
  )
}

// ── MetricBar — full-width horizontal strip ────────────────────────────────

function MetricBar({ metrics }: { metrics: readonly Metric[] }) {
  return (
    <div
      className="mt-12 flex flex-wrap sm:flex-nowrap w-full"
      style={{
        borderTop: '1px solid var(--stroke)',
        borderBottom: '1px solid var(--stroke)',
      }}
    >
      {metrics.flatMap((metric, index) => {
        const item = <MetricItem key={metric.label} metric={metric} index={index} />
        if (index === 0) return [item]
        return [
          <div
            key={`div-${index}`}
            className="hidden sm:block w-px self-stretch my-3"
            style={{ background: 'var(--stroke)' }}
          />,
          item,
        ]
      })}
    </div>
  )
}

// ── CaseStudyCard — challenge → result, no named attribution ──────────────

type Testimonial = {
  quote?: string
  author?: string
  role?: string
  challengeLabel: string
  resultLabel: string
  challenge: string
  outcome: string
  duration: string
  attribution: string
  caseStudyLabel?: string
}

function CaseStudyCard({ data, label }: { data: Testimonial; label: string }) {
  return (
    <div data-case-study className="cosmic-card mt-12 rounded-2xl overflow-hidden">
      {/* Header strip */}
      <div
        className="flex items-center justify-between px-7 py-3.5"
        style={{ borderBottom: '1px solid var(--stroke)' }}
      >
        <p className="eyebrow">{label}</p>
        <div className="flex items-center gap-1.5">
          <span
            className="icon-outlined"
            style={{ color: 'var(--accent-gold)', fontSize: '16px' }}
          >
            schedule
          </span>
          <span
            className="font-display font-bold text-xs uppercase tracking-widest"
            style={{ color: 'var(--accent-gold)' }}
          >
            {data.duration}
          </span>
        </div>
      </div>

      {/* Quote */}
      {data.quote && (
        <div
          className="px-7 py-6"
          style={{ borderBottom: '1px solid var(--stroke)' }}
        >
          <p
            className="text-base md:text-lg leading-relaxed italic"
            style={{ color: 'var(--text-primary)', opacity: 0.9 }}
          >
            &ldquo;{data.quote}&rdquo;
          </p>
        </div>
      )}

      {/* Two-column body */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Challenge */}
        <div
          className="px-7 py-8"
          style={{ borderBottom: '1px solid var(--stroke)' }}
        >
          <p
            className="eyebrow mb-4"
            style={{ color: 'var(--error-text)' }}
          >
            {data.challengeLabel}
          </p>
          <p
            className="text-base leading-relaxed"
            style={{ color: 'var(--text-muted)', maxWidth: '42ch' }}
          >
            {data.challenge}
          </p>
        </div>

        {/* Result */}
        <div
          className="px-7 py-8 md:border-l"
          style={{
            borderColor: 'var(--stroke)',
            borderBottom: '1px solid var(--stroke)',
          }}
        >
          <p className="eyebrow mb-4">{data.resultLabel}</p>
          <p
            className="text-base leading-relaxed"
            style={{ color: 'var(--text-primary)', maxWidth: '42ch' }}
          >
            {data.outcome}
          </p>
        </div>
      </div>

      {/* Attribution */}
      <div className="flex items-center gap-3 px-7 py-4">
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold"
          style={{ background: 'oklch(74% 0.15 58 / 0.15)', color: 'var(--accent-gold)' }}
        >
          {data.author ? data.author.charAt(0) : ''}
        </div>
        <div>
          {data.author && (
            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              {data.author}
            </p>
          )}
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {data.attribution}
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Results ───────────────────────────────────────────────────────────────

export function Results() {
  const { t } = useI18n()
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!rootRef.current) return
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduceMotion) return

      gsap.from('[data-case-study]', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '[data-case-study]',
          start: 'top 82%',
          once: true,
        },
      })
    },
    { scope: rootRef }
  )

  return (
    <section
      id="results"
      ref={rootRef}
      style={{
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--stroke)',
        borderBottom: '1px solid var(--stroke)',
      }}
    >
      <div className="section-wrap">
        <p className="eyebrow">{t.results.eyebrow}</p>
        <h2 className="section-title mt-4 max-w-3xl text-3xl md:text-5xl">
          {t.results.title}
        </h2>

        <MetricBar metrics={t.results.metrics} />

        {t.results.testimonial && (
          <CaseStudyCard
            data={t.results.testimonial}
            label={t.results.caseStudyLabel}
          />
        )}
      </div>
    </section>
  )
}
