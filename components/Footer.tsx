"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n'

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="border-t border-slate-700/50 bg-slate-950/60">
      <div className="section-wrap py-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Image src="/images/logo.png" alt="Infinity logo" width={160} height={40} className="h-10 w-auto" />
            <p className="mt-3 max-w-md text-sm text-slate-300">{t.footer.tagline}</p>
            <p className="mt-4 text-xs text-slate-400">{t.footer.madeIn}</p>
          </div>

          <div className="flex items-center gap-5 text-sm text-slate-300">
            <Link href="#" className="hover:text-white">
              {t.footer.privacy}
            </Link>
            <Link href="#" className="hover:text-white">
              {t.footer.terms}
            </Link>
          </div>
        </div>

        <p className="mt-8 text-xs text-slate-400">{t.footer.rights}</p>
      </div>
    </footer>
  )
}
