import { sanityFetch } from '@/sanity/lib/live'
import { SITE_SETTINGS_QUERY } from '@/lib/queries'
import AboutPage from '@/components/sections/AboutPage'

interface SanityImage {
  url?:     string
  alt?:     string
  width?:   number
  height?:  number
  blurUrl?: string
}

interface JourneyItem {
  year:  string
  title: { es?: string; en?: string }
  body:  { es?: string; en?: string }
}

interface SiteSettings {
  bio?:               { es?: string; en?: string }
  photographerPhoto?: SanityImage
  behindImages?:      SanityImage[]
  journey?:           JourneyItem[]
  stats?: {
    years?:        number
    projects?:     number
    countries?:    number
    satisfaction?: number
  }
}

export const revalidate = 60

export default async function Page() {
  const settings = await sanityFetch<SiteSettings>({
    query: SITE_SETTINGS_QUERY,
    tags:  ['siteSettings'],
  })

  console.log('journey:', JSON.stringify(settings?.journey, null, 2))

  return (
    <AboutPage
      photographerPhoto={settings?.photographerPhoto}
      behindImages={settings?.behindImages}
      bio={settings?.bio}
      journey={settings?.journey}
      stats={settings?.stats}
    />
  )
}