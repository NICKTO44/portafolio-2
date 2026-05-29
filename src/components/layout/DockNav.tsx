'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useLang } from '@/hooks/useLang'
import { cn } from '@/lib/utils'

const HOME_SCROLL_IDS = ['hero', 'work', 'about'] as const

const NAV_ITEMS = [
  {
    id: 'hero',
    label: { es: 'Inicio', en: 'Home' },
    href: '/#hero',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 stroke-current">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 'work',
    label: { es: 'Portafolio', en: 'Portfolio' },
    href: '/portfolio',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 stroke-current">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    id: 'videos',
    label: { es: 'Videos', en: 'Videos' },
    href: '/videos',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 stroke-current">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
  },
  {
    id: 'about',
    label: { es: 'Sobre Mí', en: 'About' },
    href: '/about',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 stroke-current">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  { id: 'sep', label: { es: '', en: '' }, href: '', icon: null },
  {
    id: 'services',
    label: { es: 'Servicios', en: 'Services' },
    href: '/services',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 stroke-current">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    ),
  },
  {
    id: 'blog',
    label: { es: 'Blog', en: 'Blog' },
    href: '/blog',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 stroke-current">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    id: 'contact',
    label: { es: 'Contacto', en: 'Contact' },
    href: '/contact',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 stroke-current">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014 12.84a19.79 19.79 0 01-3.07-8.67A2 2 0 012.91 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
] as const

type NavItem = (typeof NAV_ITEMS)[number]

function activeIdFromPathname(pathname: string): string | null {
  if (pathname === '/' || pathname === '') return null
  if (pathname.startsWith('/portfolio')) return 'work'
  if (pathname.startsWith('/videos'))    return 'videos'
  if (pathname.startsWith('/blog'))      return 'blog'
  if (pathname === '/about')             return 'about'
  if (pathname === '/services')          return 'services'
  if (pathname === '/contact')           return 'contact'
  return 'hero'
}

function DockIcon({
  item,
  isActive,
  mouseX,
  pathname,
}: {
  item: NavItem
  isActive: boolean
  mouseX: ReturnType<typeof useMotionValue<number>>
  pathname: string
}) {
  const { t } = useLang()
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const distance = useTransform(mouseX, (val: number) => {
    const el = ref.current
    if (!el) return 999
    const rect = el.getBoundingClientRect()
    return Math.abs(val - (rect.left + rect.width / 2))
  })

  const scaleVal = useTransform(distance, [0, 110, 220], [1.2, 1.06, 1])
  const yVal     = useTransform(distance, [0, 110, 220], [-5, -2, 0])
  const scale    = useSpring(scaleVal, { stiffness: 280, damping: 24 })
  const y        = useSpring(yVal,     { stiffness: 280, damping: 24 })

  if (item.id === 'sep') {
    return <div className="mx-1 md:mx-2 h-6 w-px shrink-0 self-center bg-beige/10" aria-hidden />
  }

  const label = t(item.label as { es: string; en: string })

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!item.href.startsWith('/#')) return
    const isHome = pathname === '/' || pathname === ''
    if (!isHome) return
    e.preventDefault()
    const sectionId = item.href.slice(2)
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    window.history.replaceState(null, '', item.href)
  }

  return (
    <motion.div
      ref={ref}
      style={{ scale, y }}
      className="relative mx-0.5 flex min-w-[2.5rem] flex-col items-center"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.16 }}
            className="pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-beige/15 bg-carbon/95 px-2.5 py-1.5 font-sans text-[9px] font-medium uppercase tracking-[0.12em] text-beige"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>

      <Link
        href={item.href}
        aria-label={label}
        onClick={onNavClick}
        className={cn(
          'flex h-9 w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-[10px] border transition-all duration-300',
          isActive
            ? 'border-beige bg-beige text-black'
            : 'border-beige/10 bg-carbon-2 text-cream/70 hover:border-beige/30 hover:bg-carbon-3 hover:text-cream'
        )}
      >
        {item.icon}
      </Link>

      <div
        className={cn(
          'mt-1 h-[3px] w-[3px] rounded-full bg-beige transition-opacity duration-300',
          isActive ? 'opacity-100' : 'opacity-0'
        )}
      />
    </motion.div>
  )
}

export function DockNav() {
  const pathname = usePathname()
  const [activeId, setActiveId] = useState('hero')
  const [visible, setVisible]   = useState(true)
  const mouseX = useMotionValue(Infinity)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const routeActive = activeIdFromPathname(pathname)
    if (routeActive !== null) setActiveId(routeActive)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setVisible(y < 80 || y < lastScrollY.current)
      lastScrollY.current = y

      if (pathname !== '/' && pathname !== '') return

      let current = 'hero'
      for (const id of HOME_SCROLL_IDS) {
        const el = document.getElementById(id)
        if (el && y >= el.offsetTop - 240) current = id
      }
      setActiveId(current)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          onMouseMove={(e) => mouseX.set(e.clientX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="glass flex items-end gap-1.5 md:gap-3 rounded-[22px] px-3 md:px-7 pb-2 pt-2 md:pb-2.5 md:pt-3 shadow-[0_24px_60px_rgba(0,0,0,0.6)]"
          role="navigation"
          aria-label="Main navigation"
        >
          {NAV_ITEMS.map((item, i) => (
            <DockIcon
              key={item.id + String(i)}
              item={item}
              isActive={activeId === item.id}
              mouseX={mouseX}
              pathname={pathname}
            />
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  )
}