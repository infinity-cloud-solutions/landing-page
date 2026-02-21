"use client";

import { motion } from "motion/react";
import { useI18n } from "@/lib/i18n";

export function Process() {
  const { t } = useI18n();

  return (
    <section id="process" className="section-wrap">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="eyebrow">{t.process.eyebrow}</p>
        <h2 className="section-title mt-4 max-w-3xl text-3xl md:text-5xl">{t.process.title}</h2>
      </motion.div>

      <div className="relative mt-12 grid gap-6 md:grid-cols-2">
        <div className="pointer-events-none absolute left-6 top-2 hidden h-[calc(100%-16px)] w-px bg-gradient-to-b from-[color:var(--accent-primary)] via-[color:var(--accent-tertiary)] to-transparent md:block" />

        {t.process.steps.map((step, index) => (
          <motion.article
            key={step.title}
            className="card-surface interactive-card relative rounded-2xl p-6 md:ml-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <span className="absolute -left-4 top-6 hidden h-8 w-8 items-center justify-center rounded-full border border-[color:var(--accent-primary)] bg-black font-[var(--font-mono)] text-xs text-[color:var(--accent-primary)] md:flex">
              {index + 1}
            </span>
            <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.12em] text-[color:var(--accent-tertiary)] md:hidden">
              Step 0{index + 1}
            </p>
            <h3 className="mt-2 font-[var(--font-display)] text-2xl">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--text-muted)]">{step.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
