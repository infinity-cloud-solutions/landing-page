"use client";

import { animate, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";

function useCountUp(target: number) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (next) => setValue(Math.round(next))
    });
    return () => controls.stop();
  }, [inView, target]);

  return { ref, value };
}

function MetricCard({ label, value, suffix }: { label: string; value: number; suffix: string }) {
  const { ref, value: count } = useCountUp(value);

  return (
    <article className="card-surface interactive-card rounded-2xl p-6">
      <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.12em] text-[color:var(--accent-tertiary)]">
        KPI
      </p>
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

  return (
    <section id="results" className="section-wrap">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="eyebrow">{t.results.eyebrow}</p>
        <h2 className="section-title mt-4 max-w-3xl text-3xl md:text-5xl">{t.results.title}</h2>
      </motion.div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {t.results.metrics.map((metric) => (
          <MetricCard key={metric.label} label={metric.label} value={metric.value} suffix={metric.suffix} />
        ))}
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {t.results.testimonials.map((item, idx) => (
          <motion.blockquote
            key={item.author}
            className="card-surface interactive-card rounded-2xl p-6"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
          >
            <p className="text-sm leading-relaxed text-[color:var(--text-primary)]">“{item.quote}”</p>
            <footer className="mt-4">
              <p className="font-semibold">{item.author}</p>
              <p className="text-sm text-[color:var(--text-muted)]">{item.role}</p>
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
}
