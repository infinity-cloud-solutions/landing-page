import './globals.css'
import { ReactNode } from 'react'
import { Barlow_Condensed, Manrope } from 'next/font/google'
import { LanguageProvider } from '@/lib/i18n'
import type { Metadata } from 'next'

const SITE_URL = 'https://infinitycloudsolutions.com'

const bodyFont = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const displayFont = Barlow_Condensed({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['700', '800', '900'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Infinity AI Cloud Solutions — Automatización e IA para PyMEs en México',
    template: '%s | Infinity AI Cloud Solutions',
  },
  description:
    'Automatizamos operaciones para PyMEs en México con IA y automatización. Diagnóstico gratuito, implementación en 4–8 semanas y resultados medibles desde la semana 2.',
  keywords: [
    'automatización PyMEs México',
    'inteligencia artificial para negocios',
    'consultoría IA México',
    'automatización de procesos empresas',
    'transformación digital PyMEs',
    'automatización Ciudad de México',
  ],
  authors: [{ name: 'Infinity AI Cloud Solutions', url: SITE_URL }],
  creator: 'Infinity AI Cloud Solutions',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    alternateLocale: ['en_US'],
    url: SITE_URL,
    siteName: 'Infinity AI Cloud Solutions',
    title: 'Infinity AI Cloud Solutions — Automatización e IA para PyMEs en México',
    description:
      'Automatizamos operaciones para PyMEs en México con IA y automatización. Diagnóstico gratuito, implementación en 4–8 semanas y resultados medibles desde la semana 2.',
    images: [
      {
        url: '/images/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Infinity AI Cloud Solutions — Automatización e IA para PyMEs en México',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Infinity AI Cloud Solutions — Automatización e IA para PyMEs en México',
    description:
      'Automatizamos operaciones para PyMEs en México con IA y automatización. Diagnóstico gratuito, implementación en 4–8 semanas.',
    images: ['/images/og-image.svg'],
  },
  alternates: {
    canonical: SITE_URL,
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': `${SITE_URL}/#organization`,
      name: 'Infinity AI Cloud Solutions',
      alternateName: 'Infinity AI',
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo.png`,
      image: `${SITE_URL}/images/og-image.svg`,
      description:
        'Consultoría de automatización e inteligencia artificial para PyMEs en México. Implementación end-to-end con resultados medibles.',
      email: 'hola@infinitycloudsolutions.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Ciudad de México',
        addressCountry: 'MX',
      },
      areaServed: {
        '@type': 'Country',
        name: 'México',
      },
      serviceType: [
        'Automatización de procesos',
        'Inteligencia artificial aplicada',
        'Consultoría tecnológica',
        'Transformación digital para PyMEs',
      ],
      knowsAbout: [
        'Automatización RPA',
        'Inteligencia artificial aplicada',
        'Machine learning',
        'Transformación digital',
        'Pequeñas y medianas empresas',
      ],
      sameAs: [],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Infinity AI Cloud Solutions',
      description: 'Automatización e IA para PyMEs en México',
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: ['es-MX', 'en-US'],
    },
  ],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,500,0,0&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
