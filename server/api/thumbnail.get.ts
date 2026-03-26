import crypto from 'node:crypto'

function sha256(buf: Buffer) {
  return crypto.createHash('sha256').update(buf).digest('hex')
}

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const SCREENSHOT_API =
    typeof runtimeConfig.screenshotApiUrl === 'string' ? runtimeConfig.screenshotApiUrl : 'http://localhost:4000'
  const SCREENSHOT_API_KEY = typeof runtimeConfig.screenshotApiKey === 'string' ? runtimeConfig.screenshotApiKey : ''

  const q = getQuery(event)
  const url = q.url as string
  if (!url || typeof url !== 'string') {
    throw createError({ statusCode: 400, message: 'Query "url" is required' })
  }

  const width = Number(q.width || 800)
  const height = Number(q.height || 500)
  const format = q.format === 'png' ? 'png' : 'jpeg'
  const fullPage = q.fullPage === 'true'

  const base = new URL(`${SCREENSHOT_API}/screenshot`)
  base.searchParams.set('url', url)
  base.searchParams.set('width', String(width))
  base.searchParams.set('height', String(height))
  base.searchParams.set('format', format)
  base.searchParams.set('fullPage', String(fullPage))

  const cacheFirstUrl = base.toString()

  // 1) Respuesta rápida (cache-first)
  const response = await fetch(cacheFirstUrl, { headers: { Accept: format === 'png' ? 'image/png' : 'image/jpeg' } })
  if (!response.ok) {
    throw createError({ statusCode: 502, message: `Screenshot API responded with ${response.status}` })
  }

  const contentType = response.headers.get('content-type') || ''
  if (!contentType.includes('image/')) {
    throw createError({ statusCode: 502, message: `Screenshot API returned non-image: ${contentType}` })
  }

  const ab = await response.arrayBuffer()
  const buffer = Buffer.from(ab)

  // 2) Refresh en background (no bloquea la respuesta)
  const cacheHash = sha256(buffer)
  if (SCREENSHOT_API_KEY) {
    setImmediate(() => {
      void (async () => {
        try {
          const refreshUrl = new URL(cacheFirstUrl)
          refreshUrl.searchParams.set('refresh', 'true')

          const refreshRes = await fetch(refreshUrl.toString(), {
            headers: {
              Accept: format === 'png' ? 'image/png' : 'image/jpeg',
              'X-API-Key': SCREENSHOT_API_KEY,
            },
          })
          if (!refreshRes.ok) return
          const refreshBuf = Buffer.from(await refreshRes.arrayBuffer())
          const refreshHash = sha256(refreshBuf)
          // Si difiere, el caché del screenshot-api ya fue actualizado por refresh.
          // No hacemos push al cliente en vivo; la próxima carga verá la imagen nueva.
          if (refreshHash !== cacheHash) {
            // noop (quedará actualizado en backend)
          }
        } catch (e) {
          console.error('[thumbnail][refresh]', e)
        }
      })()
    })
  }

  return new Response(new Uint8Array(buffer), {
    headers: {
      'Content-Type': format === 'png' ? 'image/png' : 'image/jpeg',
      'Cache-Control': 'public, max-age=86400',
      'ETag': `"${cacheHash}"`,
    },
  })
})

