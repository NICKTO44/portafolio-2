import Image from 'next/image'
import { getImageSrc, isCdnImage, PHOTO_QUALITY, type ImageVariant } from '@/lib/images'
import type { ProjectImage } from '@/types'

interface PhotoProps {
  image?:     ProjectImage
  variant?:   ImageVariant
  alt:        string
  sizes:      string
  className?: string
  priority?:  boolean
  fill?:      boolean
}

export function Photo({
  image,
  variant = 'grid',
  alt,
  sizes,
  className,
  priority,
  fill = true,
}: PhotoProps) {
  const src = getImageSrc(image, { variant })
  if (!src) return null

  const sanity = image as { blurUrl?: string }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      quality={PHOTO_QUALITY}
      unoptimized={isCdnImage(src)}
      priority={priority}
      className={className}
      placeholder={sanity?.blurUrl ? 'blur' : 'empty'}
      blurDataURL={sanity?.blurUrl}
    />
  )
}
