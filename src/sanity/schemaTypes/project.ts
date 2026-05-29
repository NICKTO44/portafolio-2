import { defineField, defineType } from 'sanity'

export const projectSchema = defineType({
  name: 'project',
  title: 'Proyectos',
  type: 'document',
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
    defineField({
      name: 'slug', title: 'Slug (URL)', type: 'slug', group: 'content',
      options: { source: 'title.es' },
    }),
    defineField({
      name: 'featured', title: '¿Destacado en Home?', type: 'boolean',
      group: 'content', initialValue: false,
    }),
    defineField({ name: 'client', title: 'Cliente', type: 'string', group: 'content' }),
    defineField({
      name: 'location', title: 'Ubicación', type: 'object', group: 'content',
      fields: [
        { name: 'es', title: 'Español', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    }),
    defineField({ name: 'publishedAt', title: 'Fecha', type: 'date', group: 'content' }),
    defineField({
      name: 'category', title: 'Categoría', type: 'string', group: 'content',
      options: {
        list: [
          { title: 'Moda & Editorial',  value: 'fashion'      },
          { title: 'Boda Luxury',       value: 'wedding'      },
          { title: 'Arquitectura',      value: 'architecture' },
          { title: 'Retrato Fine Art',  value: 'portrait'     },
          { title: 'Lifestyle',         value: 'lifestyle'    },
          { title: 'Branding',          value: 'branding'     },
          { title: 'Viajes',            value: 'travel'       },
        ],
      },
    }),
    defineField({
      name: 'description', title: 'Descripción', type: 'object', group: 'content',
      fields: [
        { name: 'es', title: 'Español', type: 'text', rows: 4 },
        { name: 'en', title: 'English', type: 'text', rows: 4 },
      ],
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen de portada',
      type: 'cloudinary.asset',
      description: 'Se sube y guarda en tu cuenta de Cloudinary',
      group: 'media',
    }),
    defineField({
      name: 'images',
      title: 'Galería',
      type: 'array',
      group: 'media',
      of: [{ type: 'cloudinary.asset' }],
    }),
    defineField({
      name: 'tags', title: 'Tags', type: 'array', group: 'content',
      of: [{ type: 'string' }], options: { layout: 'tags' },
    }),
    defineField({ name: 'seoTitle',       title: 'SEO Title',       type: 'string', group: 'seo' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 3, group: 'seo' }),
  ],
  preview: {
    select: { title: 'title.es', subtitle: 'client', media: 'coverImage' },
    prepare: ({ title, subtitle, media }) => ({ title, subtitle, media }),
  },
})