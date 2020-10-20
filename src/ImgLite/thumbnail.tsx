import queryString from 'query-string'
import { ImgLiteThumbnailOptions } from './__types'
import { checkWebPSupport } from 'supports-webp-sync'

const hasWebPSupport = checkWebPSupport()

export default function (
  url: string,
  { sizingStep, density = 1, width = 0, height = 0, ...options }: ImgLiteThumbnailOptions = {}
) {
  const isLocalFile =
    globalThis && globalThis.location && /localhost/.test(globalThis.location.host) && url && !/^http/i.test(url)
  const isBlobOrDataUrl = url && /^(blob|data):/i.test(url)
  const isSvg = url && /\.svg$/.test(url)

  if (!url || isLocalFile || isSvg || isBlobOrDataUrl) {
    return url
  }

  const baseUrl = `https://imglite.avantstay.com/${encodeURIComponent(url)}`
  const biggestDim = Math.max.call(null, width, height)
  const _sizingStep = sizingStep || biggestDim < 1000 ? 100 : 200

  return queryString.stringifyUrl(
    {
      url: baseUrl,
      query: {
        ...options,
        ...(width ? { width: density * Math.ceil(width / _sizingStep) * _sizingStep } : {}),
        ...(height ? { height: density * Math.ceil(height / _sizingStep) * _sizingStep } : {}),
        webp: hasWebPSupport,
      } as any,
    },
    { skipEmptyString: true }
  )
}
