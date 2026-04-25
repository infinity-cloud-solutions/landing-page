"use client"

import { useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { useGSAP } from '@gsap/react'
import { useI18n } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

function buildOrbitPath() {
  return 'M 50 96 C 88 82, 84 18, 16 5'
}

// ── Starfield canvas ────────────────────────────────────────────────────────

type Star = {
  x: number
  y: number
  size: number
  brightness: number
  layer: number
  twinklePhase: number
  color: string
}

function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const initStars = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      const count = Math.floor((w * h) / 2800)
      starsRef.current = Array.from({ length: count }, () => {
        const layer = Math.floor(Math.random() * 3)
        const roll = Math.random()
        const color =
          roll < 0.72 ? 'rgb(200,220,255)'
          : roll < 0.87 ? 'rgb(240,195,100)'
          : 'rgb(100,220,210)'
        // Atmospheric perspective: nearby stars are larger and brighter
        const size =
          layer === 0 ? Math.random() * 0.45 + 0.15   // far — tiny
          : layer === 1 ? Math.random() * 0.7 + 0.35   // mid
          : Math.random() * 1.3 + 0.7                   // near — large
        const brightness =
          layer === 0 ? Math.random() * 0.22 + 0.1     // far — dim
          : layer === 1 ? Math.random() * 0.28 + 0.28  // mid
          : Math.random() * 0.42 + 0.48                 // near — bright
        return {
          x: Math.random(),
          y: Math.random(),
          size,
          brightness,
          layer,
          twinklePhase: Math.random() * Math.PI * 2,
          color,
        }
      })
    }

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio
      canvas.height = canvas.offsetHeight * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)
      initStars()
    }

    const draw = (timestamp: number) => {
      const elapsed = timestamp - timeRef.current
      if (elapsed < 14) {
        rafRef.current = requestAnimationFrame(draw)
        return
      }
      timeRef.current = timestamp

      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      const parallaxFactors = [0.006, 0.018, 0.042]
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (const star of starsRef.current) {
        const pf = parallaxFactors[star.layer]
        const px = (star.x * w + mx * pf * w + w) % w
        const py = (star.y * h + my * pf * h + h) % h

        let alpha = star.brightness
        if (!reduceMotion) {
          alpha *= 0.65 + 0.35 * Math.sin(timestamp * 0.00045 + star.twinklePhase)
        }

        ctx.globalAlpha = alpha
        ctx.fillStyle = star.color
        ctx.beginPath()
        ctx.arc(px, py, star.size, 0, Math.PI * 2)
        ctx.fill()

        if (star.layer === 2 && star.size > 1.3 && alpha > 0.7) {
          ctx.globalAlpha = alpha * 0.3
          ctx.strokeStyle = star.color
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(px - star.size * 2.5, py)
          ctx.lineTo(px + star.size * 2.5, py)
          ctx.moveTo(px, py - star.size * 2.5)
          ctx.lineTo(px, py + star.size * 2.5)
          ctx.stroke()
        }
      }

      ctx.globalAlpha = 1
      rafRef.current = requestAnimationFrame(draw)
    }

    let canvasRect = canvas.getBoundingClientRect()

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX - canvasRect.left) / canvasRect.width - 0.5,
        y: (e.clientY - canvasRect.top) / canvasRect.height - 0.5,
      }
    }

    resize()
    canvasRect = canvas.getBoundingClientRect()

    const onResize = () => {
      resize()
      canvasRect = canvas.getBoundingClientRect()
    }

    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouseMove)

    if (reduceMotion) {
      // Static draw once
      timeRef.current = 0
      const staticDraw = () => draw(0)
      staticDraw()
    } else {
      rafRef.current = requestAnimationFrame(draw)
    }

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}

// ── Particle trail canvas ────────────────────────────────────────────────────

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  hue: number // 58 = gold, 192 = teal
  bright: number
}

type ParticleCanvasHandle = {
  spawn: (x: number, y: number, dirX: number, dirY: number) => void
}

