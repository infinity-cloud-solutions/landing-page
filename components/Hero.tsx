"use client";
import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

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
              className="text-4xl md:text-6xl font-extrabold leading-tight"
            >
              {t.hero.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-6 text-lg text-neutral-300 max-w-lg"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div className="mt-8 flex gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <a href="#contact" className="bg-[color:var(--color-accent)] text-black px-5 py-3 rounded-md font-semibold hover:scale-105 transition-transform">Agenda tu consulta gratis</a>
              <a href="#services" className="border border-neutral-700 px-5 py-3 rounded-md text-neutral-200 hover:bg-white/5 transition">Ver servicios</a>
            </motion.div>
          </div>

          <motion.div className="relative w-full h-56 md:h-80 rounded-md overflow-hidden"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#111111] via-[color:var(--color-accent)] to-[#2d2d2d] opacity-90"></div>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="g1" x1="0" x2="1">
                  <stop offset="0%" stopColor="#E85D26" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#2DD4A8" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#g1)" opacity="0.06" />
            </svg>
          </motion.div>
        </div>

        <div className="trust-row mt-8 flex gap-8 text-sm text-neutral-400">
          <div>+10 clientes</div>
          <div>+6 proyectos implementados</div>
          <div>Atención en Español / Inglés</div>
        </div>
      </div>
    </section>
  )
}
