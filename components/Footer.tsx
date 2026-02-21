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
