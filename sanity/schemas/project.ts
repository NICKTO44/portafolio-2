import { defineField, defineType } from 'sanity'

export const projectSchema = defineType({
  name: 'project',
  title: 'Proyecto / Project',
  type: 'document',
  groups: [
    { name: 'content',  title: 'Contenido' },
    { name: 'media',    title: 'Imágenes' },
    { name: 'seo',      title: 'SEO' },
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
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      group: 'content',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'featured',
      title: '¿Destacado en Home?',
      type: 'boolean',
      group: 'content',
      initialValue: false,
    }),
    defineField({
      name: 'client',
      title: 'Cliente',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'location',
      title: 'Ubicación / Location',
      type: 'object',
      group: 'content',
      fields: [
        { name: 'es', title: 'Español', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha',
      type: 'date',
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Descripción / Description',
      type: 'object',
      group: 'content',
      fields: [
        { name: 'es', title: 'Español', type: 'text', rows: 4 },
        { name: 'en', title: 'English', type: 'text', rows: 4 },
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
      title: 'Galería de imágenes',
      type: 'array',
      group: 'media',
      of: [{ type: 'cloudinaryAsset' }],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      group: 'seo',
    }),
  ],
  preview: {
    select: { title: 'title.es', subtitle: 'client', media: 'coverImage' },
    prepare: ({ title, subtitle }) => ({ title, subtitle }),
  },
})