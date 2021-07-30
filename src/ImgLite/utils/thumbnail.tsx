import queryString from 'query-string'
import { checkWebPSupport } from 'supports-webp-sync'

import { ImgLiteThumbnailOptions } from '../__types'

const hasWebPSupport = checkWebPSupport()

function getImageAddress(url: string) {
  const isHttpUrl = /^http/i.test(url)
  if (isHttpUrl) return url

  const origin = globalThis && globalThis.location ? globalThis.location.origin : ''
  if (!origin) return url

  const hasInitialSlash = /^\//.test(url)
  return `${origin}${hasInitialSlash ? '' : '/'}${url}`
}

export default function (url: string, options: ImgLiteThumbnailOptions = {}) {
  const { density = 1, height = 0, sizingStep = 10, useOriginalFile = false, width = 0, ...restOptions } = options

  const isLocalhost = globalThis && globalThis.location && /localhost/.test(globalThis.location.host)
  const isLocalFile = isLocalhost && url && !/^http/i.test(url)
  const isBlobOrDataUrl = url && /^(blob|data):/i.test(url)
  const isSvg = url && /\.svg$/.test(url)

  if (!url || isLocalFile || isSvg || isBlobOrDataUrl || useOriginalFile) {
    return url
  }

  return queryString.stringifyUrl(
    {
      url: 'https://cdn.avantstay.dev/',
      query: {
        ...restOptions,
        ...(hasWebPSupport ? { format: 'Webp' } : {}),
        ...(height ? { 'size[height]': Math.round(density * Math.ceil(height / sizingStep) * sizingStep) } : {}),
        ...(width ? { 'size[width]': Math.round(density * Math.ceil(width / sizingStep) * sizingStep) } : {}),
        image_address: getImageAddress(url),
      } as any,
    },
    { skipEmptyString: true }
  )
}
