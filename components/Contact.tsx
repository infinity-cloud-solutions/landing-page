"use client"

import { type FormEvent, useMemo, useState } from 'react'
import { useI18n } from '@/lib/i18n'

type FormState = {
  name: string
  email: string
  company: string
  phone: string
  message: string
}

const initialState: FormState = {
  name: '',
  email: '',
  company: '',
  phone: '',
  message: '',
}

export function Contact() {
  const { t, lang } = useI18n()
  const [form, setForm] = useState<FormState>(initialState)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const canSubmit = useMemo(
    () => form.name.trim().length > 1 && form.email.includes('@') && form.message.trim().length >= 10,
    [form]
  )

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!canSubmit || status === 'loading') return

    setStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, locale: lang }),
      })

      if (!response.ok) {
        setStatus('error')
        return
      }

      setStatus('success')
      setForm(initialState)
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section-wrap">
      <p className="eyebrow">{t.contact.eyebrow}</p>
      <h2 className="section-title mt-4 max-w-3xl text-3xl md:text-5xl">{t.contact.title}</h2>
      <p className="mt-6 max-w-2xl text-[color:var(--text-muted)]">{t.contact.description}</p>

      <div className="mt-10 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <aside className="rounded-3xl theme-card p-6">
          <h3 className="text-xl font-semibold">{t.contact.infoTitle}</h3>
          <p className="mt-2 text-sm text-[color:var(--text-muted)]">{t.contact.infoSubtitle}</p>

          <ul className="mt-6 space-y-4">
            {t.contact.infoItems.map((item) => (
              <li key={item.label} className="flex items-center gap-3 text-sm text-[color:var(--text-primary)]">
                <span className="icon-outlined text-[color:var(--icon-accent)]">{item.icon}</span>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </aside>

        <form onSubmit={onSubmit} className="rounded-3xl theme-card p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm">
              <span>{t.contact.fields.name}</span>
              <input
                required
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                className="h-11 rounded-xl theme-input px-3 outline-none"
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
                className="h-11 rounded-xl theme-input px-3 outline-none"
                name="email"
                autoComplete="email"
              />
            </label>

            <label className="grid gap-2 text-sm">
              <span>{t.contact.fields.company}</span>
              <input
                value={form.company}
                onChange={(event) => setForm((prev) => ({ ...prev, company: event.target.value }))}
                className="h-11 rounded-xl theme-input px-3 outline-none"
                name="company"
                autoComplete="organization"
              />
            </label>

            <label className="grid gap-2 text-sm">
              <span>{t.contact.fields.phone}</span>
              <input
                value={form.phone}
                onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
                className="h-11 rounded-xl theme-input px-3 outline-none"
                name="phone"
                autoComplete="tel"
              />
            </label>
          </div>

          <label className="mt-4 grid gap-2 text-sm">
            <span>{t.contact.fields.message}</span>
            <textarea
              required
              rows={6}
              value={form.message}
              onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
              className="rounded-xl theme-input p-3 outline-none"
              name="message"
            />
          </label>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={!canSubmit || status === 'loading'}
              className="gradient-button inline-flex h-11 items-center rounded-full px-6 text-sm font-semibold transition enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'loading' ? t.contact.loading : t.contact.submit}
            </button>

            {status === 'success' && <p className="text-sm text-[color:var(--success-text)]">{t.contact.success}</p>}
            {status === 'error' && <p className="text-sm text-[color:var(--error-text)]">{t.contact.error}</p>}
          </div>
        </form>
      </div>
    </section>
  )
}
