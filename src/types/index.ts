// =============================================
// LUMIÈRE PORTFOLIO — Global TypeScript Types
// =============================================

// ---- Language ----
export type Lang = 'es' | 'en'

export interface BilingualString {
  es: string
  en: string
}

// ---- Navigation ----
export interface NavItem {
  id:    string
  label: BilingualString
  href:  string
  icon:  string
}

// ---- Image ----
export interface CloudinaryImage {
  publicId:  string
  url:       string
  width:     number
  height:    number
  alt?:      string
  blurUrl?:  string
}

// SanityImage ya incluye url y blurUrl que devuelve la GROQ query
export interface SanityImage {
  _type?:   'image'
  asset?: {
    _ref:  string
    _type: 'reference'
  }
  url?:     string        // resuelto por GROQ projection
  width?:   number        // resuelto por GROQ projection
  height?:  number        // resuelto por GROQ projection
  alt?:     string
  blurUrl?: string        // lqip — resuelto por GROQ projection
  caption?: string
}

// Tipo unificado para usar en componentes
export type ProjectImage = SanityImage | CloudinaryImage

// ---- Category ----
export interface Category {
  _id:   string
  title: BilingualString
  slug:  string
}

// ---- Project / Work ----
export interface Project {
  _id:          string
  title:        BilingualString
  slug:         string
  category?:    Category
  coverImage?:  SanityImage
  images?:      SanityImage[]
  description?: BilingualString
  tags?:        string[]
  featured?:    boolean
  publishedAt?: string
  client?:      string
  location?:    BilingualString
  seoTitle?:        string
  seoDescription?:  string
}

// ---- Service ----
export interface Service {
  _id:          string
  title:        BilingualString
  description:  BilingualString
  icon?:        string
  price?:       string
  features?:    BilingualString[]
  featured?:    boolean
}

// ---- Testimonial ----
export interface Testimonial {
  _id:      string
  quote:    BilingualString
  author:   string
  role:     BilingualString
  category?: BilingualString
  featured?: boolean
  photo?:   SanityImage
}

// ---- Blog ----
export interface BlogPost {
  _id:         string
  title:       BilingualString
  slug:        string
  excerpt:     BilingualString
  content?:    { es: unknown[]; en: unknown[] } // Portable Text
  coverImage?: SanityImage
  images?:     SanityImage[]
  category?:   string
  tags?:       string[]
  publishedAt?: string
  readTime?:   number
  featured?:   boolean
  seoTitle?:        string
  seoDescription?:  string
}

// ---- Site Settings ----
export interface SiteSettings {
  photographerName?:  string
  tagline?:           BilingualString
  bio?:               BilingualString
  photographerPhoto?: SanityImage
  stats?: {
    years:        number
    projects:     number
    countries:    number
    satisfaction: number
  }
  socialLinks?: {
    instagram?: string
    whatsapp?:  string
    behance?:   string
    email?:     string
  }
  seo?: {
    title?:       string
    description?: BilingualString
    ogImage?:     SanityImage
  }
}

// ---- Props helpers ----
export interface PageProps {
  params:       { lang?: Lang; slug?: string }
  searchParams?: Record<string, string | string[]>
}

export interface SectionProps {
  lang?: Lang
}