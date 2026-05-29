'use client'

import { LangProvider } from '@/hooks/useLang'
import type { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LangProvider>
      {children}
    </LangProvider>
  )
}
