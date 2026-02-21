"use client";

import { motion } from "motion/react";
import { useI18n } from "@/lib/i18n";

const sectionVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const }
  }
};

export function Services() {
  const { t } = useI18n();

  return (
    <motion.section
      id="services"
      className="section-wrap"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.22 }}
      variants={sectionVariants}
    >
      <p className="eyebrow">{t.services.eyebrow}</p>
      <h2 className="section-title mt-4 max-w-3xl text-3xl md:text-5xl">{t.services.title}</h2>
      <p className="mt-6 max-w-2xl text-[color:var(--text-muted)]">{t.services.intro}</p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {t.services.items.map((item, index) => (
          <motion.article
            key={item.title}
            className="card-surface interactive-card group rounded-2xl p-6"
            whileHover={{ y: -6, rotateX: -2, rotateY: index % 2 === 0 ? 2 : -2 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.12em] text-[color:var(--accent-tertiary)]">
              0{index + 1}
            </span>
            <h3 className="mt-3 font-[var(--font-display)] text-2xl leading-tight">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[color:var(--text-muted)]">{item.description}</p>
            <div className="mt-6 h-px bg-gradient-to-r from-[color:var(--accent-primary)]/80 to-transparent opacity-60 transition group-hover:opacity-100" />
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}
