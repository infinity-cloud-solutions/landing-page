"use client"

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useI18n } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function Hero() {
  const { t } = useI18n()
  const rootRef = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      if (!rootRef.current) return
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduceMotion) return

      const introTargets = rootRef.current.querySelectorAll('[data-hero-intro]')

      gsap.fromTo(
        introTargets,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: 'power3.out',
        }
      )

      gsap.to('[data-hero-media]', {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    },
    { scope: rootRef }
  )

  return (
    <section ref={rootRef} className="relative min-h-screen overflow-hidden pt-32">
      <div data-hero-media className="absolute inset-0 -z-20">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-poster.jpg"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950/80 via-slate-950/55 to-[var(--bg-primary)]" />
      <div className="orb orb-blue -left-28 top-20" />
      <div className="orb orb-violet right-[-8rem] top-56" />

      <div className="container pb-20">
        <span
          data-hero-intro
          className="inline-flex rounded-full border border-blue-400/40 bg-slate-900/70 px-4 py-2 text-xs font-semibold tracking-wide text-slate-100"
        >
          {t.hero.badge}
        </span>

        <h1 data-hero-intro className="section-title mt-6 max-w-4xl text-5xl font-extrabold md:text-7xl">
          {t.hero.title.split(' ').map((word, idx) => (
            <span key={`${word}-${idx}`} className={idx >= 1 ? 'gradient-text' : ''}>
              {word}{' '}
            </span>
          ))}
        </h1>

        <p data-hero-intro className="mt-6 max-w-2xl text-lg text-slate-200/90">
          {t.hero.subtitle}
        </p>

        <div data-hero-intro className="mt-9 flex flex-wrap gap-3">
          <a href="#contact" className="gradient-button rounded-full px-6 py-3 text-sm font-semibold shadow-lg shadow-blue-900/30">
            {t.hero.primaryCta}
          </a>
          <a
            href="#services"
            className="rounded-full border border-slate-300/30 bg-slate-950/30 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-900/40"
          >
            {t.hero.secondaryCta}
          </a>
        </div>

        <div data-hero-intro className="mt-10 flex flex-wrap items-center gap-4 text-sm text-slate-200/80">
          <div className="flex -space-x-2">
            <span className="h-8 w-8 rounded-full border border-slate-300/40 bg-blue-500/40" />
            <span className="h-8 w-8 rounded-full border border-slate-300/40 bg-violet-500/40" />
            <span className="h-8 w-8 rounded-full border border-slate-300/40 bg-slate-300/30" />
          </div>
          {t.hero.trust.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
