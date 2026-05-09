import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Aviso de Privacidad',
  description: 'Aviso de privacidad de Infinity AI Cloud Solutions conforme a la LFPDPPP.',
  robots: { index: true, follow: false },
}

const LAST_UPDATED = '1 de mayo de 2026'
const CONTACT_EMAIL = 'hola@infinitycloudsolutions.com'
const COMPANY = 'Infinity AI Cloud Solutions'
const ADDRESS = 'Ciudad de México, México'

export default function PrivacidadPage() {
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
            Aviso de Privacidad
          </h1>
          <p className="mt-4 text-sm" style={{ color: 'var(--text-muted)' }}>
            Última actualización: {LAST_UPDATED}
          </p>
        </div>

        {/* Content */}
        <div
          className="prose-legal max-w-2xl space-y-10 text-sm leading-relaxed md:text-base"
          style={{ color: 'oklch(80% 0.008 265)' }}
        >

          <section>
            <h2 className="legal-heading">1. Responsable del tratamiento</h2>
            <p>
              <strong style={{ color: 'oklch(94% 0.008 90)' }}>{COMPANY}</strong>,
              con domicilio en {ADDRESS} (en adelante <em>"Infinity AI"</em>), es responsable
              del tratamiento de los datos personales que usted nos proporcione, los cuales
              serán protegidos conforme a la{' '}
              <em>Ley Federal de Protección de Datos Personales en Posesión de los Particulares</em>{' '}
              (LFPDPPP) y demás normativa aplicable en México.
            </p>
          </section>

          <section>
            <h2 className="legal-heading">2. Datos personales que recabamos</h2>
            <p>A través de los formularios de contacto de este sitio web podemos recabar:</p>
            <ul className="legal-list">
              <li>Nombre completo</li>
              <li>Correo electrónico</li>
              <li>Número de teléfono (opcional)</li>
              <li>Nombre de la empresa (opcional)</li>
              <li>Mensaje o descripción de su consulta</li>
            </ul>
            <p className="mt-3">
              No recabamos datos personales sensibles (origen étnico, estado de salud,
              información genética, creencias religiosas, datos biométricos ni vida sexual).
            </p>
          </section>

          <section>
            <h2 className="legal-heading">3. Finalidades del tratamiento</h2>
            <p><strong style={{ color: 'oklch(94% 0.008 90)' }}>Finalidades primarias</strong> (necesarias para la relación):</p>
            <ul className="legal-list">
              <li>Responder a su solicitud de contacto o cotización</li>
              <li>Dar seguimiento comercial a propuestas de servicios</li>
              <li>Gestionar la prestación de nuestros servicios de automatización e IA</li>
            </ul>
            <p className="mt-4"><strong style={{ color: 'oklch(94% 0.008 90)' }}>Finalidades secundarias</strong> (puede oponerse):</p>
            <ul className="legal-list">
              <li>Envío de contenido educativo, casos de éxito o actualizaciones del servicio</li>
              <li>Evaluación de la satisfacción con nuestros servicios</li>
            </ul>
            <p className="mt-3">
              Si no desea que sus datos sean utilizados para finalidades secundarias, escríbanos
              a{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: 'var(--accent-gold)' }}>
                {CONTACT_EMAIL}
              </a>{' '}
              con el asunto <em>"Oposición a finalidades secundarias"</em>.
            </p>
          </section>

          <section>
            <h2 className="legal-heading">4. Transferencia de datos</h2>
            <p>
              Sus datos personales pueden ser compartidos con los siguientes proveedores de
              tecnología estrictamente necesarios para operar este sitio:
            </p>
            <ul className="legal-list">
              <li>
                <strong style={{ color: 'oklch(94% 0.008 90)' }}>Resend Inc.</strong> — servicio
                de entrega de correo electrónico para gestionar las respuestas automáticas al
                formulario de contacto.
              </li>
              <li>
                <strong style={{ color: 'oklch(94% 0.008 90)' }}>Vercel Inc.</strong> — proveedor
                de infraestructura y hospedaje del sitio web.
              </li>
            </ul>
            <p className="mt-3">
              Dichos proveedores actúan como encargados del tratamiento y se encuentran
              sujetos a las políticas de privacidad de sus propias plataformas. No vendemos,
              cedemos ni compartimos sus datos personales con terceros para fines comerciales
              propios.
            </p>
          </section>

          <section>
            <h2 className="legal-heading">5. Derechos ARCO</h2>
            <p>
              Usted tiene derecho a <strong style={{ color: 'oklch(94% 0.008 90)' }}>
              Acceder, Rectificar, Cancelar u Oponerse</strong> (derechos ARCO) al tratamiento
              de sus datos personales. Para ejercer estos derechos envíe su solicitud a:
            </p>
            <div
              className="mt-4 rounded-xl border p-5"
              style={{
                borderColor: 'oklch(74% 0.15 58 / 0.2)',
                background: 'oklch(74% 0.15 58 / 0.04)',
              }}
            >
              <p className="font-medium" style={{ color: 'oklch(94% 0.008 90)' }}>
                Infinity AI Cloud Solutions — Área de Privacidad
              </p>
              <p className="mt-1">
                Correo:{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: 'var(--accent-gold)' }}>
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
            <p className="mt-4">
              Daremos respuesta a su solicitud dentro de los plazos establecidos por la
              LFPDPPP (20 días hábiles para resolución, ampliables por causa justificada).
            </p>
          </section>

          <section>
            <h2 className="legal-heading">6. Cookies y tecnologías de seguimiento</h2>
            <p>
              Este sitio utiliza <strong style={{ color: 'oklch(94% 0.008 90)' }}>Vercel Analytics</strong>,
              una herramienta de análisis que recopila datos de uso agregados y anonimizados
              (páginas visitadas, dispositivo, país de origen) sin almacenar datos personales
              identificables ni utilizar cookies de seguimiento entre sitios.
            </p>
            <p className="mt-3">
              No se utilizan cookies publicitarias ni se comparte información con redes de
              publicidad de terceros.
            </p>
          </section>

          <section>
            <h2 className="legal-heading">7. Cambios a este aviso</h2>
            <p>
              Infinity AI se reserva el derecho de modificar este Aviso de Privacidad en
              cualquier momento. Cualquier cambio será publicado en esta página con la fecha
              de actualización correspondiente. El uso continuado del sitio web o de nuestros
              servicios tras la publicación de cambios implica la aceptación de los mismos.
            </p>
          </section>

          <section>
            <h2 className="legal-heading">8. Autoridad supervisora</h2>
            <p>
              Si considera que su derecho a la protección de datos ha sido vulnerado, puede
              acudir al{' '}
              <strong style={{ color: 'oklch(94% 0.008 90)' }}>
                Instituto Nacional de Transparencia, Acceso a la Información y Protección de
                Datos Personales (INAI)
              </strong>{' '}
              en{' '}
              <span style={{ color: 'var(--text-muted)' }}>www.inai.org.mx</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
