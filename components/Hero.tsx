"use client"

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { useGSAP } from '@gsap/react'
import { useI18n } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

// Elliptical orbital arc viewed in 3D perspective:
// The rocket starts at center-bottom (far side of orbit, small),
// sweeps wide right (near-side, largest), then arcs to upper-left (far again, small).
// This cubic bezier creates the foreshortened ellipse a viewer on the ground would see.
function buildOrbitPath() {
  return 'M 50 96 C 88 82, 84 18, 16 5'
}

// Realistic aerospace rocket — metallic cylindrical shading, no cartoon colors,
// blue-white plasma exhaust instead of orange cartoon flame.
function RocketSVG() {
  return (
    <svg
      viewBox="0 0 68 240"
      className="h-28 w-auto sm:h-32 md:h-36 lg:h-40"
      style={{ filter: 'drop-shadow(0 0 18px rgba(160,200,240,0.28))' }}
      aria-hidden="true"
    >
      <defs>
        {/* Metallic cylinder shading (left→right): dark rim → bright center highlight → dark rim */}
        <linearGradient id="rkCyl" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#14202e" />
          <stop offset="16%" stopColor="#606e80" />
          <stop offset="36%" stopColor="#bec6d0" />
          <stop offset="50%" stopColor="#e0e6ee" />
          <stop offset="66%" stopColor="#8290a4" />
          <stop offset="84%" stopColor="#38465a" />
          <stop offset="100%" stopColor="#14202e" />
        </linearGradient>
        {/* Nose cone — same cylindrical illusion but slightly cooler */}
        <linearGradient id="rkNose" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#14202e" />
          <stop offset="20%" stopColor="#50606e" />
          <stop offset="40%" stopColor="#b0bac6" />
          <stop offset="50%" stopColor="#d4dae4" />
          <stop offset="64%" stopColor="#728094" />
          <stop offset="82%" stopColor="#323e50" />
          <stop offset="100%" stopColor="#14202e" />
        </linearGradient>
        {/* Fins — angled away from light, darker */}
        <linearGradient id="rkFin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2e3a4c" />
          <stop offset="100%" stopColor="#0e1620" />
        </linearGradient>
        {/* Nozzle bell interior — very dark with center glint */}
        <linearGradient id="rkNoz" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#080e16" />
          <stop offset="28%" stopColor="#32404e" />
          <stop offset="50%" stopColor="#526070" />
          <stop offset="72%" stopColor="#32404e" />
          <stop offset="100%" stopColor="#080e16" />
        </linearGradient>
        {/* Engine plasma — cold blue-white, realistic LOX engine exhaust */}
        <radialGradient id="rkPlasma" cx="50%" cy="5%" r="90%" fx="50%" fy="3%">
          <stop offset="0%" stopColor="#eef6ff" />
          <stop offset="22%" stopColor="#b8d8ff" />
          <stop offset="58%" stopColor="#5488b8" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#183858" stopOpacity="0" />
        </radialGradient>
        {/* Outer exhaust shock cone */}
        <radialGradient id="rkExhaust" cx="50%" cy="4%" r="92%">
          <stop offset="0%" stopColor="#88b4e4" stopOpacity="0.72" />
          <stop offset="48%" stopColor="#3864a0" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#0e2040" stopOpacity="0" />
        </radialGradient>
        {/* Glow filter for mach-diamond core */}
        <filter id="rkGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2.8" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* ─── NOSE CONE (ogive profile) ─── */}
      <path
        d="M34 5 C32 16, 25 40, 23 66 L45 66 C43 40, 36 16, 34 5 Z"
        fill="url(#rkCyl)"
      />
      {/* Specular gleam on lit side of cone */}
      <line x1="30" y1="16" x2="27" y2="40" stroke="#dce4ee" strokeWidth="1.4" strokeOpacity="0.42" strokeLinecap="round" />

      {/* ─── MAIN BODY ─── */}
      <rect x="23" y="66" width="22" height="110" fill="url(#rkCyl)" />

      {/* Horizontal tank bulkhead lines */}
      <line x1="23" y1="94" x2="45" y2="94" stroke="#6a7a8c" strokeWidth="0.9" strokeOpacity="0.55" />
      <line x1="23" y1="124" x2="45" y2="124" stroke="#5a6a7c" strokeWidth="0.8" strokeOpacity="0.45" />
      <line x1="23" y1="152" x2="45" y2="152" stroke="#5a6a7c" strokeWidth="0.8" strokeOpacity="0.40" />

      {/* Subtle vertical weld seam */}
      <line x1="27.5" y1="66" x2="27.5" y2="176" stroke="#606e82" strokeWidth="0.55" strokeOpacity="0.32" />

      {/* ─── PORTHOLE / SENSOR ─── */}
      <circle cx="34" cy="112" r="7" fill="#060c14" stroke="#48586a" strokeWidth="1.3" />
      <circle cx="34" cy="112" r="5" fill="#0a1220" />
      {/* Window reflection glint */}
      <ellipse cx="31.5" cy="109" rx="1.8" ry="1.1" fill="#9aa6bc" opacity="0.58" transform="rotate(-22,31.5,109)" />

      {/* ─── ENGINE SKIRT (slight taper) ─── */}
      <path d="M23 176 L21 192 L47 192 L45 176 Z" fill="url(#rkCyl)" />

      {/* ─── DELTA FINS ─── */}
      <path d="M23 152 L4 196 L23 187 Z" fill="url(#rkFin)" />
      <path d="M45 152 L64 196 L45 187 Z" fill="url(#rkFin)" />

      {/* ─── NOZZLE BELL ─── */}
      {/* Bell flares from ~20 wide at throat to ~32 wide at exit plane */}
      <path d="M24 192 Q21 200, 18 214 L50 214 Q47 200, 44 192 Z" fill="url(#rkNoz)" />
      {/* Throat ring */}
      <ellipse cx="34" cy="192" rx="10.5" ry="2.5" fill="#181e2a" stroke="#3a4a5e" strokeWidth="0.9" />
      {/* Exit rim (dimly glowing hot metal) */}
      <ellipse cx="34" cy="214" rx="16" ry="3.2" fill="#06080e" stroke="#304a68" strokeWidth="1.1" />

      {/* ─── ENGINE PLUME (blue-white plasma, not orange cartoon) ─── */}
      {/* Outer exhaust shock structure */}
      <ellipse cx="34" cy="236" rx="16" ry="24" fill="url(#rkExhaust)">
        <animate attributeName="ry" values="24;18;24" dur="0.42s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.6;1" dur="0.42s" repeatCount="indefinite" />
      </ellipse>
      {/* Core plasma column */}
      <ellipse cx="34" cy="232" rx="7.5" ry="18" fill="url(#rkPlasma)" filter="url(#rkGlow)">
        <animate attributeName="ry" values="18;13;18" dur="0.30s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.55;1" dur="0.30s" repeatCount="indefinite" />
      </ellipse>
      {/* Mach diamond — central bright spot at nozzle exit */}
      <ellipse cx="34" cy="220" rx="3.2" ry="5.5" fill="#e8f4ff" filter="url(#rkGlow)" opacity="0.92">
        <animate attributeName="ry" values="5.5;3.2;5.5" dur="0.22s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.92;0.38;0.92" dur="0.22s" repeatCount="indefinite" />
      </ellipse>
    </svg>
  )
}

