import { useTranslations } from '../lib/i18n'

export default function Home() {
  const t = useTranslations()

  return (
    <main>
      <header className="container">
        <h1 className="text-4xl font-bold">{t('hero.title')}</h1>
        <p className="mt-4 text-lg text-neutral-300">{t('hero.subtitle')}</p>
      </header>

      <section id="services" className="container mt-24">
        <h2 className="text-2xl font-semibold">{t('services.title')}</h2>
        <p className="text-neutral-400 mt-2">{t('services.subtitle')}</p>
      </section>

      <section id="contact" className="container mt-24">
        <h2 className="text-2xl font-semibold">{t('contact.title')}</h2>
        <p className="text-neutral-400 mt-2">{t('contact.subtitle')}</p>
      </section>
    </main>
  )
}
