'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RevealBlock } from '@/components/ui/RevealBlock'
import { useLang } from '@/hooks/useLang'
import { getImageSrc, getCategorySlug, getCategoryLabel, CATEGORY_LABELS } from '@/lib/images'
import { Photo } from '@/components/ui/Photo'
import { cn } from '@/lib/utils'
import type { Project, Category } from '@/types'

const CONTENT = {
  eyebrow: { es: 'Colección Completa', en: 'Full Collection' },
  all: { es: 'Todo', en: 'All' },
}

interface Props {
  projects:   Project[]
  categories: Category[]
}

export function PortfolioClient({ projects, categories }: Props) {
  const { t, lang } = useLang()
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = projects.filter((p) => {
    if (activeFilter === 'all') return true
    return getCategorySlug(p.category as Parameters<typeof getCategorySlug>[0]) === activeFilter
  })

  const filterOptions =
    categories.length > 0
      ? categories.map((cat) => ({ id: cat.slug, label: cat.title }))
      : Object.entries(CATEGORY_LABELS).map(([id, label]) => ({ id, label }))

  return (
    <>
      {/* Header + Filters en una sola línea */}
      <div className="section-container mb-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-b border-beige/[0.08] pb-6 pt-8">
        <RevealBlock className="flex flex-wrap items-center gap-x-8 gap-y-3 w-full">
          <p className="eyebrow shrink-0">{t(CONTENT.eyebrow)}</p>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={cn('tag-pill', activeFilter === 'all' && 'active')}
            >
              {t(CONTENT.all)}
            </button>
            {filterOptions.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={cn('tag-pill', activeFilter === cat.id && 'active')}
              >
                {cat.label[lang]}
              </button>
            ))}
          </div>
        </RevealBlock>
      </div>

      {/* Masonry grid */}
      <div className="section-container">
        <motion.div layout className="columns-1 gap-1 sm:columns-2 lg:columns-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project._id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="group relative mb-1 break-inside-avoid"
              >
                <a href={`/portfolio/${project.slug}`} className="block overflow-hidden rounded-sm2">
                  {getImageSrc(project.coverImage, { variant: 'grid' }) ? (
                    <div
                      className="relative w-full overflow-hidden"
                      style={{
                        aspectRatio: project.coverImage?.width && project.coverImage?.height
                          ? `${project.coverImage.width} / ${project.coverImage.height}`
                          : '3/4',
                      }}
                    >
                      <Photo
                        image={project.coverImage}
                        variant="grid"
                        alt={project.coverImage?.alt ?? project.title[lang] ?? ''}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[3/4] w-full bg-carbon-2 transition-transform duration-700 group-hover:scale-[1.03]" />
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/10 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <p className="eyebrow mb-2 text-gold">
                      {getCategoryLabel(project.category as Parameters<typeof getCategoryLabel>[0], lang)}
                    </p>
                    <p className="font-serif text-xl font-light leading-tight text-cream">{project.title?.[lang]}</p>
                    {project.client && (
                      <p className="mt-1 font-sans text-[10px] uppercase tracking-widest2 text-muted">{project.client}</p>
                    )}
                  </div>

                  {/* Arrow */}
                  <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-beige/30 bg-black/50 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 stroke-cream">
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </div>
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  )
}