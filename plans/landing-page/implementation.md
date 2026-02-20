# Infinity Cloud Solutions — Landing Page

## Goal
Implement a production-ready, bilingual (ES/EN) marketing landing page for Infinity Cloud Solutions with a distinctive industrial-luxe aesthetic, purposeful animation, and an async contact form that emails leads to your team.

## Prerequisites
Make sure that the user is currently on the `feat/landing-page` branch before beginning implementation.
If not, move to the correct branch. If the branch does not exist, create it from `main`.

```bash
git checkout main
git pull
git checkout -b feat/landing-page
```

- Stack: Next.js 15 App Router, TypeScript, Tailwind CSS v4, Motion, Resend, Zod, pnpm.
- Commands used through all steps:
  - `pnpm install`
  - `pnpm dev`
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm build`

### Step-by-Step Instructions

#### Step 1: Scaffold project, core theme, and i18n foundation
- [ ] Initialize Next.js project files and dependencies.
- [ ] Copy and paste code below into `package.json`:

```json
{
  "name": "infinity-cloud-solutions-landing",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "motion": "12.34.1",
    "next": "15.5.12",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "resend": "6.9.2",
    "zod": "4.3.6"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "4.1.18",
    "@types/node": "25.2.3",
    "@types/react": "19.2.14",
    "@types/react-dom": "19.2.3",
    "eslint": "9.38.0",
    "eslint-config-next": "15.5.12",
    "postcss": "8.5.6",
    "prettier": "3.8.1",
    "prettier-plugin-tailwindcss": "0.7.2",
    "tailwindcss": "4.1.18",
    "typescript": "5.9.3"
  },
  "packageManager": "pnpm@10.18.0"
}
```

- [ ] Copy and paste code below into `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] Copy and paste code below into `next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true
};

export default nextConfig;
```

- [ ] Copy and paste code below into `postcss.config.mjs`:

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {}
  }
};
```

- [ ] Copy and paste code below into `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ]
};

export default config;
```

- [ ] Copy and paste code below into `.gitignore`:

```gitignore
# dependencies
node_modules

# next
.next
out

# logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# env
.env*
!.env.local.example

# misc
.DS_Store
coverage
```

- [ ] Copy and paste code below into `.env.local.example`:

```bash
RESEND_API_KEY=re_xxxxx
CONTACT_EMAIL=hello@infinitycloudsolutions.com
```

- [ ] Create `next-env.d.ts` and paste:

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// This file is auto-managed by Next.js
```

- [ ] Copy and paste code below into `lib/translations.ts`:

