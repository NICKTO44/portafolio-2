'use client'

import { useEffect, useRef, useState } from 'react'
import { useReveal } from '@/hooks/useReveal'
import { useLang } from '@/hooks/useLang'
import { cn } from '@/lib/utils'

const STATS = [
  { num: 12,  suffix: '+', label: { es: 'Años de Experiencia', en: 'Years of Experience' } },
  { num: 480, suffix: '',  label: { es: 'Proyectos Realizados', en: 'Projects Completed'  } },
  { num: 38,  suffix: '',  label: { es: 'Países Visitados',     en: 'Countries Visited'   } },
  { num: 97,  suffix: '%', label: { es: 'Clientes Satisfechos', en: 'Satisfied Clients'   } },
]

// Animated counter hook
function useCounter(target: number, isVisible: boolean, duration = 1800) {
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!isVisible || started.current) return
    started.current = true

    const steps    = 60
    const interval = duration / steps
    const increment = target / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, interval)

    return () => clearInterval(timer)
  }, [isVisible, target, duration])

  return count
}

function StatItem({
  num,
  suffix,
  label,
  isVisible,
  index,
}: {
  num: number
  suffix: string
  label: { es: string; en: string }
  isVisible: boolean
  index: number
}) {
  const { t } = useLang()
  const count = useCounter(num, isVisible, 1600 + index * 200)

  return (
    <div
      className={cn(
        'group relative flex flex-col items-center justify-center px-10 py-16 text-center',
        'border-r border-beige/[0.08] last:border-r-0',
        'transition-colors duration-500 hover:bg-carbon',
      )}
    >
      <p className="heading-display mb-3 text-[clamp(3rem,6vw,5rem)] text-beige transition-colors duration-300 group-hover:text-beige-3">
        {count}{suffix}
      </p>
      <p className="font-sans text-[9px] uppercase tracking-widest3 text-muted">
        {t(label)}
      </p>
    </div>
  )
}

export function StatsSection() {
  const { ref, isVisible } = useReveal<HTMLElement>({ threshold: 0.3 })

  return (
    <section
      ref={ref}
      id="stats"
      className="border-y border-beige/[0.08]"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <StatItem
            key={stat.label.es}
            num={stat.num}
            suffix={stat.suffix}
            label={stat.label}
            isVisible={isVisible}
            index={i}
          />
        ))}
      </div>
    </section>
  )
}