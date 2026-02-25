# Infinity Cloud Solutions — Landing Page

**Branch:** `feat/landing-page`
**Description:** Build a visually striking, bilingual, lead-capturing landing page for Infinity Cloud Solutions — an AI automation consultancy serving the Mexican small business market.

## Goal
Create a production-grade, bilingual (Spanish default + English toggle) single-page landing site that showcases Infinity Cloud Solutions' automation and AI services, establishes credibility, and captures leads through an async contact form (user submits → team gets emailed → team reaches out). The design must be bold, dynamic with an animation or some movement not random but with a meaning, memorable, and intentionally distinct from generic "vibe-coded" AI websites.
If we need to use images, we can get it from www.unsplash.com

## Tech Stack
| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (CSS-first config) |
| Animations | Motion (framer-motion v12+) |
| Email/Forms | Resend API via Next.js API Route |
| i18n | Custom context-based toggle (ES/EN) |
| Fonts | Google Fonts via `next/font` |
| Deployment | Vercel (zero-config) |
| Package Manager | pnpm |

## Design Direction: "Industrial Luxe"
A fusion of brutalist structure with refined luxury details — high-end architecture firm meets Mexico City tech studio. Dark theme with warm terracotta/burnt-orange accent as the dominant color.

**Typography:** Clash Display (headlines) + Satoshi (body) + Space Mono (numbers/accents)
**Palette:** Near-black base (`#0A0A0A`), warm white text (`#F5F0EB`), burnt orange accent (`#E85D26`), electric teal secondary (`#2DD4A8`), aged gold tertiary (`#C4A265`)
**Layout:** Asymmetric grids, overlapping sections, generous whitespace, grid-breaking geometric shapes
**Motion:** Staggered page-load reveal, scroll-triggered section entrances, magnetic hover buttons, count-up stats
**Texture:** Noise/grain overlay on dark background, subtle gradient mesh in hero, faint geometric grid patterns

## Sections
1. **Navbar** — Sticky header with logo, nav links (Servicios, Proceso, Resultados, Nosotros, Contacto), language toggle (ES/EN), CTA button. Blurs/shrinks on scroll.
2. **Hero** — Bold headline, subheadline, dual CTA (primary: "Agenda tu consulta gratis" / secondary: "Ver servicios"), abstract animated visual, trust badge row.
3. **Services** — 3–4 service cards (AI Chatbots, Process Automation, Data Analytics, Custom AI Solutions) in a 2×2 grid with tilt hover effects.
4. **Process** — 4-step numbered timeline (Diagnóstico → Diseño → Implementación → Optimización) with connected visual flow.
5. **Results / Social Proof** — Key metrics with count-up animations, testimonial quotes, client logos (placeholders initially).
6. **About / Why Us** — Company story, 2–3 differentiators, trust elements and tech stack logos.
7. **Contact** — Contact form (Name, Email, Company, Phone, Message) with async submission — form data emailed to the team, success confirmation shown to user.
8. **Footer** — Logo, quick links, contact info, social links, "Hecho en México 🇲🇽", copyright.

## Lead Capture — Async Contact Form
Single-channel for now: a contact form that submits to a Next.js API route, which emails the form data to the team via Resend API. The team then reaches out to the lead directly. WhatsApp bot integration planned for a future phase.

---

## Implementation Steps

