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
