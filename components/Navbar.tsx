"use client"

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import LanguageToggle from '@/components/LanguageToggle'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useI18n } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger)

export default function Navbar() {
  const { t } = useI18n()
  const navRef = useRef<HTMLElement | null>(null)

  useGSAP(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !navRef.current) return

    const header = navRef.current
    let lastY = window.scrollY

    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const goingDown = self.scroll() > lastY
        lastY = self.scroll()

        if (self.scroll() < 24) {
          gsap.to(header, { yPercent: 0, duration: 0.25, ease: 'power2.out' })
          return
        }

        gsap.to(header, {
          yPercent: goingDown ? -120 : 0,
          duration: 0.3,
          ease: 'power2.out',
        })
      },
    })

    return () => { trigger.kill() }
  }, [])

  return (
    <header ref={navRef} className="fixed top-0 z-50 w-full">
      <div
        className="mx-auto mt-3 w-[min(1120px,92vw)] rounded-2xl theme-nav px-4 py-3 md:px-6"
        style={{ border: '1px solid var(--stroke)' }}
      >
        <div className="flex items-center justify-between gap-4">
          <Link href="#" className="flex items-center gap-3" aria-label="Infinity AI Cloud Solutions">
            <Image
              src="/images/logo.png"
              alt="Infinity logo"
              width={160}
              height={40}
              className="h-9 w-auto"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-6 text-sm md:flex">
            {([
              ['#services', t.nav.services],
              ['#process', t.nav.process],
              ['#results', t.nav.results],
              ['#about', t.nav.about],
            ] as const).map(([href, label]) => (
              <a key={href} href={href} className="nav-link font-medium">
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <LanguageToggle />
            <ThemeToggle />
            <a
              href="#contact"
              className="gold-button hidden items-center rounded-full px-5 py-2 text-sm md:inline-flex"
            >
              {t.nav.cta}
            </a>
          </div>
        </div>

        {/* Mobile nav */}
        <nav className="mt-2.5 flex items-center gap-4 overflow-x-auto whitespace-nowrap text-xs md:hidden">
          <a href="#services" className="nav-link">{t.nav.services}</a>
          <a href="#process" className="nav-link">{t.nav.process}</a>
          <a href="#results" className="nav-link">{t.nav.results}</a>
          <a href="#about" className="nav-link">{t.nav.about}</a>
          <a href="#contact" className="nav-link font-bold" style={{ color: 'var(--accent-gold)' }}>
            {t.nav.cta}
          </a>
        </nav>
      </div>
    </header>
  )
}
