"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useI18n } from "@/lib/i18n";

const MARQUEE_ITEMS_ES = [
  "IA que transforma",
  "Resultados reales",
  "Innovación sin límites",
  "Tecnología con propósito",
  "Automatización inteligente",
];

const MARQUEE_ITEMS_EN = [
  "AI that transforms",
  "Real results",
  "Innovation without limits",
  "Technology with purpose",
  "Intelligent automation",
];

const SEPARATOR = " • ";

export default function Marquee() {
  const { lang } = useI18n();
  const container = useRef<HTMLDivElement>(null);
  const speedRef = useRef(1);

  const items = lang === "es" ? MARQUEE_ITEMS_ES : MARQUEE_ITEMS_EN;
  const fullText = items.join(SEPARATOR) + SEPARATOR;

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      // Base marquee scroll animation
      const tracks = container.current?.querySelectorAll<HTMLElement>(".marquee-track");
      if (!tracks || tracks.length === 0) return;

      tracks.forEach((track, idx) => {
        const direction = idx % 2 === 0 ? -1 : 1;
        gsap.to(track, {
          xPercent: direction * -50,
          ease: "none",
          duration: 30,
          repeat: -1,
        });
      });

      // Scroll speed response — speed up marquee on scroll velocity
      ScrollTrigger.create({
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity());
          const boost = gsap.utils.clamp(1, 3, 1 + velocity / 2000);
          if (Math.abs(boost - speedRef.current) > 0.1) {
            speedRef.current = boost;
            tracks.forEach((track) => {
              gsap.to(track, {
                timeScale: boost,
                duration: 0.5,
                overwrite: "auto",
              });
            });
          }
        },
      });

      // Fade in marquee on scroll
      gsap.from(container.current, {
        opacity: 0,
        duration: 0.6,
        ease: "icsEase",
        scrollTrigger: {
          trigger: container.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: container, dependencies: [lang], revertOnUpdate: true }
  );

  return (
    <div
      ref={container}
      className="marquee-section overflow-hidden border-y border-white/5 py-5 select-none"
      aria-hidden="true"
    >
      <div className="marquee-track whitespace-nowrap font-[var(--font-display)] text-lg md:text-2xl tracking-tight text-[color:var(--text-muted)]">
        <span>{fullText}</span>
        <span>{fullText}</span>
      </div>
    </div>
  );
}