function ParticleCanvas({ handleRef }: { handleRef: React.RefObject<ParticleCanvasHandle | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio
      canvas.height = canvas.offsetHeight * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)
    }

    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.04
        p.life--

        const progress = p.life / p.maxLife
        const alpha = progress * progress * 0.85
        const r = p.size * progress

        ctx.globalAlpha = alpha
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3)
        gradient.addColorStop(0, `oklch(${p.bright}% 0.16 ${p.hue})`)
        gradient.addColorStop(0.4, `oklch(${p.bright - 8}% 0.14 ${p.hue})`)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(p.x, p.y, r * 3, 0, Math.PI * 2)
        ctx.fill()

        if (p.life <= 0) {
          particlesRef.current.splice(i, 1)
        }
      }

      ctx.globalAlpha = 1
      // Stop the loop when idle — spawn() will restart it
      if (particlesRef.current.length > 0) {
        rafRef.current = requestAnimationFrame(draw)
      } else {
        rafRef.current = 0
      }
    }

    // Expose spawn; keeps draw in the same closure so it can restart the loop
    if (handleRef) {
      ;(handleRef as React.MutableRefObject<ParticleCanvasHandle>).current = {
        spawn(x: number, y: number, dirX: number, dirY: number) {
          const count = 5
          for (let i = 0; i < count; i++) {
            const angle = Math.atan2(dirY, dirX) + Math.PI + (Math.random() - 0.5) * 1.2
            const speed = Math.random() * 1.8 + 0.4
            const isGold = Math.random() > 0.35
            particlesRef.current.push({
              x,
              y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed - 0.3,
              life: Math.floor(Math.random() * 30 + 30),
              maxLife: 60,
              size: Math.random() * 2.2 + 0.8,
              hue: isGold ? 58 : 192,
              bright: isGold ? 80 : 72,
            })
          }
          // Restart the draw loop if it went idle
          if (!rafRef.current) {
            rafRef.current = requestAnimationFrame(draw)
          }
        },
      }
    }

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [handleRef])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 12 }}
      aria-hidden="true"
    />
  )
}

// ── Rocket SVG ───────────────────────────────────────────────────────────────

