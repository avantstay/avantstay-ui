import { isMobile } from 'is-mobile'
import debounce from 'lodash/debounce'
import queryString from 'query-string'
import React, {
  forwardRef,
  memo,
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'
import { Fit, Gravity, ImgLiteRef, ImgLiteThumbnailOptions } from './__types'
import * as S from './ImgLite.styles'

const AUTO_DENSITY = isMobile() ? 1.5 : 1

function getMaxSize(size: number, density = AUTO_DENSITY, sizingStep = 100) {
  return Math.ceil((size * density) / sizingStep) * sizingStep
}

function thumbnail(url: string, options: ImgLiteThumbnailOptions = {}) {
  const isDevelopment = process.env.NODE_ENV === 'development' && url && !/^http/i.test(url)
  const isBlobOrDataUrl = url && /^(blob|data):/i.test(url)
  const isSvg = url && /\.svg$/.test(url)

  if (!url || isDevelopment || isSvg || isBlobOrDataUrl) {
    return url
  }

  // temporary removal of ImageKit url part
  const sanitizedUrl = url.replace('https://ik.imagekit.io/avantstay/', '').replace(/^\//, '')
  const baseUrl = `https://imglite.avantstay.com/${encodeURIComponent(sanitizedUrl)}`

  return queryString.stringifyUrl({ url: baseUrl, query: options as any }, { skipEmptyString: true })
}

function setRefCurrent(ref: React.Ref<any>, value: any) {
  if (!ref) return

  const mutableRef = ref as MutableRefObject<any>
  mutableRef.current = value
}

function useOuterRef<E, T extends React.Ref<E>>(externalRef: T) {
  return useMemo((): React.Ref<E> => {
    const internalRef = ((element: E) => {
      setRefCurrent(internalRef, element)

      if (typeof externalRef === 'function') {
        ;(externalRef as React.RefCallback<E>)(element)
      } else {
        setRefCurrent(externalRef, element)
      }
    }) as React.Ref<E>

    setRefCurrent(internalRef, null)

    return internalRef
  }, [externalRef])
}

const supportsWebP = (() => {
  return new Promise<boolean>(resolve => {
    const WebP = new Image()
    WebP.onload = WebP.onerror = () => resolve(WebP.height === 2)
    WebP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
  })
})()

export interface ImgLiteOwnProps {
  className?: string
  fit?: Fit
  gravity?: Gravity
  density?: number
  height?: number
  lowResQuality?: number
  lowResWidth?: number
  quality?: number
  sharpen?: string
  sizingStep?: number
  src: string
  width?: number
  pulseBackground?: boolean
}

export type ImgLiteProps = ImgLiteOwnProps &
  (Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'children'> | React.HTMLAttributes<HTMLDivElement>)

function _ImgLite(
  {
    fit,
    gravity,
    density,
    height,
    quality,
    sharpen,
    sizingStep,
    src,
    width,
    className,
    pulseBackground,
    ...otherProps
  }: ImgLiteProps,
  ref: ImgLiteRef
) {
  const [currentImage, setCurrentImage] = useState<string>()
  const imageRef = useOuterRef(ref)
  const loading = !currentImage

  const updateCurrentImage = useCallback(() => {
    supportsWebP.then(webp => {
      const imageElement = (imageRef as RefObject<HTMLElement>).current

      const elementHeight = imageElement ? imageElement.offsetHeight : 0
      const elementWidth = imageElement ? imageElement.offsetWidth : 0

      const maxHeight = height || getMaxSize(elementHeight, density, sizingStep)
      const maxWidth = width || getMaxSize(elementWidth, density, sizingStep)

      if (!maxHeight || !maxWidth) {
        return
      }

      const thumbnailOptions = {
        fit,
        webp,
        gravity,
        height: maxHeight,
        width: maxWidth,
        quality,
        sharpen,
      }

      const newSrc = thumbnail(src, thumbnailOptions)

      if (currentImage) {
        setCurrentImage(undefined)
        setTimeout(() => setCurrentImage(newSrc))
      } else {
        setCurrentImage(newSrc)
      }
    })
  }, [density, fit, gravity, height, imageRef, quality, sharpen, sizingStep, src, width])

  useLayoutEffect(() => updateCurrentImage(), [updateCurrentImage])

  useEffect(() => {
    const debouncedUpdateCurrentImage = debounce(() => updateCurrentImage(), 200)
    window.addEventListener('resize', debouncedUpdateCurrentImage)

    return () => {
      window.removeEventListener('resize', debouncedUpdateCurrentImage)
    }
  }, [updateCurrentImage])

  const ImageComponent = loading || ('children' in otherProps && otherProps.children) ? S.Background : S.Image

  return (
    <ImageComponent
      className={className}
      pulseBackground={pulseBackground}
      ref={imageRef as any}
      src={currentImage}
      {...otherProps}
    />
  )
}

export default memo(forwardRef(_ImgLite))
