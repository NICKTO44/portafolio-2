// src/app/api/testimonials/submit/route.ts
// POST — recibe el formulario y crea un testimonio con status: pending

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token:     process.env.SANITY_API_WRITE_TOKEN,
  useCdn:    false,
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { author, roleEs, roleEn, quoteEs, quoteEn, categoryEs, categoryEn } = body

    // Validación mínima
    if (!author?.trim() || !quoteEs?.trim()) {
      return NextResponse.json(
        { error: 'Nombre y testimonio son requeridos.' },
        { status: 400 }
      )
    }

    // Protección anti-spam básica
    if (quoteEs.length > 800) {
      return NextResponse.json(
        { error: 'El testimonio es demasiado largo.' },
        { status: 400 }
      )
    }

    await writeClient.create({
      _type:  'testimonial',
      status: 'pending',   // siempre pending al llegar del formulario
      source: 'form',
      author: author.trim(),
      role: {
        es: roleEs?.trim() ?? '',
        en: roleEn?.trim() ?? '',
      },
      quote: {
        es: quoteEs.trim(),
        en: quoteEn?.trim() ?? quoteEs.trim(), // si no hay traducción usa el mismo
      },
      category: {
        es: categoryEs?.trim() ?? '',
        en: categoryEn?.trim() ?? '',
      },
      featured: false,
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error('[testimonials/submit]', err)
    return NextResponse.json(
      { error: 'Error al guardar. Intenta de nuevo.' },
      { status: 500 }
    )
  }
}