### Step 1: Project Scaffolding & Configuration
**Files:** `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, `app/layout.tsx`, `app/globals.css`, `app/page.tsx`, `lib/i18n.tsx`, `lib/translations.ts`, `.env.local.example`, `.gitignore`
**What:** Initialize Next.js 15 with TypeScript, Tailwind CSS v4, and Motion. Configure fonts (Clash Display via Fontshare or fallback, Satoshi, Space Mono via `next/font`). Set up CSS custom properties for the full color palette, noise texture, and base dark-theme styles. Create root layout with metadata (SEO: title, description, OG image placeholder). Set up i18n infrastructure: a React context-based language provider (`lib/i18n.tsx`) and translation dictionary (`lib/translations.ts`) with ES/EN strings. Stub out `page.tsx` with section placeholders.
**Testing:** `pnpm dev` runs without errors. Page loads with dark background, correct fonts rendering, CSS variables applied, and language toggle switches all text between Spanish and English.

**Status:** ✅ Step 1 completed — scaffolding files added (basic configs, root layout, globals, i18n, translations, env example, gitignore).

### Step 2: Navbar + Hero Section
**Files:** `components/Navbar.tsx`, `components/Hero.tsx`, `components/LanguageToggle.tsx`, `app/page.tsx`, `app/globals.css`
**What:** Build the sticky navbar with logo wordmark, navigation links (smooth-scroll anchors), language toggle (ES/EN), and primary CTA button. Implement scroll-triggered blur/shrink behavior. Build the hero section with staggered headline animation (word-by-word reveal), subheadline fade-in, dual CTA buttons with magnetic hover effect, and an abstract animated gradient mesh or geometric visual. Include a trust metrics row at the bottom of the hero. All text sourced from the translation dictionary.
**Testing:** Page load shows orchestrated hero animation. Navbar shrinks and blurs on scroll. Language toggle switches all text. CTA buttons have hover effects. Navigation links smooth-scroll to section anchors. Fully responsive on mobile.

### Step 3: Services + Process Sections
**Files:** `components/Services.tsx`, `components/Process.tsx`, `app/page.tsx`
**What:** Build the Services section with 4 service cards in a responsive grid — each card has an icon, title, description, and subtle 3D tilt hover effect. Build the Process section as a 4-step visual timeline with numbered indicators, step titles, descriptions, and connected flow lines. Both sections use `whileInView` scroll-triggered entrance animations.
**Testing:** Sections animate in on scroll. Service cards tilt on hover. Process timeline is visually connected. Responsive stacking on mobile.

### Step 4: Results + About Sections
**Files:** `components/Results.tsx`, `components/About.tsx`, `app/page.tsx`
**What:** Build the Results section with 3–4 key metric cards featuring count-up number animations (triggered on viewport entry), 1–2 testimonial quote blocks, and a client logos row (placeholder logos initially). Build the About section with company narrative, differentiator cards, and tech/partner logos. Both sections have scroll-triggered reveals.
**Testing:** Numbers animate from 0 to target value when scrolled into view. Testimonials display correctly. About section tells a coherent story. Responsive.

### Step 5: Contact Section + API Route + Footer
**Files:** `components/Contact.tsx`, `components/Footer.tsx`, `app/api/contact/route.ts`, `lib/resend.ts`, `app/page.tsx`, `.env.local.example`
**What:** Build the Contact section with a styled form (Name, Email, Company, Phone, Message), client-side validation, submission handler, loading/success/error states. Create the Next.js API route (`app/api/contact/route.ts`) that receives form data and emails it to the team via Resend API, plus sends an auto-confirmation to the lead. Build the footer with logo, quick links, contact info, social placeholders, and "Hecho en México" badge. All text bilingual via translation dictionary.
**Testing:** Form submits and shows success state (with valid Resend key, email arrives; without key, API route returns graceful error). Validation prevents empty submissions. Footer links work. Fully responsive.

### Step 6: Polish, SEO & Deployment Config
**Files:** `app/layout.tsx`, `app/globals.css`, `public/` (OG image placeholder), `next.config.ts`, `README.md`, `vercel.json` (if needed)
**What:** Final visual polish pass — fine-tune animations timing, spacing, responsive breakpoints, and color consistency. Add comprehensive SEO metadata (Open Graph, Twitter cards, structured data). Add subtle background textures (noise grain, geometric patterns) and atmospheric effects. Ensure accessibility (focus states, alt text, ARIA labels, keyboard navigation). Update README with setup instructions, env variables, and deployment guide. Test full Vercel deployment flow.
**Testing:** Lighthouse audit: Performance > 90, SEO > 95, Accessibility > 90. OG preview renders correctly. Full end-to-end user flow works: land → scroll → read → submit form or click WhatsApp. Deploys successfully to Vercel.

---

## Environment Variables
```
RESEND_API_KEY=re_xxxxx
CONTACT_EMAIL=hello@infinitycloudsolutions.com
```

## Architecture
```
landing-page/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── api/
│       └── contact/
│           └── route.ts
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── LanguageToggle.tsx
│   ├── Services.tsx
│   ├── Process.tsx
│   ├── Results.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── lib/
│   ├── i18n.tsx
│   ├── translations.ts
│   └── resend.ts
├── public/
│   └── images/
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── package.json
├── .env.local.example
└── README.md
```
