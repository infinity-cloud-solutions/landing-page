"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const ACCENT_THEMES: Record<string, { primary: string; secondary: string; tertiary: string }> = {
  hero: { primary: "#E85D26", secondary: "#2DD4A8", tertiary: "#C4A265" },
  services: { primary: "#2DD4A8", secondary: "#60A5FA", tertiary: "#C4A265" },
  process: { primary: "#60A5FA", secondary: "#E85D26", tertiary: "#D4A843" },
  results: { primary: "#C4A265", secondary: "#2DD4A8", tertiary: "#60AFA" },
  about: { primary: "#D4A843", secondary: "#E85D26", tertiary: "#2DD4A8" },
  contact: { primary: "#D4A843", secondary: "#2DD4A8", tertiary: "#E85D26" },
};

const SECTION_IDS = ["hero", "services", "process", "results", "about", "contact"];

export default function ThemeTransition() {
  const initialized = useRef(false);
  const triggers = useRef<Array<{ kill: () => void }>>([]);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const root = document.documentElement;

    // Apply initial hero theme if present
    const initial = ACCENT_THEMES.hero;
    if (initial) {
      root.style.setProperty("--accent-primary", initial.primary);
      root.style.setProperty("--accent-secondary", initial.secondary);
      root.style.setProperty("--accent-tertiary", initial.tertiary);
    }

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      const theme = ACCENT_THEMES[id];
      if (!el || !theme) return;

      const st = ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          gsap.to({}, {
            duration: 0.6,
            ease: "power1.out",
            onStart() {
              document.documentElement.style.setProperty("--accent-primary", theme.primary);
              document.documentElement.style.setProperty("--accent-secondary", theme.secondary);
              document.documentElement.style.setProperty("--accent-tertiary", theme.tertiary);
            },
          });
        },
        onEnterBack: () => {
          gsap.to({}, {
            duration: 0.6,
            ease: "power1.out",
            onStart() {
              document.documentElement.style.setProperty("--accent-primary", theme.primary);
              document.documentElement.style.setProperty("--accent-secondary", theme.secondary);
              document.documentElement.style.setProperty("--accent-tertiary", theme.tertiary);
            },
          });
        },
      });

      triggers.current.push({ kill: () => st.kill() });
    });

    return () => {
      triggers.current.forEach((t) => t.kill());
      triggers.current = [];
    };
  }, []);

  return null;
}
