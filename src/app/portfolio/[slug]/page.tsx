import { notFound } from 'next/navigation'
import { sanityFetch } from '@/lib/sanity'
import { PROJECT_BY_SLUG_QUERY, RELATED_PROJECTS_QUERY, ALL_PROJECT_SLUGS_QUERY } from '@/lib/queries'
import { getCategorySlug } from '@/lib/images'
import ProjectDetail from '@/components/sections/ProjectDetail'
import type { Project } from '@/types'
import type { Metadata } from 'next'

export const revalidate = 60

type PageParams = Promise<{ slug: string }>

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>({
    query: ALL_PROJECT_SLUGS_QUERY,
    tags:  ['project'],
  })
  return slugs.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: PageParams
}): Promise<Metadata> {
  const { slug } = await params
  const project = await sanityFetch<Project>({
    query:  PROJECT_BY_SLUG_QUERY,
    params: { slug },
    tags:   ['project'],
  })
  if (!project) return {}
  return {
    title:       project.seoTitle ?? project.title?.es,
    description: project.seoDescription ?? project.description?.es,
  }
}

export default async function ProjectPage({
  params,
}: {
  params: PageParams
}) {
  const { slug } = await params

  const project = await sanityFetch<Project>({
    query:  PROJECT_BY_SLUG_QUERY,
    params: { slug },
    tags:   ['project'],
  })

  if (!project) notFound()

  const categorySlug = getCategorySlug(
    project.category as Parameters<typeof getCategorySlug>[0]
  )

  const relatedProjects = await sanityFetch<Project[]>({
    query:  RELATED_PROJECTS_QUERY,
    params: { slug, category: categorySlug },
    tags:   ['project'],
  })

  return (
    <main className="min-h-screen pb-40">
      <ProjectDetail project={project} related={relatedProjects ?? []} />
    </main>
  )
}
