/**
 * Proxy a la screenshot-api (CapRover o local).
 * Las cards de proyectos usan /api/screenshot?url=...; si falla, el componente muestra placeholder.
 * En producción: SCREENSHOT_API_URL=https://screenshot-api.apps.jhonnycarpenito.com
 */
const SCREENSHOT_API = process.env.SCREENSHOT_API_URL || 'http://localhost:4000'

export default defineEventHandler(async (event) => {
  const url = getQuery(event).url as string
  if (!url || typeof url !== 'string') {
    throw createError({ statusCode: 400, message: 'Query "url" is required' })
  }

  const previewUrl = `${SCREENSHOT_API}/screenshot?url=${encodeURIComponent(url)}&width=800&height=500&format=jpeg`

  try {
    const response = await fetch(previewUrl, {
      headers: { Accept: 'image/jpeg' },
    })

    if (!response.ok) {
      throw new Error(`Screenshot API responded with ${response.status}`)
    }

    const contentType = response.headers.get('content-type') || ''
    if (!contentType.includes('image/')) {
      throw new Error(`Screenshot API returned non-image: ${contentType}`)
    }

    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    if (buffer.length < 3 || buffer[0] !== 0xff || buffer[1] !== 0xd8 || buffer[2] !== 0xff) {
      throw new Error('Response is not a valid JPEG')
    }

    return new Response(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=86400',
      },
    })
  } catch (e) {
    console.error('[screenshot]', e)
    throw createError({
      statusCode: 502,
      message: 'No se pudo generar la vista previa',
    })
  }
})
