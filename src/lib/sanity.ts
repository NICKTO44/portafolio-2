import { createClient } from 'next-sanity'

// ---- Config ----
export const sanityConfig = {
  projectId:  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:    process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01',
  useCdn:     process.env.NODE_ENV === 'production',
}

// ---- Client ----
export const sanityClient = createClient({
  ...sanityConfig,
  token:       process.env.SANITY_API_READ_TOKEN,
  perspective: 'published',
  stega:       false,
})

// ---- urlFor viene de src/sanity/image.ts (ya existe en tu proyecto) ----
// Úsalo así en tus componentes:
// import { urlFor } from '@/sanity/image'

// ---- Typed fetch con ISR ----
export async function sanityFetch<T>({
  query,
  params     = {},
  tags       = [],
  revalidate = 60,
}: {
  query:       string
  params?:     Record<string, unknown>
  tags?:       string[]
  revalidate?: number | false
}): Promise<T> {
  return sanityClient.fetch<T>(query, params, {
    next: { revalidate, tags },
  })
}