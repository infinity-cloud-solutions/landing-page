import './globals.css'
import { ReactNode } from 'react'
import { LanguageProvider } from '../lib/i18n'

export const metadata = {
  title: 'Infinity Cloud Solutions',
  description: 'AI automation consultancy — Agenda tu consulta gratis.'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
