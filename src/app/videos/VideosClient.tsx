'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { RevealBlock } from '@/components/ui/RevealBlock'
import { useLang } from '@/hooks/useLang'
import { cn } from '@/lib/utils'
import type { SanityVideo } from './page'

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Genera la URL de miniatura desde un video de Cloudinary */
function cloudinaryThumb(videoUrl: string): string {
  // Transforma: .../video/upload/v123/path.mp4
  // En:         .../video/upload/so_0,q_auto,f_jpg/v123/path.jpg
  return videoUrl
    .replace('/video/upload/', '/video/upload/so_0,q_auto,w_800,f_jpg/')
    .replace(/\.[^.]+$/, '.jpg')
}

/** Formatea segundos a mm:ss */
function formatDuration(seconds?: number): string {
  if (!seconds) return ''
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

const CATEGORY_LABELS: Record<string, { es: string; en: string }> = {
  wedding:  { es: 'Boda / Eventos',    en: 'Wedding / Events'   },
  nature:   { es: 'Naturaleza',        en: 'Nature'             },
  behind:   { es: 'Behind the Scenes', en: 'Behind the Scenes'  },
  showreel: { es: 'Showreel',          en: 'Showreel'           },
  session:  { es: 'Sesión',            en: 'Session'            },
  routine:  { es: 'Rutina',            en: 'Routine'            },
}

// ── UI strings ────────────────────────────────────────────────────────────────

const UI = {
  eyebrow: { es: 'En movimiento',      en: 'In motion'         },
  titleA:  { es: 'Videos',             en: 'Videos'            },
  titleB:  { es: 'y momentos',         en: 'and moments'       },
  all:     { es: 'Todos',              en: 'All'               },
  empty:   { es: 'Próximamente…',      en: 'Coming soon…'      },
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function IconPlay() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10 text-cream/90 drop-shadow-lg">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function IconPause() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-cream/80">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  )
}

// ── Video Card ────────────────────────────────────────────────────────────────

function VideoCard({ video, lang }: { video: SanityVideo; lang: 'es' | 'en' }) {
  const [playing, setPlaying]   = useState(false)
  const [loaded,  setLoaded]    = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const thumb = video.thumbnail?.url ?? cloudinaryThumb(video.video.url)
  const title = video.title[lang]
  const desc  = video.description?.[lang]
  const cat   = video.category ? (CATEGORY_LABELS[video.category]?.[lang] ?? video.category) : null
  const dur   = formatDuration(video.video.duration)

  const toggle = () => {
    const el = videoRef.current
    if (!el) return
    if (playing) {
      el.pause()
      setPlaying(false)
    } else {
      el.play()
      setPlaying(true)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group overflow-hidden rounded-sm2 border border-beige/[0.08] bg-carbon transition-all duration-300 hover:border-beige/20"
    >
      {/* ── Player area ── */}
      <div
        className="relative aspect-video w-full cursor-pointer overflow-hidden bg-carbon-2"
        onClick={toggle}
      >
        {/* Thumbnail */}
        {!playing && (
          <img
            src={thumb}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        )}

        {/* Video element */}
        <video
          ref={videoRef}
          src={video.video.url}
          className={cn(
            'absolute inset-0 h-full w-full object-cover',
            playing ? 'opacity-100' : 'opacity-0'
          )}
          playsInline
          onEnded={() => setPlaying(false)}
          onLoadedData={() => setLoaded(true)}
        />

        {/* Overlay degradado */}
        <div className={cn(
          'absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300',
          playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
        )} />

        {/* Botón play/pause */}
        <div className={cn(
          'absolute inset-0 flex items-center justify-center transition-all duration-300',
          playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
        )}>
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-sm transition-transform duration-200 group-hover:scale-110">
            {playing ? <IconPause /> : <IconPlay />}
          </div>
        </div>

        {/* Duración */}
        {dur && !playing && (
          <span className="absolute bottom-3 right-3 rounded border border-white/10 bg-black/60 px-1.5 py-0.5 font-sans text-[9px] text-white/80 backdrop-blur-sm">
            {dur}
          </span>
        )}

        {/* Featured badge */}
        {video.featured && (
          <div className="absolute left-3 top-3 rounded-full border border-gold/40 bg-black/50 px-2.5 py-1 font-sans text-[8px] uppercase tracking-widest text-gold backdrop-blur-sm">
            Destacado
          </div>
        )}
      </div>

      {/* ── Info ── */}
      <div className="px-4 py-3">
        {cat && (
          <p className="mb-1 font-sans text-[9px] uppercase tracking-widest2 text-gold">
            {cat}
          </p>
        )}
        <h3 className="font-serif text-sm font-light text-cream">
          {title}
        </h3>
        {desc && (
          <p className="mt-1 font-sans text-[11px] leading-relaxed text-muted line-clamp-1">
            {desc}
          </p>
        )}
      </div>
    </motion.div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

interface Props {
  videos?: SanityVideo[]
}

export default function VideosClient({ videos = [] }: Props) {
  const { t, lang } = useLang()

  // Categorías únicas para el filtro
  const categories = Array.from(
    new Set(videos.map((v) => v.category).filter(Boolean))
  ) as string[]

  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const filtered = activeFilter
    ? videos.filter((v) => v.category === activeFilter)
    : videos

  return (
    <main className="min-h-screen pb-40">

      {/* ── Header ── */}
      <section className="section-container pt-20 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="eyebrow mb-2 text-gold">{t(UI.eyebrow)}</p>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-light text-cream">
            {t(UI.titleA)}{' '}
            <em className="font-serif-italic text-beige">{t(UI.titleB)}</em>
          </h1>
        </motion.div>
      </section>

      {/* ── Filtros ── */}
      {categories.length > 0 && (
        <section className="section-container pb-8">
          <RevealBlock>
            <div className="flex flex-wrap gap-2">
              {/* Todos */}
              <button
                onClick={() => setActiveFilter(null)}
                className={cn(
                  'rounded-full border px-4 py-1.5 font-sans text-[10px] uppercase tracking-widest transition-all duration-200',
                  activeFilter === null
                    ? 'border-beige bg-beige text-black'
                    : 'border-beige/15 text-muted hover:border-beige/40 hover:text-cream'
                )}
              >
                {t(UI.all)}
              </button>

              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={cn(
                    'rounded-full border px-4 py-1.5 font-sans text-[10px] uppercase tracking-widest transition-all duration-200',
                    activeFilter === cat
                      ? 'border-beige bg-beige text-black'
                      : 'border-beige/15 text-muted hover:border-beige/40 hover:text-cream'
                  )}
                >
                  {CATEGORY_LABELS[cat]?.[lang] ?? cat}
                </button>
              ))}
            </div>
          </RevealBlock>
        </section>
      )}

      {/* ── Grid ── */}
      <section className="section-container">
        {filtered.length === 0 ? (
          <p className="body-copy text-center text-muted py-20">
            {t(UI.empty)}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((video, i) => (
              <RevealBlock key={video._id} delay={(i % 3) as 0 | 1 | 2}>
                <VideoCard video={video} lang={lang} />
              </RevealBlock>
            ))}
          </div>
        )}
      </section>

    </main>
  )
}