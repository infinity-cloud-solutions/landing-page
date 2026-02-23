"use client";

import React, { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { useI18n } from "@/lib/i18n";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80";

export default function Hero() {
  const { t } = useI18n();
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReduced) {
        gsap.set(".hero-headline, .hero-subtitle, .hero-ctas, .hero-image-wrap, .hero-orb", {
          opacity: 1,
          y: 0,
          scale: 1,
        });
        return;
      }

      const split = SplitText.create(".hero-headline", {
        type: "chars",
      });

      gsap.from(split.chars, {
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.02,
        ease: "icsReveal",
        delay: 0.15,
      });

      gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "icsEase",
        delay: 0.5,
      });

      gsap.from(".hero-cta-btn", {
        opacity: 0,
        y: 24,
        duration: 0.5,
        stagger: 0.12,
        ease: "icsEase",
        delay: 0.7,
      });

      gsap.from(".hero-image-wrap", {
        opacity: 0,
        scale: 0.92,
        duration: 0.9,
        ease: "icsEase",
        delay: 0.3,
      });

      gsap.from(".hero-img", {
        scale: 1.08,
        duration: 1.4,
        ease: "power2.out",
        delay: 0.3,
      });

      gsap.to(".hero-orb-1", {
        x: 12,
        y: -10,
        opacity: 0.55,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".hero-orb-2", {
        x: -10,
        y: 8,
        opacity: 0.45,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      mm.add("(min-width: 768px)", () => {
        gsap.to(".hero-text-col", {
          y: -80,
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        gsap.to(".hero-image-wrap", {
          y: -30,
          scale: 0.97,
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      gsap.from(".hero-trust-item", {
        opacity: 0,
        y: 12,
        duration: 0.4,
        stagger: 0.08,
        ease: "icsEase",
        delay: 1.0,
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="hero pt-28 pb-16">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="hero-text-col">
            <h1 className="hero-headline section-title text-4xl md:text-6xl">
              {t.hero.title}
            </h1>

            <p className="hero-subtitle mt-6 max-w-lg text-lg text-[color:var(--text-muted)]">
              {t.hero.subtitle}
            </p>

            <div className="hero-ctas mt-8 flex gap-4">
              <a
                href="#contact"
                className="hero-cta-btn cta-button rounded-md bg-[color:var(--accent-primary)] px-5 py-3 font-semibold text-black transition-transform hover:scale-105"
              >
                {t.hero.primaryCta}
              </a>
              <a
                href="#services"
                className="hero-cta-btn rounded-md border border-white/20 px-5 py-3 text-[color:var(--text-primary)] transition hover:bg-white/5"
              >
                {t.hero.secondaryCta}
              </a>
            </div>
          </div>

          <div className="hero-image-wrap relative w-full h-56 md:h-80 rounded-md overflow-hidden">
            <img
              src={HERO_IMAGE}
              alt="AI automation workspace"
              className="hero-img absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/45 to-[color:var(--accent-primary)]/45" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(45,212,168,0.25),transparent_35%)]" />
            <div className="hero-orb hero-orb-1 absolute -left-8 top-6 h-24 w-24 rounded-full bg-white/20 blur-2xl" />
            <div className="hero-orb hero-orb-2 absolute right-8 bottom-6 h-20 w-20 rounded-full bg-[color:var(--accent-secondary)]/40 blur-2xl" />
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 600 400"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="g1" x1="0" x2="1">
                  <stop offset="0%" stopColor="#E85D26" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#2DD4A8" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#g1)" opacity="0.06" />
            </svg>

            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/30 bg-black/45 px-3 py-1 text-[11px] uppercase tracking-[0.08em] text-white/90">
                AI Workflows
              </span>
              <span className="rounded-full border border-white/30 bg-black/45 px-3 py-1 text-[11px] uppercase tracking-[0.08em] text-white/90">
                Automation
              </span>
              <span className="rounded-full border border-white/30 bg-black/45 px-3 py-1 text-[11px] uppercase tracking-[0.08em] text-white/90">
                Real ROI
              </span>
            </div>
          </div>
        </div>

        <div className="trust-row mt-8 flex flex-wrap gap-6 text-sm text-[color:var(--text-muted)]">
          {t.hero.trust.map((item) => (
            <div key={item} className="hero-trust-item">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
