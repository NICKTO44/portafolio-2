// scripts/migrate-blog-content.ts
import { createClient } from '@sanity/client'

const client = createClient({
  projectId:  'dzsjufuo',
  dataset:    'production',
  apiVersion: '2024-01-01',
  token:      process.env.SANITY_API_WRITE_TOKEN,
  useCdn:     false,
})

function toBlocks(text: string) {
  return text.split('\n\n').map((para) => ({
    _type: 'block',
    _key:  Math.random().toString(36).slice(2),
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), text: para }],
  }))
}

const POSTS_CONTENT = [
  {
    slug: 'luz-natural-vs-artificial',
    content: {
      es: `La luz natural tiene una cualidad que ningún equipo artificial puede replicar completamente: la variabilidad. El sol cambia de ángulo, de temperatura de color, de intensidad a cada minuto. Esta impredictibilidad, que muchos fotógrafos temen, es en realidad su mayor fortaleza.

La hora dorada — los 30-60 minutos después del amanecer y antes del atardecer — ofrece una luz cálida, lateral y suave que modela perfectamente el rostro humano. En estas condiciones, una cámara básica puede producir imágenes extraordinarias.

La luz artificial no es un sustituto de la natural: es una herramienta completamente diferente con sus propias virtudes. La controlabilidad es su principal ventaja. Puedes repetir exactamente las mismas condiciones de luz en diferentes momentos del día o de la noche.

Para fotografía de producto y moda de estudio, la luz artificial es insustituible. Permite crear sombras precisas, dirigir la atención del espectador y mantener consistencia a lo largo de una sesión larga.

Los fotógrafos más avanzados no eligen entre luz natural y artificial: las combinan. Un reflector para suavizar sombras en exteriores, un flash de relleno para compensar el contraluz, una ventana como fuente principal con un panel LED para equilibrar las sombras.

Mi consejo: domina primero la luz natural. Aprende a leer el cielo, a anticipar cómo cambiará la luz, a moverte con el sol. Esa comprensión profunda te hará un usuario mucho más hábil de la luz artificial.`,
      en: `Natural light has a quality that no artificial equipment can completely replicate: variability. The sun changes angle, color temperature, and intensity every minute. This unpredictability, which many photographers fear, is actually its greatest strength.

The golden hour — the 30 to 60 minutes after sunrise and before sunset — offers warm, lateral, soft light that perfectly models the human face. In these conditions, a basic camera can produce extraordinary images.

Artificial light is not a substitute for natural light: it is a completely different tool with its own virtues. Controllability is its main advantage. You can replicate exactly the same lighting conditions at different times of day or night.

For product and studio fashion photography, artificial light is irreplaceable. It allows you to create precise shadows, direct viewer attention and maintain consistency throughout a long session.

The most advanced photographers do not choose between natural and artificial light: they combine them. A reflector to soften shadows outdoors, a fill flash to compensate for backlighting, a window as the main source with an LED panel to balance shadows.

My advice: master natural light first. Learn to read the sky, to anticipate how the light will change, to move with the sun. That deep understanding will make you a much more skilled user of artificial light.`,
    },
  },
  {
    slug: 'behind-scenes-vogue',
    content: {
      es: `Cuando recibí la llamada de Vogue España a las 7 de la mañana de un martes, no lo podía creer. Llevaba tres años construyendo mi cartera editorial y ese momento representaba exactamente el tipo de proyecto con el que había soñado desde que tomé mi primera cámara.

La sesión estaba programada para realizarse en tres locaciones distintas de Madrid: un estudio industrial en Lavapiés, los jardines del Retiro al amanecer y una azotea en el barrio de Malasaña. Catorce horas de trabajo continuo, tres cambios completos de iluminación y un equipo de doce personas.

La modelo principal, con quien ya había trabajado en dos campañas anteriores, llegó al estudio a las 5 de la mañana. Ese tiempo extra antes del amanecer fue fundamental para establecer la comunicación visual que necesitábamos. La confianza entre fotógrafo y modelo no se improvisa, se construye con paciencia.

El mayor desafío técnico fue la sesión en el Retiro. Teníamos una ventana de exactamente 22 minutos de luz dorada perfecta. Ensayamos los movimientos el día anterior, marcamos las posiciones en el suelo con cinta y coordinamos cada disparo con el director creativo mediante auriculares. La precisión militar al servicio de la espontaneidad visual.

El resultado final fueron 847 fotografías en bruto de las cuales seleccioné 34 para edición completa. De esas 34, Vogue eligió 9 para la publicación. Cada imagen publicada representa aproximadamente 94 tomas descartadas. Eso es la fotografía editorial: un proceso de eliminación brutal en busca de la perfección.

Lo que nadie ve en una revista son las horas de preparación, los problemas resueltos en tiempo real y el trabajo en equipo que hace posible cada imagen. La fotografía es siempre una conversación entre todos los presentes.`,
      en: `When I received the call from Vogue Spain at 7 in the morning on a Tuesday, I could not believe it. I had spent three years building my editorial portfolio and that moment represented exactly the kind of project I had dreamed of since I first picked up a camera.

The session was scheduled to take place at three different locations in Madrid: an industrial studio in Lavapiés, the Retiro gardens at dawn and a rooftop in the Malasaña neighborhood. Fourteen hours of continuous work, three complete lighting changes and a team of twelve people.

The lead model, with whom I had already worked on two previous campaigns, arrived at the studio at 5 in the morning. That extra time before dawn was essential to establish the visual communication we needed. Trust between photographer and model is not improvised, it is built with patience.

The biggest technical challenge was the Retiro session. We had a window of exactly 22 minutes of perfect golden light. We rehearsed the movements the day before, marked the positions on the ground with tape and coordinated every shot with the creative director via earpieces. Military precision at the service of visual spontaneity.

The final result was 847 raw photographs from which I selected 34 for full editing. From those 34, Vogue chose 9 for publication. Each published image represents approximately 94 discarded shots. That is editorial photography: a brutal elimination process in search of perfection.

What nobody sees in a magazine are the hours of preparation, the problems solved in real time and the teamwork that makes each image possible. Photography is always a conversation between everyone present.`,
    },
  },
  {
    slug: 'fotografiar-bodas-en-italia',
    content: {
      es: `Italia tiene algo que ningún otro país del mundo puede ofrecer al fotógrafo de bodas: la superposición perfecta de historia, arquitectura, gastronomía y luz mediterránea. Cada rincón del país es un escenario natural que ha inspirado a artistas durante siglos.

La Toscana es probablemente la región más solicitada para bodas de destino. Sus cipreses en fila, las colinas ondulantes color miel y las villas del siglo XVI crean un fondo que eleva cualquier imagen. La mejor época para fotografiar aquí es de abril a junio y de septiembre a octubre, cuando la luz es dorada pero no agresiva.

Florencia presenta un desafío diferente: la densidad turística. Para las fotos en el Ponte Vecchio o frente al Duomo es imprescindible madrugar. Las 5:30 de la mañana en verano te da aproximadamente 45 minutos de luz perfecta antes de que lleguen los primeros turistas. Vale absolutamente la pena el sacrificio.

Venecia es la locación más cinematográfica y también la más logísticamente compleja. El transporte de equipos en vaporetto, las mareas que pueden cambiar el nivel del agua en horas y la humedad que afecta los equipos son variables que hay que gestionar. Mi recomendación: visita la locación 48 horas antes para identificar posibles problemas.

Para bodas en el lago de Como, el momento mágico ocurre entre las 18:00 y las 19:30 en verano. El sol cae detrás de los Alpes creando un contraluz extraordinario sobre el agua. Las villas reflejadas en el lago con esa luz son imágenes que los novios recordarán toda la vida.

Un consejo práctico que aprendí después de mi quinta boda en Italia: aprende al menos 20 palabras en italiano. La familia italiana aprecia enormemente el esfuerzo y esa pequeña conexión lingüística transforma completamente la energía del día.`,
      en: `Italy has something no other country in the world can offer the wedding photographer: the perfect overlap of history, architecture, gastronomy and Mediterranean light. Every corner of the country is a natural stage that has inspired artists for centuries.

Tuscany is probably the most sought-after region for destination weddings. Its rows of cypress trees, the honey-colored rolling hills and the 16th century villas create a backdrop that elevates any image. The best time to photograph here is April to June and September to October, when the light is golden but not aggressive.

Florence presents a different challenge: tourist density. For photos on the Ponte Vecchio or in front of the Duomo it is essential to wake up early. 5:30 in the morning in summer gives you approximately 45 minutes of perfect light before the first tourists arrive. It is absolutely worth the sacrifice.

Venice is the most cinematic location and also the most logistically complex. Transporting equipment on the vaporetto, the tides that can change the water level in hours and the humidity that affects equipment are variables that need to be managed. My recommendation: visit the location 48 hours in advance to identify potential problems.

For weddings on Lake Como, the magic moment occurs between 6:00 and 7:30 PM in summer. The sun falls behind the Alps creating an extraordinary backlight on the water. The villas reflected in the lake with that light are images the couple will remember for the rest of their lives.

A practical tip I learned after my fifth wedding in Italy: learn at least 20 words in Italian. The Italian family greatly appreciates the effort and that small linguistic connection completely transforms the energy of the day.`,
    },
  },
  {
    slug: 'equipo-2025',
    content: {
      es: `Hay una conversación que tengo constantemente con otros fotógrafos: ¿qué cámara usas? Como si el equipo fuera el secreto detrás de las imágenes. La verdad es que el equipo importa, pero mucho menos de lo que la industria quiere hacerte creer.

Mi cuerpo principal en 2025 es la Sony A7R V. La razón principal no es la resolución de 61 megapíxeles sino el sistema de autoenfoque. Para bodas y eventos donde no controlas la luz ni el movimiento, tener un sistema que rastrea ojos con precisión milimétrica cambia completamente el porcentaje de imágenes aprovechables.

El lente que más uso, con diferencia, es el Sony 35mm f/1.4 GM. Es pesado, es caro, pero la transición de enfoque a desenfoque tiene una calidad que ningún zoom puede replicar. Para retratos y momentos íntimos es incomparable. Si tuviera que elegir un solo lente para el resto de mi vida, sería este.

Para arquitectura e interiores uso el Sony 16-35mm f/2.8 GM. La distorsión en el extremo angular es mínima comparada con otros zooms gran angular y la nitidez en las esquinas es excepcional. Es el lente que más he rentabilizado en proyectos comerciales.

En iluminación artificial trabajo principalmente con dos Profoto B10 Plus. Son portátiles, tienen batería para sesiones de ocho horas y la calidad de luz es consistente disparo tras disparo. Para modificadores uso principalmente un octobox de 120cm y un reflector plateado plegable.

El elemento de mi equipo que más ha transformado mi trabajo en los últimos dos años no es una cámara ni un lente: es el monitor calibrado en mi estación de edición. Ver los colores correctamente desde el principio elimina horas de corrección y garantiza que lo que el cliente recibe es exactamente lo que yo vi en pantalla.`,
      en: `There is a conversation I constantly have with other photographers: what camera do you use? As if the equipment were the secret behind the images. The truth is that equipment matters, but much less than the industry wants you to believe.

My main body in 2025 is the Sony A7R V. The main reason is not the 61 megapixel resolution but the autofocus system. For weddings and events where you do not control the light or the movement, having a system that tracks eyes with millimeter precision completely changes the percentage of usable images.

The lens I use the most, by far, is the Sony 35mm f/1.4 GM. It is heavy, it is expensive, but the transition from focus to blur has a quality that no zoom can replicate. For portraits and intimate moments it is incomparable. If I had to choose a single lens for the rest of my life, it would be this one.

For architecture and interiors I use the Sony 16-35mm f/2.8 GM. The distortion at the wide angle end is minimal compared to other wide angle zooms and the sharpness in the corners is exceptional. It is the lens I have gotten the most return from in commercial projects.

For artificial lighting I work primarily with two Profoto B10 Plus. They are portable, have battery life for eight-hour sessions and the light quality is consistent shot after shot. For modifiers I mainly use a 120cm octobox and a foldable silver reflector.

The element of my kit that has most transformed my work in the last two years is not a camera or a lens: it is the calibrated monitor at my editing station. Seeing colors correctly from the start eliminates hours of correction and guarantees that what the client receives is exactly what I saw on screen.`,
    },
  },
  {
    slug: 'la-patagonia-desde-mi-lente',
    content: {
      es: `Hay destinos que te cambian como fotógrafo y hay destinos que te cambian como persona. La Patagonia hace ambas cosas simultáneamente y con una intensidad que ningún otro lugar del mundo ha logrado en mí.

Llegué a Punta Arenas con dos cuerpos de cámara, ocho lentes, tres trípodes y la ingenua confianza de quien cree que puede planificar la fotografía en un territorio donde el clima cambia cada veinte minutos. El viento patagónico deshace cualquier plan en cuestión de segundos.

Los primeros cinco días fueron de adaptación pura. Aprendí que en la Patagonia no fotografías lo que quieres sino lo que el territorio te permite. Las torres del Paine pueden estar completamente ocultas bajo nubes durante días y aparecer con una claridad sobrenatural durante exactamente cuarenta minutos al atardecer. La paciencia no es una virtud optativa aquí, es la habilidad técnica más importante.

El momento más extraordinario de los treinta días ocurrió en el día dieciséis, en el lago Grey. Estaba esperando desde las 4 de la mañana con temperaturas de menos ocho grados para fotografiar el amanecer sobre los glaciares. Durante dos horas y media no pasó absolutamente nada. Y entonces, en un periodo de exactamente doce minutos, el cielo se transformó en algo que nunca había visto: rosa, naranja, violeta y azul simultáneamente, reflejado en el lago inmóvil como un espejo. Disparé 340 fotografías en esos doce minutos.

La fauna patagónica requiere una aproximación completamente diferente a cualquier fotografía de naturaleza que había hecho antes. Los pumas del Torres del Paine son esquivos pero territoriales. Después de cuatro días de seguimiento con un guía local logré tres encuentros. El tercero, a menos de ocho metros, produjo la imagen que considero la mejor de mi carrera.

Volví a Madrid treinta días después con 23.000 fotografías, dos kilos menos y una comprensión completamente diferente de lo que significa estar presente en un lugar.`,
      en: `There are destinations that change you as a photographer and there are destinations that change you as a person. Patagonia does both simultaneously and with an intensity that no other place in the world has achieved in me.

I arrived in Punta Arenas with two camera bodies, eight lenses, three tripods and the naive confidence of someone who believes they can plan photography in a territory where the weather changes every twenty minutes. The Patagonian wind undoes any plan in a matter of seconds.

The first five days were pure adaptation. I learned that in Patagonia you do not photograph what you want but what the territory allows you. The Torres del Paine can be completely hidden under clouds for days and appear with supernatural clarity for exactly forty minutes at sunset. Patience is not an optional virtue here, it is the most important technical skill.

The most extraordinary moment of the thirty days occurred on day sixteen, at Lake Grey. I had been waiting since 4 in the morning in temperatures of minus eight degrees to photograph the sunrise over the glaciers. For two and a half hours absolutely nothing happened. And then, in a period of exactly twelve minutes, the sky transformed into something I had never seen: pink, orange, violet and blue simultaneously, reflected in the lake still as a mirror. I fired 340 photographs in those twelve minutes.

Patagonian wildlife requires a completely different approach to any nature photography I had done before. The pumas of Torres del Paine are elusive but territorial. After four days of tracking with a local guide I achieved three encounters. The third, at less than eight meters, produced the image I consider the best of my career.

I returned to Madrid thirty days later with 23,000 photographs, two kilos less and a completely different understanding of what it means to be present in a place.`,
    },
  },
  {
    slug: 'composicion-regla-de-tercios',
    content: {
      es: `La regla de tercios es lo primero que aprende un fotógrafo principiante y lo primero que olvida conscientemente un fotógrafo avanzado. No porque sea incorrecta, sino porque es incompleta. Es el alfabeto, no la literatura.

La regla de tercios funciona porque explota una tendencia natural del ojo humano a buscar asimetría dinámica. Cuando el sujeto principal no está centrado, el cerebro percibe tensión visual y esa tensión genera interés. Es psicología visual básica aplicada a la composición fotográfica.

Pero hay composiciones que la regla de tercios no puede explicar. La simetría perfecta, cuando se usa con intención, genera una potencia visual completamente diferente. Pienso en la arquitectura de los riad marroquíes fotografiados desde el centro exacto del patio, o en los retratos formales donde la centralidad del sujeto comunica autoridad y presencia.

El número áureo, también llamado proporción divina, aparece naturalmente en la naturaleza y en las composiciones que percibimos como más bellas. A diferencia de la regla de tercios que divide el marco en nueve partes iguales, la espiral áurea crea una jerarquía visual donde el ojo viaja desde los elementos secundarios hasta el punto de mayor interés siguiendo una trayectoria orgánica.

Las líneas guía son probablemente la herramienta compositiva más subestimada. Una carretera que converge en el horizonte, una fila de árboles, el borde de un edificio: todas estas líneas dirigen la mirada del espectador hacia donde queremos que vaya. Aprender a ver estas líneas antes de levantar la cámara es una habilidad que se desarrolla con años de práctica consciente.

Mi ejercicio favorito para fotógrafos que quieren mejorar su composición: dedica un mes a fotografiar exclusivamente en formato cuadrado. La ausencia de la decisión horizontal o vertical te obliga a pensar únicamente en términos de qué incluir y qué excluir del marco. Es la dieta más efectiva que conozco para desarrollar el ojo compositivo.`,
      en: `The rule of thirds is the first thing a beginner photographer learns and the first thing an advanced photographer consciously forgets. Not because it is wrong, but because it is incomplete. It is the alphabet, not the literature.

The rule of thirds works because it exploits a natural tendency of the human eye to seek dynamic asymmetry. When the main subject is not centered, the brain perceives visual tension and that tension generates interest. It is basic visual psychology applied to photographic composition.

But there are compositions that the rule of thirds cannot explain. Perfect symmetry, when used with intention, generates a completely different visual power. I think of the architecture of Moroccan riads photographed from the exact center of the courtyard, or formal portraits where the centrality of the subject communicates authority and presence.

The golden ratio, also called the divine proportion, appears naturally in nature and in the compositions we perceive as most beautiful. Unlike the rule of thirds which divides the frame into nine equal parts, the golden spiral creates a visual hierarchy where the eye travels from secondary elements to the point of greatest interest following an organic trajectory.

Leading lines are probably the most underrated compositional tool. A road converging on the horizon, a row of trees, the edge of a building: all these lines direct the viewer's gaze to where we want it to go. Learning to see these lines before raising the camera is a skill that develops with years of conscious practice.

My favorite exercise for photographers who want to improve their composition: spend a month photographing exclusively in square format. The absence of the horizontal or vertical decision forces you to think solely in terms of what to include and what to exclude from the frame. It is the most effective diet I know for developing the compositional eye.`,
    },
  },
]

async function migrate() {
  console.log('🚀 Migrando contenido de los 6 posts...\n')

  for (const post of POSTS_CONTENT) {
    const doc = await client.fetch(
      `*[_type == "blogPost" && slug.current == $slug][0]{ _id }`,
      { slug: post.slug }
    )

    if (!doc) {
      console.warn(`⚠️  No encontrado en Sanity: ${post.slug} — ¿corriste el primer script?`)
      continue
    }

    await client.patch(doc._id)
      .set({
        content: {
          es: toBlocks(post.content.es),
          en: toBlocks(post.content.en),
        },
      })
      .commit()

    console.log(`✅ Contenido migrado: ${post.slug}`)
  }

  console.log('\n✨ Listo. Todos los posts tienen contenido en Sanity.')
}

migrate()