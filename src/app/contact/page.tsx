'use client'

import dynamic from 'next/dynamic'
import { useLang } from '@/hooks/useLang'
import { RevealBlock } from '@/components/ui/RevealBlock'

// Leaflet no funciona con SSR — carga dinámica obligatoria
const ContactMap = dynamic(() => import('./ContactMap'), { ssr: false })

const CONTENT = {
  eyebrow: { es: 'Contacto', en: 'Contact' },
  title: {
    es: (
      <>
        Hablemos sobre
        <br />
        tu <em className="font-serif-italic text-beige">historia</em>
      </>
    ),
    en: (
      <>
        Let's talk about
        <br />
        your <em className="font-serif-italic text-beige">story</em>
      </>
    ),
  },
  sub: {
    es: 'Estoy basado en Cusco, Perú. Escríbeme por WhatsApp o redes sociales para agendar tu sesión.',
    en: "I'm based in Cusco, Peru. Reach out via WhatsApp or social media to book your session.",
  },
  location: { es: 'Ubicación', en: 'Location' },
  locationVal: { es: 'Cusco, Perú', en: 'Cusco, Peru' },
  whatsapp: { es: 'Reservar por WhatsApp', en: 'Book via WhatsApp' },
  instagram: { es: 'Instagram', en: 'Instagram' },
  email: { es: 'Correo', en: 'Email' },
}

const WHATSAPP_MSG = {
  es: 'Hola, me gustaría reservar una consulta para hablar sobre mi sesión fotográfica. ¿Cuándo tendría disponibilidad?',
  en: 'Hello, I would like to book a consultation to talk about my photography session. When would you be available?',
}

// ── Icon components ───────────────────────────────────────────────────────────

function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function IconPin({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const { t, lang } = useLang()

  const whatsappHref = `https://wa.me/${
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''
  }?text=${encodeURIComponent(WHATSAPP_MSG[lang])}`

  const instagramHref = `https://instagram.com/${
    process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE ?? 'lumiere.photography'
  }`

  const emailHref = `mailto:${
    process.env.NEXT_PUBLIC_EMAIL ?? 'hello@lumiere.photography'
  }`

  const instagramHandle = `@${
    process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE ?? 'lumiere.photography'
  }`

  const emailHandle =
    process.env.NEXT_PUBLIC_EMAIL ?? 'hello@lumiere.photography'

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="section-container pt-32 pb-16">
        <RevealBlock>
          <p className="eyebrow mb-6">{t(CONTENT.eyebrow)}</p>

          <h1 className="heading-display mb-6 text-[clamp(2.4rem,5vw,5rem)] text-cream">
            {CONTENT.title[lang]}
          </h1>

          <p className="body-copy max-w-md text-base leading-relaxed">
            {t(CONTENT.sub)}
          </p>
        </RevealBlock>
      </section>

      {/* Contact + Map */}
      <section className="section-container pb-32">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Contact Cards */}
          <RevealBlock className="flex flex-col gap-4">
            {/* WhatsApp */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex w-full items-center justify-center gap-3 py-4 text-sm"
            >
              <IconWhatsApp className="h-4 w-4" />
              {t(CONTENT.whatsapp)}
            </a>

            {/* Ubicación */}
            <div className="flex items-center gap-4 rounded-sm2 border border-beige/[0.08] bg-carbon px-5 py-4">
              <IconPin className="h-4 w-4 shrink-0 stroke-current text-beige" />

              <div>
                <p className="mb-0.5 font-sans text-[10px] uppercase tracking-widest2 text-muted">
                  {t(CONTENT.location)}
                </p>

                <p className="font-sans text-sm text-cream/80">
                  {t(CONTENT.locationVal)}
                </p>
              </div>
            </div>

            {/* Instagram */}
            <a
              href={instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-sm2 border border-beige/[0.08] bg-carbon px-5 py-4 transition-all duration-300 hover:border-beige/25 hover:bg-carbon-2"
            >
              <IconInstagram className="h-4 w-4 shrink-0 stroke-current text-cream/50 transition-colors duration-300 group-hover:text-beige" />

              <div>
                <p className="mb-0.5 font-sans text-[10px] uppercase tracking-widest2 text-muted">
                  {t(CONTENT.instagram)}
                </p>

                <p className="font-sans text-sm text-cream/60 transition-colors duration-300 group-hover:text-cream/90">
                  {instagramHandle}
                </p>
              </div>
            </a>

            {/* Email */}
            <a
              href={emailHref}
              className="group flex items-center gap-4 rounded-sm2 border border-beige/[0.08] bg-carbon px-5 py-4 transition-all duration-300 hover:border-beige/25 hover:bg-carbon-2"
            >
              <IconMail className="h-4 w-4 shrink-0 stroke-current text-cream/50 transition-colors duration-300 group-hover:text-beige" />

              <div>
                <p className="mb-0.5 font-sans text-[10px] uppercase tracking-widest2 text-muted">
                  {t(CONTENT.email)}
                </p>

                <p className="font-sans text-sm text-cream/60 transition-colors duration-300 group-hover:text-cream/90">
                  {emailHandle}
                </p>
              </div>
            </a>
          </RevealBlock>

          {/* Map */}
          <RevealBlock delay={2}>
            <div className="h-[420px] w-full overflow-hidden rounded-[14px] border border-beige/[0.08]">
              <ContactMap />
            </div>
          </RevealBlock>
        </div>
      </section>
    </main>
  )
}