```ts
export type Locale = "es" | "en";

export type TranslationShape = {
  nav: {
    services: string;
    process: string;
    results: string;
    about: string;
    contact: string;
    cta: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    trust: string[];
  };
  services: {
    eyebrow: string;
    title: string;
    intro: string;
    items: { title: string; description: string }[];
  };
  process: {
    eyebrow: string;
    title: string;
    steps: { title: string; description: string }[];
  };
  results: {
    eyebrow: string;
    title: string;
    metrics: { label: string; value: number; suffix: string }[];
    testimonials: { quote: string; author: string; role: string }[];
  };
  about: {
    eyebrow: string;
    title: string;
    story: string;
    differentiators: string[];
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    fields: {
      name: string;
      email: string;
      company: string;
      phone: string;
      message: string;
    };
    submit: string;
    loading: string;
    success: string;
    error: string;
  };
  footer: {
    tagline: string;
    rights: string;
  };
};

export const translations: Record<Locale, TranslationShape> = {
  es: {
    nav: {
      services: "Servicios",
      process: "Proceso",
      results: "Resultados",
      about: "Nosotros",
      contact: "Contacto",
      cta: "Agenda tu consulta"
    },
    hero: {
      badge: "Automatización e IA para PyMEs en México",
      title: "Hacemos que tu negocio opere mejor con automatización inteligente",
      subtitle:
        "Diseñamos, implementamos y optimizamos flujos con IA para ahorrar tiempo, reducir costos y acelerar crecimiento.",
      primaryCta: "Enviar mensaje",
      secondaryCta: "Ver servicios",
      trust: ["+2 años en el mercado", "Implementación end-to-end", "Enfoque práctico para PyMEs"]
    },
    services: {
      eyebrow: "Qué hacemos",
      title: "Servicios diseñados para impacto real",
      intro:
        "Soluciones aplicadas que conectan operación, ventas y atención para que tu equipo haga más con menos fricción.",
      items: [
        {
          title: "Asistentes con IA",
          description: "Chatbots y asistentes internos para atención, soporte y operación diaria."
        },
        {
          title: "Automatización de procesos",
          description: "Flujos automáticos entre formularios, CRM, correo, hojas de cálculo y más."
        },
        {
          title: "Analítica y tableros",
          description: "Visibilidad de KPIs en tiempo real para tomar decisiones con datos."
        },
        {
          title: "Soluciones a medida",
          description: "Arquitectura e integración personalizada para retos específicos de tu negocio."
        }
      ]
    },
    process: {
      eyebrow: "Cómo trabajamos",
      title: "Un proceso claro, rápido y medible",
      steps: [
        {
          title: "Diagnóstico",
          description: "Mapeamos tus procesos actuales e identificamos cuellos de botella prioritarios."
        },
        {
          title: "Diseño",
          description: "Definimos la arquitectura y el plan de implementación orientado a resultados."
        },
        {
          title: "Implementación",
          description: "Construimos, integramos y documentamos la solución en tu operación real."
        },
        {
          title: "Optimización",
          description: "Medimos impacto y ajustamos para mejorar rendimiento de forma continua."
        }
      ]
    },
    results: {
      eyebrow: "Resultados",
      title: "Transformación operativa que sí se nota",
      metrics: [
        { label: "Horas ahorradas por semana", value: 35, suffix: "+" },
        { label: "Reducción de tareas manuales", value: 60, suffix: "%" },
        { label: "Tiempo de respuesta más rápido", value: 4, suffix: "x" }
      ],
      testimonials: [
        {
          quote:
            "Pasamos de procesos dispersos a una operación conectada. El impacto fue visible en semanas.",
          author: "Cliente PyME",
          role: "Dirección Operativa"
        },
        {
          quote:
            "La implementación fue clara y sin fricción. Ahora tenemos control y trazabilidad en cada flujo.",
          author: "Cliente Servicios",
          role: "Gerencia General"
        }
      ]
    },
    about: {
      eyebrow: "Por qué Infinity Cloud Solutions",
      title: "Tecnología aplicada con contexto local",
      story:
        "Somos un equipo especializado en automatización e IA para pequeñas y medianas empresas en México. Combinamos visión estratégica y ejecución técnica para resolver problemas de negocio concretos.",
      differentiators: [
        "Enfoque práctico: priorizamos valor antes que complejidad",
        "Acompañamiento cercano durante toda la implementación",
        "Soluciones escalables adaptadas al mercado mexicano"
      ]
    },
    contact: {
      eyebrow: "Contacto",
      title: "Cuéntanos tu reto y te contactamos",
      description:
        "Envíanos un mensaje y nuestro equipo te responderá por correo para iniciar la conversación.",
      fields: {
        name: "Nombre",
        email: "Correo electrónico",
        company: "Empresa",
        phone: "Teléfono",
        message: "Mensaje"
      },
      submit: "Enviar mensaje",
      loading: "Enviando...",
      success: "Mensaje enviado. Te contactaremos pronto.",
      error: "No se pudo enviar tu mensaje. Intenta de nuevo."
    },
    footer: {
      tagline: "Automatización e IA para PyMEs en México",
      rights: "Todos los derechos reservados."
    }
  },
  en: {
    nav: {
      services: "Services",
      process: "Process",
      results: "Results",
      about: "About",
      contact: "Contact",
      cta: "Book a consultation"
    },
    hero: {
      badge: "Automation and AI for small businesses in Mexico",
      title: "We help your business run smarter with purposeful automation",
      subtitle:
        "We design, implement, and optimize AI-powered workflows to save time, cut costs, and unlock growth.",
      primaryCta: "Send message",
      secondaryCta: "View services",
      trust: ["2+ years in market", "End-to-end implementation", "Practical SMB-focused approach"]
    },
    services: {
      eyebrow: "What we do",
      title: "Services designed for measurable impact",
      intro:
        "Applied solutions that connect operations, sales, and support so your team can do more with less friction.",
      items: [
        {
          title: "AI Assistants",
          description: "Chatbots and internal assistants for customer service, support, and daily operations."
        },
        {
          title: "Process Automation",
          description: "Automated flows across forms, CRM, email, spreadsheets, and business tools."
        },
        {
          title: "Analytics & Dashboards",
          description: "Real-time KPI visibility for faster, better decision-making."
        },
        {
          title: "Custom Solutions",
          description: "Tailored architecture and integrations for your most specific business challenges."
        }
      ]
    },
    process: {
      eyebrow: "How we work",
      title: "A clear, fast, and measurable process",
      steps: [
        {
          title: "Discovery",
          description: "We map your current workflows and identify the highest-impact bottlenecks."
        },
        {
          title: "Design",
          description: "We define architecture and an implementation roadmap focused on outcomes."
        },
        {
          title: "Implementation",
          description: "We build, integrate, and document the solution in your real operation."
        },
        {
          title: "Optimization",
          description: "We measure impact and iterate continuously to improve performance."
        }
      ]
    },
    results: {
      eyebrow: "Results",
      title: "Operational transformation you can actually feel",
      metrics: [
        { label: "Hours saved per week", value: 35, suffix: "+" },
        { label: "Manual tasks reduced", value: 60, suffix: "%" },
        { label: "Faster response time", value: 4, suffix: "x" }
      ],
      testimonials: [
        {
          quote:
            "We moved from fragmented operations to connected systems. The impact was visible in weeks.",
          author: "SMB Client",
          role: "Operations Director"
        },
        {
          quote:
            "Implementation was clear and frictionless. We now have visibility and traceability across every flow.",
          author: "Services Client",
          role: "General Manager"
        }
      ]
    },
    about: {
      eyebrow: "Why Infinity Cloud Solutions",
      title: "Applied technology with local market context",
      story:
        "We are a team specialized in automation and AI for small and medium businesses in Mexico. We combine strategic vision with technical execution to solve concrete business problems.",
      differentiators: [
        "Practical-first approach: value before complexity",
        "Close collaboration from kickoff to handoff",
        "Scalable solutions adapted to the Mexican market"
      ]
    },
    contact: {
      eyebrow: "Contact",
      title: "Share your challenge and we will reach out",
      description:
        "Send us a message and our team will reply by email to start the conversation.",
      fields: {
        name: "Name",
        email: "Email",
        company: "Company",
        phone: "Phone",
        message: "Message"
      },
      submit: "Send message",
      loading: "Sending...",
      success: "Message sent. We will contact you soon.",
      error: "We could not send your message. Please try again."
    },
    footer: {
      tagline: "Automation and AI for small businesses in Mexico",
      rights: "All rights reserved."
    }
  }
};
```

