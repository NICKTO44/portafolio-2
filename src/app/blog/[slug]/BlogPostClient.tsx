'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { PortableText } from '@portabletext/react'
import { RevealBlock } from '@/components/ui/RevealBlock'
import { useLang } from '@/hooks/useLang'
import { cn } from '@/lib/utils'

const GRADIENTS = [
  'from-[#1a1510] to-[#2a1f14]',
  'from-[#0f1520] to-[#1a2535]',
  'from-[#1a0f14] to-[#2d1520]',
  'from-[#0f1a15] to-[#152a1e]',
  'from-[#0f181a] to-[#152530]',
  'from-[#150f1a] to-[#20152d]',
]

const CAT_LABELS: Record<string, { es: string; en: string }> = {
  technique:   { es: 'Técnica',           en: 'Technique'        },
  behind:      { es: 'Behind the scenes', en: 'Behind the scenes'},
  travel:      { es: 'Viajes',            en: 'Travel'           },
  inspiration: { es: 'Inspiración',       en: 'Inspiration'      },
  gear:        { es: 'Equipo',            en: 'Gear'             },
}

const LABELS = {
  back:    { es: '← Blog',                     en: '← Blog'              },
  minRead: { es: 'min de lectura',             en: 'min read'            },
  related: { es: 'También te puede interesar', en: 'You might also like' },
  share:   { es: 'Compartir',                  en: 'Share'               },
}

interface SanityPost {
  _id:          string
  title:        { es: string; en: string }
  slug:         string
  publishedAt?: string
  readTime?:    number
  category?:    string
  excerpt?:     { es: string; en: string }
  content?:     { es: any[]; en: any[] }
  coverImage?:  { url?: string; blurUrl?: string; alt?: string }
  images?:      Array<{ url?: string; blurUrl?: string; alt?: string }>
}

interface RelatedPost {
  _id:         string
  title:       { es: string; en: string }
  slug:        string
  category?:   string
  coverImage?: { url?: string; blurUrl?: string; alt?: string }
}

interface Props {
  post:    SanityPost
  related: RelatedPost[]
}

function formatDate(dateStr: string, lang: 'es' | 'en'): string {
  try {
    return new Date(dateStr).toLocaleDateString(
      lang === 'es' ? 'es-PE' : 'en-US',
      { day: 'numeric', month: 'long', year: 'numeric' }
    )
  } catch { return dateStr }
}

const portableComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="mb-6 font-sans text-[15px] leading-[1.95] text-cream/70">{children}</p>
    ),
    h2: ({ children }: any) => (
      <h2 className="mb-5 mt-12 font-serif text-2xl font-light text-cream">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="mb-4 mt-10 font-serif text-xl font-light text-cream">{children}</h3>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-medium text-cream">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="font-serif-italic text-beige">{children}</em>
    ),
  },
}

