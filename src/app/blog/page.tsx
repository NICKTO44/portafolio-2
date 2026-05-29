import { sanityFetch } from '@/sanity/lib/live'
import { ALL_BLOG_POSTS_QUERY } from '@/lib/queries'
import BlogClient from './BlogClient'

export const revalidate = 60

interface SanityPost {
  _id:         string
  title:       { es: string; en: string }
  slug:        string
  publishedAt?: string
  readTime?:   number
  category?:   string
  featured?:   boolean
  excerpt?:    { es: string; en: string }
  coverImage?: { url?: string; blurUrl?: string; alt?: string }
}

export default async function BlogPage() {
  const sanityPosts = await sanityFetch<SanityPost[]>({
    query: ALL_BLOG_POSTS_QUERY,
    tags: ['blogPost'],
  })

  return <BlogClient sanityPosts={sanityPosts ?? []} />
}