- [ ] Copy and paste code below into `lib/i18n.tsx`:

```tsx
"use client";

import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { type Locale, translations } from "@/lib/translations";

type I18nContextValue = {
  lang: Locale;
  setLang: (next: Locale) => void;
  t: (typeof translations)[Locale];
};

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "ics_lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Locale>("es");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "es" || stored === "en") {
      setLangState(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      setLang: setLangState,
      t: translations[lang]
    }),
    [lang]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used inside LanguageProvider");
  }
  return context;
}
```

- [ ] Copy and paste code below into `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope, Space_Mono } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "700", "800"]
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"]
});

const mono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"]
});

export const metadata: Metadata = {
  title: "Infinity Cloud Solutions | Automatización e IA",
  description:
    "Automatización e IA para pequeñas y medianas empresas en México. Diseñamos soluciones prácticas para crecer con eficiencia.",
  metadataBase: new URL("https://infinitycloudsolutions.com"),
  openGraph: {
    title: "Infinity Cloud Solutions",
    description:
      "Automatización e IA para pequeñas y medianas empresas en México.",
    url: "https://infinitycloudsolutions.com",
    siteName: "Infinity Cloud Solutions",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/images/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Infinity Cloud Solutions"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Infinity Cloud Solutions",
    description:
      "Automation and AI consulting for small businesses in Mexico.",
    images: ["/images/og-image.svg"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${display.variable} ${body.variable} ${mono.variable}`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
```

- [ ] Copy and paste code below into `app/globals.css`:

```css
@import "tailwindcss";

:root {
  --bg-primary: #0a0a0a;
  --bg-surface: #141414;
  --text-primary: #f5f0eb;
  --text-muted: #a79f96;
  --accent-primary: #e85d26;
  --accent-secondary: #2dd4a8;
  --accent-tertiary: #c4a265;
  --stroke: #2a2a2a;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100dvh;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-body), sans-serif;
  text-rendering: optimizeLegibility;
}

a {
  color: inherit;
  text-decoration: none;
}

.main-shell {
  position: relative;
  isolation: isolate;
  overflow: clip;
}

.main-shell::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image: radial-gradient(circle at 20% 20%, rgb(232 93 38 / 0.14), transparent 38%),
    radial-gradient(circle at 80% 40%, rgb(45 212 168 / 0.08), transparent 36%),
    radial-gradient(circle at 50% 80%, rgb(196 162 101 / 0.07), transparent 42%);
  z-index: -2;
}

.main-shell::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
  mix-blend-mode: soft-light;
  z-index: -1;
}

.section-wrap {
  width: min(1120px, 92vw);
  margin-inline: auto;
  padding-block: 5rem;
}

