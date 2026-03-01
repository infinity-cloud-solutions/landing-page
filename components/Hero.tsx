"use client"

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { useGSAP } from '@gsap/react'
import { useI18n } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

const ORBIT_CURVE_X = 7
const CURVE_START_DISTANCE_PROGRESS = 0.6

function easeSineInOut(value: number) {
  return 0.5 - Math.cos(Math.PI * value) / 2
}

function buildTrailPath(curveX: number) {
  const points: string[] = ['M50 100']
  const segments = 24

  for (let index = 1; index <= segments; index += 1) {
    const timeProgress = index / segments
    const yProgress = timeProgress * timeProgress
    const y = 100 - yProgress * 100

    let x = 50
    if (yProgress > CURVE_START_DISTANCE_PROGRESS) {
      const localProgress =
        (yProgress - CURVE_START_DISTANCE_PROGRESS) / (1 - CURVE_START_DISTANCE_PROGRESS)
      const eased = easeSineInOut(localProgress)
      x = 50 + curveX * eased
    }

    points.push(`L${x.toFixed(2)} ${y.toFixed(2)}`)
  }

  return points.join(' ')
}

function RocketSVG() {
  return (
    <svg
      viewBox="0 0 120 260"
      className="h-28 w-auto sm:h-36 md:h-44 lg:h-52 drop-shadow-[0_0_42px_rgba(59,130,246,0.45)]"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="rocketNose" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
        <linearGradient id="rocketBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="45%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <linearGradient id="rocketShadow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0f172a" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0.48" />
        </linearGradient>
        <linearGradient id="rocketFin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <radialGradient id="rocketPort" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#dbeafe" />
          <stop offset="45%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </radialGradient>
        <linearGradient id="rocketNozzle" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="flameOuter" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="flameMid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="flameCore" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fefce8" />
          <stop offset="100%" stopColor="#fde68a" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path d="M60 16L73 42H47L60 16Z" fill="url(#rocketNose)" stroke="#cbd5e1" strokeWidth="1.5" />

      <path
        d="M47 42C47 42 39 62 39 104V178C39 191 48 203 60 203C72 203 81 191 81 178V104C81 62 73 42 73 42H47Z"
        fill="url(#rocketBody)"
        stroke="#cbd5e1"
        strokeWidth="1.5"
      />

      <path
        d="M60 42C60 42 64 68 64 103V178C64 189 62 199 60 203C73 203 81 191 81 178V104C81 62 73 42 73 42H60Z"
        fill="url(#rocketShadow)"
        opacity="0.7"
      />

      <path d="M52 66H68" stroke="#e2e8f0" strokeWidth="1" opacity="0.75" />
      <path d="M50 88H70" stroke="#e2e8f0" strokeWidth="1" opacity="0.45" />
      <path d="M49 112H71" stroke="#e2e8f0" strokeWidth="1" opacity="0.45" />
      <path d="M49 136H71" stroke="#e2e8f0" strokeWidth="1" opacity="0.35" />

      <circle cx="60" cy="108" r="16" fill="#1e293b" stroke="#93c5fd" strokeWidth="1.8" />
      <circle cx="60" cy="108" r="12.5" fill="url(#rocketPort)" stroke="#bfdbfe" strokeWidth="1.2" />
      <circle cx="56.5" cy="104" r="3.2" fill="#ffffff" opacity="0.55" />

      <path d="M39 149L19 190L39 182Z" fill="url(#rocketFin)" stroke="#93c5fd" strokeWidth="1" />
      <path d="M81 149L101 190L81 182Z" fill="url(#rocketFin)" stroke="#93c5fd" strokeWidth="1" />
      <path d="M53 185L60 203L67 185Z" fill="#2563eb" stroke="#93c5fd" strokeWidth="1" />

      <path d="M49 203H71L67 219H53L49 203Z" fill="url(#rocketNozzle)" stroke="#475569" strokeWidth="1.2" />
      <ellipse cx="60" cy="217" rx="11" ry="4" fill="#0f172a" opacity="0.7" />

      <ellipse cx="60" cy="234" rx="17" ry="27" fill="url(#flameOuter)" opacity="0.85">
        <animate attributeName="ry" values="27;21;27" dur="0.18s" repeatCount="indefinite" />
        <animate attributeName="rx" values="17;13;17" dur="0.22s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="60" cy="230" rx="10" ry="19" fill="url(#flameMid)" opacity="0.9">
        <animate attributeName="ry" values="19;14;19" dur="0.14s" repeatCount="indefinite" />
        <animate attributeName="rx" values="10;7;10" dur="0.18s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="60" cy="226" rx="5.5" ry="12" fill="url(#flameCore)" opacity="0.95">
        <animate attributeName="ry" values="12;9;12" dur="0.12s" repeatCount="indefinite" />
      </ellipse>

      <circle cx="52" cy="248" r="1.3" fill="#fb923c" opacity="0.55">
        <animate attributeName="cy" values="248;258;248" dur="0.22s" repeatCount="indefinite" />
      </circle>
      <circle cx="60" cy="252" r="1.1" fill="#facc15" opacity="0.65">
        <animate attributeName="cy" values="252;260;252" dur="0.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="68" cy="247" r="1.2" fill="#fb923c" opacity="0.48">
        <animate attributeName="cy" values="247;257;247" dur="0.24s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

export default function Hero() {
  const { t } = useI18n()
  const trailPathD = buildTrailPath(ORBIT_CURVE_X)
  const sectionRef = useRef<HTMLElement>(null)
  const rocketRef = useRef<HTMLDivElement>(null)
  const revealRef = useRef<HTMLSpanElement>(null)
  const trailRef = useRef<SVGPathElement>(null)
  const cloudLeftRef = useRef<HTMLDivElement>(null)
  const cloudRightRef = useRef<HTMLDivElement>(null)
  const cloudCenterRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (reduceMotion) {
        gsap.set(revealRef.current, { opacity: 1, y: 0 })
        gsap.set(ctaRef.current, { opacity: 1, y: 0 })
        gsap.set(sectionRef.current.querySelector('[data-hero-badge]'), { opacity: 1 })
        gsap.set(sectionRef.current.querySelector('[data-hero-title-top]'), { opacity: 1 })
        gsap.set([cloudLeftRef.current, cloudRightRef.current, cloudCenterRef.current], {
          opacity: 0,
        })
        gsap.set([rocketRef.current, trailRef.current], { opacity: 0 })
        return
      }

      const section = sectionRef.current
      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        const curveX = ORBIT_CURVE_X
        const curveStart = 0.61

        gsap.fromTo(
          section.querySelector('[data-hero-badge]'),
          { opacity: 0, y: -14, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out', delay: 0.08 }
        )

        gsap.fromTo(
          section.querySelector('[data-hero-title-top]'),
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
        )

        gsap.fromTo(
          scrollHintRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, delay: 1.2, ease: 'power2.out' }
        )

        if (trailRef.current) {
          const pathEl = trailRef.current
          const pathLength = pathEl.getTotalLength()
          pathEl.style.strokeDasharray = String(pathLength)
          pathEl.style.strokeDashoffset = String(pathLength)
          pathEl.style.transition = 'none'
          gsap.set(pathEl, { opacity: 0.82 })
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=250%',
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
          },
        })

        tl.to(scrollHintRef.current, { opacity: 0, duration: 0.05 }, 0)

        tl.fromTo(
          rocketRef.current,
          { rotation: 0, opacity: 0, scale: 0.6 },
          { rotation: 0, opacity: 1, scale: 1, duration: 0.35, ease: 'none' },
          0
        )

        tl.to(trailRef.current, { opacity: 0.82, duration: 0.12, ease: 'none' }, 0)

        tl.to(cloudLeftRef.current, { x: '-120%', opacity: 0, duration: 0.25, ease: 'power2.in' }, 0.15)
        tl.to(cloudRightRef.current, { x: '120%', opacity: 0, duration: 0.25, ease: 'power2.in' }, 0.15)
        tl.to(cloudCenterRef.current, { opacity: 0, scale: 1.4, duration: 0.2, ease: 'power2.in' }, 0.2)

        tl.fromTo(
          revealRef.current,
          { opacity: 0, y: 30, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.18, ease: 'power2.out' },
          0.3
        )

        if (trailRef.current && rocketRef.current) {
          tl.to(
            rocketRef.current!,
            {
              motionPath: {
                path: trailRef.current!,
                align: trailRef.current!,
                alignOrigin: [0.5, 0.6],
                autoRotate: false,
              },
              duration: 0.74,
              ease: 'none',
            },
            0
          )
        }

        if (trailRef.current) {
          const pathEl = trailRef.current
          const len = pathEl.getTotalLength()
          const proxy = { progress: 0 }
          const lead = len * 0.06
          const maxTilt = 45 // degrees to lean when curve starts

          tl.to(proxy, {
            progress: 1,
            duration: 0.74,
            ease: 'none',
            onUpdate() {
              const v = proxy.progress
              const offset = Math.max(0, len * (1 - v) - lead)
              pathEl.style.strokeDashoffset = String(offset)

              if (rocketRef.current) {
                let rot = 0
                if (v > curveStart) {
                  const local = (v - curveStart) / (1 - curveStart)
                  rot = Math.min(maxTilt, local * maxTilt)
                }
                gsap.set(rocketRef.current, { rotation: rot, transformOrigin: '50% 50%' })
              }
            },
          }, 0)

          tl.to(pathEl, { opacity: 0, duration: 0.12 }, 0.74)
        } else {
          tl.to(trailRef.current, { opacity: 0, duration: 0.12 }, 0.74)
        }

        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' },
          0.55
        )
      })

      mm.add('(max-width: 767px)', () => {
        const curveX = ORBIT_CURVE_X
        const curveStart = 0.61

        gsap.fromTo(
          section.querySelector('[data-hero-badge]'),
          { opacity: 0, y: -14, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out', delay: 0.08 }
        )

        gsap.fromTo(
          section.querySelector('[data-hero-title-top]'),
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
        )

        gsap.fromTo(
          scrollHintRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, delay: 1.2, ease: 'power2.out' }
        )

        if (trailRef.current) {
          const pathEl = trailRef.current
          const pathLength = pathEl.getTotalLength()
          pathEl.style.strokeDasharray = String(pathLength)
          pathEl.style.strokeDashoffset = String(pathLength)
          pathEl.style.transition = 'none'
          gsap.set(pathEl, { opacity: 0.82 })
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=250%',
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
          },
        })

        tl.to(scrollHintRef.current, { opacity: 0, duration: 0.05 }, 0)

        tl.fromTo(
          rocketRef.current,
          { rotation: 0, opacity: 0, scale: 0.62 },
          { rotation: 0, opacity: 1, scale: 1, duration: 0.35, ease: 'none' },
          0
        )

        tl.to(trailRef.current, { opacity: 0.82, duration: 0.12, ease: 'none' }, 0)

        tl.to(cloudLeftRef.current, { x: '-120%', opacity: 0, duration: 0.25, ease: 'power2.in' }, 0.15)
        tl.to(cloudRightRef.current, { x: '120%', opacity: 0, duration: 0.25, ease: 'power2.in' }, 0.15)
        tl.to(cloudCenterRef.current, { opacity: 0, scale: 1.4, duration: 0.2, ease: 'power2.in' }, 0.2)

        tl.fromTo(
          revealRef.current,
          { opacity: 0, y: 30, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.18, ease: 'power2.out' },
          0.3
        )

        if (trailRef.current && rocketRef.current) {
          tl.to(
            rocketRef.current!,
            {
              motionPath: {
                path: trailRef.current!,
                align: trailRef.current!,
                alignOrigin: [0.5, 0.6],
                autoRotate: false,
              },
              duration: 0.74,
              ease: 'none',
            },
            0
          )
        }

        if (trailRef.current) {
          const pathEl = trailRef.current
          const len = pathEl.getTotalLength()
          const proxy = { progress: 0 }
          const lead = len * 0.06
          const maxTilt = 8 // degrees for mobile
          tl.to(proxy, {
            progress: 1,
            duration: 0.74,
            ease: 'none',
            onUpdate() {
              const v = proxy.progress
              const offset = Math.max(0, len * (1 - v) - lead)
              pathEl.style.strokeDashoffset = String(offset)

              if (rocketRef.current) {
                let rot = 0
                if (v > curveStart) {
                  const local = (v - curveStart) / (1 - curveStart)
                  rot = Math.min(maxTilt, local * maxTilt)
                }
                gsap.set(rocketRef.current, { rotation: rot, transformOrigin: '50% 50%' })
              }
            },
          }, 0)

          tl.to(pathEl, { opacity: 0, duration: 0.12 }, 0.74)
        } else {
          tl.to(trailRef.current, { opacity: 0, duration: 0.12 }, 0.74)
        }

        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' },
          0.55
        )
      })

      return () => {
        mm.revert()
      }
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className="hero-section relative h-screen w-full overflow-hidden">
      <div className="hero-cosmos absolute inset-0 -z-30" aria-hidden="true">
        <div className="hero-cosmos__nebula hero-cosmos__nebula--one" />
        <div className="hero-cosmos__nebula hero-cosmos__nebula--two" />
        <div className="hero-cosmos__nebula hero-cosmos__nebula--three" />
        <div className="hero-cosmos__stars hero-cosmos__stars--dim" />
        <div className="hero-cosmos__stars hero-cosmos__stars--bright" />
        <div className="hero-cosmos__haze" />
        <div className="hero-cosmos__grain" />
      </div>

      <div ref={cloudLeftRef} className="hero-cloud hero-cloud--left" />
      <div ref={cloudRightRef} className="hero-cloud hero-cloud--right" />
      <div ref={cloudCenterRef} className="hero-cloud hero-cloud--center" />

      <div className="relative z-20 flex h-full flex-col items-center justify-start pt-[19vh] px-4">
        <div
          data-hero-badge
          className="mb-7 flex justify-center"
          style={{ opacity: 0 }}
        >
          <span className="hero-badge">
            <span className="hero-badge__dot" />
            {t.hero.badge}
          </span>
        </div>

        <h1 className="text-center" style={{ lineHeight: 1.05 }}>
          <span
            data-hero-title-top
            className="hero-title-gradient block font-display text-5xl font-black tracking-tighter sm:text-6xl md:text-8xl lg:text-9xl"
            style={{ opacity: 0 }}
          >
            {t.hero.titleTop}
          </span>

          <span
            ref={revealRef}
            className="hero-reveal-text mt-2 block font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-6xl lg:text-7xl"
            style={{ opacity: 0 }}
          >
            <span className="gradient-text drop-shadow-[0_2px_24px_rgba(59,130,246,0.45)]">{t.hero.titleReveal}</span>
          </span>
        </h1>

        <div ref={ctaRef} className="mt-10 flex flex-col items-center gap-5" style={{ opacity: 0 }}>
          <p className="max-w-xl text-center text-base text-slate-100/90 md:text-lg">{t.hero.subtitle}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#contact"
              className="gradient-button rounded-full px-7 py-3.5 text-sm font-semibold shadow-lg shadow-blue-900/30 transition hover:shadow-xl hover:shadow-blue-800/40"
            >
              {t.hero.primaryCta}
            </a>
            <a
              href="#services"
              className="rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              {t.hero.secondaryCta}
            </a>
          </div>
        </div>
      </div>

      <div
        ref={rocketRef}
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
        style={{ opacity: 0 }}
      >
        <RocketSVG />
      </div>

      <svg
        className="hero-trail-svg pointer-events-none absolute inset-0 z-[15]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="trailGradient" x1="50%" y1="100%" x2="80%" y2="0%">
            <stop offset="0%" stopColor="rgba(59,130,246,0)" />
            <stop offset="28%" stopColor="rgba(59,130,246,0.48)" />
            <stop offset="58%" stopColor="rgba(139,92,246,0.36)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0.08)" />
          </linearGradient>
        </defs>
        <path
          ref={trailRef}
          className="hero-trail-path"
          d={trailPathD}
          stroke="url(#trailGradient)"
          fill="none"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
      </svg>

      <div
        ref={scrollHintRef}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
        style={{ opacity: 0 }}
      >
        <div className="flex animate-bounce flex-col items-center gap-1 text-white/65">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em]">Scroll</span>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M10 4v12m0 0l-4-4m4 4l4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}
