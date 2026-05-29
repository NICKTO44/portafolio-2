import { type SchemaTypeDefinition, defineField, defineType } from 'sanity'
import { projectSchema } from './project'
import { serviceSchema } from './service'
import { videoSchema }   from './video'          // ← NUEVO



// =============================================
// CATEGORY
// =============================================
const categorySchema = defineType({
  name: 'category', title: 'Categorías', type: 'document',
  fields: [
    defineField({
      name: 'title', title: 'Nombre', type: 'object',
      fields: [
        { name: 'es', title: 'Español', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title.es' } }),
    defineField({ name: 'order', title: 'Orden', type: 'number', initialValue: 0 }),
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

  orderings: [
    {
      title: 'Estado (pendientes primero)',
      name: 'statusAsc',
      by: [{ field: 'status', direction: 'asc' }],
    },
    {
      title: 'Más recientes',
      name: 'createdDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
  ],

  fields: [
    defineField({
      name: 'status',
      title: 'Estado',
      type: 'string',
      initialValue: 'pending',
      options: {
        list: [
          { title: '⏳ Pendiente',  value: 'pending'  },
          { title: '✅ Aprobado',   value: 'approved' },
          { title: '❌ Rechazado',  value: 'rejected' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Origen',
      type: 'string',
      readOnly: true,
      initialValue: 'manual',
      options: {
        list: [
          { title: 'Manual (tú lo agregaste)', value: 'manual' },
          { title: 'Formulario web',           value: 'form'   },
        ],
      },
    }),
    defineField({
      name: 'author',
      title: 'Nombre del cliente',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.required(),
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
      title: 'Foto (opcional)',
      type: 'image',
      options: { hotspot: true },
    }),
  ],

  preview: {
    select: {
      title:    'author',
      subtitle: 'status',
      quote:    'quote.es',
    },
    prepare: ({ title, subtitle, quote }) => ({
      title,
      subtitle: `${subtitle === 'pending' ? '⏳' : subtitle === 'approved' ? '✅' : '❌'} ${subtitle} — ${quote?.slice(0, 60) ?? ''}…`,
    }),
  },
})

// =============================================
// BLOG POST
// =============================================
const blogPostSchema = defineType({
  name: 'blogPost', title: 'Blog', type: 'document',
  groups: [
    { name: 'content', title: 'Contenido' },
    { name: 'media',   title: 'Imágenes'  },
    { name: 'seo',     title: 'SEO'       },
  ],
  fields: [
    defineField({
      name: 'title', title: 'Título', type: 'object', group: 'content',
      fields: [
        { name: 'es', title: 'Español', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', group: 'content', options: { source: 'title.es' } }),
    defineField({ name: 'publishedAt', title: 'Fecha', type: 'date', group: 'content' }),
    defineField({ name: 'readTime', title: 'Tiempo de lectura (min)', type: 'number', group: 'content' }),
    defineField({
      name: 'category', title: 'Categoría', type: 'string', group: 'content',
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
    defineField({ name: 'featured', title: '¿Destacado?', type: 'boolean', group: 'content', initialValue: false }),
    defineField({
      name: 'excerpt', title: 'Extracto', type: 'object', group: 'content',
      fields: [
        { name: 'es', title: 'Español', type: 'text', rows: 3 },
        { name: 'en', title: 'English', type: 'text', rows: 3 },
      ],
    }),
    defineField({
      name: 'content', title: 'Contenido', type: 'object', group: 'content',
      fields: [
        { name: 'es', title: 'Español', type: 'array', of: [{ type: 'block' }] },
        { name: 'en', title: 'English', type: 'array', of: [{ type: 'block' }] },
      ],
    }),
    defineField({
      name: 'coverImage', title: 'Imagen de portada', type: 'image', group: 'media',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
    }),
    defineField({
      name: 'images', title: 'Imágenes del artículo', type: 'array', group: 'media',
      of: [{ type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', title: 'Alt text', type: 'string' }] }],
    }),
    defineField({ name: 'seoTitle',       title: 'SEO Title',       type: 'string', group: 'seo' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 3, group: 'seo' }),
  ],
  preview: {
    select: { title: 'title.es', subtitle: 'publishedAt', media: 'coverImage' },
    prepare: ({ title, subtitle, media }) => ({ title, subtitle, media }),
  },
})

// =============================================
// SITE SETTINGS (singleton)
// =============================================
const siteSettingsSchema = defineType({
  name: 'siteSettings', title: '⚙️ Configuración del Sitio', type: 'document',
  fields: [
    defineField({ name: 'photographerName', title: 'Nombre / Marca', type: 'string' }),
    defineField({
      name: 'tagline', title: 'Tagline', type: 'object',
      fields: [
        { name: 'es', title: 'Español', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    }),
    defineField({
      name: 'bio', title: 'Biografía', type: 'object',
      fields: [
        { name: 'es', title: 'Español', type: 'text', rows: 5 },
        { name: 'en', title: 'English', type: 'text', rows: 5 },
      ],
    }),
    defineField({
      name: 'journey',
      title: 'El Camino / Journey',
      description: 'Línea de tiempo del fotógrafo. Agrega cada etapa con año y descripción.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'year', title: 'Año', type: 'string' },
            {
              name: 'title', title: 'Título', type: 'object',
              fields: [
                { name: 'es', title: 'Español', type: 'string' },
                { name: 'en', title: 'English', type: 'string' },
              ],
            },
            {
              name: 'body', title: 'Descripción', type: 'object',
              fields: [
                { name: 'es', title: 'Español', type: 'text', rows: 3 },
                { name: 'en', title: 'English', type: 'text', rows: 3 },
              ],
            },
          ],
          preview: {
            select: { title: 'year', subtitle: 'title.es' },
            prepare: (value: Record<string, any>) => ({
              title:    value.title    as string,
              subtitle: value.subtitle as string,
            }),
          },
        },
      ],
    }),
    defineField({
      name: 'photographerPhoto', title: 'Foto del fotógrafo', type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
    }),
    defineField({
      name: 'heroImage', title: 'Imagen de fondo Hero (Home)', type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
    }),
    defineField({
      name: 'behindImages',
      title: 'Fotos "Behind the Lens" (About)',
      description: 'Sube hasta 4 fotos desde Cloudinary para la sección "Más allá de la cámara".',
      type: 'array',
      of: [{ type: 'cloudinary.asset' }],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: 'stats', title: 'Estadísticas', type: 'object',
      fields: [
        { name: 'years',        title: 'Años de experiencia', type: 'number' },
        { name: 'projects',     title: 'Proyectos',           type: 'number' },
        { name: 'countries',    title: 'Países',              type: 'number' },
        { name: 'satisfaction', title: 'Satisfacción (%)',    type: 'number' },
      ],
    }),
    defineField({
      name: 'socialLinks', title: 'Redes sociales', type: 'object',
      fields: [
        { name: 'instagram', title: 'Instagram URL',     type: 'url'    },
        { name: 'whatsapp',  title: 'WhatsApp número',   type: 'string' },
        { name: 'behance',   title: 'Behance URL',       type: 'url'    },
        { name: 'email',     title: 'Email de contacto', type: 'string' },
      ],
    }),
    defineField({
      name: 'seo', title: 'SEO Global', type: 'object',
      fields: [
        { name: 'title',       title: 'Meta title',       type: 'string' },
        { name: 'description', title: 'Meta description', type: 'text', rows: 3 },
        { name: 'ogImage',     title: 'OG Image',         type: 'image', options: { hotspot: true } },
      ],
    }),
  ],
})

// =============================================
// EXPORT
// =============================================
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    projectSchema,
    categorySchema,
    testimonialSchema,
    blogPostSchema,
    siteSettingsSchema,
    serviceSchema,
    videoSchema,          // ← NUEVO
  ],
}