'use client'

import { useReveal } from '@/hooks/useReveal'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface RevealProps {
  children:   ReactNode
  className?: string
  delay?:     0 | 1 | 2 | 3 | 4 | 5
  threshold?: number
}

const DELAY_MAP = {
  0: '',
  1: 'reveal-delay-1',
  2: 'reveal-delay-2',
  3: 'reveal-delay-3',
  4: 'reveal-delay-4',
  5: 'reveal-delay-5',
} as const

export function RevealBlock({
  children,
  className,
  delay = 0,
  threshold = 0.1,
}: RevealProps) {
  const { ref, isVisible } = useReveal<HTMLDivElement>({ threshold })

  return (
    <div
      ref={ref}
      className={cn('reveal', DELAY_MAP[delay], isVisible && 'is-visible', className)}
    >
      {children}
    </div>
  )
}
