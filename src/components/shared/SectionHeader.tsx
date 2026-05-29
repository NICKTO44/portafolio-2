import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface SectionHeaderProps {
  eyebrow:   string
  title:     ReactNode      // Can include <em> for italic accent
  action?:   ReactNode
  className?: string
  centered?: boolean
}

export function SectionHeader({
  eyebrow,
  title,
  action,
  className,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-16 flex flex-col gap-4 md:mb-20',
        centered
          ? 'items-center text-center'
          : 'md:flex-row md:items-end md:justify-between',
        className
      )}
    >
      <div>
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h2 className="heading-section text-[clamp(2.25rem,5vw,4rem)] text-cream">
          {title}
        </h2>
      </div>
      {action && <div className="mt-2 md:mt-0">{action}</div>}
    </div>
  )
}