.eyebrow {
  font-family: var(--font-mono), monospace;
  color: var(--accent-tertiary);
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.section-title {
  font-family: var(--font-display), sans-serif;
  line-height: 1.04;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.card-surface {
  border: 1px solid color-mix(in srgb, var(--stroke), #ffffff 6%);
  background: color-mix(in srgb, var(--bg-surface), #ffffff 2%);
  backdrop-filter: blur(8px);
}

.focus-visible-ring:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}
```

- [ ] Copy and paste code below into `app/page.tsx`:

```tsx
export default function HomePage() {
  return (
    <main className="main-shell">
      <section className="section-wrap">
        <p className="eyebrow">Infinity Cloud Solutions</p>
        <h1 className="section-title text-4xl md:text-6xl">Landing page scaffold ready</h1>
        <p className="mt-4 max-w-2xl text-[color:var(--text-muted)]">
          Base configuration, typography, color system, and bilingual foundation are installed.
        </p>
      </section>
    </main>
  );
}
```

- [ ] Install dependencies.

```bash
pnpm install
```

##### Step 1 Verification Checklist
- [ ] `pnpm dev` starts without runtime errors.
- [ ] Home page renders dark theme, grain texture, and typography.
- [ ] `pnpm lint` and `pnpm typecheck` pass.

#### Step 1 STOP & COMMIT
**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.

---

#### Step 2: Build Navbar, Language toggle, and Hero with purposeful animation
- [ ] Create the language toggle component.
- [ ] Copy and paste code below into `components/LanguageToggle.tsx`:

```tsx
"use client";

import { useI18n } from "@/lib/i18n";

export function LanguageToggle() {
  const { lang, setLang } = useI18n();

  return (
    <div className="card-surface inline-flex rounded-full p-1">
      {([
        { value: "es", label: "ES" },
        { value: "en", label: "EN" }
      ] as const).map((item) => {
        const active = lang === item.value;
        return (
          <button
            key={item.value}
            type="button"
            onClick={() => setLang(item.value)}
            className={`focus-visible-ring rounded-full px-3 py-1.5 text-xs font-semibold tracking-[0.08em] transition ${
              active
                ? "bg-[color:var(--accent-primary)] text-black"
                : "text-[color:var(--text-muted)] hover:text-[color:var(--text-primary)]"
            }`}
            aria-pressed={active}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
```

- [ ] Create sticky navigation.
- [ ] Copy and paste code below into `components/Navbar.tsx`:

```tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useI18n } from "@/lib/i18n";

const links = [
  { key: "services", href: "#services" },
  { key: "process", href: "#process" },
  { key: "results", href: "#results" },
  { key: "about", href: "#about" },
  { key: "contact", href: "#contact" }
] as const;

export function Navbar() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition ${
        scrolled
          ? "border-white/10 bg-black/65 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 w-[min(1200px,94vw)] items-center justify-between gap-4">
        <Link href="#top" className="focus-visible-ring group inline-flex items-center gap-2 rounded-md">
          <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--accent-primary)] transition group-hover:scale-110" />
          <span className="font-[var(--font-display)] text-sm uppercase tracking-[0.12em]">
            Infinity Cloud Solutions
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.key}>
              <Link
                href={link.href}
                className="focus-visible-ring rounded-sm text-sm text-[color:var(--text-muted)] transition hover:text-[color:var(--text-primary)]"
              >
                {t.nav[link.key]}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <Link
            href="#contact"
            className="focus-visible-ring hidden rounded-full bg-[color:var(--accent-primary)] px-4 py-2 text-sm font-semibold text-black transition hover:brightness-110 md:inline-flex"
          >
            {t.nav.cta}
          </Link>
        </div>
      </nav>
    </header>
  );
}
```

- [ ] Create animated hero section.
- [ ] Copy and paste code below into `components/Hero.tsx`:

```tsx
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useI18n } from "@/lib/i18n";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const }
  }
};

