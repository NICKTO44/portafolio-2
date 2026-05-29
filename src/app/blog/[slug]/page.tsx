import { sanityFetch } from '@/sanity/lib/live'
import { BLOG_POST_BY_SLUG_QUERY, RELATED_BLOG_POSTS_QUERY } from '@/lib/queries'
import { notFound } from 'next/navigation'
import BlogPostClient from './BlogPostClient'

export const revalidate = 60

interface SanityPost {
  _id:         string
  title:       { es: string; en: string }
  slug:        string
  publishedAt?: string
  readTime?:   number
  category?:   string
  excerpt?:    { es: string; en: string }
  content?:    { es: any[]; en: any[] }
  coverImage?: { url?: string; blurUrl?: string; alt?: string }
}

interface RelatedPost {
  _id:         string
  title:       { es: string; en: string }
  slug:        string
  category?:   string
  coverImage?: { url?: string; blurUrl?: string; alt?: string }
}

interface Props {
  params: { slug: string }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params  

  const post = await sanityFetch<SanityPost>({
    query: BLOG_POST_BY_SLUG_QUERY,
    params: { slug },
    tags: ['blogPost'],
  })

  if (!post) notFound()

  const related = await sanityFetch<RelatedPost[]>({
    query: RELATED_BLOG_POSTS_QUERY,
    params: { category: post.category ?? '', slug },
    tags: ['blogPost'],
  })

  return <BlogPostClient post={post} related={related ?? []} />
}