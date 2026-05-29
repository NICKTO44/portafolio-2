'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { RevealBlock } from '@/components/ui/RevealBlock'
import { Photo } from '@/components/ui/Photo'
import { LightboxModal } from '@/components/ui/LightboxModal'
import { useLang } from '@/hooks/useLang'
import { getImageSrc, getCategoryLabel, type ImageVariant } from '@/lib/images'
import type { Project, Category, SanityImage, Lang } from '@/types'

const CONTENT = {
  back:    { es: '← Portafolio', en: '← Portfolio' },
  related: { es: 'Proyectos relacionados', en: 'Related projects' },
}

interface Props {
  project: Project
  related: Project[]
}

function formatDate(iso: string | undefined, lang: Lang): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

function GalleryImage({
  image, alt, variant = 'gallery', className, sizes, priority,
}: {
  image: SanityImage
  alt: string
  variant?: ImageVariant
  className?: string
  sizes: string
  priority?: boolean
}) {
  const aspect = image.width && image.height ? image.width / image.height : 3 / 4
  return (
    <motion.div
      className={`relative w-full overflow-hidden ${className ?? ''}`}
      style={{ aspectRatio: String(aspect) }}
    >
      <Photo
        image={image} variant={variant} alt={alt}
        sizes={sizes} priority={priority} className="object-cover"
      />
    </motion.div>
  )
}

export default function ProjectDetail({ project, related }: Props) {
  const { t, lang } = useLang()

  // Estado del lightbox
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const gallery = project.images ?? []
  const title = project.title?.[lang] ?? ''
  const categoryLabel = getCategoryLabel(
    project.category as Category | string | undefined, lang
  )

  const meta: string[] = []
  if (project.client) meta.push(project.client)
  if (project.location?.[lang]) meta.push(project.location[lang])
  const date = formatDate(project.publishedAt, lang)
  if (date) meta.push(date)

  const openLightbox  = (i: number) => setLightboxIndex(i)
  const closeLightbox = () => setLightboxIndex(null)
  const prevImage = () =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + gallery.length) % gallery.length : null))
  const nextImage = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % gallery.length : null))

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[65vh] overflow-hidden">
        {getImageSrc(project.coverImage, { variant: 'hero' }) ? (
          <div className="absolute inset-0">
            <Photo
              image={project.coverImage} variant="hero"
              alt={project.coverImage?.alt ?? title}
              priority sizes="100vw" className="object-cover"
            />
          </div>
        ) : (
          <div className="absolute inset-0 bg-carbon-2" />
        )}
        <motion.div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/50" />

        <div className="relative z-10 flex min-h-[65vh] flex-col justify-end section-container pb-16 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {categoryLabel && <p className="eyebrow mb-4 text-gold">{categoryLabel}</p>}
            <h1 className="heading-display max-w-4xl text-[clamp(2rem,5vw,4.5rem)] text-cream">
              {title}
            </h1>
            {meta.length > 0 && (
              <motion.div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-[10px] uppercase tracking-widest2 text-muted">
                {meta.map((item, i) => (
                  <span key={i} className="flex items-center gap-4">
                    {i > 0 && <span className="h-px w-4 bg-muted/40" />}
                    {item}
                  </span>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Description */}
      {project.description?.[lang] && (
        <article className="section-container py-20">
          <RevealBlock>
            <p className="body-copy mx-auto max-w-2xl text-[15px] leading-[1.95]">
              {project.description[lang]}
            </p>
          </RevealBlock>
        </article>
      )}

      {/* Gallery — cada imagen abre el lightbox */}
      {gallery.length > 0 && (
        <div className="section-container mb-20">
          <motion.div layout className="columns-1 gap-3 sm:columns-2 lg:columns-3">
            {gallery.map((image, i) =>
              getImageSrc(image, { variant: 'gallery' }) ? (
                <RevealBlock key={i} delay={(i % 3) as 0 | 1 | 2} className="mb-1 break-inside-avoid">
                  <button
                    onClick={() => openLightbox(i)}
                    className="group relative block w-full overflow-hidden rounded-sm2 cursor-zoom-in"
                    aria-label={`Ver imagen ${i + 1}`}
                  >
                    <GalleryImage
                      image={image} alt={image.alt ?? title}
                      variant="gallery"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    {/* Hover hint */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/40 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                        <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 stroke-white">
                          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                        </svg>
                      </div>
                    </div>
                  </button>
                </RevealBlock>
              ) : null
            )}
          </motion.div>
        </div>
      )}

      {/* Lightbox */}
      <LightboxModal
        images={gallery.filter((img) => getImageSrc(img, { variant: 'gallery' }))}
        current={lightboxIndex}
        onClose={closeLightbox}
        onPrev={prevImage}
        onNext={nextImage}
        alt={title}
      />

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-beige/[0.08] py-24">
          <motion.div className="section-container">
            <RevealBlock className="mb-12">
              <p className="eyebrow">{t(CONTENT.related)}</p>
            </RevealBlock>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, i) => (
                <RevealBlock key={item._id} delay={(i % 3) as 0 | 1 | 2}>
                  <Link
                    href={`/portfolio/${item.slug}`}
                    className="group relative block overflow-hidden rounded-sm2"
                  >
                    {getImageSrc(item.coverImage, { variant: 'grid' }) ? (
                      <div className="relative w-full" style={{ aspectRatio: '3/4' }}>
                        <Photo
                          image={item.coverImage} variant="grid"
                          alt={item.coverImage?.alt ?? item.title?.[lang] ?? ''}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[3/4] w-full bg-carbon-2" />
                    )}
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/10 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <p className="eyebrow mb-2 text-gold">
                        {getCategoryLabel(item.category as Category | string | undefined, lang)}
                      </p>
                      <p className="font-serif text-xl font-light leading-tight text-cream">
                        {item.title?.[lang]}
                      </p>
                    </div>
                  </Link>
                </RevealBlock>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* Back */}
      <div className="section-container pb-8">
        <Link href="/portfolio" className="btn-ghost">{t(CONTENT.back)}</Link>
      </div>
    </>
  )
}