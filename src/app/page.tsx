import { sanityFetch } from '@/sanity/lib/live'
import { FEATURED_PROJECTS_QUERY, SITE_SETTINGS_QUERY, ALL_TESTIMONIALS_QUERY } from '@/lib/queries'
import { HeroSection }         from '@/components/sections/HeroSection'
import { FeaturedWork }        from '@/components/sections/FeaturedWork'
import { AboutSection }        from '@/components/sections/AboutSection'
import { StatsSection }        from '@/components/sections/StatsSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { CTASection }          from '@/components/sections/CTASection'

interface SanityProject {
  _id:      string
  title:    { es: string; en: string }
  slug:     string
  category: string
  client?:  string
  coverImage?: {
    asset?: { _ref: string }
    url?:   string
    alt?:   string
  }
}

interface SiteSettings {
  photographerName?: string
  tagline?:          { es: string; en: string }
  photographerPhoto?: { url?: string; alt?: string; width?: number; height?: number }
  heroImage?:         { url?: string; alt?: string; width?: number; height?: number }
}

export const revalidate = 60

export default async function HomePage() {
  const [projects, settings, testimonials] = await Promise.all([
    sanityFetch<SanityProject[]>({ query: FEATURED_PROJECTS_QUERY, tags: ['project'] }),
    sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY, tags: ['siteSettings'] }),
    sanityFetch<any[]>({ query: ALL_TESTIMONIALS_QUERY, tags: ['testimonial'] }),
  ])

  return (
    <main>
      <HeroSection
        heroImage={settings?.heroImage}
        brandName={settings?.photographerName}
        tagline={settings?.tagline}
      />
      <FeaturedWork projects={projects ?? []} />
      <AboutSection photographerPhoto={settings?.photographerPhoto} />
      {/* <StatsSection /> */}
      <TestimonialsSection testimonials={testimonials ?? []} />
      <CTASection />
    </main>
  )
}