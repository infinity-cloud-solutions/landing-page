"use client";

import React, { useRef } from "react";
import LanguageToggle from "./LanguageToggle";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useI18n } from "@/lib/i18n";

export default function Navbar() {
  const { t } = useI18n();
  const header = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const el = header.current;
      if (!el) return;

      // Slide down on load
      gsap.from(el, {
        y: -60,
        opacity: 0,
        duration: 0.6,
        ease: "icsEase",
        delay: 0.05,
      });

      // Show/hide on scroll direction
      let lastScrollY = 0;

      ScrollTrigger.create({
        start: "top -80",
        end: 99999,
        onUpdate: (self) => {
          const scrollY = self.scroll();
          const isScrollingDown = scrollY > lastScrollY && scrollY > 80;
          lastScrollY = scrollY;

          gsap.to(el, {
            y: isScrollingDown ? -100 : 0,
            duration: 0.35,
            ease: "power2.inOut",
            overwrite: "auto",
          });

          // Toggle scrolled visual style
          if (scrollY > 24) {
            el.classList.add("navbar-scrolled");
          } else {
            el.classList.remove("navbar-scrolled");
          }
        },
      });
    },
    { scope: header }
  );

  return (
    <header
      ref={header}
      className="fixed top-0 z-50 w-full border-b border-transparent transition-colors duration-300 bg-transparent py-5 navbar-base"
    >
      <div className="container flex items-center justify-between">
        <div className="logo text-xl font-bold tracking-tight">
          <Link href="#">
            <span className="text-white">Infinity</span>
            <span className="ml-1 text-[color:var(--accent-primary)]">Cloud</span>
          </Link>
        </div>

        <nav className="hidden items-center gap-6 text-[color:var(--text-muted)] md:flex">
          <a href="#services" className="nav-link transition hover:text-white">
            {t.nav.services}
          </a>
          <a href="#process" className="nav-link transition hover:text-white">
            {t.nav.process}
          </a>
          <a href="#results" className="nav-link transition hover:text-white">
            {t.nav.results}
          </a>
          <a href="#about" className="nav-link transition hover:text-white">
            {t.nav.about}
          </a>
          <a href="#contact" className="nav-link transition hover:text-white">
            {t.nav.contact}
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <LanguageToggle />
          <a
            href="#contact"
            className="cta-button hidden rounded-md bg-[color:var(--accent-primary)] px-4 py-2 font-semibold text-black transition-transform hover:scale-105 md:inline-block"
          >
            {t.nav.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
