import './globals.css'
import { ReactNode } from 'react'
import { JetBrains_Mono, Manrope, Sora } from 'next/font/google'
import { LanguageProvider } from '../lib/i18n'

const bodyFont = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap'
})

const displayFont = Sora({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
  display: 'swap'
})

const monoFont = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-mono',
  display: 'swap'
})

export const metadata = {
  title: 'Infinity Cloud Solutions',
  description: 'AI automation consultancy — Agenda tu consulta gratis.'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body
        className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable}`}
        style={{ backgroundColor: '#0a0a0a', color: '#f5f0eb' }}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
