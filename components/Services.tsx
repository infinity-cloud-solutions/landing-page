"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { useI18n } from "@/lib/i18n";

export function Services() {
  const { t } = useI18n();
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const titleSplit = SplitText.create(".services-title", { type: "lines" });
      gsap.from(titleSplit.lines, {
        opacity: 0.15,
        y: 14,
        duration: 0.6,
        stagger: 0.12,
        ease: "icsEase",
        scrollTrigger: {
          trigger: ".services-header",
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".services-eyebrow", {
        opacity: 0,
        y: 10,
        duration: 0.5,
        ease: "icsEase",
        scrollTrigger: {
          trigger: ".services-header",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".services-intro", {
        opacity: 0,
        y: 16,
        duration: 0.5,
        ease: "icsEase",
        delay: 0.15,
        scrollTrigger: {
          trigger: ".services-header",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".service-card", {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.1,
        ease: "icsEase",
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} id="services" className="section-wrap">
      <div className="services-header">
        <p className="services-eyebrow eyebrow">{t.services.eyebrow}</p>
        <h2 className="services-title section-title mt-4 max-w-3xl text-3xl md:text-5xl">
          {t.services.title}
        </h2>
        <p className="services-intro mt-6 max-w-2xl text-[color:var(--text-muted)]">{t.services.intro}</p>
      </div>

      <div className="services-grid mt-10 grid gap-5 md:grid-cols-2">
        {t.services.items.map((item, index) => (
          <article key={item.title} className="service-card card-surface interactive-card group rounded-2xl p-6">
            <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.12em] text-[color:var(--accent-tertiary)]">0{index + 1}</span>
            <h3 className="mt-3 font-[var(--font-display)] text-2xl leading-tight">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--text-muted)]">{item.description}</p>
            <div className="mt-6 h-px bg-gradient-to-r from-[color:var(--accent-primary)]/80 to-transparent opacity-60 transition group-hover:opacity-100" />
          </article>
        ))}
      </div>
    </section>
  );
}
