// Cambiar esta línea:
// import { urlFor } from '@/lib/sanity'
// Por esta:
import { urlFor } from '@/sanity/lib/image'

import { optimizedImage } from '@/lib/cloudinary'
import type { ProjectImage, SanityImage, CloudinaryImage, BilingualString, Lang, Category } from '@/types'

/** Calidad por defecto para portfolio fotográfico */
export const PHOTO_QUALITY = 95

export type ImageVariant = 'thumb' | 'grid' | 'featured' | 'hero' | 'gallery' | 'full'

const VARIANT_WIDTH: Record<ImageVariant, number> = {
  thumb:    400,
  grid:     800,    // era 1800
  featured: 1200,   // era 2400
  hero:     1920,   // era 3840
  gallery:  1600,   // era 3200
  full:     2048,   // era 4096
}

export const CATEGORY_LABELS: Record<string, BilingualString> = {
  fashion:      { es: 'Moda & Editorial', en: 'Fashion & Editorial' },
  wedding:      { es: 'Boda Luxury',      en: 'Luxury Wedding' },
  architecture: { es: 'Arquitectura',     en: 'Architecture' },
  portrait:     { es: 'Retrato Fine Art', en: 'Fine Art Portrait' },
  lifestyle:    { es: 'Lifestyle',        en: 'Lifestyle' },
  branding:     { es: 'Branding',         en: 'Branding' },
  travel:       { es: 'Viajes',           en: 'Travel' },
}

function getCloudinaryPublicId(image: ProjectImage): string | null {
  const img = image as CloudinaryImage & { public_id?: string }
  return img.publicId ?? img.public_id ?? null
}

export function isCloudinaryImage(image: ProjectImage): image is CloudinaryImage {
  const img = image as CloudinaryImage & { public_id?: string; secure_url?: string }
  if (getCloudinaryPublicId(image)) return true
  const url = img.url ?? img.secure_url
  return Boolean(url?.includes('res.cloudinary.com'))
}

function resolveWidth(
  target: number,
  nativeWidth?: number,
  dpr = 2
): number {
  const retina = target * dpr
  if (!nativeWidth) return retina
  return Math.min(nativeWidth, retina)
}

export function getImageSrc(
  image: ProjectImage | undefined,
  {
    variant = 'grid',
    width,
    quality = PHOTO_QUALITY,
    dpr = 1,
  }: {
    variant?: ImageVariant
    width?: number
    quality?: number
    dpr?: number
  } = {}
): string | null {
  if (!image) return null

  const sanity = image as SanityImage
  const targetWidth = resolveWidth(width ?? VARIANT_WIDTH[variant], sanity.width, dpr)

  if (isCloudinaryImage(image)) {
    const publicId = getCloudinaryPublicId(image)
    if (publicId) {
      return optimizedImage(publicId, { width: targetWidth, quality })
    }
    const directUrl = (image as CloudinaryImage & { secure_url?: string }).url
      ?? (image as { secure_url?: string }).secure_url
    if (directUrl) {
      const sep = directUrl.includes('?') ? '&' : '?'
      return `${directUrl}${sep}w=${targetWidth}&q=${quality}&f_auto&c_limit`
    }
  }

  if (sanity.asset?._ref) {
    return urlFor(sanity)
      .width(targetWidth)
      .quality(quality)
      .auto('format')
      .url()
  }

  if (sanity.url) {
    const sep = sanity.url.includes('?') ? '&' : '?'
    return `${sanity.url}${sep}w=${targetWidth}&q=${quality}&auto=format&fit=max`
  }

  return null
}

export function isCdnImage(src: string): boolean {
  return src.includes('cdn.sanity.io') || src.includes('res.cloudinary.com')
}

export function getCategorySlug(category: Category | string | undefined): string {
  if (!category) return ''
  if (typeof category === 'string') return category
  return category.slug ?? ''
}

export function getCategoryLabel(
  category: Category | string | undefined,
  lang: Lang
): string {
  if (!category) return ''
  if (typeof category === 'string') {
    return CATEGORY_LABELS[category]?.[lang] ?? category
  }
  return category.title?.[lang] ?? category.slug ?? ''
}