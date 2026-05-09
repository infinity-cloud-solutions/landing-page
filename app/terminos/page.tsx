import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  description: 'Términos y condiciones de uso del sitio web de Infinity AI Cloud Solutions.',
  robots: { index: true, follow: false },
}

const LAST_UPDATED = '1 de mayo de 2026'
const CONTACT_EMAIL = 'hola@infinitycloudsolutions.com'
const COMPANY = 'Infinity AI Cloud Solutions'
const SITE_URL = 'https://infinitycloudsolutions.com'

export default function TerminosPage() {
  return (
    <div style={{ background: 'oklch(7% 0.014 265)', minHeight: '100dvh' }}>
      <div className="section-wrap py-16 md:py-24">

        {/* Back link */}
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm transition hover:opacity-100"
          style={{ color: 'var(--text-muted)', opacity: 0.7 }}
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Inicio
        </Link>

        {/* Header */}
        <div className="mb-12 border-b pb-10" style={{ borderColor: 'var(--stroke)' }}>
          <div
            className="mb-3 text-xs font-bold uppercase tracking-[0.16em]"
            style={{ color: 'var(--accent-gold)' }}
          >
            Legal
          </div>
          <h1
            className="font-display font-black uppercase tracking-tight"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.8rem)',
              color: 'oklch(96% 0.008 90)',
              lineHeight: 1,
            }}
          >
            Términos y Condiciones
          </h1>
          <p className="mt-4 text-sm" style={{ color: 'var(--text-muted)' }}>
            Última actualización: {LAST_UPDATED}
          </p>
        </div>

        {/* Content */}
        <div
          className="max-w-2xl space-y-10 text-sm leading-relaxed md:text-base"
          style={{ color: 'oklch(80% 0.008 265)' }}
        >

          <section>
            <h2 className="legal-heading">1. Aceptación de los términos</h2>
            <p>
              Al acceder y utilizar el sitio web{' '}
              <span style={{ color: 'var(--text-muted)' }}>{SITE_URL}</span> (el{' '}
              <em>"Sitio"</em>), usted acepta quedar vinculado por los presentes Términos y
              Condiciones de Uso. Si no está de acuerdo con alguno de ellos, le pedimos que
              se abstenga de utilizar el Sitio.{' '}
              <strong style={{ color: 'oklch(94% 0.008 90)' }}>{COMPANY}</strong> se reserva
              el derecho de modificar estos términos en cualquier momento.
            </p>
          </section>

          <section>
            <h2 className="legal-heading">2. Descripción del servicio</h2>
            <p>
              {COMPANY} es una empresa de consultoría especializada en automatización de
              procesos e inteligencia artificial para pequeñas y medianas empresas (PyMEs)
              en México. El Sitio tiene como finalidad presentar nuestros servicios,
              compartir información relevante y facilitar el contacto con clientes potenciales.
            </p>
            <p className="mt-3">
              El contenido del Sitio es de carácter informativo y no constituye una oferta
              vinculante de servicios. Los términos específicos de cualquier proyecto serán
              acordados mediante un contrato de prestación de servicios por separado.
            </p>
          </section>

          <section>
            <h2 className="legal-heading">3. Propiedad intelectual</h2>
            <p>
              Todos los contenidos del Sitio —incluyendo textos, imágenes, logotipos,
              diseño, código fuente y elementos gráficos— son propiedad de{' '}
              {COMPANY} o de sus respectivos titulares, y están protegidos por las leyes
              mexicanas e internacionales de propiedad intelectual.
            </p>
            <p className="mt-3">
              Queda prohibida la reproducción, distribución, modificación o uso comercial
              de cualquier contenido del Sitio sin autorización previa y por escrito de{' '}
              {COMPANY}.
            </p>
          </section>

          <section>
            <h2 className="legal-heading">4. Uso aceptable</h2>
            <p>Al utilizar el Sitio, usted se compromete a:</p>
            <ul className="legal-list">
              <li>No utilizar el Sitio para actividades ilegales o fraudulentas.</li>
              <li>No intentar acceder de manera no autorizada a nuestros sistemas o servidores.</li>
              <li>No enviar comunicaciones no solicitadas (spam) a través del formulario de contacto.</li>
              <li>No reproducir ni scraping automatizado del contenido del Sitio sin autorización.</li>
              <li>Proporcionar información veraz al completar el formulario de contacto.</li>
            </ul>
          </section>

          <section>
            <h2 className="legal-heading">5. Limitación de responsabilidad</h2>
            <p>
              {COMPANY} pone a su disposición el Sitio y sus contenidos <em>"tal como están"</em>,
              sin garantías expresas ni implícitas de ningún tipo. No garantizamos la
              disponibilidad ininterrumpida del Sitio ni la ausencia de errores en su
              contenido.
            </p>
            <p className="mt-3">
              En la medida permitida por la ley aplicable, {COMPANY} no será responsable
              por daños directos, indirectos, incidentales o consecuentes derivados del
              uso o la imposibilidad de uso del Sitio, incluyendo la pérdida de datos o
              lucro cesante.
            </p>
          </section>

          <section>
            <h2 className="legal-heading">6. Vínculos a terceros</h2>
            <p>
              El Sitio puede contener enlaces a sitios web de terceros. Estos enlaces se
              proporcionan únicamente para su conveniencia. {COMPANY} no controla ni
              respalda el contenido de dichos sitios y no asume responsabilidad alguna
              por su contenido, políticas de privacidad o prácticas.
            </p>
          </section>

          <section>
            <h2 className="legal-heading">7. Privacidad</h2>
            <p>
              El tratamiento de sus datos personales se rige por nuestro{' '}
              <Link href="/privacidad" style={{ color: 'var(--accent-gold)' }}>
                Aviso de Privacidad
              </Link>
              , el cual forma parte integrante de estos Términos y Condiciones.
            </p>
          </section>

          <section>
            <h2 className="legal-heading">8. Modificaciones</h2>
            <p>
              {COMPANY} podrá actualizar estos Términos y Condiciones en cualquier momento.
              La versión vigente estará siempre disponible en esta página con la fecha de
              última actualización. El uso continuado del Sitio después de la publicación
              de cambios constituye su aceptación de los nuevos términos.
            </p>
          </section>

          <section>
            <h2 className="legal-heading">9. Ley aplicable y jurisdicción</h2>
            <p>
              Estos Términos y Condiciones se rigen e interpretan conforme a las leyes de
              los Estados Unidos Mexicanos. Para cualquier controversia derivada del uso
              del Sitio, las partes se someten a la jurisdicción de los tribunales
              competentes de la Ciudad de México, renunciando a cualquier otro fuero que
              pudiera corresponderles.
            </p>
          </section>

          <section>
            <h2 className="legal-heading">10. Contacto</h2>
            <p>
              Si tiene preguntas sobre estos Términos y Condiciones, puede contactarnos en:
            </p>
            <div
              className="mt-4 rounded-xl border p-5"
              style={{
                borderColor: 'oklch(74% 0.15 58 / 0.2)',
                background: 'oklch(74% 0.15 58 / 0.04)',
              }}
            >
              <p className="font-medium" style={{ color: 'oklch(94% 0.008 90)' }}>
                {COMPANY}
              </p>
              <p className="mt-1">
                <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: 'var(--accent-gold)' }}>
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
