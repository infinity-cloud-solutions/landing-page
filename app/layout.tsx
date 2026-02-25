import './globals.css'
import { ReactNode } from 'react'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { LanguageProvider } from '@/lib/i18n'

const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const displayFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['500', '600', '700', '800'],
})

export const metadata = {
  title: 'Infinity AI Cloud Solutions',
  description: 'Automatización e IA para PyMEs — Infinity AI Cloud Solutions',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,500,0,0"
        />
      </head>
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
