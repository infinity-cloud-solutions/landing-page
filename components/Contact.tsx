"use client";

import { type FormEvent, useMemo, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
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
  const container = useRef<HTMLElement>(null);

  const canSubmit = useMemo(
    () =>
      form.name.trim().length > 1 &&
      form.email.includes("@") &&
      form.message.trim().length >= 10,
    [form]
  );

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      gsap.from(".contact-header", {
        opacity: 0,
        y: 22,
        duration: 0.6,
        ease: "icsEase",
        scrollTrigger: {
          trigger: ".contact-header",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".contact-form", {
        opacity: 0,
        y: 36,
        scale: 0.97,
        duration: 0.7,
        ease: "icsEase",
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 86%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: container }
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit || status === "loading") return;

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale: lang }),
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
    <section ref={container} id="contact" className="section-wrap">
      <div className="contact-header">
        <p className="eyebrow">{t.contact.eyebrow}</p>
        <h2 className="section-title mt-4 max-w-3xl text-3xl md:text-5xl">{t.contact.title}</h2>
        <p className="mt-6 max-w-2xl text-[color:var(--text-muted)]">{t.contact.description}</p>
      </div>

      <form
        onSubmit={onSubmit}
        className="contact-form card-surface interactive-card mt-10 grid gap-4 rounded-2xl p-6 md:grid-cols-2"
      >
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
            className="focus-visible-ring cta-button inline-flex h-11 items-center rounded-full bg-[color:var(--accent-primary)] px-6 text-sm font-semibold text-black transition enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
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
