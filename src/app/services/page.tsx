import { sanityFetch } from '@/sanity/lib/live'
import { ALL_SERVICES_QUERY } from '@/lib/queries'
import type { SanityService } from '@/types/service'
import ServicesClient from './ServicesClient'

export const revalidate = 60

export default async function ServicesPage() {
  const services = await sanityFetch<SanityService[]>({
    query: ALL_SERVICES_QUERY,
    tags: ['service'],
  })

  return <ServicesClient services={services ?? []} />
}