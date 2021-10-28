import queryString from 'query-string'
import { ImgLiteThumbnailOptions } from '../__types'

export default thumbnail

const serverUrl = process.env.IMG_LITE_SERVER_URL || 'https://cdn.avantstay.dev/'

function thumbnail(url: string, { density = 1, height = 0, width = 0, ...restOptions }: ImgLiteThumbnailOptions = {}) {
  const heightStep = getSizingStep(height)
  const widthStep = getSizingStep(width)

  const isLocalhost = /localhost/.test(globalThis?.location?.host ?? '')
  const isLocalFile = isLocalhost && url && !/^http/i.test(url)
  const isBlobOrDataUrl = url && /^(blob|data):/i.test(url)
  const isSvg = url && /\.svg$/.test(url)

  if (!url || isLocalFile || isSvg || isBlobOrDataUrl) {
    return url
  }

  const _height = height
    ? {
        'size[height]': Math.round(density * Math.ceil(height / heightStep) * heightStep),
      }
    : {}
  const _width = width
    ? {
        'size[width]': Math.round(density * Math.ceil(width / widthStep) * widthStep),
      }
    : {}

  return queryString.stringifyUrl(
    {
      url: serverUrl,
      query: {
        ...restOptions,
        ..._height,
        ..._width,
        image_address: getImageAddress(url),
      } as any,
    },
    { skipEmptyString: true }
  )
}

function getImageAddress(url: string) {
  const isHttpUrl = /^http/i.test(url)

  if (isHttpUrl) {
    return url
  }

  const origin = globalThis && globalThis.location ? globalThis.location.origin : ''

  if (!origin) {
    return url
  }

  return new URL(url, origin).toString()
}

function getSizingStep(size: number) {
  const minStep = 10
  const firstThreshold = 200

  if (size < firstThreshold) {
    return 1
  }

  return Math.max(minStep, minStep * 2 ** (1 + Math.ceil(Math.log(size / firstThreshold) / Math.log(2))))
}
