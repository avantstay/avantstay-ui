import { isMobile } from 'is-mobile'
import debounce from 'lodash.debounce'
import queryString from 'query-string'
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import warning from 'tiny-warning'
import isUriEncoded from '../utils/isUriEncoded'
import * as S from './ImgLite.styles'

type ImgLiteGravity =
  | 'attention'
  | 'center'
  | 'centre'
  | 'east'
  | 'entropy'
  | 'north'
  | 'northeast'
  | 'northwest'
  | 'south'
  | 'southeast'
  | 'southwest'
  | 'west'

type ImgLiteCrop = ImgLiteGravity
type ImgLiteFit = 'contain' | 'cover' | 'fill' | 'inside' | 'outside'

export interface ImgLiteOwnProps {
  className?: string
  crop?: ImgLiteCrop
  density?: number
  fit?: ImgLiteFit
  gravity?: ImgLiteGravity
  height?: number
  lowResQuality?: number
  lowResWidth?: number
  quality?: number
  sharpen?: string
  sizingStep?: number
  src: string
  width?: number
}

type ImgLiteProps =
  | (React.ImgHTMLAttributes<HTMLImageElement> & ImgLiteOwnProps)
  | (React.HTMLAttributes<HTMLDivElement> & ImgLiteOwnProps & { children: React.ReactNode })

interface ImgLiteThumbnailOptions {
  fit?: ImgLiteFit
  gravity?: ImgLiteGravity
  height?: number
  quality?: number
  sharpen?: string
  width?: number
}

const AUTO_DENSITY = isMobile() ? 1.5 : 1

function createCallbackRef<T, U>(ref: React.Ref<T>, internalRef: React.Ref<T>, internalRefToClear: React.Ref<U | null>) {
  return (element: T | null) => {
    const internalMutableRef = internalRef as React.MutableRefObject<T | null>
    internalMutableRef.current = element

    const internalMutableRefToClear = internalRefToClear as React.MutableRefObject<U | null>
    internalMutableRefToClear.current = null

    if (typeof ref === 'function') {
      ref(element)
      return
    }

    if (ref !== null) {
      const mutableRef = ref as React.MutableRefObject<T | null>
      mutableRef.current = element
    }
  }
}

function getMaxSize(size: number, density = AUTO_DENSITY, sizingStep = 100) {
  return Math.ceil((size * density) / sizingStep) * sizingStep
}

function sanitizeUrl(url: string) {
  return url.replace('https://ik.imagekit.io/avantstay/', '').replace(/^\//, '')
}

function thumbnail(url: string, options: ImgLiteThumbnailOptions = {}) {
  const { fit = 'cover', gravity = 'entropy', height, quality = 85, sharpen = '1,0.3,1', width } = options

  // When there is no URL, do nothing
  if (url === '') return url

  // When the image is a blob or data, do nothing
  if (/^(blob|data):/i.test(url)) return url

  // When it is a vector image, do nothing (no need to resize)
  if (/\.svg$/.test(url)) return url

  // When it is using a local url in development environment, do nothing
  if (process.env.NODE_ENV === 'development' && !/^http/i.test(url)) return url

  const sanitizedUrl = sanitizeUrl(url)
  const urlEncoded = isUriEncoded(sanitizedUrl) ? sanitizedUrl : encodeURIComponent(sanitizedUrl)
  const baseUrl = `https://imglite.avantstay.com/${urlEncoded}`

  const heightStringified = typeof height === 'number' ? height.toString(10) : ''
  const qualityStringified = quality.toString(10)
  const widthStringified = typeof width === 'number' ? width.toString(10) : ''

  return queryString.stringifyUrl(
    {
      url: baseUrl,
      query: { fit, gravity, height: heightStringified, quality: qualityStringified, sharpen, width: widthStringified },
    },
    { skipEmptyString: true }
  )
}

function ImgLite(
  {
    children,
    crop,
    density,
    fit,
    height,
    lowResQuality = 30,
    lowResWidth,
    gravity,
    quality,
    sharpen,
    sizingStep,
    src,
    width,
    ...elementProps
  }: ImgLiteProps,
  ref: React.Ref<HTMLDivElement> | React.Ref<HTMLImageElement>
) {
  warning(!crop, 'crop property on ImgLite is going to be deprecated in a next major. Use gravity instead.')

  const divRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const divCallbackRef = useMemo(() => createCallbackRef(ref, divRef, imageRef), [ref])
  const imageCallbackRef = useMemo(() => createCallbackRef(ref, imageRef, divRef), [ref])

  const [currentImage, setCurrentImage] = useState<string>()

  const loadImage = useCallback((src) => {
    const image = new Image()
    image.onload = () => setCurrentImage(src)
    image.src = src
  }, [])

  const updateCurrentImage = useCallback(() => {
    const imageElement = divRef.current || imageRef.current

    const elementHeight = imageElement ? imageElement.offsetHeight : 0
    const elementWidth = imageElement ? imageElement.offsetWidth : 0

    const maxHeight = height || getMaxSize(elementHeight, density, sizingStep)
    const maxWidth = width || getMaxSize(elementWidth, density, sizingStep)
    if (!maxHeight || !maxWidth) return

    const thumbnailOptions = { fit, gravity: gravity || crop, height: maxHeight, quality, sharpen, width: maxWidth }
    const newSrc = thumbnail(src, thumbnailOptions)

    if (currentImage) {
      loadImage(newSrc)
      return
    }

    if (lowResWidth) {
      const lowResolutionThumbnailOptions = {
        ...thumbnailOptions,
        maxHeight: undefined,
        maxWidth: lowResWidth,
        quality: lowResQuality,
      }

      setCurrentImage(thumbnail(src, lowResolutionThumbnailOptions))
      loadImage(newSrc)
      return
    }

    setCurrentImage(newSrc)
  }, [
    crop,
    currentImage,
    density,
    fit,
    gravity,
    height,
    loadImage,
    lowResQuality,
    lowResWidth,
    quality,
    sharpen,
    sizingStep,
    src,
    width,
  ])

  useLayoutEffect(() => {
    updateCurrentImage()
  }, [updateCurrentImage])

  useEffect(() => {
    const debouncedUpdateCurrentImage = debounce(updateCurrentImage, 200)
    window.addEventListener('resize', debouncedUpdateCurrentImage)

    return () => {
      window.removeEventListener('resize', debouncedUpdateCurrentImage)
    }
  }, [updateCurrentImage])

  return children ? (
    <S.Background ref={divCallbackRef} src={currentImage} {...elementProps}>
      {children}
    </S.Background>
  ) : (
    <S.Image ref={imageCallbackRef} src={currentImage} {...elementProps} />
  )
}

export default React.memo(React.forwardRef(ImgLite))
