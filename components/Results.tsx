"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useI18n } from "@/lib/i18n";

function useCountUp(target: number) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);
  const triggered = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 88%",
      once: true,
      onEnter: () => {
        if (triggered.current) return;
        triggered.current = true;
        gsap.to(
          { val: 0 },
          {
            val: target,
            duration: 1.2,
            ease: "icsReveal",
            onUpdate() {
              setValue(Math.round(this.targets()[0].val));
            },
          }
        );
      },
    });

    return () => st.kill();
  }, [target]);

  return { ref, value };
}

function MetricCard({ label, value, suffix }: { label: string; value: number; suffix: string }) {
  const { ref, value: count } = useCountUp(value);

  return (
    <article className="metric-card card-surface interactive-card rounded-2xl p-6">
      <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.12em] text-[color:var(--accent-tertiary)]">KPI</p>
      <span ref={ref} className="mt-4 block font-[var(--font-display)] text-5xl leading-none text-[color:var(--accent-primary)]">
        {count}
        {suffix}
      </span>
      <p className="mt-3 text-sm text-[color:var(--text-muted)]">{label}</p>
    </article>
  );
}

export function Results() {
  const { t } = useI18n();
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      // Header reveal
      gsap.from(".results-header", {
        opacity: 0,
        y: 22,
        duration: 0.6,
        ease: "icsEase",
        scrollTrigger: {
          trigger: ".results-header",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Metric cards stagger
      gsap.from(".metric-card", {
        opacity: 0,
        y: 36,
        duration: 0.55,
        stagger: 0.1,
        ease: "icsEase",
        scrollTrigger: {
          trigger: ".results-metrics",
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });

      // Testimonial cards stagger
      gsap.from(".testimonial-card", {
        opacity: 0,
        y: 28,
        duration: 0.5,
        stagger: 0.1,
        ease: "icsEase",
        scrollTrigger: {
          trigger: ".results-testimonials",
          start: "top 84%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} id="results" className="section-wrap">
      <div className="results-header">
        <p className="eyebrow">{t.results.eyebrow}</p>
        <h2 className="section-title mt-4 max-w-3xl text-3xl md:text-5xl">{t.results.title}</h2>
      </div>

      <div className="results-metrics mt-10 grid gap-5 md:grid-cols-3">
        {t.results.metrics.map((metric) => (
          <MetricCard key={metric.label} label={metric.label} value={metric.value} suffix={metric.suffix} />
        ))}
      </div>

      <div className="results-testimonials mt-10 grid gap-5 md:grid-cols-2">
        {t.results.testimonials.map((item) => (
          <blockquote key={item.author} className="testimonial-card card-surface interactive-card rounded-2xl p-6">
            <p className="text-sm leading-relaxed text-[color:var(--text-primary)]">&ldquo;{item.quote}&rdquo;</p>
            <footer className="mt-4">
              <p className="font-semibold">{item.author}</p>
              <p className="text-sm text-[color:var(--text-muted)]">{item.role}</p>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
