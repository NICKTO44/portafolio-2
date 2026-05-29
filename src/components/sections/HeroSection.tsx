'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLang } from '@/hooks/useLang'

const CONTENT = {
  eyebrow: {
    es: 'Fotografía de Autor · Colecciones 2024',
    en: 'Editorial Photography · Collections 2024',
  },
  tagline: {
    es: 'Where light becomes art',
    en: 'Where light becomes art',
  },
  cta1: { es: 'Ver Portafolio',  en: 'View Portfolio' },
  cta2: { es: 'Reservar Sesión', en: 'Book a Session' },
  scroll: { es: 'Scroll', en: 'Scroll' },
}

const CELLS = [
  'from-[#1a1510] to-[#2a1f14]', 'from-[#0f1520] to-[#1a2535]',
  'from-[#1a0f14] to-[#2d1520]', 'from-[#0f1a15] to-[#152a1e]',
  'from-[#1a1505] to-[#2a2510]', 'from-[#150f1a] to-[#20152d]',
  'from-[#0f181a] to-[#152530]', 'from-[#1a1510] to-[#2a1f14]',
  'from-[#1a0f14] to-[#2d1520]', 'from-[#0f1520] to-[#1a2535]',
  'from-[#1a1505] to-[#2a2510]', 'from-[#0f1a15] to-[#152a1e]',
]

interface Props {
  heroImage?: { url?: string; alt?: string; width?: number; height?: number }
  brandName?: string
  tagline?:   { es?: string; en?: string }
}

function splitBrandName(name?: string): { first: string; rest: string } {
  if (!name) return { first: 'LUMI', rest: 'ÈRE' }
  const upper = name.toUpperCase()
  if (upper.length > 4) return { first: upper.slice(0, 4), rest: upper.slice(4) }
  return { first: upper, rest: '' }
}

export function HeroSection({ heroImage, brandName, tagline }: Props) {
  const { t, lang } = useLang()
  const containerRef = useRef<HTMLElement>(null)
  const [mounted, setMounted] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const imageY         = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const contentY       = useTransform(scrollYProgress, [0, 0.4], ['0%', '-8%'])

  useEffect(() => { setMounted(true) }, [])

  const { first, rest } = splitBrandName(brandName)
  const taglineText = tagline?.[lang] || tagline?.es || t(CONTENT.tagline)

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex h-screen min-h-[600px] items-center justify-start overflow-hidden"
    >
      {/* Background */}
      <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110" aria-hidden="true">
        {heroImage?.url ? (
          <Image
            src={heroImage.url}
            alt={heroImage.alt ?? ''}
            fill priority sizes="100vw"
            className="object-cover object-center"
          />
        ) : (
          <div className="grid h-full grid-cols-4 grid-rows-3 gap-0.5 opacity-20">
            {CELLS.map((gradient, i) => (
              <div key={i} className={`h-full w-full bg-gradient-to-br ${gradient}`} />
            ))}
          </div>
        )}
      </motion.div>

      {/* Overlays — sin cambios */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" aria-hidden="true" />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)' }}
        aria-hidden="true"
      />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent" aria-hidden="true" />

      {/* Content — solo cambia: items-center→items-start, px centrado→px-8/16/24, text-center eliminado */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 flex flex-col items-start px-8 md:px-16 lg:px-24"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow mb-8 text-gold"
        >
          {t(CONTENT.eyebrow)}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="heading-display mb-4 text-[clamp(72px,12vw,160px)] text-cream"
        >
          {first}
          {rest && <em className="font-serif-italic text-beige">{rest}</em>}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={mounted ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 h-px w-16 bg-gold origin-center"
          aria-hidden="true"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 font-serif text-[clamp(1.1rem,2.4vw,1.75rem)] font-light italic tracking-[0.06em] text-beige/90"
        >
          {taglineText}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-4"
        >
          <a
            href="#work"
            onClick={(e) => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="btn-primary"
          >
            {t(CONTENT.cta1)}
          </a>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="inline-flex items-center justify-center
                       font-sans text-2xs font-light uppercase tracking-widest2
                       px-9 py-4 bg-transparent text-beige rounded-sm2
                       border border-gold/40
                       transition-all duration-400 ease-expo-out
                       hover:border-gold/80 hover:bg-gold/[0.06]
                       active:scale-[0.98]"
          >
            {t(CONTENT.cta2)}
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.92 }}
          className="mt-10 font-sans text-[10px] uppercase tracking-[0.2em] text-muted"
        >
          200+ sesiones&nbsp;&nbsp;·&nbsp;&nbsp;Cusco &amp; Lima&nbsp;&nbsp;·&nbsp;&nbsp;Desde 2019
        </motion.p>
      </motion.div>

      {/* Scroll indicator — sin cambios */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.4 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
        aria-hidden="true"
      >
        <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-gold/50">
          {t(CONTENT.scroll)}
        </span>
        <div className="h-12 w-px animate-scroll-line bg-gradient-to-b from-gold/60 to-transparent" />
      </motion.div>
    </section>
  )
}