export function Hero() {
  const { t } = useI18n();

  return (
    <section id="top" className="section-wrap pb-20 pt-12 md:pt-20">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid items-end gap-10 md:grid-cols-[1.1fr_0.9fr]"
      >
        <div>
          <motion.p variants={fadeUp} className="eyebrow">
            {t.hero.badge}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="section-title mt-4 max-w-3xl text-4xl md:text-6xl xl:text-7xl"
          >
            {t.hero.title}
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-base leading-relaxed text-[color:var(--text-muted)] md:text-lg">
            {t.hero.subtitle}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="#contact"
              className="focus-visible-ring rounded-full bg-[color:var(--accent-primary)] px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:brightness-110"
            >
              {t.hero.primaryCta}
            </Link>
            <Link
              href="#services"
              className="focus-visible-ring rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-[color:var(--text-primary)] transition hover:border-[color:var(--accent-tertiary)] hover:text-[color:var(--accent-tertiary)]"
            >
              {t.hero.secondaryCta}
            </Link>
          </motion.div>

          <motion.ul variants={fadeUp} className="mt-12 grid gap-3 md:grid-cols-3">
            {t.hero.trust.map((item) => (
              <li key={item} className="card-surface rounded-xl p-3 text-xs text-[color:var(--text-muted)]">
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div variants={fadeUp} className="relative h-[360px] overflow-hidden rounded-[2rem] border border-white/10">
          <motion.div
            className="absolute inset-[-20%]"
            animate={{ rotate: [0, 8, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background:
                "conic-gradient(from 120deg at 50% 50%, rgba(232,93,38,0.7), rgba(45,212,168,0.38), rgba(196,162,101,0.45), rgba(232,93,38,0.7))",
              filter: "blur(24px)"
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,0,0,0.42),rgba(0,0,0,0.1))]" />
          <div className="absolute bottom-8 left-8 right-8 card-surface rounded-2xl p-5">
            <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.14em] text-[color:var(--accent-tertiary)]">
              Systems in motion
            </p>
            <p className="mt-2 text-sm text-[color:var(--text-muted)]">
              Every movement in this interface represents process flow: diagnose, design, implement, optimize.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
```

- [ ] Replace homepage composition.
- [ ] Copy and paste code below into `app/page.tsx`:

```tsx
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";

function PlaceholderSection({ id, title }: { id: string; title: string }) {
  return (
    <section id={id} className="section-wrap border-t border-white/5">
      <p className="eyebrow">Coming next</p>
      <h2 className="section-title mt-4 text-3xl">{title}</h2>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="main-shell">
      <Navbar />
      <Hero />
      <PlaceholderSection id="services" title="Services section" />
      <PlaceholderSection id="process" title="Process section" />
      <PlaceholderSection id="results" title="Results section" />
      <PlaceholderSection id="about" title="About section" />
      <PlaceholderSection id="contact" title="Contact section" />
    </main>
  );
}
```

##### Step 2 Verification Checklist
- [ ] Navbar stays sticky and gains blur/border after scroll.
- [ ] Language toggle switches between ES and EN copy in hero/navbar.
- [ ] Hero reveals with staggered animation and animated visual panel.
- [ ] `pnpm lint` and `pnpm typecheck` pass.

#### Step 2 STOP & COMMIT
**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.

---

#### Step 3: Implement Services and Process sections
 - [x] Create Services section with 3D hover cards.
 - [x] Copy and paste code below into `components/Services.tsx`:

```tsx
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
            className="card-surface group rounded-2xl p-6"
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
```

 - [x] Create Process timeline section.
 - [x] Copy and paste code below into `components/Process.tsx`:

```tsx
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
            className="card-surface relative rounded-2xl p-6 md:ml-6"
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
```

 - [x] Update page composition.
 - [x] Copy and paste code below into `app/page.tsx`:

```tsx
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";

function PlaceholderSection({ id, title }: { id: string; title: string }) {
  return (
    <section id={id} className="section-wrap border-t border-white/5">
      <p className="eyebrow">Coming next</p>
      <h2 className="section-title mt-4 text-3xl">{title}</h2>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="main-shell">
      <Navbar />
      <Hero />
      <Services />
      <Process />
      <PlaceholderSection id="results" title="Results section" />
      <PlaceholderSection id="about" title="About section" />
      <PlaceholderSection id="contact" title="Contact section" />
    </main>
  );
}
```

##### Step 3 Verification Checklist
- [ ] Services cards animate in on scroll and tilt on hover.
- [ ] Process timeline shows 4 clear steps with connected visual flow.
- [ ] Section anchors from navbar scroll correctly.
- [ ] `pnpm lint` and `pnpm typecheck` pass.

#### Step 3 STOP & COMMIT
**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.

---

#### Step 4: Implement Results and About sections
- [ ] Create Results section with in-view count-up metrics.
- [ ] Copy and paste code below into `components/Results.tsx`:

```tsx
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
    <article className="card-surface rounded-2xl p-6">
      <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.12em] text-[color:var(--accent-tertiary)]">
        KPI
      </p>
      <p ref={ref} className="mt-4 font-[var(--font-display)] text-5xl leading-none text-[color:var(--accent-primary)]">
        {count}
        {suffix}
      </p>
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
            className="card-surface rounded-2xl p-6"
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
```

- [ ] Create About section.
- [ ] Copy and paste code below into `components/About.tsx`:

```tsx
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
```

- [ ] Update page composition.
- [ ] Copy and paste code below into `app/page.tsx`:

```tsx
import { About } from "@/components/About";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Process } from "@/components/Process";
import { Results } from "@/components/Results";
import { Services } from "@/components/Services";

function PlaceholderSection({ id, title }: { id: string; title: string }) {
  return (
    <section id={id} className="section-wrap border-t border-white/5">
      <p className="eyebrow">Coming next</p>
      <h2 className="section-title mt-4 text-3xl">{title}</h2>
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="main-shell">
      <Navbar />
      <Hero />
      <Services />
      <Process />
      <Results />
      <About />
      <PlaceholderSection id="contact" title="Contact section" />
    </main>
  );
}
```

##### Step 4 Verification Checklist
- [ ] Metrics count up when section enters viewport.
- [ ] Testimonials and about differentiators render in both languages.
- [ ] Page remains responsive across mobile/tablet/desktop.
- [ ] `pnpm lint` and `pnpm typecheck` pass.

#### Step 4 STOP & COMMIT
**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.

---

#### Step 5: Implement Contact, Footer, and email API route
- [ ] Create Resend client helper.
- [ ] Copy and paste code below into `lib/resend.ts`:

```ts
import { Resend } from "resend";

let resendClient: Resend | null = null;

export function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("Missing RESEND_API_KEY environment variable");
  }
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}
```

- [ ] Create API route with validation and consistent errors.
- [ ] Copy and paste code below into `app/api/contact/route.ts`:

```ts
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getResendClient } from "@/lib/resend";

