// =============================================
// Cloudinary utilities for Lumière
// =============================================

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!

// ---- Base URL ----
export function cloudinaryUrl(
  publicId: string,
  transformations: string = ''
): string {
  const base = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`
  return transformations
    ? `${base}/${transformations}/${publicId}`
    : `${base}/${publicId}`
}

// ---- Optimized image — sin recorte, máxima calidad fotográfica ----
export function optimizedImage(
  publicId: string,
  {
    width,
    height,
    quality = 95,
    format  = 'auto',
    crop    = 'limit',   // limit: nunca recorta, solo reduce si es mayor al target
  }: {
    width?:   number
    height?:  number
    quality?: string | number
    format?:  string
    crop?:    string
  } = {}
): string {
  const parts: string[] = [
    `q_${quality}`,
    `f_${format}`,
    `c_${crop}`,
  ]
  if (width)  parts.push(`w_${width}`)
  if (height) parts.push(`h_${height}`)

  return cloudinaryUrl(publicId, parts.join(','))
}

// ---- Blur placeholder ----
export function blurPlaceholder(publicId: string): string {
  return cloudinaryUrl(publicId, 'w_20,q_30,f_auto,e_blur:1000')
}

// ---- Responsive srcSet ----
export function responsiveSrcSet(
  publicId: string,
  widths: number[] = [640, 828, 1080, 1200, 1920]
): string {
  return widths
    .map(w => `${optimizedImage(publicId, { width: w })} ${w}w`)
    .join(', ')
}

// ---- Video ----
export function optimizedVideo(
  publicId: string,
  {
    width,
    quality = 'auto',
    format  = 'auto',
  }: { width?: number; quality?: string; format?: string } = {}
): string {
  const base = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload`
  const parts: string[] = [`q_${quality}`, `f_${format}`]
  if (width) parts.push(`w_${width}`)
  return `${base}/${parts.join(',')}/${publicId}`
}