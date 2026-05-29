'use client'

import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Photo } from '@/components/ui/Photo'
import type { SanityImage } from '@/types'

interface Props {
  images:   SanityImage[]
  current:  number | null
  onClose:  () => void
  onPrev:   () => void
  onNext:   () => void
  alt:      string
}

export function LightboxModal({ images, current, onClose, onPrev, onNext, alt }: Props) {
  const isOpen = current !== null
  const total  = images.length

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return
    if (e.key === 'Escape')     onClose()
    if (e.key === 'ArrowRight') onNext()
    if (e.key === 'ArrowLeft')  onPrev()
  }, [isOpen, onClose, onNext, onPrev])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  // Bloquea scroll del body cuando está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const image = current !== null ? images[current] : null

  return (
    <AnimatePresence>
      {isOpen && image && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-center justify-center"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" />

          {/* Contador */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 font-sans text-[10px] uppercase tracking-[0.25em] text-muted z-10">
            {(current ?? 0) + 1} / {total}
          </div>

          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="absolute top-5 right-6 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-beige/15 bg-carbon/80 text-cream/60 transition-all hover:border-beige/40 hover:text-cream"
            aria-label="Cerrar"
          >
            <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} strokeLinecap="round" className="h-4 w-4 stroke-current">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Imagen */}
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-h-[85vh] max-w-[85vw]"
            onClick={(e) => e.stopPropagation()}
            style={{
              aspectRatio: image.width && image.height
                ? `${image.width} / ${image.height}`
                : '3 / 2',
              width: '100%',
              height: '85vh',
            }}
          >
            <Photo
              image={image}
              variant="hero"
              alt={image.alt ?? alt}
              sizes="85vw"
              className="object-contain"
            />
          </motion.div>

          {/* Botón anterior */}
          {total > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); onPrev() }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-beige/15 bg-carbon/80 text-cream/60 transition-all hover:border-beige/40 hover:text-cream"
              aria-label="Anterior"
            >
              <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 stroke-current">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          {/* Botón siguiente */}
          {total > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); onNext() }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-beige/15 bg-carbon/80 text-cream/60 transition-all hover:border-beige/40 hover:text-cream"
              aria-label="Siguiente"
            >
              <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 stroke-current">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}

          {/* Dots navegación */}
          {total > 1 && total <= 12 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); /* navegar directo */ }}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === current
                      ? 'w-6 bg-gold'
                      : 'w-1.5 bg-beige/30 hover:bg-beige/60'
                  }`}
                  aria-label={`Imagen ${i + 1}`}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}