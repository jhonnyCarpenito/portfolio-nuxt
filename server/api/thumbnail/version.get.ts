import crypto from 'node:crypto'

function sha256(buf: Buffer) {
  return crypto.createHash('sha256').update(buf).digest('hex')
}

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const SCREENSHOT_API =
    typeof runtimeConfig.screenshotApiUrl === 'string' ? runtimeConfig.screenshotApiUrl : 'http://localhost:4000'

  const q = getQuery(event)
  const url = q.url as string
  if (!url || typeof url !== 'string') {
    throw createError({ statusCode: 400, message: 'Query "url" is required' })
  }

  const width = Number(q.width || 800)
  const height = Number(q.height || 500)
  const format = q.format === 'png' ? 'png' : 'jpeg'
  const fullPage = q.fullPage === 'true'

  const shotUrl = new URL(`${SCREENSHOT_API}/screenshot`)
  shotUrl.searchParams.set('url', url)
  shotUrl.searchParams.set('width', String(width))
  shotUrl.searchParams.set('height', String(height))
  shotUrl.searchParams.set('format', format)
  shotUrl.searchParams.set('fullPage', String(fullPage))

  const res = await fetch(shotUrl.toString(), {
    headers: { Accept: format === 'png' ? 'image/png' : 'image/jpeg' },
  })
  if (!res.ok) {
    throw createError({ statusCode: 502, message: `Screenshot API responded with ${res.status}` })
  }
  const buf = Buffer.from(await res.arrayBuffer())

  return { hash: sha256(buf) }
})

