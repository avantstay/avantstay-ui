import queryString from 'query-string'
import { ImgLiteThumbnailOptions } from '../ImgLite/__types'
import { checkWebPSupport } from 'supports-webp-sync'

const hasWebPSupport = checkWebPSupport()

export default function (url: string, options: ImgLiteThumbnailOptions = {}) {
  const isLocalFile =
    globalThis && globalThis.location && /localhost/.test(globalThis.location.host) && url && !/^http/i.test(url)
  const isBlobOrDataUrl = url && /^(blob|data):/i.test(url)
  const isSvg = url && /\.svg$/.test(url)

  if (!url || isLocalFile || isSvg || isBlobOrDataUrl) {
    return url
  }

  // temporary removal of ImageKit url part
  const sanitizedUrl = url.replace('https://ik.imagekit.io/avantstay/', '').replace(/^\//, '')
  const baseUrl = `https://imglite.avantstay.com/${encodeURIComponent(sanitizedUrl)}`

  return queryString.stringifyUrl(
    {
      url: baseUrl,
      query: {
        ...options,
        webp: hasWebPSupport,
      } as any,
    },
    { skipEmptyString: true }
  )
}
