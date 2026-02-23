"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useI18n } from "@/lib/i18n";

export function About() {
  const { t } = useI18n();
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      gsap.from(".about-header", {
        opacity: 0,
        y: 22,
        duration: 0.6,
        ease: "icsEase",
        scrollTrigger: {
          trigger: ".about-header",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".about-story", {
        opacity: 0,
        y: 16,
        duration: 0.5,
        ease: "icsEase",
        delay: 0.1,
        scrollTrigger: {
          trigger: ".about-header",
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".about-diff-card", {
        opacity: 0,
        y: 28,
        duration: 0.5,
        stagger: 0.1,
        ease: "icsEase",
        scrollTrigger: {
          trigger: ".about-diffs",
          start: "top 84%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} id="about" className="section-wrap">
      <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="about-header">
            <p className="eyebrow">{t.about.eyebrow}</p>
            <h2 className="section-title mt-4 max-w-3xl text-3xl md:text-5xl">{t.about.title}</h2>
          </div>
          <p className="about-story mt-6 max-w-2xl text-[color:var(--text-muted)]">{t.about.story}</p>
        </div>

        <div className="about-diffs space-y-4">
          {t.about.differentiators.map((item, idx) => (
            <article key={item} className="about-diff-card card-surface interactive-card rounded-xl p-4">
              <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.12em] text-[color:var(--accent-tertiary)]">0{idx + 1}</p>
              <p className="mt-2 text-sm text-[color:var(--text-primary)]">{item}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
