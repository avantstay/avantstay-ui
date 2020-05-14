import { isMobile } from 'is-mobile'
import debounce from 'lodash.debounce'
import queryString from 'query-string'
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import * as S from './ImgLite.styles'

type ImgLiteCrop = 'attention' | 'center' | 'entropy'

type ImgLiteProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  className?: string
  crop?: ImgLiteCrop
  density?: number
  height?: number
  lowResQuality?: number
  lowResWidth?: number
  quality?: number
  sharpen?: string
  sizingStep?: number
  src: string
  width?: number
}

interface ImgLiteThumbnailOptions {
  crop?: ImgLiteCrop
  maxHeight?: number
  maxWidth?: number
  quality?: number
  sharpen?: string
}

const AUTO_DENSITY = isMobile() ? 1.5 : 1

function getMaxSize(size: number, density = AUTO_DENSITY, sizingStep = 100) {
  return Math.ceil((size * density) / sizingStep) * sizingStep
}

function thumbnail(url: string, options: ImgLiteThumbnailOptions = {}) {
  const { crop = 'entropy', maxHeight = 0, maxWidth = 1200, quality = 85, sharpen = '1,0.3,1' } = options

  const hasUrl = !!url
  if (!hasUrl) return url

  const isBlobOrDataUrl = /^(blob|data):/i.test(url)
  if (isBlobOrDataUrl) return url

  const isSvg = /\.svg$/.test(url)
  if (isSvg) return url

  const isDevelopmentUrl = process.env.NODE_ENV === 'development' && !/^http/i.test(url)
  if (isDevelopmentUrl) return url

  const sanitizedUrl = url.replace('https://ik.imagekit.io/avantstay/', '').replace(/^\//, '')
  const baseUrl = `https://imglite.avantstay.com/${maxWidth}x${maxHeight}/${quality}/${sanitizedUrl}`

  return queryString.stringifyUrl({ url: baseUrl, query: { crop, sharpen } }, { skipEmptyString: true })
}

function ImgLite(
  {
    className,
    crop,
    density,
    height,
    lowResQuality = 30,
    lowResWidth,
    quality,
    sharpen,
    sizingStep,
    src,
    width,
    ...imageElementProps
  }: ImgLiteProps,
  ref: React.Ref<HTMLImageElement>
) {
  const imageRef = useRef<HTMLImageElement>(null)
  const imageCallbackRef = useCallback(
    (element: HTMLImageElement) => {
      const imageMutableRef = imageRef as React.MutableRefObject<HTMLImageElement>
      imageMutableRef.current = element

      if (typeof ref === 'function') {
        ref(element)
        return
      }

      if (ref !== null) {
        const mutableRef = ref as React.MutableRefObject<HTMLImageElement>
        mutableRef.current = element
      }
    },
    [ref]
  )

  const [currentImage, setCurrentImage] = useState<string>()

  const loadImage = useCallback((src) => {
    const image = new Image()
    image.onload = () => setCurrentImage(src)
    image.src = src
  }, [])

  const updateCurrentImage = useCallback(() => {
    const imageElement = imageRef.current

    const elementHeight = imageElement ? imageElement.offsetHeight : 0
    const elementWidth = imageElement ? imageElement.offsetWidth : 0

    const maxHeight = height || getMaxSize(elementHeight, density, sizingStep)
    const maxWidth = width || getMaxSize(elementWidth, density, sizingStep)
    if (!maxHeight || !maxWidth) return

    const thumbnailOptions = { crop, maxHeight, maxWidth, quality, sharpen }
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
  }, [crop, currentImage, density, height, loadImage, lowResQuality, lowResWidth, quality, sharpen, sizingStep, src, width])

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

  return <S.Image className={className} ref={imageCallbackRef} src={currentImage} {...imageElementProps} />
}

export default React.memo(React.forwardRef(ImgLite))
