'use client'

import { ReactNode, useEffect } from 'react'
import gsap from 'gsap'
import Lenis from 'lenis'

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const lenisOptions = {
      duration: 1.05,
      smoothWheel: true,
      smoothTouch: false,
    }

    const lenis = new Lenis(lenisOptions as unknown as ConstructorParameters<typeof Lenis>[0])

    const update = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
