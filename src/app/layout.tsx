import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import '@/styles/globals.css'
import { Providers }  from '@/components/layout/Providers'
import { LangToggle } from '@/components/ui/LangToggle'
import { DockNav }    from '@/components/layout/DockNav'
import { Footer }     from '@/components/layout/Footer'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
  preload: true,
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lumiere.photography'),
  title: {
    default: 'Lumière Photography — Where light becomes art',
    template: '%s | Lumière Photography',
  },
  description:
    'Portfolio de fotografía premium: moda editorial, bodas luxury, arquitectura, retratos y lifestyle.',
  authors: [{ name: 'Lumière Photography' }],
  creator: 'Lumière Photography',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    alternateLocale: 'en_US',
    siteName: 'Lumière Photography',
    title: 'Lumière Photography — Where light becomes art',
    description: 'Portfolio de fotografía premium.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Lumière Photography' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lumière Photography',
    description: 'Where light becomes art',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <Providers>
          {children}
          <Footer />

          {/*
            Contenedor fixed que ocupa todo el viewport pero no bloquea clicks.
            LangToggle y DockNav viven aquí — así comparten el mismo
            contexto de posicionamiento y left:50% del dock es
            siempre el 50% real del viewport.
          */}
          <div
            className="pointer-events-none fixed inset-0 z-[100]"
            aria-hidden="false"
          >
            {/* LangToggle — esquina superior derecha */}
            <div className="pointer-events-auto absolute right-6 top-6">
              <LangToggle />
            </div>

            {/* DockNav — centrado abajo */}
            <div className="pointer-events-auto absolute bottom-8 left-1/2 -translate-x-1/2">
              <DockNav />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}