// components/sections/AboutSection.tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { RevealBlock } from '@/components/ui/RevealBlock'
import { useLang } from '@/hooks/useLang'

const CONTENT = {
  eyebrow: { es: 'Sobre el Artista', en: 'About the Artist' },
  title: {
    es: (<>Una visión <em className="font-serif-italic text-beige">singular</em><br />de la luz y el tiempo</>),
    en: (<>A <em className="font-serif-italic text-beige">singular</em> vision<br />of light and time</>),
  },
  bio1: {
    es: 'Con más de una década capturando momentos que trascienden lo ordinario, mi trabajo explora la intersección entre la emoción humana y la belleza visual. Cada imagen es una historia contada en silencio.',
    en: 'With over a decade capturing moments that transcend the ordinary, my work explores the intersection between human emotion and visual beauty. Each image is a story told in silence.',
  },
  bio2: {
    es: 'Especializado en fotografía de moda editorial, bodas de lujo, arquitectura y lifestyle. He colaborado con marcas internacionales, revistas y hoteles de los cinco continentes.',
    en: 'Specialized in editorial fashion, luxury weddings, architecture and lifestyle. I have collaborated with international brands, magazines and hotels across five continents.',
  },
  yearsLabel: { es: 'Años de experiencia', en: 'Years of experience' },
  cta:        { es: 'Conocer más →', en: 'Learn more →' },
}

const CLIENTS = ['Vogue', 'Vanity Fair', 'Condé Nast', 'Four Seasons', 'Louis Vuitton', 'Chanel']

interface Props {
  photographerPhoto?: {
    url?:    string
    alt?:    string
    width?:  number
    height?: number
  }
}

export function AboutSection({ photographerPhoto }: Props) {
  const { t, lang } = useLang()

  return (
    <section id="about" className="section-container py-36">
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">

        {/* ── Visual column ── */}
        <RevealBlock className="relative">

          {/* Main photo */}
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm2 bg-gradient-to-br from-[#1a1510] via-[#231a0f] to-[#1a1208]">
            {photographerPhoto?.url ? (
              <Image
                src={photographerPhoto.url}
                alt={photographerPhoto.alt ?? 'Fotógrafo'}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-end justify-start p-8">
                <p className="font-serif text-sm italic text-beige/20">fotografía del artista</p>
              </div>
            )}
          </div>

          {/* Decorative border top-right */}
          <div className="absolute -right-5 -top-5 h-28 w-28 rounded-sm2 border border-beige/15" aria-hidden="true" />

          {/* Floating years badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="glass absolute -left-7 bottom-10 rounded-sm2 px-6 py-5"
          >
            <p className="font-serif text-[2.6rem] font-light leading-none text-beige">12+</p>
            <p className="mt-1 font-sans text-[9px] uppercase tracking-widest2 text-muted">
              {t(CONTENT.yearsLabel)}
            </p>
          </motion.div>

        </RevealBlock>

        {/* ── Text column ── */}
        <div className="flex flex-col">
          <RevealBlock delay={1}>
            <p className="eyebrow mb-4">{t(CONTENT.eyebrow)}</p>
            <h2 className="heading-section mb-8 text-[clamp(2rem,4vw,3.25rem)] text-cream">
              {CONTENT.title[lang]}
            </h2>
          </RevealBlock>

          <RevealBlock delay={2}>
            <p className="body-copy mb-5">{t(CONTENT.bio1)}</p>
            <p className="body-copy mb-10">{t(CONTENT.bio2)}</p>
          </RevealBlock>

          <RevealBlock delay={3}>
            {/* Signature */}
            <p className="mb-8 font-serif text-3xl italic text-beige">Lumière</p>

            {/* Client tags */}
            <div className="mb-10 flex flex-wrap gap-2">
              {CLIENTS.map((name) => (
                <span
                  key={name}
                  className="rounded-sm2 border border-beige/20 px-4 py-1.5 font-sans text-[9px] uppercase tracking-[0.15em] text-muted"
                >
                  {name}
                </span>
              ))}
            </div>

            <a href="/about" className="btn-ghost">{t(CONTENT.cta)}</a>
          </RevealBlock>
        </div>

      </div>
    </section>
  )
}