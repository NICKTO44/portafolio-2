'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { RevealBlock } from '@/components/ui/RevealBlock'
import { useLang } from '@/hooks/useLang'
import { cn } from '@/lib/utils'

// ── Types ──
interface SanityPost {
  _id:       string
  title:     { es: string; en: string }
  slug:      string
  publishedAt?: string
  readTime?: number
  category?: string
  featured?: boolean
  excerpt?:  { es: string; en: string }
  coverImage?: { url?: string; blurUrl?: string; alt?: string }
}

interface NormalizedPost {
  id:       string
  slug:     string
  cat:      string
  gradient: string
  featured: boolean
  readTime: number
  date:     { es: string; en: string }
  catLabel: { es: string; en: string }
  title:    { es: string; en: string }
  excerpt:  { es: string; en: string }
  coverImage?: { url: string; blurUrl?: string; alt?: string }
}

const CONTENT = {
  eyebrow:  { es: 'Reflexiones & Técnica', en: 'Reflections & Technique' },
  sub: {
    es: 'Artículos sobre fotografía, técnica, viajes y la mirada detrás de cada imagen.',
    en: 'Articles about photography, technique, travel and the vision behind each image.',
  },
  readMore: { es: 'Leer artículo', en: 'Read article' },
  minRead:  { es: 'min de lectura', en: 'min read' },
}

const CATEGORIES = [
  { id: 'all',         es: 'Todo',              en: 'All'              },
  { id: 'technique',   es: 'Técnica',           en: 'Technique'        },
  { id: 'behind',      es: 'Behind the scenes', en: 'Behind the scenes'},
  { id: 'travel',      es: 'Viajes',            en: 'Travel'           },
  { id: 'inspiration', es: 'Inspiración',       en: 'Inspiration'      },
  { id: 'gear',        es: 'Equipo',            en: 'Gear'             },
]

const CAT_LABELS: Record<string, { es: string; en: string }> = {
  technique:   { es: 'Técnica',           en: 'Technique'        },
  behind:      { es: 'Behind the scenes', en: 'Behind the scenes'},
  travel:      { es: 'Viajes',            en: 'Travel'           },
  inspiration: { es: 'Inspiración',       en: 'Inspiration'      },
  gear:        { es: 'Equipo',            en: 'Gear'             },
}

const GRADIENTS = [
  'from-[#1a1510] to-[#2a1f14]',
  'from-[#0f1520] to-[#1a2535]',
  'from-[#1a0f14] to-[#2d1520]',
  'from-[#0f1a15] to-[#152a1e]',
  'from-[#0f181a] to-[#152530]',
  'from-[#150f1a] to-[#20152d]',
]

