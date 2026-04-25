'use client'

import { useState, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useI18n } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger)

function FAQItem({
  item,
  isOpen,
  onToggle,
}: {
  item: { q: string; a: string }
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <article
      data-faq-item
      className="cosmic-card overflow-hidden rounded-2xl"
      style={{
        borderColor: isOpen ? 'oklch(74% 0.15 58 / 0.4)' : undefined,
        transition: 'border-color 0.3s ease',
      }}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-7 py-6 text-left"
        aria-expanded={isOpen}
      >
        <span
          className="font-semibold text-base"
          style={{ color: 'var(--text-primary)' }}
        >
          {item.q}
        </span>
        <span
          className="icon-outlined shrink-0 text-xl"
          style={{
            color: isOpen ? 'var(--accent-gold)' : 'var(--text-muted)',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease, color 0.3s ease',
            display: 'inline-block',
          }}
          aria-hidden="true"
        >
          add
        </span>
      </button>
      <div
        style={{
          maxHeight: isOpen ? '400px' : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.35s ease',
        }}
      >
        <p
          className="px-7 pb-6 text-sm leading-relaxed"
          style={{ color: 'var(--text-muted)' }}
        >
          {item.a}
        </p>
      </div>
    </article>
  )
}

export function FAQ() {
  const { t } = useI18n()
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const rootRef = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      if (!rootRef.current) return
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduceMotion) return

      gsap.from('[data-faq-item]', {
        y: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
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

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }

  return (
    <section id="faq" ref={rootRef} className="section-wrap">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <p className="eyebrow">{t.faq.eyebrow}</p>
      <h2 className="section-title mt-4 max-w-3xl text-3xl md:text-5xl">
        {t.faq.title}
      </h2>

      <div className="mt-12 grid gap-3 max-w-3xl">
        {t.faq.items.map((item, i) => (
          <FAQItem
            key={item.q}
            item={item}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  )
}
