'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RevealBlock } from '@/components/ui/RevealBlock'
import { useLang } from '@/hooks/useLang'
import { cn } from '@/lib/utils'

// ── Types ─────────────────────────────────────────────────────────────────────

interface Testimonial {
  _id: string
  author: string
  role?: { es: string; en: string }
  quote: { es: string; en: string }
  category?: { es: string; en: string }
  featured?: boolean
}

interface Props {
  testimonials?: Testimonial[]
}

// ── UI strings ────────────────────────────────────────────────────────────────

const UI = {
  eyebrow:      { es: 'Voces reales',              en: 'Real voices'              },
  title:        { es: 'Lo que dicen',              en: 'What they say'            },
  titleItalic:  { es: 'mis clientes',              en: 'my clients'               },
  formEyebrow:  { es: 'Comparte tu experiencia',   en: 'Share your experience'    },
  formSub:      { es: '¿Trabajamos juntos? Me encantaría leer tu historia.',
                  en: "Did we work together? I'd love to read your story."         },
  labelName:    { es: 'Tu nombre',                 en: 'Your name'                },
  labelRole:    { es: 'Servicio / empresa',         en: 'Service / company'        },
  labelMsg:     { es: 'Tu testimonio',             en: 'Your testimonial'         },
  labelMsgPh:  {
    es: 'Cuéntanos cómo fue tu experiencia…',
    en: 'Tell us about your experience…',
  },
  btnSend:      { es: 'Enviar testimonio',          en: 'Submit testimonial'       },
  successTitle: { es: '¡Gracias por compartir!',   en: 'Thank you for sharing!'   },
  successSub:   {
    es: 'Tu testimonio fue recibido y será publicado pronto.',
    en: 'Your testimonial was received and will be published soon.',
  },
  errorMsg:     {
    es: 'Algo salió mal. Intenta de nuevo.',
    en: 'Something went wrong. Please try again.',
  },
  noTestimonials: { es: 'Próximamente…', en: 'Coming soon…' },
}

// ── Icon ─────────────────────────────────────────────────────────────────────

function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 stroke-current text-gold">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function IconSend() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 stroke-current">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

// ── Form component ────────────────────────────────────────────────────────────

function TestimonialForm() {
  const { t, lang } = useLang()
  const [name,    setName]    = useState('')
  const [role,    setRole]    = useState('')
  const [message, setMessage] = useState('')
  const [status,  setStatus]  = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async () => {
    if (!name.trim() || !message.trim()) return
    setStatus('loading')

    try {
      const res = await fetch('/api/testimonials/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author:   name.trim(),
          roleEs:   role.trim(),
          roleEn:   role.trim(),
          quoteEs:  message.trim(),
          quoteEn:  message.trim(),
        }),
      })

      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-5 rounded-sm2 border border-beige/10 bg-carbon px-8 py-16 text-center"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-gold/5">
          <IconCheck />
        </div>
        <div>
          <p className="font-serif text-xl font-light text-cream">
            {t(UI.successTitle)}
          </p>
          <p className="mt-2 font-sans text-xs text-muted">
            {t(UI.successSub)}
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="rounded-sm2 border border-beige/10 bg-carbon p-8">
      <p className="eyebrow mb-3 text-gold">{t(UI.formEyebrow)}</p>
      <p className="mb-8 font-sans text-sm text-muted">{t(UI.formSub)}</p>

      <div className="flex flex-col gap-5">
        {/* Nombre */}
        <div className="flex flex-col gap-2">
          <label className="font-sans text-[10px] uppercase tracking-widest2 text-cream/40">
            {t(UI.labelName)} *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Isabella Rossi"
            className={cn(
              'w-full rounded-sm border border-beige/10 bg-carbon-2 px-4 py-3',
              'font-sans text-sm text-cream placeholder:text-muted',
              'outline-none transition-colors duration-200',
              'focus:border-beige/30 focus:bg-carbon-2',
            )}
          />
        </div>

        {/* Servicio / empresa */}
        <div className="flex flex-col gap-2">
          <label className="font-sans text-[10px] uppercase tracking-widest2 text-cream/40">
            {t(UI.labelRole)}
          </label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder={lang === 'es' ? 'Boda en Villa Toscana' : 'Wedding at Villa Toscana'}
            className={cn(
              'w-full rounded-sm border border-beige/10 bg-carbon-2 px-4 py-3',
              'font-sans text-sm text-cream placeholder:text-muted',
              'outline-none transition-colors duration-200',
              'focus:border-beige/30',
            )}
          />
        </div>

        {/* Testimonio */}
        <div className="flex flex-col gap-2">
          <label className="font-sans text-[10px] uppercase tracking-widest2 text-cream/40">
            {t(UI.labelMsg)} *
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            placeholder={t(UI.labelMsgPh)}
            className={cn(
              'w-full resize-none rounded-sm border border-beige/10 bg-carbon-2 px-4 py-3',
              'font-sans text-sm text-cream placeholder:text-muted',
              'outline-none transition-colors duration-200',
              'focus:border-beige/30',
            )}
          />
          <p className="self-end font-sans text-[9px] text-muted">
            {message.length} / 800
          </p>
        </div>

        {/* Error */}
        <AnimatePresence>
          {status === 'error' && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="font-sans text-xs text-red-400"
            >
              {t(UI.errorMsg)}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={status === 'loading' || !name.trim() || !message.trim()}
          className={cn(
            'btn-primary flex w-full items-center justify-center gap-2.5',
            'disabled:cursor-not-allowed disabled:opacity-40',
          )}
        >
          {status === 'loading' ? (
            <span className="h-4 w-4 animate-spin rounded-full border border-current border-t-transparent" />
          ) : (
            <IconSend />
          )}
          {t(UI.btnSend)}
        </button>
      </div>
    </div>
  )
}