const MOCK_POSTS: NormalizedPost[] = [
  {
    id: '1', slug: 'luz-natural-vs-artificial', cat: 'technique',
    gradient: GRADIENTS[0], featured: true, readTime: 8,
    date:     { es: '12 Ene 2025', en: 'Jan 12, 2025' },
    catLabel: { es: 'Técnica', en: 'Technique' },
    title:    { es: 'Luz natural vs artificial: cuándo usar cada una', en: 'Natural vs artificial light: when to use each' },
    excerpt:  { es: 'Después de 12 años fotografiando en todo tipo de condiciones, he llegado a una conclusión clara: no existe la luz mala, solo la incomprendida.', en: 'After 12 years photographing in all kinds of conditions, I have reached a clear conclusion: there is no bad light, only misunderstood light.' },
  },
  {
    id: '2', slug: 'behind-scenes-vogue', cat: 'behind',
    gradient: GRADIENTS[1], featured: false, readTime: 6,
    date:     { es: '28 Dic 2024', en: 'Dec 28, 2024' },
    catLabel: { es: 'Behind the scenes', en: 'Behind the scenes' },
    title:    { es: 'Detrás de la portada: cómo fue el shoot para Vogue', en: 'Behind the cover: how the Vogue shoot went' },
    excerpt:  { es: 'Una mirada íntima al proceso creativo detrás de una de las sesiones más exigentes de mi carrera.', en: 'An intimate look at the creative process behind one of the most demanding sessions of my career.' },
  },
  {
    id: '3', slug: 'fotografiar-bodas-en-italia', cat: 'travel',
    gradient: GRADIENTS[2], featured: false, readTime: 10,
    date:     { es: '15 Dic 2024', en: 'Dec 15, 2024' },
    catLabel: { es: 'Viajes', en: 'Travel' },
    title:    { es: 'Fotografiar bodas en Italia: la guía definitiva', en: 'Photographing weddings in Italy: the definitive guide' },
    excerpt:  { es: 'Desde las villas de la Toscana hasta los canales de Venecia, Italia ofrece locaciones incomparables para la fotografía nupcial.', en: 'From the villas of Tuscany to the canals of Venice, Italy offers unparalleled locations for wedding photography.' },
  },
  {
    id: '4', slug: 'equipo-2025', cat: 'gear',
    gradient: GRADIENTS[3], featured: false, readTime: 5,
    date:     { es: '3 Dic 2024', en: 'Dec 3, 2024' },
    catLabel: { es: 'Equipo', en: 'Gear' },
    title:    { es: 'Mi equipo fotográfico en 2025: qué uso y por qué', en: 'My photography gear in 2025: what I use and why' },
    excerpt:  { es: 'No creo en el equipo por el equipo. Cada cámara, lente y accesorio en mi mochila tiene una razón de ser.', en: "I don't believe in gear for gear's sake. Every camera, lens and accessory in my bag has a reason to be there." },
  },
  {
    id: '5', slug: 'la-patagonia-desde-mi-lente', cat: 'travel',
    gradient: GRADIENTS[4], featured: false, readTime: 12,
    date:     { es: '20 Nov 2024', en: 'Nov 20, 2024' },
    catLabel: { es: 'Viajes', en: 'Travel' },
    title:    { es: 'La Patagonia desde mi lente: 30 días al fin del mundo', en: 'Patagonia through my lens: 30 days at the end of the world' },
    excerpt:  { es: 'Un mes recorriendo la Patagonia con solo una mochila y dos cuerpos de cámara.', en: 'A month traveling through Patagonia with just a backpack and two camera bodies.' },
  },
  {
    id: '6', slug: 'composicion-regla-de-tercios', cat: 'technique',
    gradient: GRADIENTS[5], featured: false, readTime: 7,
    date:     { es: '8 Nov 2024', en: 'Nov 8, 2024' },
    catLabel: { es: 'Técnica', en: 'Technique' },
    title:    { es: 'Más allá de la regla de tercios: composición avanzada', en: 'Beyond the rule of thirds: advanced composition' },
    excerpt:  { es: 'La regla de tercios es el punto de partida, no el destino.', en: 'The rule of thirds is the starting point, not the destination.' },
  },
]

function formatDate(dateStr: string, lang: 'es' | 'en'): string {
  try {
    return new Date(dateStr).toLocaleDateString(lang === 'es' ? 'es-PE' : 'en-US', {
      day: 'numeric', month: 'short', year: 'numeric',
    })
  } catch { return dateStr }
}

function normalizeSanityPost(p: SanityPost, i: number): NormalizedPost {
  const cat = p.category ?? 'technique'
  const dateStr = p.publishedAt ?? ''
  return {
    id:       p._id,
    slug:     p.slug,
    cat,
    gradient: GRADIENTS[i % GRADIENTS.length],
    featured: p.featured ?? false,
    readTime: p.readTime ?? 5,
    date: {
      es: dateStr ? formatDate(dateStr, 'es') : '',
      en: dateStr ? formatDate(dateStr, 'en') : '',
    },
    catLabel: CAT_LABELS[cat] ?? { es: cat, en: cat },
    title:    p.title,
    excerpt:  p.excerpt ?? { es: '', en: '' },
    coverImage: p.coverImage?.url
      ? { url: p.coverImage.url, blurUrl: p.coverImage.blurUrl, alt: p.coverImage.alt }
      : undefined,
  }
}

function PostImage({ post, className }: { post: NormalizedPost; className?: string }) {
  if (post.coverImage?.url) {
    return (
      <div className={cn('relative overflow-hidden', className)}>
        <Image
          src={post.coverImage.url}
          alt={post.coverImage.alt ?? post.title.es}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          placeholder={post.coverImage.blurUrl ? 'blur' : 'empty'}
          blurDataURL={post.coverImage.blurUrl ?? undefined}
        />
      </div>
    )
  }
  return (
    <div className={cn(
      `bg-gradient-to-br ${post.gradient} transition-transform duration-700 group-hover:scale-[1.03]`,
      className
    )} />
  )
}

