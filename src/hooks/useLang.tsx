'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import type { Lang, BilingualString } from '@/types'

// ---- Context ----
interface LangContextValue {
  lang:   Lang
  setLang: (lang: Lang) => void
  t: (str: BilingualString) => string
}

const LangContext = createContext<LangContextValue>({
  lang:    'es',
  setLang: () => {},
  t:       (s) => s.es,
})

// ---- Provider ----
export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('es')

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    if (typeof document !== 'undefined') {
      document.documentElement.lang = l
    }
  }, [])

  const t = useCallback(
    (str: BilingualString) => str[lang] ?? str.es,
    [lang]
  )

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

// ---- Hook ----
export function useLang() {
  return useContext(LangContext)
}
