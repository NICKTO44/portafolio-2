// scripts/migrate-blog.ts
// Ejecutar con: npx ts-node --skip-project scripts/migrate-blog.ts

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'dzsjufuo',
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET    ?? 'production',
  apiVersion: '2024-01-01',
  token:     process.env.SANITY_API_WRITE_TOKEN,
  useCdn:    false,
})

const POSTS = [
  {
    slug:      'luz-natural-vs-artificial',
    cat:       'technique',
    featured:  true,
    readTime:  8,
    publishedAt: '2025-01-12',
    title:    { es: 'Luz natural vs artificial: cuándo usar cada una', en: 'Natural vs artificial light: when to use each' },
    excerpt:  {
      es: 'Después de 12 años fotografiando en todo tipo de condiciones, he llegado a una conclusión clara: no existe la luz mala, solo la incomprendida. En este artículo exploro cuándo y cómo aprovechar cada tipo de luz.',
      en: 'After 12 years photographing in all kinds of conditions, I have reached a clear conclusion: there is no bad light, only misunderstood light. In this article I explore when and how to make the most of each type of light.',
    },
  },
  {
    slug:      'behind-scenes-vogue',
    cat:       'behind',
    featured:  false,
    readTime:  6,
    publishedAt: '2024-12-28',
    title:    { es: 'Detrás de la portada: cómo fue el shoot para Vogue', en: 'Behind the cover: how the Vogue shoot went' },
    excerpt:  {
      es: 'Una mirada íntima al proceso creativo detrás de una de las sesiones más exigentes de mi carrera. 14 horas, 3 cambios de locación y una modelo extraordinaria.',
      en: 'An intimate look at the creative process behind one of the most demanding sessions of my career. 14 hours, 3 location changes and an extraordinary model.',
    },
  },
  {
    slug:      'fotografiar-bodas-en-italia',
    cat:       'travel',
    featured:  false,
    readTime:  10,
    publishedAt: '2024-12-15',
    title:    { es: 'Fotografiar bodas en Italia: la guía definitiva', en: 'Photographing weddings in Italy: the definitive guide' },
    excerpt:  {
      es: 'Desde las villas de la Toscana hasta los canales de Venecia, Italia ofrece locaciones incomparables para la fotografía nupcial. Todo lo que necesitas saber antes de tu próxima boda italiana.',
      en: 'From the villas of Tuscany to the canals of Venice, Italy offers unparalleled locations for wedding photography. Everything you need to know before your next Italian wedding.',
    },
  },
  {
    slug:      'equipo-2025',
    cat:       'gear',
    featured:  false,
    readTime:  5,
    publishedAt: '2024-12-03',
    title:    { es: 'Mi equipo fotográfico en 2025: qué uso y por qué', en: 'My photography gear in 2025: what I use and why' },
    excerpt:  {
      es: 'No creo en el equipo por el equipo. Cada cámara, lente y accesorio en mi mochila tiene una razón de ser. Te cuento qué llevo y cómo lo uso en proyectos reales.',
      en: "I don't believe in gear for gear's sake. Every camera, lens and accessory in my bag has a reason to be there. I tell you what I carry and how I use it in real projects.",
    },
  },
  {
    slug:      'la-patagonia-desde-mi-lente',
    cat:       'travel',
    featured:  false,
    readTime:  12,
    publishedAt: '2024-11-20',
    title:    { es: 'La Patagonia desde mi lente: 30 días al fin del mundo', en: 'Patagonia through my lens: 30 days at the end of the world' },
    excerpt:  {
      es: 'Un mes recorriendo la Patagonia con solo una mochila y dos cuerpos de cámara. La experiencia más transformadora de mi carrera fotográfica.',
      en: 'A month traveling through Patagonia with just a backpack and two camera bodies. The most transformative experience of my photographic career.',
    },
  },
  {
    slug:      'composicion-regla-de-tercios',
    cat:       'technique',
    featured:  false,
    readTime:  7,
    publishedAt: '2024-11-08',
    title:    { es: 'Más allá de la regla de tercios: composición avanzada', en: 'Beyond the rule of thirds: advanced composition' },
    excerpt:  {
      es: 'La regla de tercios es el punto de partida, no el destino. En este artículo exploro técnicas de composición que llevarán tus imágenes al siguiente nivel.',
      en: 'The rule of thirds is the starting point, not the destination. In this article I explore composition techniques that will take your images to the next level.',
    },
  },
]

async function migrate() {
  console.log('🚀 Migrando posts a Sanity...\n')

  for (const post of POSTS) {
    const doc = {
      _type: 'blogPost',
      title: post.title,
      slug:  { _type: 'slug', current: post.slug },
      category:    post.cat,
      featured:    post.featured,
      readTime:    post.readTime,
      publishedAt: post.publishedAt,
      excerpt:     post.excerpt,
    }

    try {
      const result = await client.create(doc)
      console.log(`✅ Creado: ${post.title.es} (${result._id})`)
    } catch (err) {
      console.error(`❌ Error en "${post.title.es}":`, err)
    }
  }

  console.log('\n✨ Migración completa. Ahora entra a Sanity Studio y agrega las imágenes.')
}

migrate()