interface Props {
  sanityPosts?: SanityPost[]
}

export default function BlogClient({ sanityPosts = [] }: Props) {
  const { t, lang } = useLang()
  const [activeFilter, setActiveFilter] = useState('all')

  const posts: NormalizedPost[] = sanityPosts.length > 0
    ? sanityPosts.map(normalizeSanityPost)
    : MOCK_POSTS

  const filtered = posts.filter(
    (p) => activeFilter === 'all' || p.cat === activeFilter
  )

  const featured = posts.find((p) => p.featured)
  const rest     = filtered.filter((p) => !p.featured || activeFilter !== 'all')

  return (
    <main className="min-h-screen pb-40">

     {/* ── Header compacto ── */}
<section className="section-container pt-20 pb-8">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className="text-center"
  >
    <p className="eyebrow mb-2 text-gold">{t(CONTENT.eyebrow)}</p>
    <h1 className="font-serif text-[clamp(2rem,5vw,3.5rem)] font-light text-cream">
      {lang === 'es'
        ? <>El <em className="font-serif-italic text-beige">blog</em></>
        : <>The <em className="font-serif-italic text-beige">blog</em></>}
    </h1>
    <p className="body-copy mx-auto mt-2 max-w-md text-sm">{t(CONTENT.sub)}</p>
  </motion.div>
</section>

      {/* ── Featured post ── */}
      {activeFilter === 'all' && featured && (
        <div className="section-container py-8">
          <RevealBlock>
            <a href={`/blog/${featured.slug}`} className="group grid grid-cols-1 gap-1 overflow-hidden rounded-sm2 lg:grid-cols-2">
              <PostImage post={featured} className="aspect-[4/3] w-full" />
              <div className="flex flex-col justify-center bg-carbon p-10 lg:p-14">
                <p className="eyebrow mb-4 text-gold">{featured.catLabel[lang]}</p>
                <h2 className="mb-5 font-serif text-[clamp(1.5rem,3vw,2.5rem)] font-light leading-tight text-cream transition-colors duration-300 group-hover:text-beige">
                  {featured.title[lang]}
                </h2>
                <p className="body-copy mb-8 line-clamp-3">{featured.excerpt[lang]}</p>
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[10px] uppercase tracking-widest2 text-muted">
                    {featured.date[lang]} · {featured.readTime} {t(CONTENT.minRead)}
                  </span>
                  <span className="btn-ghost text-[10px]">{t(CONTENT.readMore)} →</span>
                </div>
              </div>
            </a>
          </RevealBlock>
        </div>
      )}

      {/* ── Filters ── */}
      <div className="section-container mb-8">
        <RevealBlock className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveFilter(c.id)}
              className={cn('tag-pill', activeFilter === c.id && 'active')}
            >
              {c[lang]}
            </button>
          ))}
        </RevealBlock>
      </div>

      {/* ── Posts grid ── */}
      <div className="section-container">
        <motion.div layout className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {rest.map((post, i) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <a href={`/blog/${post.slug}`} className="group card-dark flex flex-col overflow-hidden rounded-sm2">
                  <PostImage post={post} className="aspect-[4/3] w-full" />
                  <div className="flex flex-col p-7">
                    <p className="eyebrow mb-3 text-gold">{post.catLabel[lang]}</p>
                    <h3 className="mb-4 font-serif text-xl font-light leading-snug text-cream transition-colors duration-300 group-hover:text-beige">
                      {post.title[lang]}
                    </h3>
                    <p className="body-copy mb-6 line-clamp-2 text-sm">{post.excerpt[lang]}</p>
                    <div className="mt-auto flex items-center justify-between border-t border-beige/[0.08] pt-5">
                      <span className="font-sans text-[9px] uppercase tracking-widest2 text-muted">
                        {post.date[lang]} · {post.readTime} {t(CONTENT.minRead)}
                      </span>
                      <span className="font-sans text-[9px] uppercase tracking-widest2 text-beige/60 transition-colors duration-300 group-hover:text-beige">→</span>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

    </main>
  )
}