// ── Testimonial card ──────────────────────────────────────────────────────────

function TestimonialCard({
  testimonial,
  lang,
}: {
  testimonial: Testimonial
  lang: 'es' | 'en'
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-sm2 border border-beige/[0.08] bg-carbon p-6 transition-all duration-300 hover:border-beige/20"
    >
      {/* Categoría */}
      {testimonial.category?.[lang] && (
        <p className="mb-3 font-sans text-[9px] uppercase tracking-widest2 text-gold">
          {testimonial.category[lang]}
        </p>
      )}

      {/* Quote */}
      <p className="mb-5 font-serif text-sm font-light italic leading-relaxed text-cream/80">
        "{testimonial.quote[lang]}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-beige/10" />
        <div className="text-right">
          <p className="font-sans text-xs font-medium uppercase tracking-widest text-cream/70">
            {testimonial.author}
          </p>
          {testimonial.role?.[lang] && (
            <p className="mt-0.5 font-sans text-[10px] text-muted">
              {testimonial.role[lang]}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ── Main section ──────────────────────────────────────────────────────────────

export function TestimonialsSection({ testimonials = [] }: Props) {
  const { t, lang } = useLang()

  return (
    <section id="testimonials" className="section-container py-24">
      {/* Header */}
      <RevealBlock className="mb-16 text-center">
        <p className="eyebrow mb-3">{t(UI.eyebrow)}</p>
        <h2 className="heading-display text-[clamp(2rem,5vw,4rem)] text-cream">
          {t(UI.title)}{' '}
          <em className="font-serif-italic text-beige">{t(UI.titleItalic)}</em>
        </h2>
      </RevealBlock>

      {/* Layout: form izquierda | testimonios derecha */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

        {/* ── Columna izquierda: formulario ── */}
        <RevealBlock delay={0}>
          <TestimonialForm />
        </RevealBlock>

        {/* ── Columna derecha: testimonios aprobados ── */}
        <RevealBlock delay={1}>
          {testimonials.length === 0 ? (
            <p className="body-copy text-center text-muted lg:pt-8">
              {t(UI.noTestimonials)}
            </p>
          ) : (
            <div className="flex flex-col gap-4 lg:max-h-[640px] lg:overflow-y-auto lg:pr-2">
              {testimonials.map((t) => (
                <TestimonialCard key={t._id} testimonial={t} lang={lang} />
              ))}
            </div>
          )}
        </RevealBlock>
      </div>
    </section>
  )
}