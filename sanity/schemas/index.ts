import { defineField, defineType } from 'sanity'

// =============================================
// CATEGORY
// =============================================
export const categorySchema = defineType({
  name: 'category',
  title: 'Categoría',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre',
      type: 'object',
      fields: [
        { name: 'es', title: 'Español', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title.es' },
    }),
    defineField({
      name: 'order',
      title: 'Orden de aparición',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: 'title.es' },
    prepare: ({ title }) => ({ title }),
  },
})

// =============================================
// TESTIMONIAL
// =============================================
export const testimonialSchema = defineType({
  name: 'testimonial',
  title: 'Testimonios',
  type: 'document',
  fields: [
    defineField({
      name: 'author',
      title: 'Nombre del cliente',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Rol / Empresa',
      type: 'object',
      fields: [
        { name: 'es', title: 'Español', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    }),
    defineField({
      name: 'quote',
      title: 'Testimonio',
      type: 'object',
      fields: [
        { name: 'es', title: 'Español', type: 'text', rows: 4 },
        { name: 'en', title: 'English', type: 'text', rows: 4 },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Categoría de servicio',
      type: 'object',
      fields: [
        { name: 'es', title: 'Español', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    }),
    defineField({
      name: 'featured',
      title: '¿Mostrar en Home?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'photo',
      title: 'Foto del cliente (opcional)',
      type: 'cloudinaryAsset',
    }),
  ],
  preview: {
    select: { title: 'author', subtitle: 'role.es' },
    prepare: ({ title, subtitle }) => ({ title, subtitle }),
  },
})

// =============================================
// BLOG POST
// =============================================
export const blogPostSchema = defineType({
  name: 'blogPost',
  title: 'Blog',
  type: 'document',
  groups: [
    { name: 'content', title: 'Contenido' },
    { name: 'media',   title: 'Imágenes' },
    { name: 'seo',     title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'object',
      group: 'content',
      fields: [
        { name: 'es', title: 'Español', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: 'content',
      options: { source: 'title.es' },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'date',
      group: 'content',
    }),
    defineField({
      name: 'readTime',
      title: 'Tiempo de lectura (minutos)',
      type: 'number',
      group: 'content',
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      group: 'content',
      options: {
        list: [
          { title: 'Técnica',           value: 'technique'   },
          { title: 'Behind the scenes', value: 'behind'      },
          { title: 'Viajes',            value: 'travel'      },
          { title: 'Inspiración',       value: 'inspiration' },
          { title: 'Equipo',            value: 'gear'        },
        ],
      },
    }),
    defineField({
      name: 'featured',
      title: '¿Artículo destacado?',
      type: 'boolean',
      group: 'content',
      initialValue: false,
    }),
    defineField({
      name: 'excerpt',
      title: 'Extracto',
      type: 'object',
      group: 'content',
      fields: [
        { name: 'es', title: 'Español', type: 'text', rows: 3 },
        { name: 'en', title: 'English', type: 'text', rows: 3 },
      ],
    }),
    defineField({
      name: 'content',
      title: 'Contenido del artículo',
      type: 'object',
      group: 'content',
      fields: [
        { name: 'es', title: 'Español', type: 'array', of: [{ type: 'block' }] },
        { name: 'en', title: 'English', type: 'array', of: [{ type: 'block' }] },
      ],
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen de portada',
      type: 'cloudinaryAsset',
      group: 'media',
    }),
    defineField({
      name: 'images',
      title: 'Imágenes del artículo',
      type: 'array',
      group: 'media',
      of: [{ type: 'cloudinaryAsset' }],
    }),
    defineField({
      name: 'seoTitle',    title: 'SEO Title',       type: 'string', group: 'seo' }),
    defineField({
      name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 3, group: 'seo' }),
  ],
  preview: {
    select: { title: 'title.es', subtitle: 'publishedAt' },
    prepare: ({ title, subtitle }) => ({ title, subtitle }),
  },
})

// =============================================
// SITE SETTINGS (singleton)
// =============================================
export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Configuración del Sitio',
  type: 'document',
  fields: [
    defineField({ name: 'photographerName', title: 'Nombre / Marca', type: 'string' }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'object',
      fields: [
        { name: 'es', title: 'Español', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    }),
    defineField({
      name: 'bio',
      title: 'Biografía',
      type: 'object',
      fields: [
        { name: 'es', title: 'Español', type: 'text', rows: 5 },
        { name: 'en', title: 'English', type: 'text', rows: 5 },
      ],
    }),
    defineField({ name: 'photographerPhoto', title: 'Foto del fotógrafo', type: 'cloudinaryAsset' }),
    defineField({
      name: 'stats',
      title: 'Estadísticas',
      type: 'object',
      fields: [
        { name: 'years',        title: 'Años de experiencia', type: 'number' },
        { name: 'projects',     title: 'Proyectos',           type: 'number' },
        { name: 'countries',    title: 'Países',              type: 'number' },
        { name: 'satisfaction', title: 'Satisfacción (%)',    type: 'number' },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Redes sociales',
      type: 'object',
      fields: [
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
        { name: 'whatsapp',  title: 'WhatsApp número', type: 'string' },
        { name: 'behance',   title: 'Behance URL',   type: 'url' },
        { name: 'email',     title: 'Email',          type: 'string' },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Global',
      type: 'object',
      fields: [
        { name: 'title',       title: 'Meta title',       type: 'string' },
        { name: 'description', title: 'Meta description', type: 'text', rows: 3 },
        { name: 'ogImage',     title: 'OG Image',         type: 'cloudinaryAsset' },
      ],
    }),
  ],
})

// =============================================
// CLOUDINARY ASSET (custom type)
// =============================================
export const cloudinaryAssetSchema = defineType({
  name: 'cloudinaryAsset',
  title: 'Imagen Cloudinary',
  type: 'object',
  fields: [
    defineField({ name: 'publicId',  title: 'Public ID',  type: 'string' }),
    defineField({ name: 'url',       title: 'URL',        type: 'url'    }),
    defineField({ name: 'width',     title: 'Ancho',      type: 'number' }),
    defineField({ name: 'height',    title: 'Alto',       type: 'number' }),
    defineField({ name: 'alt',       title: 'Alt text',   type: 'string' }),
    defineField({ name: 'blurUrl',   title: 'Blur URL',   type: 'url'    }),
  ],
})

import { projectSchema } from './project'

export const schemaTypes = [
  projectSchema,
  categorySchema,
  testimonialSchema,
  blogPostSchema,
  siteSettingsSchema,
  cloudinaryAssetSchema,
]