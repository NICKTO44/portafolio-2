// sanity/schemas/service.ts
import { defineField, defineType } from 'sanity'

export const serviceSchema = defineType({
  name: 'service',
  title: 'Servicios',
  type: 'document',
  groups: [
    { name: 'info',     title: 'Información'  },
    { name: 'pricing',  title: 'Precio'       },
    { name: 'features', title: 'Características' },
    { name: 'media',    title: 'Imagen'       },
  ],
  fields: [
    // ── Identificador interno ──
    defineField({
      name: 'id',
      title: 'ID interno (slug)',
      type: 'slug',
      group: 'info',
      options: { source: 'title.es' },
      validation: (R) => R.required(),
    }),

    defineField({
      name: 'title',
      title: 'Título',
      type: 'object',
      group: 'info',
      fields: [
        { name: 'es', title: 'Español', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
      ],
      validation: (R) => R.required(),
    }),

    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'object',
      group: 'info',
      fields: [
        { name: 'es', title: 'Español', type: 'text', rows: 3 },
        { name: 'en', title: 'English', type: 'text', rows: 3 },
      ],
    }),

    defineField({
      name: 'icon',
      title: 'Icono (símbolo unicode)',
      description: 'Ej: ✦  ◆  ▲  ●',
      type: 'string',
      group: 'info',
    }),

    defineField({
      name: 'order',
      title: 'Orden de aparición',
      type: 'number',
      group: 'info',
      initialValue: 0,
    }),

    defineField({
      name: 'featured',
      title: '¿Destacado? (badge "Popular")',
      type: 'boolean',
      group: 'info',
      initialValue: false,
    }),

    // ── Precio ──
    defineField({
      name: 'price',
      title: 'Precio desde (USD)',
      description: 'Solo el número, sin $ ni comas. Ej: 1200',
      type: 'number',
      group: 'pricing',
      validation: (R) => R.required().min(0),
    }),

    // ── Features ──
    defineField({
      name: 'features',
      title: 'Qué incluye',
      type: 'object',
      group: 'features',
      fields: [
        {
          name: 'es',
          title: 'Español',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'en',
          title: 'English',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    }),

    // ── Imagen ──
    defineField({
      name: 'image',
      title: 'Imagen del servicio (opcional)',
      description: 'Si no hay imagen se muestra el degradado de color.',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
    }),

    // ── Degradado fallback ──
    defineField({
      name: 'gradientFrom',
      title: 'Color degradado — inicio (hex)',
      description: 'Ej: #1a1510  — se usa si no hay imagen',
      type: 'string',
      group: 'media',
      initialValue: '#1a1510',
    }),

    defineField({
      name: 'gradientTo',
      title: 'Color degradado — fin (hex)',
      description: 'Ej: #2a1f14',
      type: 'string',
      group: 'media',
      initialValue: '#2a1f14',
    }),
  ],

  preview: {
    select: {
      title:    'title.es',
      subtitle: 'price',
      media:    'image',
    },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle: subtitle ? `Desde $${subtitle} USD` : 'Sin precio',
      media,
    }),
  },
})