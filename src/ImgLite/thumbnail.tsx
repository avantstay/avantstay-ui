import queryString from 'query-string'
import { checkWebPSupport } from 'supports-webp-sync'
import { ImgLiteThumbnailOptions } from './__types'

const hasWebPSupport = checkWebPSupport()

function getImageAddress(url: string) {
  const isHttpUrl = /^http/i.test(url)
  if (isHttpUrl) return url

  const origin = globalThis && globalThis.location ? globalThis.location.origin : ''
  if (!origin) return url

  const hasInitialSlash = /^\//.test(url)
  return `${origin}${hasInitialSlash ? '' : '/'}${url}`
}

export default function (
  url: string,
  { density = 1, height = 0, sizingStep, useOriginalFile = false, width = 0, ...options }: ImgLiteThumbnailOptions = {}
) {
  const isLocalhost = globalThis && globalThis.location && /localhost/.test(globalThis.location.host)
  const isLocalFile = isLocalhost && url && !/^http/i.test(url)
  const isBlobOrDataUrl = url && /^(blob|data):/i.test(url)
  const isSvg = url && /\.svg$/.test(url)

  if (!url || isLocalFile || isSvg || isBlobOrDataUrl || useOriginalFile) {
    return url
  }

  const biggestDim = Math.max.call(null, width, height)
  const _sizingStep = sizingStep === 1 ? 1 : sizingStep || biggestDim < 1000 ? 100 : 200

  return queryString.stringifyUrl(
    {
      url: 'https://cdn.avantstay.dev/',
      query: {
        ...options,
        ...(hasWebPSupport ? { format: 'Webp' } : {}),
        ...(height ? { 'size[height]': Math.round(density * Math.ceil(height / _sizingStep) * _sizingStep) } : {}),
        ...(width ? { 'size[width]': Math.round(density * Math.ceil(width / _sizingStep) * _sizingStep) } : {}),
        image_address: getImageAddress(url),
      } as any,
    },
    { skipEmptyString: true }
  )
}
