'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { RevealBlock } from '@/components/ui/RevealBlock'
import { useLang } from '@/hooks/useLang'

const CONTENT = {
  eyebrow:           { es: 'Sobre el Artista',     en: 'About the Artist'    },
  philosophyEyebrow: { es: 'Filosofía',            en: 'Philosophy'          },
  philosophyTitle: {
    es: (<>El arte de ver<br /><em className="font-serif-italic text-beige">lo invisible</em></>),
    en: (<>The art of seeing<br /><em className="font-serif-italic text-beige">the invisible</em></>),
  },
  philosophyBody: {
    es: 'Creo que cada momento contiene una imagen perfecta esperando ser liberada. Mi trabajo no es crear belleza, sino revelarla. La cámara es solo el instrumento; la verdadera herramienta es la sensibilidad para reconocer ese instante único donde la luz, la emoción y la composición convergen en algo eterno.',
    en: 'I believe every moment contains a perfect image waiting to be released. My work is not to create beauty, but to reveal it. The camera is just the instrument; the true tool is the sensitivity to recognize that unique instant where light, emotion and composition converge into something eternal.',
  },
  journeyEyebrow:  { es: 'El Camino',          en: 'The Journey'         },
  behindEyebrow:   { es: 'Behind the Lens',    en: 'Behind the Lens'     },
  behindTitle: {
    es: (<>Más allá de<br /><em className="font-serif-italic text-beige">la cámara</em></>),
    en: (<>Beyond the<br /><em className="font-serif-italic text-beige">camera</em></>),
  },
  awardsEyebrow:   { es: 'Reconocimientos',    en: 'Recognition'         },
  clientsEyebrow:  { es: 'Han confiado en mí', en: 'They have trusted me' },
}

const JOURNEY_FALLBACK = [
  {
    year: '2012',
    title: { es: 'Los inicios', en: 'The beginning' },
    body: {
      es: 'Primera cámara, primeras obsesiones. Comencé fotografiando las calles de mi ciudad con una mirada hambrienta de historias.',
      en: 'First camera, first obsessions. I began photographing the streets of my city with a gaze hungry for stories.',
    },
  },
  {
    year: '2015',
    title: { es: 'Moda & Editorial', en: 'Fashion & Editorial' },
    body: {
      es: 'Primera colaboración con una revista de moda independiente. Descubrí que la fotografía de moda era en realidad fotografía de emociones.',
      en: 'First collaboration with an independent fashion magazine. I discovered that fashion photography was really photography of emotions.',
    },
  },
  {
    year: '2018',
    title: { es: 'Reconocimiento internacional', en: 'International recognition' },
    body: {
      es: 'Premio al mejor fotógrafo emergente en el Festival Internacional de Fotografía. Primeros proyectos en Europa y Asia.',
      en: 'Best emerging photographer award at the International Photography Festival. First projects in Europe and Asia.',
    },
  },
  {
    year: '2020',
    title: { es: 'El estudio nace', en: 'The studio is born' },
    body: {
      es: 'Fundación del estudio. Un espacio donde confluyen la moda, las bodas, la arquitectura y el arte.',
      en: 'Foundation of the studio. A space where fashion, weddings, architecture and art converge.',
    },
  },
  {
    year: '2024',
    title: { es: 'Hoy', en: 'Today' },
    body: {
      es: 'Más de 480 proyectos en 38 países. Colaboraciones con marcas de nivel internacional.',
      en: 'Over 480 projects in 38 countries. Collaborations with international-level brands.',
    },
  },
]

const AWARDS = [
  { year: '2023', title: 'IPA International Photography Awards', category: { es: 'Oro — Moda',                en: 'Gold — Fashion'             } },
  { year: '2022', title: 'Prix de la Photographie Paris',         category: { es: 'Plata — Editorial',         en: 'Silver — Editorial'         } },
  { year: '2021', title: 'Sony World Photography Awards',         category: { es: 'Finalista — Retrato',       en: 'Finalist — Portrait'        } },
  { year: '2020', title: 'Hasselblad Masters',                    category: { es: 'Nominado — Moda',           en: 'Nominated — Fashion'        } },
  { year: '2018', title: 'Festival Internacional de Fotografía',  category: { es: 'Mejor Fotógrafo Emergente', en: 'Best Emerging Photographer' } },
]

const CLIENTS = [
  'Vogue', 'Vanity Fair', 'Condé Nast', 'Four Seasons',
  'Louis Vuitton', 'Chanel', 'GEO Magazine', 'Ritz-Carlton',
  'Bulgari Hotels', 'Hermès', 'Dior Beauty', "Harper's Bazaar",
]

const BEHIND_FALLBACKS = [
  'from-[#1a1510] to-[#2a1f14]',
  'from-[#0f1520] to-[#1a2535]',
  'from-[#1a0f14] to-[#2d1520]',
  'from-[#0f1a15] to-[#152a1e]',
]

interface SanityImage {
  url?:     string
  alt?:     string
  width?:   number
  height?:  number
  blurUrl?: string
}

interface JourneyItem {
  year:  string
  title: { es?: string; en?: string }
  body:  { es?: string; en?: string }
}

interface Props {
  photographerPhoto?: SanityImage
  behindImages?:      SanityImage[]
  bio?:               { es?: string; en?: string }
  journey?:           JourneyItem[]
  stats?: {
    years?:        number
    projects?:     number
    countries?:    number
    satisfaction?: number
  }
}

