// =============================================
// LUMIÈRE — GROQ Queries para Sanity
// =============================================

const imageFieldsInline = `
  ...(select(
    _type == "cloudinary.asset" => {
      "publicId": public_id,
      "url": coalesce(secure_url, url),
      "width": width,
      "height": height,
      "alt": context.custom.alt,
      "blurUrl": null
    },
    defined(asset) => {
      "url": asset->url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
      "blurUrl": asset->metadata.lqip,
      alt
    }
  ))
`

const imageRef = (field: string) => `select(
  ${field}._type == "cloudinary.asset" => {
    "publicId": ${field}.public_id,
    "url": coalesce(${field}.secure_url, ${field}.url),
    "width": ${field}.width,
    "height": ${field}.height,
    "alt": ${field}.context.custom.alt,
    "blurUrl": null
  },
  defined(${field}.asset) => {
    "url": ${field}.asset->url,
    "width": ${field}.asset->metadata.dimensions.width,
    "height": ${field}.asset->metadata.dimensions.height,
    "blurUrl": ${field}.asset->metadata.lqip,
    "alt": ${field}.alt
  }
)`

const slugField = `"slug": slug.current`

// =============================================
// SITE SETTINGS
// =============================================
export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    photographerName,
    tagline,
    bio,
    journey[] {
      year,
      title,
      body
    },
    "photographerPhoto": ${imageRef("photographerPhoto")},
    "heroImage": ${imageRef("heroImage")},
    "behindImages": behindImages[] { ${imageFieldsInline} },
    stats,
    socialLinks,
    seo {
      title,
      description,
      "ogImage": ${imageRef("seo.ogImage")}
    }
  }
`

// =============================================
// PROJECTS
// =============================================

export const ALL_PROJECTS_QUERY = `
  *[_type == "project" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    ${slugField},
    category,
    featured,
    client,
    publishedAt,
    tags,
    "coverImage": ${imageRef("coverImage")}
  }
`

export const FEATURED_PROJECTS_QUERY = `
  *[_type == "project" && featured == true && defined(slug.current)] | order(publishedAt desc)[0...7] {
    _id,
    title,
    ${slugField},
    category,
    client,
    "coverImage": ${imageRef("coverImage")}
  }
`

export const PROJECT_BY_SLUG_QUERY = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    ${slugField},
    category,
    featured,
    client,
    location,
    publishedAt,
    description,
    tags,
    "coverImage": ${imageRef("coverImage")},
    "images": images[] { ${imageFieldsInline} },
    seoTitle,
    seoDescription
  }
`

export const ALL_PROJECT_SLUGS_QUERY = `
  *[_type == "project" && defined(slug.current)] {
    ${slugField}
  }
`

export const RELATED_PROJECTS_QUERY = `
  *[_type == "project" && category == $category && slug.current != $slug] | order(publishedAt desc)[0...3] {
    _id,
    title,
    ${slugField},
    category,
    "coverImage": ${imageRef("coverImage")}
  }
`

// =============================================
// CATEGORIES
// =============================================
export const ALL_CATEGORIES_QUERY = `
  *[_type == "category"] | order(order asc) {
    _id,
    title,
    ${slugField}
  }
`

// =============================================
// TESTIMONIALS — solo muestra los aprobados
// =============================================
export const ALL_TESTIMONIALS_QUERY = `
  *[_type == "testimonial" && status == "approved"] | order(_createdAt desc) {
    _id,
    author,
    role,
    quote,
    category,
    featured,
    "photo": select(
      defined(photo.asset) => {
        "url": photo.asset->url,
        "blurUrl": photo.asset->metadata.lqip,
        "alt": photo.alt
      }
    )
  }
`

export const FEATURED_TESTIMONIALS_QUERY = `
  *[_type == "testimonial" && status == "approved" && featured == true] | order(_createdAt desc)[0...4] {
    _id,
    author,
    role,
    quote,
    category
  }
`

// =============================================
// SERVICES
// =============================================
export const ALL_SERVICES_QUERY = `
  *[_type == "service"] | order(order asc) {
    _id,
    "id": id.current,
    title,
    description,
    icon,
    order,
    featured,
    price,
    features,
    gradientFrom,
    gradientTo,
    "image": ${imageRef("image")}
  }
`
// Agrega esta query en src/lib/queries.ts
// en la sección de SERVICES (después de ALL_SERVICES_QUERY)

// =============================================
// VIDEOS
// =============================================
export const ALL_VIDEOS_QUERY = `
  *[_type == "video"] | order(order asc, _createdAt desc) {
    _id,
    title,
    description,
    category,
    featured,
    order,
    "video": select(
      video._type == "cloudinary.asset" => {
        "publicId":  video.public_id,
        "url":       coalesce(video.secure_url, video.url),
        "width":     video.width,
        "height":    video.height,
        "format":    video.format,
        "duration":  video.duration
      }
    ),
    "thumbnail": select(
      thumbnail._type == "cloudinary.asset" => {
        "url": coalesce(thumbnail.secure_url, thumbnail.url)
      }
    )
  }
`

export const FEATURED_VIDEOS_QUERY = `
  *[_type == "video" && featured == true] | order(order asc)[0...4] {
    _id,
    title,
    category,
    "video": select(
      video._type == "cloudinary.asset" => {
        "publicId": video.public_id,
        "url":      coalesce(video.secure_url, video.url),
        "format":   video.format
      }
    ),
    "thumbnail": select(
      thumbnail._type == "cloudinary.asset" => {
        "url": coalesce(thumbnail.secure_url, thumbnail.url)
      }
    )
  }
`

// =============================================
// BLOG
// =============================================

export const ALL_BLOG_POSTS_QUERY = `
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    ${slugField},
    publishedAt,
    readTime,
    category,
    featured,
    excerpt,
    "coverImage": ${imageRef("coverImage")}
  }
`

export const FEATURED_BLOG_POST_QUERY = `
  *[_type == "blogPost" && featured == true] | order(publishedAt desc)[0] {
    _id,
    title,
    ${slugField},
    publishedAt,
    readTime,
    category,
    excerpt,
    "coverImage": ${imageRef("coverImage")}
  }
`

export const BLOG_POST_BY_SLUG_QUERY = `
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    ${slugField},
    publishedAt,
    readTime,
    category,
    excerpt,
    content,
    "coverImage": ${imageRef("coverImage")},
    "images": images[] { ${imageFieldsInline} },
    seoTitle,
    seoDescription
  }
`

export const ALL_BLOG_SLUGS_QUERY = `
  *[_type == "blogPost" && defined(slug.current)] {
    ${slugField}
  }
`

export const RELATED_BLOG_POSTS_QUERY = `
  *[_type == "blogPost" && category == $category && slug.current != $slug] | order(publishedAt desc)[0...2] {
    _id,
    title,
    ${slugField},
    category,
    "coverImage": ${imageRef("coverImage")}
  }
`