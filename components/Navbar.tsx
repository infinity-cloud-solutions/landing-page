"use client"
import React, { useEffect, useState } from 'react'
import LanguageToggle from './LanguageToggle'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-md bg-black/40 py-3' : 'bg-transparent py-5'}`}>
      <div className="container flex items-center justify-between">
        <div className="logo text-xl font-bold tracking-tight">
          <Link href="#">
            <span className="text-white">Infinity</span>
            <span className="text-[color:var(--color-accent)] ml-1">Cloud</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-neutral-300">
          <a href="#services" className="hover:text-white">Servicios</a>
          <a href="#process" className="hover:text-white">Proceso</a>
          <a href="#results" className="hover:text-white">Resultados</a>
          <a href="#about" className="hover:text-white">Nosotros</a>
          <a href="#contact" className="hover:text-white">Contacto</a>
        </nav>

        <div className="flex items-center gap-4">
          <LanguageToggle />
          <a href="#contact" className="hidden md:inline-block px-4 py-2 rounded-md bg-[color:var(--color-accent)] text-black font-semibold hover:scale-105 transition-transform">Agenda tu consulta</a>
        </div>
      </div>
    </header>
  )
}