export default function AboutPage({ photographerPhoto, behindImages, bio, journey, stats }: Props) {
  const { t, lang } = useLang()
  const bioText      = bio?.[lang] || bio?.es || t(CONTENT.philosophyBody)
  const journeyItems = (journey && journey.length > 0) ? journey : JOURNEY_FALLBACK

  return (
    <main className="min-h-screen pb-40 pt-16">

      {/* ── Eyebrow ── */}
      <div className="section-container pb-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow text-gold">{t(CONTENT.eyebrow)}</p>
        </motion.div>
      </div>

      {/* ── Philosophy ── */}
      <section className="section-container pt-8 pb-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-32">
          <RevealBlock>
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm2 bg-gradient-to-br from-[#1a1510] to-[#231a0f]">
              {photographerPhoto?.url ? (
                <Image
                  src={photographerPhoto.url}
                  alt={photographerPhoto.alt ?? 'Fotógrafo'}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                  placeholder={photographerPhoto.blurUrl ? 'blur' : 'empty'}
                  blurDataURL={photographerPhoto.blurUrl}
                />
              ) : (
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="font-serif text-sm italic text-beige/20">fotografía del artista</p>
                </div>
              )}
            </div>
          </RevealBlock>

          <div className="flex flex-col justify-center">
            <RevealBlock delay={1}>
              <p className="eyebrow mb-4">{t(CONTENT.philosophyEyebrow)}</p>
              <h2 className="heading-section mb-8 text-[clamp(2rem,4vw,3.5rem)] text-cream">
                {CONTENT.philosophyTitle[lang]}
              </h2>
              <p className="body-copy mb-8 text-base leading-[1.9]">{bioText}</p>
              <p className="font-serif text-3xl italic text-beige">Eikhonphoto</p>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ── Journey ── */}
      <section className="border-y border-beige/[0.08] py-32">
        <div className="section-container">
          <RevealBlock className="mb-20">
            <p className="eyebrow mb-4">{t(CONTENT.journeyEyebrow)}</p>
          </RevealBlock>
          <div className="relative">
            <div className="absolute left-[120px] top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-beige/15 to-transparent lg:block" aria-hidden="true" />
            <div className="flex flex-col gap-16">
              {journeyItems.map((item, i) => (
                <RevealBlock key={`${item.year}-${i}`} delay={(i % 3) as 0 | 1 | 2}>
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-[120px_1fr] lg:gap-16">
                    <div className="flex items-start lg:justify-end lg:pt-1">
                      <span className="font-serif text-2xl font-light text-beige/60">{item.year}</span>
                    </div>
                    <div className="relative lg:pl-16">
                      <div className="absolute -left-[23px] top-2 hidden h-2 w-2 rounded-full bg-beige/40 lg:block" aria-hidden="true" />
                      <h3 className="mb-3 font-serif text-xl font-light text-cream">{item.title[lang] ?? item.title.es}</h3>
                      <p className="body-copy">{item.body[lang] ?? item.body.es}</p>
                    </div>
                  </div>
                </RevealBlock>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Behind the lens ── */}
      <section className="section-container py-32">
        <RevealBlock className="mb-16">
          <p className="eyebrow mb-4">{t(CONTENT.behindEyebrow)}</p>
          <h2 className="heading-section text-[clamp(2rem,4vw,3.5rem)] text-cream">
            {CONTENT.behindTitle[lang]}
          </h2>
        </RevealBlock>
        <div className="columns-2 gap-1 lg:columns-4">
          {[0, 1, 2, 3].map((i) => {
            const img = behindImages?.[i]
            return (
              <RevealBlock key={i} delay={(i % 3) as 0 | 1 | 2} className="mb-1 break-inside-avoid">
                {img?.url ? (
                  <div
                    className="relative w-full overflow-hidden rounded-sm2"
                    style={{
                      aspectRatio: img.width && img.height
                        ? `${img.width} / ${img.height}`
                        : '1 / 1',
                    }}
                  >
                    <Image
                      src={img.url}
                      alt={img.alt ?? `Behind the lens ${i + 1}`}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover"
                      placeholder={img.blurUrl ? 'blur' : 'empty'}
                      blurDataURL={img.blurUrl ?? undefined}
                    />
                  </div>
                ) : (
                  <div className={`w-full aspect-square rounded-sm2 bg-gradient-to-br ${BEHIND_FALLBACKS[i]}`} />
                )}
              </RevealBlock>
            )
          })}
        </div>
      </section>

      {/* ── Awards ── */}
      <section className="border-t border-beige/[0.08] py-32">
        <div className="section-container">
          <RevealBlock className="mb-16">
            <p className="eyebrow mb-4">{t(CONTENT.awardsEyebrow)}</p>
          </RevealBlock>
          <div className="flex flex-col divide-y divide-beige/[0.08]">
            {AWARDS.map((award, i) => (
              <RevealBlock key={i} delay={(i % 3) as 0 | 1 | 2}>
                <div className="flex items-center justify-between py-6 transition-colors duration-300 hover:bg-carbon px-2">
                  <div className="flex items-center gap-8">
                    <span className="w-12 font-serif text-lg text-beige/50">{award.year}</span>
                    <span className="font-sans text-sm text-cream/80">{award.title}</span>
                  </div>
                  <span className="font-sans text-[10px] uppercase tracking-widest2 text-gold">{award.category[lang]}</span>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── Clients ── */}
      <section className="border-t border-beige/[0.08] py-24">
        <div className="section-container">
          <RevealBlock className="mb-12">
            <p className="eyebrow">{t(CONTENT.clientsEyebrow)}</p>
          </RevealBlock>
          <RevealBlock delay={1} className="flex flex-wrap gap-3">
            {CLIENTS.map((name) => (
              <span key={name} className="rounded-sm2 border border-beige/15 px-5 py-2.5 font-sans text-xs uppercase tracking-widest2 text-muted transition-colors duration-300 hover:border-beige/30 hover:text-beige">
                {name}
              </span>
            ))}
          </RevealBlock>
        </div>
      </section>

    </main>
  )
}