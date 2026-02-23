"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useI18n } from "@/lib/i18n";

export function Process() {
  const { t } = useI18n();
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      gsap.from(".process-header", {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: "icsEase",
        scrollTrigger: {
          trigger: ".process-header",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      gsap.fromTo(
        ".process-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".process-grid",
            start: "top 80%",
            end: "bottom 60%",
            scrub: 1,
          },
        }
      );

      gsap.from(".process-card", {
        opacity: 0,
        y: 32,
        duration: 0.55,
        stagger: 0.1,
        ease: "icsEase",
        scrollTrigger: {
          trigger: ".process-grid",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} id="process" className="section-wrap">
      <div className="process-header">
        <p className="eyebrow">{t.process.eyebrow}</p>
        <h2 className="section-title mt-4 max-w-3xl text-3xl md:text-5xl">{t.process.title}</h2>
      </div>

      <div className="process-grid relative mt-12 grid gap-6 md:grid-cols-2">
        <div className="process-line pointer-events-none absolute left-6 top-2 hidden h-[calc(100%-16px)] w-px origin-top bg-gradient-to-b from-[color:var(--accent-primary)] via-[color:var(--accent-tertiary)] to-transparent md:block" />

        {t.process.steps.map((step, index) => (
          <article key={step.title} className="process-card card-surface interactive-card relative rounded-2xl p-6 md:ml-6">
            <span className="absolute -left-4 top-6 hidden h-8 w-8 items-center justify-center rounded-full border border-[color:var(--accent-primary)] bg-black font-[var(--font-mono)] text-xs text-[color:var(--accent-primary)] md:flex">
              {index + 1}
            </span>
            <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.12em] text-[color:var(--accent-tertiary)] md:hidden">Step 0{index + 1}</p>
            <h3 className="mt-2 font-[var(--font-display)] text-2xl">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--text-muted)]">{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
