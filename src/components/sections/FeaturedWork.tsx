'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { RevealBlock } from '@/components/ui/RevealBlock'
import { SectionHeader } from '@/components/shared/SectionHeader'
import { useLang } from '@/hooks/useLang'
import { cn } from '@/lib/utils'

const MotionLink = motion(Link)

const CONTENT = {
  eyebrow: { es: 'Trabajo Seleccionado', en: 'Selected Work' },
  viewAll: { es: 'Ver todo el portafolio', en: 'View full portfolio' },
}

const FILTERS = [
  { id: 'all',          es: 'Todo',             en: 'All'                },
  { id: 'fashion',      es: 'Moda & Editorial', en: 'Fashion & Editorial' },
  { id: 'wedding',      es: 'Bodas Luxury',     en: 'Luxury Weddings'    },
  { id: 'architecture', es: 'Arquitectura',     en: 'Architecture'       },
  { id: 'portrait',     es: 'Retratos',         en: 'Portraits'          },
  { id: 'lifestyle',    es: 'Lifestyle',        en: 'Lifestyle'          },
  { id: 'branding',     es: 'Branding',         en: 'Branding'           },
]

const GRADIENTS = [
  'from-[#1a1510] via-[#231a0f] to-[#1a1208]',
  'from-[#0f1520] to-[#1a2535]',
  'from-[#1a0f14] to-[#2d1520]',
  'from-[#0f1a15] to-[#152a1e]',
  'from-[#1a1505] to-[#2a2510]',
  'from-[#150f1a] to-[#20152d]',
  'from-[#0f181a] to-[#152530]',
]

interface SanityProject {
  _id:      string
  title:    { es: string; en: string }
  slug:     string
  category: string
  client?:  string
  coverImage?: {
    asset?: { _ref: string }
    url?:   string
    alt?:   string
    width?: number
    height?: number
  }
}

interface Props {
  projects?: SanityProject[]
}

export function FeaturedWork({ projects = [] }: Props) {
  const { t, lang } = useLang()
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = projects.filter(
    (p) => activeFilter === 'all' || p.category === activeFilter
  )

  const displayed = filtered.slice(0, 7)

  return (
    <section id="work" className="py-36 section-container">

      <RevealBlock>
        <SectionHeader
          eyebrow={t(CONTENT.eyebrow)}
          title={<>Featured <em className="font-serif-italic text-beige">Work</em></>}
          action={
            <Link href="/portfolio" className="btn-ghost">
              {t(CONTENT.viewAll)} →
            </Link>
          }
        />
      </RevealBlock>

      {/* Filters */}
      <RevealBlock delay={1} className="mb-12 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={cn('tag-pill', activeFilter === f.id && 'active')}
          >
            {f[lang]}
          </button>
        ))}
      </RevealBlock>

      {/* Grid con altura uniforme */}
      <RevealBlock delay={2}>
        <motion.div layout className="columns-1 gap-1 sm:columns-2 lg:columns-3">
          <AnimatePresence mode="popLayout">
            {displayed.map((project, i) => {
              const imgUrl   = project.coverImage?.url ?? null
              const gradient = GRADIENTS[i % GRADIENTS.length]

              return (
                <MotionLink
                  key={project._id}
                  href={`/portfolio/${project.slug}`}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative mb-1 block break-inside-avoid overflow-hidden rounded-sm2"
                >
                  {/* Contenedor con aspect ratio fijo igual para todas */}
                  <div
                    className="relative w-full overflow-hidden"
                    style={{ aspectRatio: '2/3' }}
                  >
                    {imgUrl ? (
                      <Image
                        src={imgUrl}
                        alt={project.coverImage?.alt ?? project.title?.[lang] ?? ''}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority={i === 0}
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className={`h-full w-full bg-gradient-to-br ${gradient} transition-transform duration-700 group-hover:scale-105`} />
                    )}
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <p className="eyebrow mb-1.5 text-gold">{project.category}</p>
                    <p className="font-serif text-lg font-light leading-tight text-cream">
                      {project.title?.[lang]}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-beige/30 bg-black/40 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 stroke-cream">
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </div>
                </MotionLink>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </RevealBlock>

    </section>
  )
}