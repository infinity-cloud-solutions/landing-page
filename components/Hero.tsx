"use client";
import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const HERO_IMAGE = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80";

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="hero pt-28 pb-16">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="section-title text-4xl md:text-6xl"
            >
              {t.hero.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-6 max-w-lg text-lg text-[color:var(--text-muted)]"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div className="mt-8 flex gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <a href="#contact" className="cta-button rounded-md bg-[color:var(--accent-primary)] px-5 py-3 font-semibold text-black transition-transform hover:scale-105">{t.hero.primaryCta}</a>
              <a href="#services" className="rounded-md border border-white/20 px-5 py-3 text-[color:var(--text-primary)] transition hover:bg-white/5">{t.hero.secondaryCta}</a>
            </motion.div>
          </div>

          <motion.div className="relative w-full h-56 md:h-80 rounded-md overflow-hidden"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.img
              src={HERO_IMAGE}
              alt="AI automation workspace"
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.3, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/45 to-[color:var(--accent-primary)]/45" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(45,212,168,0.25),transparent_35%)]" />
            <motion.div
              className="absolute -left-8 top-6 h-24 w-24 rounded-full bg-white/20 blur-2xl"
              animate={{ x: [0, 12, 0], y: [0, -10, 0], opacity: [0.35, 0.55, 0.35] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute right-8 bottom-6 h-20 w-20 rounded-full bg-[color:var(--accent-secondary)]/40 blur-2xl"
              animate={{ x: [0, -10, 0], y: [0, 8, 0], opacity: [0.25, 0.45, 0.25] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="g1" x1="0" x2="1">
                  <stop offset="0%" stopColor="#E85D26" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#2DD4A8" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#g1)" opacity="0.06" />
            </svg>

            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/30 bg-black/45 px-3 py-1 text-[11px] uppercase tracking-[0.08em] text-white/90">AI Workflows</span>
              <span className="rounded-full border border-white/30 bg-black/45 px-3 py-1 text-[11px] uppercase tracking-[0.08em] text-white/90">Automation</span>
              <span className="rounded-full border border-white/30 bg-black/45 px-3 py-1 text-[11px] uppercase tracking-[0.08em] text-white/90">Real ROI</span>
            </div>
          </motion.div>
        </div>

        <div className="trust-row mt-8 flex flex-wrap gap-6 text-sm text-[color:var(--text-muted)]">
          {t.hero.trust.map((item) => (
            <div key={item}>{item}</div>
          ))}
        </div>
      </div>
    </section>
  )
}