export default function Hero() {
  const { t } = useI18n()
  const trailPathD = buildOrbitPath()
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

        // Rocket scale+opacity driven entirely by onUpdate for orbital depth effect
        gsap.set(rocketRef.current, { opacity: 0, scale: 0.15 })

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
          // Pre-compute screen-space scale ratios. The trail SVG uses preserveAspectRatio="none",
          // so SVG user-space units are stretched differently in X and Y.
          // We must compensate to get the correct screen-space tangent angle.
          const svgEl = pathEl.ownerSVGElement
          const svgRect = svgEl?.getBoundingClientRect()
          const vb = svgEl?.viewBox?.baseVal
          const screenScaleX = svgRect && vb && vb.width ? svgRect.width / vb.width : window.innerWidth / 100
          const screenScaleY = svgRect && vb && vb.height ? svgRect.height / vb.height : window.innerHeight / 100
          // Rocket nozzle exit is at y=214 in a 240-unit viewBox; alignOrigin is at 0.6.
          // The trail tip must end at the nozzle, which is (214/240 - 0.6) of rocket height BEHIND the anchor.
          const nozzleAnchorFrac = 214 / 240 - 0.6 // ≈ 0.292
          const rocketSvgEl = rocketRef.current?.querySelector('svg')
          const rocketBasePx = rocketSvgEl
            ? parseFloat(window.getComputedStyle(rocketSvgEl).height) || 160
            : 160

          tl.to(proxy, {
            progress: 1,
            duration: 0.74,
            ease: 'none',
            onUpdate() {
              const v = proxy.progress
              const curLen = Math.max(0, Math.min(len, len * v))
              const step = Math.max(1, len * 0.015)
              // Sample forward; near the path end, sample backward to avoid atan2(0,0)
              const aheadLen = Math.min(len, curLen + step)
              const behindLen = Math.max(0, aheadLen - step)
              const p = pathEl.getPointAtLength(behindLen)
              const a = pathEl.getPointAtLength(aheadLen)
              // Correct angle for non-uniform SVG scaling (preserveAspectRatio="none")
              const dx = (a.x - p.x) * screenScaleX
              const dy = (a.y - p.y) * screenScaleY
              const angle = (Math.atan2(dy, dx) * 180) / Math.PI
              const rotation = angle + 90
              // Orbital perspective: scale small→large→small as rocket orbits the near-side
              const sinV = Math.sin(v * Math.PI)
              const scale = 0.15 + 0.85 * sinV
              // Dynamic lag: pixel distance from anchor to nozzle / pixels-per-path-unit at this position
              const nozzleOffsetPx = nozzleAnchorFrac * rocketBasePx * scale
              const pxPerPathUnit = Math.sqrt(dx * dx + dy * dy) / step
              const lag = pxPerPathUnit > 0.001 ? nozzleOffsetPx / pxPerPathUnit : 0
              // Trail tip ends exactly at the rocket nozzle
              const offset = Math.min(len, Math.max(0, len * (1 - v) + lag))
              pathEl.style.strokeDashoffset = String(offset)
              // Smooth opacity fade-in/out at path start and end
              const opacity = Math.min(1, v * 14) * Math.min(1, (1 - v) * 30)
              gsap.set(rocketRef.current, { scale, opacity, rotation, transformOrigin: '50% 50%' })
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

        // Rocket scale+opacity driven entirely by onUpdate for orbital depth effect
        gsap.set(rocketRef.current, { opacity: 0, scale: 0.15 })

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
          const svgEl = pathEl.ownerSVGElement
          const svgRect = svgEl?.getBoundingClientRect()
          const vb = svgEl?.viewBox?.baseVal
          const screenScaleX = svgRect && vb && vb.width ? svgRect.width / vb.width : window.innerWidth / 100
          const screenScaleY = svgRect && vb && vb.height ? svgRect.height / vb.height : window.innerHeight / 100
          const nozzleAnchorFrac = 214 / 240 - 0.6
          const rocketSvgEl = rocketRef.current?.querySelector('svg')
          const rocketBasePx = rocketSvgEl
            ? parseFloat(window.getComputedStyle(rocketSvgEl).height) || 160
            : 160

          tl.to(proxy, {
            progress: 1,
            duration: 0.74,
            ease: 'none',
            onUpdate() {
              const v = proxy.progress
              const curLen = Math.max(0, Math.min(len, len * v))
              const step = Math.max(1, len * 0.015)
              const aheadLen = Math.min(len, curLen + step)
              const behindLen = Math.max(0, aheadLen - step)
              const p = pathEl.getPointAtLength(behindLen)
              const a = pathEl.getPointAtLength(aheadLen)
              const dx = (a.x - p.x) * screenScaleX
              const dy = (a.y - p.y) * screenScaleY
              const angle = (Math.atan2(dy, dx) * 180) / Math.PI
              const rotation = angle + 90
              const sinV = Math.sin(v * Math.PI)
              const scale = 0.15 + 0.85 * sinV
              const nozzleOffsetPx = nozzleAnchorFrac * rocketBasePx * scale
              const pxPerPathUnit = Math.sqrt(dx * dx + dy * dy) / step
              const lag = pxPerPathUnit > 0.001 ? nozzleOffsetPx / pxPerPathUnit : 0
              const offset = Math.min(len, Math.max(0, len * (1 - v) + lag))
              pathEl.style.strokeDashoffset = String(offset)
              const opacity = Math.min(1, v * 14) * Math.min(1, (1 - v) * 30)
              gsap.set(rocketRef.current, { scale, opacity, rotation, transformOrigin: '50% 50%' })
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

      <svg
        className="hero-trail-svg pointer-events-none absolute inset-0 z-10"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          {/* Trail gradient follows orbital arc: from bottom-center swinging right, to upper-left */}
          <linearGradient id="trailGradient" x1="55%" y1="95%" x2="18%" y2="5%">
            <stop offset="0%" stopColor="rgba(176,196,216,0)" />
            <stop offset="20%" stopColor="rgba(176,196,216,0.55)" />
            <stop offset="55%" stopColor="rgba(200,214,228,0.32)" />
            <stop offset="100%" stopColor="rgba(176,196,216,0.04)" />
          </linearGradient>
        </defs>
        <path
          ref={trailRef}
          className="hero-trail-path"
          d={trailPathD}
          stroke="url(#trailGradient)"
          fill="none"
          strokeWidth="0.65"
          strokeLinecap="round"
        />
      </svg>

      <div
        ref={rocketRef}
        className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
        style={{ opacity: 0 }}
      >
        <RocketSVG />
      </div>

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
