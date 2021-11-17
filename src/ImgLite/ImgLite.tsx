import debounce from 'lodash/debounce'
import * as React from 'react'
import { MutableRefObject, RefObject, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Fit, Gravity } from './__types'
import { useImgLiteStyles } from './ImgLite.styles'
import thumbnail from './utils/thumbnail'

type ImgLiteElement = HTMLDivElement | HTMLImageElement

export interface ImgLiteOwnProps {
  className?: string
  density?: number
  fit?: Fit
  gravity?: Gravity
  isPrintable?: boolean
  lowResQuality?: number
  lowResWidth?: number
  onError?: () => void
  onLoad?: () => void
  pulseBackground?: boolean
  quality?: number
  sharpen?: string
  src: string
  height?: number | string
  width?: number | string
  /**
   * @deprecated
   */
  ssrWidth?: number
  /**
   * @deprecated
   */
  ssrHeight?: number
  children?: React.ReactNode
}

export type ImgLiteProps = ImgLiteOwnProps &
  (
    | Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'children' | 'onError' | 'onLoad'>
    | Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>
  )

const SIGNIFICANT_SIZE_CHANGE = 0.1
const isServerSide = globalThis.document === undefined

const useIsomorphicLayoutEffect = isServerSide ? useEffect : useLayoutEffect

function getDevicePixelRation() {
  return globalThis.devicePixelRatio || 1
}

function shouldUpdateDimensions({
  width,
  height,
  newWidth,
  newHeight,
}: {
  width: number
  height: number
  newWidth: number
  newHeight: number
}) {
  const didGrow = newWidth > width || newHeight > height
  const didChangeSignificantly =
    Math.abs(newWidth - width) / width > SIGNIFICANT_SIZE_CHANGE ||
    Math.abs(newHeight - height) / height > SIGNIFICANT_SIZE_CHANGE

  return !width || !height || (didGrow && didChangeSignificantly)
}

function ImgLite_(props: ImgLiteProps, ref: React.Ref<ImgLiteElement>) {
  const {
    density = getDevicePixelRation(),
    fit,
    gravity,
    height,
    width,
    ssrWidth,
    ssrHeight,
    isPrintable = false,
    onError,
    onLoad,
    pulseBackground,
    quality,
    sharpen,
    src,
    children,
    ...otherProps
  } = props

  const imageRef = useMemo(() => {
    if (ref && typeof ref === 'function') {
      throw new Error('You cannot use ref functions with ImgLite')
    }

    return (ref || React.createRef<ImgLiteElement>()) as RefObject<ImgLiteElement>
  }, [ref])

  const [liteSrc, setLiteSrc] = useState('')

  const [measuredWidth, setMeasuredWidth] = useState(0)
  const [measuredHeight, setMeasuredHeight] = useState(0)

  const updateDimensionsRef = useRef<() => void>(null) as MutableRefObject<() => void>

  updateDimensionsRef.current = () => {
    const newWidth = imageRef.current!.offsetWidth
    const newHeight = imageRef.current!.offsetHeight
    const isVisible = imageRef.current?.getAttribute('data-imglite-visible') === 'true'

    if (!isServerSide && isVisible && (newHeight === 0 || newWidth === 0)) {
      console.error('[ImgLite] The following image container should have positive height and width:', imageRef.current)
    }

    const shouldUpdate = shouldUpdateDimensions({
      width: measuredWidth,
      height: measuredHeight,
      newWidth,
      newHeight,
    })

    if (shouldUpdate) {
      setMeasuredWidth(newWidth)
      setMeasuredHeight(newHeight)
    }
  }

  const updateLiteSrc = useCallback(
    ({ width, height }: { width: number; height: number }) => {
      const newLiteSrc = thumbnail(src, {
        height,
        width,
        density,
        fit,
        gravity,
        quality,
        sharpen,
      })

      if (!liteSrc) {
        setLiteSrc(newLiteSrc)
      } else {
        const newImg = new Image()
        newImg.src = newLiteSrc
        newImg.addEventListener('load', () => {
          setLiteSrc(newLiteSrc)
        })
      }
    },
    [src, density, fit, gravity, quality, sharpen, liteSrc]
  )

  const uniqueId = useImgLiteStyles({
    isPrintable,
    liteSrc,
    width,
    height,
    pulseBackground,
    children,
  })

  useIsomorphicLayoutEffect(() => {
    const resizeObserver = new ResizeObserver(debounce(() => updateDimensionsRef.current?.(), 100))
    resizeObserver.observe(imageRef.current!)

    updateDimensionsRef.current?.()

    return () => {
      resizeObserver.disconnect()
    }
  }, [imageRef, updateDimensionsRef])

  useEffect(() => {
    if (measuredWidth && measuredHeight) {
      updateLiteSrc({
        width: measuredWidth,
        height: measuredHeight,
      })
    }
  }, [measuredHeight, measuredWidth, updateLiteSrc])

  useEffect(() => {
    imageRef.current?.setAttribute('data-imglite-id', uniqueId)
  }, [uniqueId, imageRef])

  useIsomorphicLayoutEffect(() => {
    let intersectionObserver: IntersectionObserver

    if ('IntersectionObserver' in globalThis && imageRef.current) {
      intersectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const imgLiteElement = entry.target
            imgLiteElement.setAttribute('data-imglite-visible', 'true')
            intersectionObserver.unobserve(imgLiteElement)
          }
        })
      })

      intersectionObserver.observe(imageRef.current)
    } else if (imageRef.current) {
      imageRef.current?.setAttribute('data-imglite-visible', 'true')
    }

    return () => {
      intersectionObserver.disconnect()
    }
  }, [])

  if (isServerSide && !liteSrc && (Number.isFinite(height) || ssrHeight) && (Number.isFinite(width) || ssrWidth)) {
    updateLiteSrc({
      height: ssrHeight || (height as number),
      width: ssrWidth || (width as number),
    })
  }

  return (
    <div
      ref={imageRef}
      data-imglite-id={uniqueId}
      {...(isServerSide ? { style: { width, height } } : {})}
      {...otherProps}
      suppressHydrationWarning
    >
      {children}
    </div>
  )
}

export const ImgLite = React.forwardRef(ImgLite_)
