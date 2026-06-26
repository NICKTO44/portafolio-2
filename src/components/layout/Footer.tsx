'use client'

import { useLang } from '@/hooks/useLang'

const SOCIAL_LINKS = [
  { label: 'Instagram', href: `https://instagram.com/${process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE ?? 'lumiere.photography'}` },
  { label: 'Behance',   href: '#' },
  { label: 'WhatsApp',  href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''}` },
]

export function Footer() {
  const { lang } = useLang()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-beige/[0.08] px-6 py-12 md:px-16">
      <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-8 md:flex-row">

        {/* Brand */}
        <p className="font-serif text-xl tracking-[0.15em] text-cream">
          Eikhonphoto
        </p>

        {/* Copy */}
        <p className="font-sans text-[10px] tracking-[0.1em] text-muted">
          © {year} Eikhonphoto.{' '}
          {lang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
        </p>

        {/* Socials */}
        <nav className="flex gap-6" aria-label="Social links">
          {SOCIAL_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[9px] uppercase tracking-widest2 text-muted transition-colors duration-300 hover:text-beige"
            >
              {label}
            </a>
          ))}
        </nav>

      </div>
    </footer>
  )
}
