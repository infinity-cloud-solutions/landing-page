"use client"
import React, { useEffect, useState } from 'react'
import LanguageToggle from './LanguageToggle'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { t } = useI18n()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 z-50 w-full border-b border-transparent transition-all duration-300 ${scrolled ? 'border-white/10 bg-black/60 py-3 backdrop-blur-md' : 'bg-transparent py-5'}`}>
      <div className="container flex items-center justify-between">
        <div className="logo text-xl font-bold tracking-tight">
          <Link href="#">
            <span className="text-white">Infinity</span>
            <span className="ml-1 text-[color:var(--accent-primary)]">Cloud</span>
          </Link>
        </div>

        <nav className="hidden items-center gap-6 text-[color:var(--text-muted)] md:flex">
          <a href="#services" className="nav-link transition hover:text-white">{t.nav.services}</a>
          <a href="#process" className="nav-link transition hover:text-white">{t.nav.process}</a>
          <a href="#results" className="nav-link transition hover:text-white">{t.nav.results}</a>
          <a href="#about" className="nav-link transition hover:text-white">{t.nav.about}</a>
          <a href="#contact" className="nav-link transition hover:text-white">{t.nav.contact}</a>
        </nav>

        <div className="flex items-center gap-4">
          <LanguageToggle />
          <a href="#contact" className="cta-button hidden rounded-md bg-[color:var(--accent-primary)] px-4 py-2 font-semibold text-black transition-transform hover:scale-105 md:inline-block">{t.nav.cta}</a>
        </div>
      </div>
    </header>
  )
}
