"use client"

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useI18n } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function FloatingChat() {
  const { t } = useI18n()
  const rootRef = useRef<HTMLAnchorElement | null>(null)

  useGSAP(
    () => {
      if (!rootRef.current) return
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (reduceMotion) {
        gsap.set(rootRef.current, { autoAlpha: 1, y: 0 })
        return
      }

      gsap.set(rootRef.current, { autoAlpha: 0, y: 16 })

      ScrollTrigger.create({
        trigger: '#services',
        start: 'top bottom-=80',
        onEnter: () => gsap.to(rootRef.current, { autoAlpha: 1, y: 0, duration: 0.35 }),
        onLeaveBack: () => gsap.to(rootRef.current, { autoAlpha: 0, y: 16, duration: 0.28 }),
      })
    },
    { scope: rootRef }
  )

  return (
    <a
      ref={rootRef}
      href="https://wa.me/5200000000000"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full gradient-button px-4 py-3 text-sm font-semibold shadow-[0_0_0_0_rgba(59,130,246,0.6)] animate-[pulse_2.2s_infinite]"
      aria-label={t.footer.chatCta}
    >
      <span className="icon-outlined text-[20px]">chat</span>
      {t.footer.chatCta}
    </a>
  )
}
