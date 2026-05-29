'use client'

import { useLang } from '@/hooks/useLang'
import { cn } from '@/lib/utils'
import type { Lang } from '@/types'

const LANGS: { code: Lang; label: string }[] = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
]

export function LangToggle() {
  const { lang, setLang } = useLang()

  return (
    <div
      className="fixed right-8 top-7 z-[100] flex gap-1 rounded-full border border-beige/15 bg-carbon/70 p-1 backdrop-blur-md"
      role="group"
      aria-label="Language selector"
    >
      {LANGS.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={cn(
            'rounded-full px-3 py-1.5 font-sans text-[10px] font-medium uppercase tracking-widest2 transition-all duration-300',
            lang === code
              ? 'bg-beige text-black'
              : 'bg-transparent text-muted hover:text-cream'
          )}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
