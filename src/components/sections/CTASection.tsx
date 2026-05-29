'use client'

import { useRef } from 'react'
import NextLink from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { RevealBlock } from '@/components/ui/RevealBlock'
import { useLang } from '@/hooks/useLang'

const CONTENT = {
  eyebrow:   { es: 'Comencemos',  en: "Let's Begin" },
  title: {
    es: (<>Tu historia<br />merece ser<br /><em className="font-serif-italic text-beige">eterna</em></>),
    en: (<>Your story<br />deserves to be<br /><em className="font-serif-italic text-beige">eternal</em></>),
  },
  sub: {
    es: 'Cada sesión es única. Conversemos sobre tu visión y creemos algo extraordinario juntos.',
    en: "Every session is unique. Let's talk about your vision and create something extraordinary together.",
  },
  btnWhatsapp:  { es: 'Reservar por WhatsApp',  en: 'Book via WhatsApp' },
  btnServices:  { es: 'Ver Servicios',           en: 'View Services' },
  orContact:    { es: 'O contáctame por',        en: 'Or contact me via' },
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
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

export function CTASection() {
  const { t, lang } = useLang()
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  const whatsappHref = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''}?text=${encodeURIComponent(
    WHATSAPP_MSG[lang]
  )}`

  const instagramHref    = `https://instagram.com/${process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE ?? 'lumiere.photography'}`
  const emailHref        = `mailto:${process.env.NEXT_PUBLIC_EMAIL ?? 'hello@lumiere.photography'}`
  const instagramHandle  = `@${process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE ?? 'lumiere.photography'}`
  const emailHandle      = process.env.NEXT_PUBLIC_EMAIL ?? 'hello@lumiere.photography'

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden py-48"
    >
      {/* ── Parallax background glow ── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-beige/[0.04] blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-gold/[0.04] blur-[100px]" />
      </motion.div>

      <div className="divider mb-0" aria-hidden="true" />

      <div className="section-container">
        <div className="flex flex-col items-center text-center">

          {/* ── Headline ── */}
          <RevealBlock>
            <p className="eyebrow mb-7">{t(CONTENT.eyebrow)}</p>

            <h2 className="heading-display mb-7 text-[clamp(2.8rem,7vw,6.5rem)] text-cream">
              {CONTENT.title[lang]}
            </h2>

            <p className="body-copy mx-auto mb-14 max-w-md text-base leading-relaxed">
              {t(CONTENT.sub)}
            </p>
          </RevealBlock>

          {/* ── Primary CTA buttons ── */}
          <RevealBlock delay={2} className="flex flex-wrap items-center justify-center gap-4">

            {/* WhatsApp — primary */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2.5"
            >
              <IconWhatsApp className="h-4 w-4" />
              {t(CONTENT.btnWhatsapp)}
            </a>

            {/* Ver Servicios — secondary */}
            <NextLink href="/services" className="btn-secondary">
              {t(CONTENT.btnServices)}
            </NextLink>

          </RevealBlock>

          {/* ── Divider label ── */}
          <RevealBlock delay={3} className="mt-14 flex items-center gap-5">
            <span className="h-px w-16 bg-beige/15" aria-hidden="true" />
            <span className="font-sans text-[10px] uppercase tracking-widest2 text-muted">
              {t(CONTENT.orContact)}
            </span>
            <span className="h-px w-16 bg-beige/15" aria-hidden="true" />
          </RevealBlock>

          {/* ── Secondary contact links ── */}
          <RevealBlock delay={4} className="mt-8 flex flex-wrap items-center justify-center gap-3">

            {/* Instagram */}
            <a
              href={instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-sm2 border border-beige/[0.08] bg-carbon px-5 py-3 transition-all duration-300 hover:border-beige/25 hover:bg-carbon-2"
            >
              <IconInstagram className="h-4 w-4 stroke-current text-cream/50 transition-colors duration-300 group-hover:text-beige" />
              <span className="font-sans text-xs text-cream/60 transition-colors duration-300 group-hover:text-cream/90">
                {instagramHandle}
              </span>
            </a>

            {/* Email */}
            <a
              href={emailHref}
              className="group flex items-center gap-3 rounded-sm2 border border-beige/[0.08] bg-carbon px-5 py-3 transition-all duration-300 hover:border-beige/25 hover:bg-carbon-2"
            >
              <IconMail className="h-4 w-4 stroke-current text-cream/50 transition-colors duration-300 group-hover:text-beige" />
              <span className="font-sans text-xs text-cream/60 transition-colors duration-300 group-hover:text-cream/90">
                {emailHandle}
              </span>
            </a>

          </RevealBlock>

        </div>
      </div>

      <div className="divider mt-0" aria-hidden="true" />
    </section>
  )
}