function RocketSVG() {
  return (
    <svg
      viewBox="0 0 68 240"
      className="h-28 w-auto sm:h-32 md:h-36 lg:h-40"
      style={{ filter: 'drop-shadow(0 0 20px oklch(74% 0.15 58 / 0.45))' }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="rkCyl" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#14202e" />
          <stop offset="16%" stopColor="#606e80" />
          <stop offset="36%" stopColor="#bec6d0" />
          <stop offset="50%" stopColor="#e0e6ee" />
          <stop offset="66%" stopColor="#8290a4" />
          <stop offset="84%" stopColor="#38465a" />
          <stop offset="100%" stopColor="#14202e" />
        </linearGradient>
        <linearGradient id="rkNose" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#14202e" />
          <stop offset="20%" stopColor="#50606e" />
          <stop offset="40%" stopColor="#b0bac6" />
          <stop offset="50%" stopColor="#d4dae4" />
          <stop offset="64%" stopColor="#728094" />
          <stop offset="82%" stopColor="#323e50" />
          <stop offset="100%" stopColor="#14202e" />
        </linearGradient>
        <linearGradient id="rkFin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2e3a4c" />
          <stop offset="100%" stopColor="#0e1620" />
        </linearGradient>
        <linearGradient id="rkNoz" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#080e16" />
          <stop offset="28%" stopColor="#32404e" />
          <stop offset="50%" stopColor="#526070" />
          <stop offset="72%" stopColor="#32404e" />
          <stop offset="100%" stopColor="#080e16" />
        </linearGradient>
        {/* Gold-tinted exhaust instead of pure blue-white */}
        <radialGradient id="rkPlasma" cx="50%" cy="5%" r="90%" fx="50%" fy="3%">
          <stop offset="0%" stopColor="#fff8e8" />
          <stop offset="20%" stopColor="#f5d080" />
          <stop offset="55%" stopColor="#c8881e" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#3a1800" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="rkExhaust" cx="50%" cy="4%" r="92%">
          <stop offset="0%" stopColor="#f0b429" stopOpacity="0.7" />
          <stop offset="48%" stopColor="#c8681e" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#3a1800" stopOpacity="0" />
        </radialGradient>
        <filter id="rkGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2.8" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* NOSE CONE */}
      <path d="M34 5 C32 16, 25 40, 23 66 L45 66 C43 40, 36 16, 34 5 Z" fill="url(#rkCyl)" />
      <line x1="30" y1="16" x2="27" y2="40" stroke="#dce4ee" strokeWidth="1.4" strokeOpacity="0.42" strokeLinecap="round" />

      {/* MAIN BODY */}
      <rect x="23" y="66" width="22" height="110" fill="url(#rkCyl)" />
      <line x1="23" y1="94" x2="45" y2="94" stroke="#6a7a8c" strokeWidth="0.9" strokeOpacity="0.55" />
      <line x1="23" y1="124" x2="45" y2="124" stroke="#5a6a7c" strokeWidth="0.8" strokeOpacity="0.45" />
      <line x1="23" y1="152" x2="45" y2="152" stroke="#5a6a7c" strokeWidth="0.8" strokeOpacity="0.4" />
      <line x1="27.5" y1="66" x2="27.5" y2="176" stroke="#606e82" strokeWidth="0.55" strokeOpacity="0.32" />

      {/* PORTHOLE */}
      <circle cx="34" cy="112" r="7" fill="#060c14" stroke="#48586a" strokeWidth="1.3" />
      <circle cx="34" cy="112" r="5" fill="#0a1220" />
      <ellipse cx="31.5" cy="109" rx="1.8" ry="1.1" fill="#9aa6bc" opacity="0.58" transform="rotate(-22,31.5,109)" />

      {/* ENGINE SKIRT */}
      <path d="M23 176 L21 192 L47 192 L45 176 Z" fill="url(#rkCyl)" />

      {/* DELTA FINS */}
      <path d="M23 152 L4 196 L23 187 Z" fill="url(#rkFin)" />
      <path d="M45 152 L64 196 L45 187 Z" fill="url(#rkFin)" />

      {/* NOZZLE BELL */}
      <path d="M24 192 Q21 200, 18 214 L50 214 Q47 200, 44 192 Z" fill="url(#rkNoz)" />
      <ellipse cx="34" cy="192" rx="10.5" ry="2.5" fill="#181e2a" stroke="#3a4a5e" strokeWidth="0.9" />
      <ellipse cx="34" cy="214" rx="16" ry="3.2" fill="#06080e" stroke="#304a68" strokeWidth="1.1" />

      {/* GOLD ENGINE PLUME */}
      <ellipse cx="34" cy="236" rx="16" ry="24" fill="url(#rkExhaust)">
        <animate attributeName="ry" values="24;17;24" dur="0.44s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.55;1" dur="0.44s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="34" cy="232" rx="7.5" ry="18" fill="url(#rkPlasma)" filter="url(#rkGlow)">
        <animate attributeName="ry" values="18;12;18" dur="0.30s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.5;1" dur="0.30s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="34" cy="220" rx="3.2" ry="5.5" fill="#fff4cc" filter="url(#rkGlow)" opacity="0.92">
        <animate attributeName="ry" values="5.5;3;5.5" dur="0.22s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.92;0.35;0.92" dur="0.22s" repeatCount="indefinite" />
      </ellipse>
    </svg>
  )
}

// ── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero() {
  const { t } = useI18n()
  const trailPathD = buildOrbitPath()
  const sectionRef = useRef<HTMLElement>(null)
  const rocketRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<SVGPathElement>(null)
  const cloudLeftRef = useRef<HTMLDivElement>(null)
  const cloudRightRef = useRef<HTMLDivElement>(null)
  const cloudCenterRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)
  const particleHandle = useRef<ParticleCanvasHandle | null>(null)
  const lastParticlePos = useRef<{ x: number; y: number } | null>(null)
  const nebula1Ref = useRef<HTMLDivElement>(null)
  const nebula2Ref = useRef<HTMLDivElement>(null)
  const nebula3Ref = useRef<HTMLDivElement>(null)

  // Nebula depth parallax — four layers total (stars ×3 + nebulae) create real spatial depth
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    let cachedRect = section.getBoundingClientRect()
    const onResize = () => { cachedRect = section.getBoundingClientRect() }

    const onMove = (e: MouseEvent) => {
      const mx = (e.clientX - cachedRect.left) / cachedRect.width - 0.5
      const my = (e.clientY - cachedRect.top) / cachedRect.height - 0.5
      if (nebula1Ref.current)
        nebula1Ref.current.style.transform = `translate(${mx * -22}px, ${my * -16}px)`
      if (nebula2Ref.current)
        nebula2Ref.current.style.transform = `translate(${mx * 18}px, ${my * 13}px)`
      if (nebula3Ref.current)
        nebula3Ref.current.style.transform = `translate(${mx * 9}px, ${my * 7}px)`
    }

    window.addEventListener('resize', onResize)
    section.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('resize', onResize)
      section.removeEventListener('mousemove', onMove)
    }
  }, [])

  const spawnParticlesAtRocket = useCallback(() => {
    if (!rocketRef.current || !sectionRef.current || !particleHandle.current) return
    const rocketRect = rocketRef.current.getBoundingClientRect()
    const sectionRect = sectionRef.current.getBoundingClientRect()
    const cx = rocketRect.left + rocketRect.width / 2 - sectionRect.left
    const cy = rocketRect.top + rocketRect.height * 0.75 - sectionRect.top // nozzle approx

    const prev = lastParticlePos.current
    const dirX = prev ? cx - prev.x : 0
    const dirY = prev ? cy - prev.y : 1
    lastParticlePos.current = { x: cx, y: cy }

    particleHandle.current.spawn(cx, cy, dirX, dirY)
  }, [])

  useGSAP(
    () => {
      if (!sectionRef.current) return
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const section = sectionRef.current

      if (reduceMotion) {
        gsap.set('[data-reveal-char]', { opacity: 1, y: 0 })
        gsap.set(ctaRef.current, { opacity: 1, y: 0 })
        gsap.set('[data-hero-badge]', { opacity: 1 })
        gsap.set('[data-hero-title-top]', { opacity: 1 })
        gsap.set([cloudLeftRef.current, cloudRightRef.current, cloudCenterRef.current], { opacity: 0 })
        gsap.set([rocketRef.current, trailRef.current], { opacity: 0 })
        return
      }

      const mm = gsap.matchMedia()

      const buildTimeline = () => {
        gsap.fromTo(
          section.querySelector('[data-hero-badge]'),
          { opacity: 0, y: -16, scale: 0.88 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
        )

        gsap.fromTo(
          section.querySelector('[data-hero-title-top]'),
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', delay: 0.25 }
        )

        gsap.fromTo(
          scrollHintRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.9, delay: 1.4, ease: 'power2.out' }
        )

        if (trailRef.current) {
          const pathEl = trailRef.current
          const pathLength = pathEl.getTotalLength()
          pathEl.style.strokeDasharray = String(pathLength)
          pathEl.style.strokeDashoffset = String(pathLength)
          pathEl.style.transition = 'none'
          gsap.set(pathEl, { opacity: 0.7 })
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=270%',
            scrub: 1.4,
            pin: true,
            anticipatePin: 1,
          },
        })

        tl.to(scrollHintRef.current, { opacity: 0, duration: 0.04 }, 0)

        gsap.set(rocketRef.current, { opacity: 0, scale: 0.15 })

        tl.to(trailRef.current, { opacity: 0.75, duration: 0.1, ease: 'none' }, 0)

        // Clouds part as rocket arrives
        tl.to(cloudLeftRef.current, { x: '-130%', opacity: 0, duration: 0.22, ease: 'power2.in' }, 0.12)
        tl.to(cloudRightRef.current, { x: '130%', opacity: 0, duration: 0.22, ease: 'power2.in' }, 0.12)
        tl.to(cloudCenterRef.current, { opacity: 0, scale: 1.5, duration: 0.18, ease: 'power2.in' }, 0.18)

        // Letter-by-letter reveal via stagger (scrubbed) — chars appear as trail passes
        tl.fromTo(
          '[data-reveal-char]',
          { opacity: 0, y: 14, filter: 'blur(4px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.05, stagger: 0.012, ease: 'power2.out' },
          0.3
        )

        // CTA children stagger: subtitle → buttons → trust
        tl.to(ctaRef.current, { opacity: 1, duration: 0.001 }, 0.60)
        tl.fromTo(
          section.querySelector('[data-hero-subtitle]'),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.18, ease: 'power3.out' },
          0.62
        )
        tl.fromTo(
          section.querySelector('[data-hero-buttons]'),
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.16, ease: 'power3.out' },
          0.68
        )
        tl.fromTo(
          section.querySelector('[data-hero-trust]'),
          { opacity: 0 },
          { opacity: 1, duration: 0.14, ease: 'power2.out' },
          0.74
        )

        // Rocket along motionpath
        if (trailRef.current && rocketRef.current) {
          tl.to(
            rocketRef.current,
            {
              motionPath: {
                path: trailRef.current,
                align: trailRef.current,
                alignOrigin: [0.5, 0.6],
                autoRotate: false,
              },
              duration: 0.74,
              ease: 'none',
            },
            0
          )
        }

        // Orbit depth scale + particle spawning
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
              const scale = 0.14 + 0.86 * sinV
              const nozzleOffsetPx = nozzleAnchorFrac * rocketBasePx * scale
              const pxPerPathUnit = Math.sqrt(dx * dx + dy * dy) / step
              const lag = pxPerPathUnit > 0.001 ? nozzleOffsetPx / pxPerPathUnit : 0
              const offset = Math.min(len, Math.max(0, len * (1 - v) + lag))
              pathEl.style.strokeDashoffset = String(offset)
              const opacity = Math.min(1, v * 14) * Math.min(1, (1 - v) * 30)
              gsap.set(rocketRef.current, { scale, opacity, rotation, transformOrigin: '50% 50%' })

              // Spawn particles at nozzle position
              if (opacity > 0.15 && v > 0.05 && v < 0.92) {
                spawnParticlesAtRocket()
              }
            },
          }, 0)

          tl.to(pathEl, { opacity: 0, duration: 0.1 }, 0.74)
        }
      }

      mm.add('(min-width: 768px)', buildTimeline)
      mm.add('(max-width: 767px)', buildTimeline)

      return () => { mm.revert() }
    },
    { scope: sectionRef }
  )

  // Split titleReveal into per-character spans
  const chars = t.hero.titleReveal.split('').map((ch, i) => (
    <span key={i} data-reveal-char className="reveal-char" style={{ opacity: 0 }}>
      {ch === ' ' ? '\u00A0' : ch}
    </span>
  ))

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      {/* Canvas starfield */}
      <StarfieldCanvas />

      {/* Cosmos nebula background */}
      <div className="hero-cosmos absolute inset-0" style={{ zIndex: 1 }} aria-hidden="true">
        <div ref={nebula1Ref} className="hero-cosmos__nebula hero-cosmos__nebula--one" />
        <div ref={nebula2Ref} className="hero-cosmos__nebula hero-cosmos__nebula--two" />
        <div ref={nebula3Ref} className="hero-cosmos__nebula hero-cosmos__nebula--three" />
        <div className="hero-cosmos__haze" />
        <div className="hero-cosmos__grain" />
      </div>

      {/* Cloud layers — parted by rocket */}
      <div ref={cloudLeftRef} className="hero-cloud hero-cloud--left" />
      <div ref={cloudRightRef} className="hero-cloud hero-cloud--right" />
      <div ref={cloudCenterRef} className="hero-cloud hero-cloud--center" />

      {/* Particle trail canvas */}
      <ParticleCanvas handleRef={particleHandle} />

      {/* Trail SVG */}
      <svg
        className="hero-trail-svg pointer-events-none absolute inset-0"
        style={{ zIndex: 14 }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="trailGradient" x1="55%" y1="95%" x2="18%" y2="5%">
            <stop offset="0%" stopColor="oklch(74% 0.15 58 / 0)" />
            <stop offset="15%" stopColor="oklch(74% 0.15 58 / 0.6)" />
            <stop offset="50%" stopColor="oklch(74% 0.15 58 / 0.38)" />
            <stop offset="75%" stopColor="oklch(70% 0.14 192 / 0.2)" />
            <stop offset="100%" stopColor="oklch(70% 0.14 192 / 0.04)" />
          </linearGradient>
        </defs>
        <path
          ref={trailRef}
          className="hero-trail-path"
          d={trailPathD}
          stroke="url(#trailGradient)"
          fill="none"
          strokeWidth="0.7"
          strokeLinecap="round"
        />
      </svg>

      {/* Rocket */}
      <div
        ref={rocketRef}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ zIndex: 20, opacity: 0 }}
      >
        <RocketSVG />
      </div>

      {/* Text content */}
      <div
        className="relative flex h-full flex-col items-center justify-start pt-[19vh] px-4 text-center"
        style={{ zIndex: 20 }}
      >
        {/* Badge */}
        <div data-hero-badge className="mb-8 flex justify-center" style={{ opacity: 0 }}>
          <span className="hero-badge">
            <span className="hero-badge__dot" />
            {t.hero.badge}
          </span>
        </div>

        {/* Headline */}
        <h1 style={{ lineHeight: 1.02 }}>
          <span
            data-hero-title-top
            className="block font-display font-black tracking-tight text-[clamp(2.8rem,8vw,7rem)] uppercase"
            style={{ opacity: 0, color: 'oklch(96% 0.008 90)' }}
          >
            {t.hero.titleTop}
          </span>

          <span
            className="mt-2 block font-display font-black tracking-tight text-[clamp(1.6rem,4.5vw,3.8rem)] uppercase"
            style={{ color: 'var(--accent-gold)' }}
            aria-label={t.hero.titleReveal}
          >
            {chars}
          </span>
        </h1>

        {/* CTAs */}
        <div ref={ctaRef} className="mt-10 flex flex-col items-center gap-5" style={{ opacity: 0 }}>
          <p
            data-hero-subtitle
            className="max-w-lg text-center text-base md:text-lg"
            style={{ color: 'oklch(86% 0.008 265)', lineHeight: 1.65 }}
          >
            {t.hero.subtitle}
          </p>

          <div data-hero-buttons className="flex flex-wrap justify-center gap-3">
            <a
              href="#contact"
              className="gold-button rounded-full px-7 py-3.5 text-sm font-bold tracking-wide"
            >
              {t.hero.primaryCta}
            </a>
            <a
              href="#services"
              className="ghost-button rounded-full px-7 py-3.5 text-sm font-semibold"
            >
              {t.hero.secondaryCta}
            </a>
          </div>

          {/* Trust signals */}
          <div data-hero-trust className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-2">
            {t.hero.trust.map((item) => (
              <span
                key={item}
                className="text-xs font-medium"
                style={{ color: 'var(--nav-text)' }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ zIndex: 20, opacity: 0 }}
      >
        <div className="scroll-nudge flex flex-col items-center gap-1" style={{ color: 'oklch(60% 0.02 265)' }}>
          <span className="text-[9px] font-bold uppercase tracking-[0.22em]">Scroll</span>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
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
