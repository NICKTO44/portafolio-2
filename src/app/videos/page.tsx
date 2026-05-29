// src/app/videos/page.tsx

import { sanityFetch } from '@/sanity/lib/live'
import { ALL_VIDEOS_QUERY } from '@/lib/queries'
import VideosClient from './VideosClient'

export const revalidate = 60

export interface SanityVideo {
  _id:         string
  title:       { es: string; en: string }
  description?: { es: string; en: string }
  category?:   string
  featured?:   boolean
  order?:      number
  video: {
    publicId: string
    url:      string
    width?:   number
    height?:  number
    format?:  string
    duration?: number
  }
  thumbnail?: {
    url: string
  }
}

export default async function VideosPage() {
  const videos = await sanityFetch<SanityVideo[]>({
    query: ALL_VIDEOS_QUERY,
    tags:  ['video'],
  })

  return <VideosClient videos={videos ?? []} />
}