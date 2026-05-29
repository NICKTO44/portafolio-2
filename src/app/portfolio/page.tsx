import { sanityFetch } from '@/lib/sanity'
import { ALL_PROJECTS_QUERY, ALL_CATEGORIES_QUERY } from '@/lib/queries'
import { PortfolioClient } from '@/components/sections/PortfolioClient'
import type { Project, Category } from '@/types'

export const revalidate = 60

export const metadata = {
  title: 'Portafolio',
  description: 'Colección completa de proyectos fotográficos.',
}

export default async function PortfolioPage() {
  const [projects, categories] = await Promise.all([
    sanityFetch<Project[]>({
      query: ALL_PROJECTS_QUERY,
      tags:  ['project'],
    }),
    sanityFetch<Category[]>({
      query: ALL_CATEGORIES_QUERY,
      tags:  ['category'],
    }),
  ])

  return (
    <main className="min-h-screen pb-40 pt-24">
      <PortfolioClient projects={projects ?? []} categories={categories ?? []} />
    </main>
  )
}
