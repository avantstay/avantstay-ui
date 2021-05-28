import { isMobile } from 'is-mobile'
import debounce from 'lodash/debounce'
import * as React from 'react'
import ResizeObserver from 'resize-observer-polyfill'
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

  const mutableRef = ref as React.MutableRefObject<any>
  mutableRef.current = value
}

function useOuterRef<E, T extends React.Ref<E>>(externalRef: T) {
  return React.useMemo((): React.Ref<E> => {
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

interface Dimensions {
  width: number
  height: number
}

export type ImgLiteProps = ImgLiteOwnProps &
  (
    | Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'children' | 'onError' | 'onLoad'>
    | React.HTMLAttributes<HTMLDivElement>
  )

const shouldSkipReloading = (newDimensions: Dimensions, dimensions?: Dimensions) => {
  if (!dimensions) {
    return false
  }
  // skip on scaling image container down
  // browser should reuse already loaded (bigger) image
  if (newDimensions.width <= dimensions.width && newDimensions.height <= dimensions.height) {
    return true
  }
  // skip on resizing less than 10%
  // useful for example when we have full scree image and there is scrollbar appearing during page load
  if (
    Math.abs(newDimensions.width - dimensions.width) / dimensions.width < 0.1 &&
    Math.abs(newDimensions.height - dimensions.height) / dimensions.height < 0.1
  ) {
    return true
  }

  return false
}

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
  const [currentImage, setCurrentImage] = React.useState<string>()
  const imageRef = useOuterRef(ref)
  const [dimensions, setDimensions] = React.useState<Dimensions | undefined>(undefined)

  const updateCurrentImage = React.useCallback(() => {
    const imageElement = (imageRef as React.RefObject<HTMLElement>).current

    const elementHeight = imageElement ? imageElement.offsetHeight : 0
    const elementWidth = imageElement ? imageElement.offsetWidth : 0

    const maxHeight = height || elementHeight
    const maxWidth = width || elementWidth

    if (!maxHeight || !maxWidth) {
      return
    }

    const { newHeight, newWidth } = findNextLargestSize(maxHeight, maxWidth)

    const useStandardSize = src.includes('amazonaws.com/homes/') && !!newHeight && !!newWidth

    const newDimensions: Dimensions = {
      width: useStandardSize ? newWidth : maxWidth,
      height: useStandardSize ? newHeight : maxHeight,
    }

    if (shouldSkipReloading(newDimensions, dimensions)) {
      return
    }

    setDimensions(newDimensions)

    const newSrc = thumbnail(src, {
      density,
      fit,
      gravity,
      height: newDimensions.height,
      quality,
      sharpen,
      sizingStep: useStandardSize ? 1 : sizingStep,
      useOriginalFile,
      width: newDimensions.width,
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
    dimensions,
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

  React.useLayoutEffect(updateCurrentImage, [updateCurrentImage])

  React.useEffect(() => {
    const imageElement = (imageRef as React.RefObject<HTMLElement>).current

    if (imageElement === null) return

    const debouncedUpdateCurrentImage = debounce(updateCurrentImage, 100)
    const observer = new ResizeObserver(debouncedUpdateCurrentImage)

    observer.observe(imageElement)
    return () => observer.unobserve(imageElement)
  }, [imageRef, updateCurrentImage])

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

export const ImgLite = React.memo(React.forwardRef(_ImgLite))
