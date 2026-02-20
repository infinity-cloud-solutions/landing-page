"use client";

import { motion } from "motion/react";
import { useI18n } from "@/lib/i18n";

export function About() {
  const { t } = useI18n();

  return (
    <section id="about" className="section-wrap">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]"
      >
        <div>
          <p className="eyebrow">{t.about.eyebrow}</p>
          <h2 className="section-title mt-4 max-w-3xl text-3xl md:text-5xl">{t.about.title}</h2>
          <p className="mt-6 max-w-2xl text-[color:var(--text-muted)]">{t.about.story}</p>
        </div>

        <div className="space-y-4">
          {t.about.differentiators.map((item, idx) => (
            <article key={item} className="card-surface rounded-xl p-4">
              <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.12em] text-[color:var(--accent-tertiary)]">
                0{idx + 1}
              </p>
              <p className="mt-2 text-sm text-[color:var(--text-primary)]">{item}</p>
            </article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
