// src/sanity/lib/live.ts
// Versión simplificada sin Live Content API
// (requiere plan Sanity con token especial)

import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_READ_TOKEN,
})

// Fetch helper compatible con el resto del proyecto
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = 60,
}: {
  query: string
  params?: Record<string, unknown>
  tags?: string[]
  revalidate?: number | false
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate, tags },
  })
}

// Stub para SanityLive — no hace nada si no tienes el plan
export function SanityLive() {
  return null
}