# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # ESLint (Next.js core + TypeScript config)
npm run typecheck    # TypeScript strict check (tsc --noEmit)
```

> Use `npm` (not pnpm). The repo enforces npm@9 via `engines` in package.json.

## Architecture

**Stack:** Next.js 14.2 (App Router), React 18, TypeScript, Tailwind CSS v4, GSAP 3.13 + ScrollTrigger + MotionPathPlugin, Lenis (smooth scroll), Resend (email), Zod (validation).

**Single-page app:** One route (`/`) with anchor-based navigation. One API route: `POST /api/contact`.

### Key directories

- `app/` — Next.js App Router: `layout.tsx`, `page.tsx`, `globals.css`, `api/contact/route.ts`
- `components/` — All React components (client components; GSAP used for animations)
- `lib/` — `i18n.tsx` (context + localStorage), `translations.ts` (es/en strings), `resend.ts` (email client singleton)

### Theming

CSS variables in `globals.css` drive dark/light modes (`--bg-primary`, `--text-primary`, `--stroke`, etc.). Dark mode is default; light mode activates via `html[data-theme='light']`. Custom utilities `.theme-card` and `.theme-nav` apply glassmorphism effects.

### i18n

Language (es/en) is managed entirely client-side via React context (`lib/i18n.tsx`) and persisted to `localStorage`. No server-side translation rendering.

### Contact form email flow

`/api/contact` sends two emails per submission via Resend:
1. Admin notification to `CONTACT_EMAIL` env var
2. Auto-reply to the submitter (locale-aware, Spanish or English)

### Animations

GSAP with ScrollTrigger handles all scroll-based animations. Lenis wraps the entire page via `<SmoothScroll>` in `app/page.tsx`. The `Hero` component uses MotionPathPlugin for the rocket orbital path.

### Unused components

`ServicesClean`, `ServicesNew`, `ProcessClean` exist in `components/` but are not imported — experimental variants, safe to ignore.