export const runtime = "nodejs";

const bodySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email().max(200),
  company: z.string().trim().max(120).optional(),
  phone: z.string().trim().max(40).optional(),
  message: z.string().trim().min(10).max(1500),
  locale: z.enum(["es", "en"]) 
});

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const parsed = bodySchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Invalid request payload"
        },
        { status: 400 }
      );
    }

    const contactEmail = process.env.CONTACT_EMAIL;
    if (!contactEmail) {
      return NextResponse.json(
        {
          ok: false,
          error: "Server is missing CONTACT_EMAIL"
        },
        { status: 500 }
      );
    }

    const { name, email, company, phone, message, locale } = parsed.data;

    const resend = getResendClient();

    await resend.emails.send({
      from: "Infinity Cloud Solutions <noreply@infinitycloudsolutions.com>",
      to: contactEmail,
      subject: `Nuevo lead desde landing: ${name}`,
      replyTo: email,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company ?? "N/A"}`,
        `Phone: ${phone ?? "N/A"}`,
        `Locale: ${locale}`,
        "",
        message
      ].join("\n")
    });

    await resend.emails.send({
      from: "Infinity Cloud Solutions <noreply@infinitycloudsolutions.com>",
      to: email,
      subject: locale === "es" ? "Recibimos tu mensaje" : "We received your message",
      text:
        locale === "es"
          ? "Gracias por escribirnos. Nuestro equipo te contactará pronto."
          : "Thanks for reaching out. Our team will contact you shortly."
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Contact route error", error);
    return NextResponse.json(
      {
        ok: false,
        error: "Unexpected server error"
      },
      { status: 500 }
    );
  }
}
```

- [ ] Create Contact section and async submit flow.
- [ ] Copy and paste code below into `components/Contact.tsx`:

```tsx
"use client";

import { type FormEvent, useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n";

type FormState = {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  company: "",
  phone: "",
  message: ""
};

export function Contact() {
  const { t, lang } = useI18n();
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const canSubmit = useMemo(
    () => form.name.trim().length > 1 && form.email.includes("@") && form.message.trim().length >= 10,
    [form]
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit || status === "loading") return;

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale: lang })
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm(initialState);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section-wrap">
      <p className="eyebrow">{t.contact.eyebrow}</p>
      <h2 className="section-title mt-4 max-w-3xl text-3xl md:text-5xl">{t.contact.title}</h2>
      <p className="mt-6 max-w-2xl text-[color:var(--text-muted)]">{t.contact.description}</p>

      <form onSubmit={onSubmit} className="card-surface mt-10 grid gap-4 rounded-2xl p-6 md:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span>{t.contact.fields.name}</span>
          <input
            required
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            className="focus-visible-ring h-11 rounded-lg border border-white/15 bg-black/40 px-3 outline-none"
            name="name"
            autoComplete="name"
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span>{t.contact.fields.email}</span>
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            className="focus-visible-ring h-11 rounded-lg border border-white/15 bg-black/40 px-3 outline-none"
            name="email"
            autoComplete="email"
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span>{t.contact.fields.company}</span>
          <input
            value={form.company}
            onChange={(event) => setForm((prev) => ({ ...prev, company: event.target.value }))}
            className="focus-visible-ring h-11 rounded-lg border border-white/15 bg-black/40 px-3 outline-none"
            name="company"
            autoComplete="organization"
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span>{t.contact.fields.phone}</span>
          <input
            value={form.phone}
            onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
            className="focus-visible-ring h-11 rounded-lg border border-white/15 bg-black/40 px-3 outline-none"
            name="phone"
            autoComplete="tel"
          />
        </label>

        <label className="grid gap-2 text-sm md:col-span-2">
          <span>{t.contact.fields.message}</span>
          <textarea
            required
            rows={6}
            value={form.message}
            onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
            className="focus-visible-ring rounded-lg border border-white/15 bg-black/40 p-3 outline-none"
            name="message"
          />
        </label>

        <div className="md:col-span-2 flex items-center justify-between gap-4">
          <button
            type="submit"
            disabled={!canSubmit || status === "loading"}
            className="focus-visible-ring inline-flex h-11 items-center rounded-full bg-[color:var(--accent-primary)] px-6 text-sm font-semibold text-black transition enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading" ? t.contact.loading : t.contact.submit}
          </button>

          {status === "success" && (
            <p className="text-sm text-[color:var(--accent-secondary)]">{t.contact.success}</p>
          )}
          {status === "error" && <p className="text-sm text-red-300">{t.contact.error}</p>}
        </div>
      </form>
    </section>
  );
}
```

- [ ] Create Footer section.
- [ ] Copy and paste code below into `components/Footer.tsx`:

```tsx
"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-white/10">
      <div className="section-wrap py-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-[var(--font-display)] text-xl">Infinity Cloud Solutions</p>
            <p className="mt-2 text-sm text-[color:var(--text-muted)]">{t.footer.tagline}</p>
            <p className="mt-4 text-xs text-[color:var(--text-muted)]">Hecho en México 🇲🇽</p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[color:var(--text-muted)]">
            <Link href="#services" className="hover:text-[color:var(--text-primary)]">
              {t.nav.services}
            </Link>
            <Link href="#process" className="hover:text-[color:var(--text-primary)]">
              {t.nav.process}
            </Link>
            <Link href="#results" className="hover:text-[color:var(--text-primary)]">
              {t.nav.results}
            </Link>
            <Link href="#about" className="hover:text-[color:var(--text-primary)]">
              {t.nav.about}
            </Link>
            <Link href="#contact" className="hover:text-[color:var(--text-primary)]">
              {t.nav.contact}
            </Link>
          </div>
        </div>

        <p className="mt-8 text-xs text-[color:var(--text-muted)]">
          © {new Date().getFullYear()} Infinity Cloud Solutions. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
```

- [ ] Update page composition.
- [ ] Copy and paste code below into `app/page.tsx`:

```tsx
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Process } from "@/components/Process";
import { Results } from "@/components/Results";
import { Services } from "@/components/Services";

export default function HomePage() {
  return (
    <main className="main-shell">
      <Navbar />
      <Hero />
      <Services />
      <Process />
      <Results />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
```

##### Step 5 Verification Checklist
- [ ] Form validates required fields and blocks invalid submissions.
- [ ] Successful submit shows success state and clears inputs.
- [ ] API route returns `400` for invalid payload and `200` for valid payload.
- [ ] Team receives lead email when `RESEND_API_KEY` and `CONTACT_EMAIL` are configured.
- [ ] `pnpm lint`, `pnpm typecheck`, and `pnpm build` pass.

#### Step 5 STOP & COMMIT
**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.

---

#### Step 6: Final polish, SEO assets, accessibility checks, and docs
- [ ] Add Open Graph image placeholder asset.
- [ ] Copy and paste code below into `public/images/og-image.svg`:

```svg
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0A0A0A"/>
  <circle cx="230" cy="180" r="240" fill="#E85D26" fill-opacity="0.22"/>
  <circle cx="980" cy="170" r="210" fill="#2DD4A8" fill-opacity="0.18"/>
  <circle cx="760" cy="520" r="240" fill="#C4A265" fill-opacity="0.18"/>
  <rect x="104" y="88" width="992" height="454" rx="32" fill="#141414" stroke="#2A2A2A"/>
  <text x="148" y="250" fill="#F5F0EB" font-family="Arial, sans-serif" font-size="74" font-weight="700">Infinity Cloud Solutions</text>
  <text x="148" y="320" fill="#F5F0EB" font-family="Arial, sans-serif" font-size="32" opacity="0.88">Automation and AI for small businesses in Mexico</text>
  <text x="148" y="430" fill="#C4A265" font-family="monospace" font-size="24" letter-spacing="3">INDUSTRIAL LUXE • OPERATIONAL IMPACT</text>
</svg>
```

- [ ] Enhance global styles for final interaction polish.
- [ ] Replace `app/globals.css` with:

```css
@import "tailwindcss";

:root {
  --bg-primary: #0a0a0a;
  --bg-surface: #141414;
  --text-primary: #f5f0eb;
  --text-muted: #a79f96;
  --accent-primary: #e85d26;
  --accent-secondary: #2dd4a8;
  --accent-tertiary: #c4a265;
  --stroke: #2a2a2a;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100dvh;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-body), sans-serif;
  text-rendering: optimizeLegibility;
}

a {
  color: inherit;
  text-decoration: none;
}

.main-shell {
  position: relative;
  isolation: isolate;
  overflow: clip;
}

.main-shell::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image: radial-gradient(circle at 18% 18%, rgb(232 93 38 / 0.14), transparent 38%),
    radial-gradient(circle at 82% 38%, rgb(45 212 168 / 0.08), transparent 36%),
    radial-gradient(circle at 52% 84%, rgb(196 162 101 / 0.07), transparent 42%);
  z-index: -2;
}

.main-shell::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image: linear-gradient(to right, rgb(255 255 255 / 0.02) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(255 255 255 / 0.02) 1px, transparent 1px),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
  background-size: 48px 48px, 48px 48px, auto;
  mix-blend-mode: soft-light;
  z-index: -1;
}

.section-wrap {
  width: min(1120px, 92vw);
  margin-inline: auto;
  padding-block: 5rem;
}

.eyebrow {
  font-family: var(--font-mono), monospace;
  color: var(--accent-tertiary);
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.section-title {
  font-family: var(--font-display), sans-serif;
  line-height: 1.04;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.card-surface {
  border: 1px solid color-mix(in srgb, var(--stroke), #ffffff 6%);
  background: color-mix(in srgb, var(--bg-surface), #ffffff 2%);
  backdrop-filter: blur(8px);
}

.focus-visible-ring:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}

@media (max-width: 780px) {
  .section-wrap {
    padding-block: 3.8rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] Update project documentation.
- [ ] Copy and paste code below into `README.md`:

```md
# Infinity Cloud Solutions Landing Page

Bilingual (ES/EN) marketing site for Infinity Cloud Solutions, built with Next.js 15, Tailwind CSS v4, Motion, and Resend.

## Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Motion (`motion/react`)
- Resend (email delivery)
- Zod (request validation)

## Local setup
1. Install dependencies:
   ```bash
   pnpm install
   ```
2. Create your env file:
   ```bash
   cp .env.local.example .env.local
   ```
3. Set values in `.env.local`:
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL`
4. Run dev server:
   ```bash
   pnpm dev
   ```

## Quality checks
```bash
pnpm lint
pnpm typecheck
pnpm build
```

## Contact form flow
1. User submits form in the Contact section.
2. Client sends JSON payload to `POST /api/contact`.
3. API validates payload with Zod.
4. API sends:
   - one lead email to your team (`CONTACT_EMAIL`)
   - one auto-confirmation email to the lead

## Deployment (Vercel)
1. Push branch to GitHub.
2. Import repository in Vercel.
3. Add environment variables in Vercel project settings.
4. Deploy.

## Notes
- Default language is Spanish; users can toggle to English.
- Theme follows an industrial-luxe visual direction.
```

- [ ] Optional Vercel config (only if needed for custom behavior). If required, create `vercel.json`:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "nextjs"
}
```

##### Step 6 Verification Checklist
- [ ] Lighthouse targets met on production-like build: Performance ≥ 90, SEO ≥ 95, Accessibility ≥ 90.
- [ ] Open Graph image appears in preview tools.
- [ ] Keyboard navigation works for nav links, language toggle, and form controls.
- [ ] Full flow works: landing → section navigation → form submit → success message.
- [ ] `pnpm build` succeeds and deployment to Vercel completes.

#### Step 6 STOP & COMMIT
**STOP & COMMIT:** Agent must stop here and wait for the user to test, stage, and commit the change.

---

## Final Validation Command Set
Run this before opening the PR:

```bash
pnpm lint && pnpm typecheck && pnpm build
```

## Pull Request Checklist
- [ ] All six commits exist and match the step boundaries.
- [ ] Every step was manually validated before commit.
- [ ] No credentials committed.
- [ ] `README.md` reflects actual setup.
- [ ] Contact emails are tested with valid Resend domain/sender.
