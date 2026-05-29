'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { RevealBlock } from '@/components/ui/RevealBlock'
import { useLang } from '@/hooks/useLang'
import { cn } from '@/lib/utils'
import type { SanityService } from '@/types/service'

const UI = {
  eyebrow: {
    es: 'Lo que ofrezco',
    en: 'What I offer',
  },
  packagesEyebrow: {
    es: 'Paquetes',
    en: 'Packages',
  },
  ctaSub: {
    es: 'Cada proyecto es único. Hablemos sobre tu visión.',
    en: "Every project is unique. Let's talk about your vision.",
  },
  ctaBtn: {
    es: 'Reservar Consulta',
    en: 'Book a Consultation',
  },
  included: {
    es: 'Incluye',
    en: 'Includes',
  },
  from: {
    es: 'Desde',
    en: 'From',
  },
}

interface Props {
  services?: SanityService[]
}

export default function ServicesClient({ services = [] }: Props) {
  const { t, lang } = useLang()

  // ── Genera el link de WhatsApp personalizado por servicio ──
  const buildWhatsappHref = (svc: SanityService) => {
    const name = svc.title[lang]
    const price = svc.price.toLocaleString()

    const message =
      lang === 'es'
        ? `Hola, me interesa el servicio de *${name}* (desde $${price} USD). ¿Podría darme más información y consultar disponibilidad?`
        : `Hello, I'm interested in the *${name}* service (from $${price} USD). Could you give me more details and check availability?`

    return `https://wa.me/${
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''
    }?text=${encodeURIComponent(message)}`
  }

  // ── Link genérico para el CTA final de la página ──
  const generalWhatsappHref = `https://wa.me/${
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''
  }?text=${encodeURIComponent(
    lang === 'es'
      ? 'Hola, me gustaría reservar una consulta.'
      : 'Hello, I would like to book a consultation.'
  )}`

  return (
    <main className="min-h-screen pb-40">
      {/* ── Header compacto ── */}
      <section className="section-container pt-20 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="text-center"
        >
          <p className="eyebrow mb-2 text-gold">
            {t(UI.eyebrow)}
          </p>

          <h1 className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-light text-cream">
            {lang === 'es' ? (
              <>
                Servicios{' '}
                <em className="font-serif-italic text-beige">
                  fotográficos
                </em>
              </>
            ) : (
              <>
                Photography{' '}
                <em className="font-serif-italic text-beige">
                  services
                </em>
              </>
            )}
          </h1>
        </motion.div>
      </section>

      {/* ── Services grid ── */}
      <section className="section-container py-8">
        <RevealBlock className="mb-8">
          <p className="eyebrow">{t(UI.packagesEyebrow)}</p>
        </RevealBlock>

        {services.length === 0 ? (
          <p className="body-copy text-center text-muted">
            {lang === 'es' ? 'Próximamente…' : 'Coming soon…'}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {services.map((svc, i) => (
              <RevealBlock key={svc._id} delay={(i % 2) as 0 | 1}>
                <div
                  className={cn(
                    'card-dark relative overflow-hidden rounded-sm2 p-8 transition-all duration-500 hover:-translate-y-1',
                    svc.featured && 'border border-beige/30'
                  )}
                >
                  {svc.featured && (
                    <div className="absolute right-6 top-6 rounded-full border border-gold/40 px-3 py-1 font-sans text-[8px] uppercase tracking-widest2 text-gold">
                      Popular
                    </div>
                  )}

                  {/* Imagen o degradado */}
                  {svc.image?.url ? (
                    <div className="relative mb-8 h-24 w-full overflow-hidden rounded-sm2">
                      <Image
                        src={svc.image.url}
                        alt={svc.image.alt ?? svc.title[lang]}
                        fill
                        className="object-cover"
                        placeholder={svc.image.blurUrl ? 'blur' : 'empty'}
                        blurDataURL={svc.image.blurUrl ?? undefined}
                      />
                    </div>
                  ) : (
                    <div
                      className="mb-8 h-24 w-full rounded-sm2 opacity-60"
                      style={{
                        background: `linear-gradient(
                          to bottom right,
                          ${svc.gradientFrom ?? '#1a1510'},
                          ${svc.gradientTo ?? '#2a1f14'}
                        )`,
                      }}
                    />
                  )}

                  <div className="mb-2 flex items-center gap-3">
                    {svc.icon && (
                      <span className="text-beige/60">{svc.icon}</span>
                    )}

                    <h3 className="font-serif text-2xl font-light text-cream">
                      {svc.title[lang]}
                    </h3>
                  </div>

                  <p className="body-copy mb-6 text-sm">
                    {svc.description[lang]}
                  </p>

                  <p className="mb-6 font-sans text-[10px] uppercase tracking-widest2 text-muted">
                    {t(UI.from)}{' '}
                    <span className="font-serif text-3xl font-light text-beige">
                      ${svc.price.toLocaleString()}
                    </span>
                    <span className="ml-1 text-muted">USD</span>
                  </p>

                  <div className="mb-8">
                    <p className="mb-3 font-sans text-[9px] uppercase tracking-widest2 text-gold">
                      {t(UI.included)}
                    </p>

                    <ul className="flex flex-col gap-2">
                      {(svc.features?.[lang] ?? []).map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2.5 font-sans text-xs text-cream/60"
                        >
                          <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-beige/40" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA — mensaje personalizado con el servicio seleccionado */}
                  <a
                    href={buildWhatsappHref(svc)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      svc.featured
                        ? 'btn-primary w-full justify-center'
                        : 'btn-secondary w-full justify-center'
                    )}
                  >
                    {lang === 'es'
                      ? 'Consultar disponibilidad'
                      : 'Check availability'}
                  </a>
                </div>
              </RevealBlock>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}