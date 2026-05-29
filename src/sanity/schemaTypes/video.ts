// src/sanity/schemaTypes/video.ts
// Agrega este archivo y exporta videoSchema en index.ts

import { defineField, defineType } from 'sanity'

export const videoSchema = defineType({
  name: 'video',
  title: 'Videos',
  type: 'document',

  orderings: [
    {
      title: 'Orden manual',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Más recientes',
      name: 'createdDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
  ],

  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'object',
      fields: [
        { name: 'es', title: 'Español', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'object',
      fields: [
        { name: 'es', title: 'Español', type: 'text', rows: 3 },
        { name: 'en', title: 'English', type: 'text', rows: 3 },
      ],
    }),

    defineField({
      name: 'video',
      title: 'Video (Cloudinary)',
      type: 'cloudinary.asset',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'thumbnail',
      title: 'Miniatura personalizada (opcional)',
      description: 'Si no subes una, se usa el primer frame del video automáticamente.',
      type: 'cloudinary.asset',
    }),

    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Boda / Eventos',       value: 'wedding'  },
          { title: 'Naturaleza / Aves',     value: 'nature'   },
          { title: 'Behind the Scenes',     value: 'behind'   },
          { title: 'Showreel / Reel',       value: 'showreel' },
          { title: 'Sesión fotográfica',    value: 'session'  },
          { title: 'Rutina / Día a día',    value: 'routine'  },
        ],
      },
    }),

    defineField({
      name: 'featured',
      title: '¿Destacado?',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      initialValue: 0,
    }),
  ],

  preview: {
    select: {
      title:    'title.es',
      subtitle: 'category',
      media:    'thumbnail',
    },
    prepare: ({ title, subtitle }) => ({
      title:    title ?? 'Sin título',
      subtitle: subtitle ?? '',
    }),
  },
})