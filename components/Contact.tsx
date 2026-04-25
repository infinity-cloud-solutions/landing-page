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
      if (!response.ok) { setStatus('error'); return }
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
      <p className="mt-5 max-w-2xl text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        {t.contact.description}
      </p>

      <div className="mt-10 grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
        {/* Info sidebar */}
        <aside className="cosmic-card rounded-2xl p-7 relative overflow-hidden">
          <div
            className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full blur-3xl pointer-events-none"
            style={{ background: 'oklch(74% 0.15 58 / 0.1)' }}
          />
          <h3 className="font-display font-bold text-xl uppercase tracking-wide" style={{ color: 'var(--text-primary)' }}>
            {t.contact.infoTitle}
          </h3>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {t.contact.infoSubtitle}
          </p>

          <ul className="mt-7 space-y-5">
            {t.contact.infoItems.map((item) => (
              <li key={item.label} className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-primary)' }}>
                <span
                  className="icon-outlined flex-shrink-0"
                  style={{ color: 'var(--accent-gold)', fontSize: '20px' }}
                >
                  {item.icon}
                </span>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="underline-offset-2 hover:underline transition-colors duration-150 hover:opacity-80"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span>{item.label}</span>
                )}
              </li>
            ))}
          </ul>
        </aside>

        {/* Form */}
        <form onSubmit={onSubmit} className="cosmic-card rounded-2xl p-7">
          <div className="grid gap-4 md:grid-cols-2">
            {([
              ['name', t.contact.fields.name, 'text', 'name'],
              ['email', t.contact.fields.email, 'email', 'email'],
              ['company', t.contact.fields.company, 'text', 'organization'],
              ['phone', t.contact.fields.phone, 'tel', 'tel'],
            ] as const).map(([field, label, type, autoComplete]) => (
              <label key={field} className="grid gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                <span className="font-medium">{label}</span>
                <input
                  type={type}
                  required={field === 'name' || field === 'email'}
                  value={form[field]}
                  onChange={(e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))}
                  className="h-11 rounded-xl theme-input px-3 outline-none focus:ring-1 transition"
                  style={{ '--tw-ring-color': 'var(--accent-gold)' } as React.CSSProperties}
                  name={field}
                  autoComplete={autoComplete}
                />
              </label>
            ))}
          </div>

          <label className="mt-4 grid gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
            <span className="font-medium">{t.contact.fields.message}</span>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
              className="rounded-xl theme-input p-3 outline-none resize-none focus:ring-1 transition"
              style={{ '--tw-ring-color': 'var(--accent-gold)' } as React.CSSProperties}
              name="message"
            />
          </label>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={!canSubmit || status === 'loading'}
              className="gold-button inline-flex h-11 items-center rounded-full px-7 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === 'loading' ? t.contact.loading : t.contact.submit}
            </button>

            {status === 'success' && (
              <p className="text-sm font-medium" style={{ color: 'var(--success-text)' }}>
                {t.contact.success}
              </p>
            )}
            {status === 'error' && (
              <p className="text-sm font-medium" style={{ color: 'var(--error-text)' }}>
                {t.contact.error}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