export default function BlogPostClient({ post, related }: Props) {
  const { t, lang } = useLang()

  const catLabel = CAT_LABELS[post.category ?? ''] ?? { es: post.category ?? '', en: post.category ?? '' }
  const dateStr  = post.publishedAt ? formatDate(post.publishedAt, lang) : ''
  console.log('images:', JSON.stringify(post.images, null, 2))
  return (
    <main className="min-h-screen pb-40">

      {/* ── Hero ── */}
      <section className="relative h-[65vh] min-h-[480px] overflow-hidden">
        {post.coverImage?.url ? (
          <Image
            src={post.coverImage.url}
            alt={post.coverImage.alt ?? post.title[lang]}
            fill
            className="object-cover scale-105"
            priority
            placeholder={post.coverImage.blurUrl ? 'blur' : 'empty'}
            blurDataURL={post.coverImage.blurUrl ?? undefined}
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${GRADIENTS[0]} scale-105`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40" />

        <div className="relative z-10 flex h-full flex-col justify-end section-container pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="eyebrow mb-4 text-gold">{catLabel[lang]}</p>
            <h1 className="heading-display max-w-3xl text-[clamp(2rem,5vw,4rem)] text-cream">
              {post.title[lang]}
            </h1>
            <div className="mt-5 flex items-center gap-4 font-sans text-[10px] uppercase tracking-widest2 text-muted">
              <span>{dateStr}</span>
              <span className="h-px w-4 bg-muted/40" />
              <span>{post.readTime} {t(LABELS.minRead)}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Article body ── */}
      <article className="section-container py-20">
        <div className="mx-auto max-w-2xl">

          {/* Excerpt como intro */}
          {post.excerpt?.[lang] && (
            <RevealBlock>
              <p className="mb-16 border-l-2 border-beige/30 pl-8 font-serif text-[clamp(1.1rem,2vw,1.35rem)] font-light italic leading-relaxed text-cream/80">
                {post.excerpt[lang]}
              </p>
            </RevealBlock>
          )}

          {/* Contenido con imágenes intercaladas */}
          {post.content?.[lang]?.length ? (
            <RevealBlock>
              {post.content[lang].map((block: any, i: number) => {
                const imageIndex = Math.floor(i / 3)
                const shouldShowImage =
                  i > 0 &&
                  (i + 1) % 3 === 0 && 
                  post.images?.[imageIndex]?.url

                return (
                  <div key={block._key ?? i}>
                    {shouldShowImage && (
                      <div className="relative my-10 aspect-[16/9] w-full overflow-hidden rounded-sm2">
                        <Image
                          src={post.images![imageIndex].url!}
                          alt={post.images![imageIndex].alt ?? ''}
                          fill
                          className="object-cover"
                          placeholder={post.images![imageIndex].blurUrl ? 'blur' : 'empty'}
                          blurDataURL={post.images![imageIndex].blurUrl ?? undefined}
                        />
                      </div>
                    )}
                    <PortableText
                      value={[block]}
                      components={portableComponents}
                    />
                  </div>
                )
              })}
            </RevealBlock>
          ) : (
            <RevealBlock>
              <p className="body-copy text-center text-muted py-20">
                {lang === 'es' ? 'Contenido próximamente…' : 'Content coming soon…'}
              </p>
            </RevealBlock>
          )}

          {/* Share */}
          <RevealBlock className="mt-16 flex items-center gap-6 border-t border-beige/[0.08] pt-10">
            <span className="font-sans text-[10px] uppercase tracking-widest2 text-muted">{t(LABELS.share)}</span>
            {['Instagram', 'Pinterest', 'Twitter'].map((s) => (
              <a key={s} href="#" className="font-sans text-[10px] uppercase tracking-widest2 text-muted transition-colors duration-300 hover:text-beige">
                {s}
              </a>
            ))}
          </RevealBlock>

        </div>
      </article>

      {/* ── Related posts ── */}
      {related.length > 0 && (
        <section className="border-t border-beige/[0.08] py-24">
          <div className="section-container">
            <RevealBlock className="mb-12">
              <p className="eyebrow">{t(LABELS.related)}</p>
            </RevealBlock>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {related.map((rp, i) => {
                const rpCat = CAT_LABELS[rp.category ?? ''] ?? { es: '', en: '' }
                return (
                  <RevealBlock key={rp._id} delay={(i % 2) as 0 | 1}>
                    <a href={`/blog/${rp.slug}`} className="group card-dark flex overflow-hidden rounded-sm2">
                      <div className={cn(
                        'relative w-28 flex-shrink-0 overflow-hidden',
                        !rp.coverImage?.url && `bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]}`
                      )}>
                        {rp.coverImage?.url && (
                          <Image
                            src={rp.coverImage.url}
                            alt={rp.title[lang]}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                      </div>
                      <div className="flex flex-col justify-center p-6">
                        <p className="eyebrow mb-2 text-gold">{rpCat[lang]}</p>
                        <p className="font-serif text-lg font-light leading-snug text-cream transition-colors duration-300 group-hover:text-beige">
                          {rp.title[lang]}
                        </p>
                      </div>
                    </a>
                  </RevealBlock>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Back link ── */}
      <div className="section-container">
        <a href="/blog" className="btn-ghost">{t(LABELS.back)}</a>
      </div>

    </main>
  )
}