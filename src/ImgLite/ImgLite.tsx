import { isMobile } from 'is-mobile'
import debounce from 'lodash/debounce'
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
import { Fit, Gravity, ImgLiteRef } from './__types'
import * as S from './ImgLite.styles'
import thumbnail from './thumbnail'

// Standard image sizes stored in our cache. [ [ height, width ] ]
const STANDARD_SIZES = [
  [256, 384],
  [378, 568],
  [512, 768],
  [597, 896],
  [682, 1024],
  [853, 1280],
  [1280, 1920],
]

const AUTO_DENSITY = isMobile() ? 1.5 : 1

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

export interface ImgLiteOwnProps {
  className?: string
  density?: number
  fit?: Fit
  gravity?: Gravity
  height?: number
  isPrintable?: boolean
  lowResQuality?: number
  lowResWidth?: number
  onError?: () => void
  onLoad?: () => void
  pulseBackground?: boolean
  quality?: number
  sharpen?: string
  sizingStep?: number
  src: string
  useOriginalFile?: boolean
  width?: number
}

export type ImgLiteProps = ImgLiteOwnProps &
  (
    | Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'children' | 'onError' | 'onLoad'>
    | React.HTMLAttributes<HTMLDivElement>
  )

function _ImgLite(
  {
    className,
    density = AUTO_DENSITY,
    fit,
    gravity,
    height,
    isPrintable = false,
    onError,
    onLoad,
    pulseBackground,
    quality,
    sharpen,
    sizingStep,
    src,
    useOriginalFile = false,
    width,
    ...otherProps
  }: ImgLiteProps,
  ref: ImgLiteRef
) {
  const [currentImage, setCurrentImage] = useState<string>()
  const imageRef = useOuterRef(ref)
  // const loading = !currentImage

  const findNextLargestSize = (height: number, width: number): { newHeight: number; newWidth: number } => {
    let newSizes = {
      newHeight: 0,
      newWidth: 0,
    }

    for (let i = 0; i < STANDARD_SIZES.length; i++) {
      const currentSize = STANDARD_SIZES[i]
      if (height <= currentSize[0] && width <= currentSize[1]) {
        newSizes.newHeight = currentSize[0]
        newSizes.newWidth = currentSize[1]
        break
      }
    }

    return newSizes
  }

  const updateCurrentImage = useCallback(() => {
    const imageElement = (imageRef as RefObject<HTMLElement>).current

    const elementHeight = imageElement ? imageElement.offsetHeight : 0
    const elementWidth = imageElement ? imageElement.offsetWidth : 0

    const maxHeight = height || elementHeight
    const maxWidth = width || elementWidth

    if (!maxHeight || !maxWidth) {
      return
    }

    const { newHeight, newWidth } = findNextLargestSize(maxHeight, maxWidth)

    const newSrc = thumbnail(src, {
      density,
      fit,
      gravity,
      height: newHeight || maxHeight,
      quality,
      sharpen,
      sizingStep,
      useOriginalFile,
      width: newWidth || maxWidth,
    })

    if (onError || onLoad) {
      const img = new Image()
      img.onerror = onError
      img.onload = onLoad
      img.src = newSrc
    }

    if (currentImage) {
      setCurrentImage(undefined)
      setTimeout(() => setCurrentImage(newSrc))
    } else {
      setCurrentImage(newSrc)
    }
  }, [
    density,
    fit,
    gravity,
    height,
    imageRef,
    onError,
    onLoad,
    quality,
    sharpen,
    sizingStep,
    src,
    useOriginalFile,
    width,
  ])

  useLayoutEffect(() => updateCurrentImage(), [updateCurrentImage])

  useEffect(() => {
    const debouncedUpdateCurrentImage = debounce(() => updateCurrentImage(), 100)
    window.addEventListener('resize', debouncedUpdateCurrentImage)

    return () => {
      window.removeEventListener('resize', debouncedUpdateCurrentImage)
    }
  }, [updateCurrentImage])

  return (
    <S.ImageBackground
      className={className}
      printable={isPrintable}
      pulseBackground={pulseBackground}
      ref={imageRef as any}
      src={currentImage}
      {...otherProps}
    />
  )
}

export default memo(forwardRef(_ImgLite))
