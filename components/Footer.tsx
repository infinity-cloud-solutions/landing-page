"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n'

export function Footer() {
  const { t } = useI18n()

  return (
    <footer style={{ borderTop: '1px solid var(--stroke)', background: 'var(--bg-primary)' }}>
      <div className="section-wrap py-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Image
              src="/images/logo.png"
              alt="Infinity AI Cloud Solutions"
              width={160}
              height={40}
              className="h-9 w-auto"
            />
            <p className="mt-4 max-w-sm text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {t.footer.tagline}
            </p>
            <p className="mt-4 text-xs" style={{ color: 'oklch(44% 0.018 265)' }}>
              {t.footer.madeIn}
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 md:items-end">
            {/* Mini rocket+cloud mark */}
            <div className="flex items-center gap-1.5" style={{ color: 'var(--accent-gold)', opacity: 0.6 }}>
              <span className="icon-outlined text-base">rocket_launch</span>
              <span className="icon-outlined text-base">cloud</span>
            </div>

            <div className="flex items-center gap-5 text-sm" style={{ color: 'var(--text-muted)' }}>
              <Link href="#" className="hover:text-[color:var(--text-primary)] transition">
                {t.footer.privacy}
              </Link>
              <Link href="#" className="hover:text-[color:var(--text-primary)] transition">
                {t.footer.terms}
              </Link>
            </div>
          </div>
        </div>

        <div
          className="mt-8 h-px w-full"
          style={{ background: 'linear-gradient(90deg, transparent, var(--stroke), transparent)' }}
        />

        <p className="mt-6 text-xs" style={{ color: 'oklch(36% 0.016 265)' }}>
          {t.footer.rights}
        </p>
      </div>
    </footer>
  )
}
