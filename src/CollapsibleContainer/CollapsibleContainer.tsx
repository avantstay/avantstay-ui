import React, { FC, HTMLAttributes, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

import * as S from './CollapsibleContainer.styles'

interface CollapsibleContainerProps extends HTMLAttributes<HTMLDivElement> {
  delay?: number
  isCollapsed?: boolean
}

const MINIMUM_HEIGHT_DIFFERENCE = 2

export const CollapsibleContainer: FC<CollapsibleContainerProps> = ({
  children,
  delay = 250,
  isCollapsed = false,
  ...restProps
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const setContainerHeightTimeout = useRef<number>()

  const [containerHeight, setContainerHeight] = useState(0)

  const setContainerHeightDebounced = useCallback(
    (nextHeight: number) => {
      window.clearTimeout(setContainerHeightTimeout.current)
      setContainerHeightTimeout.current = window.setTimeout(() => {
        setContainerHeight(previousHeight => {
          const heightDifference = Math.abs(previousHeight - nextHeight)
          const shouldChangeHeight = heightDifference >= MINIMUM_HEIGHT_DIFFERENCE

          return shouldChangeHeight ? nextHeight : previousHeight
        })
      }, delay)
    },
    [delay]
  )

  useEffect(() => {
    const containerElement = containerRef.current
    if (!containerElement) return

    const containerHeightObserver = new ResizeObserver(entries => {
      const nextHeight = entries[0].target.scrollHeight
      setContainerHeightDebounced(nextHeight)
    })

    containerHeightObserver.observe(containerElement)
    return () => {
      containerHeightObserver.unobserve(containerElement)
    }
  }, [setContainerHeightDebounced])

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      window.clearTimeout(setContainerHeightTimeout.current)
    }
  }, [])

  useLayoutEffect(() => {
    const containerElement = containerRef.current
    if (containerElement) {
      setContainerHeightDebounced(containerElement.scrollHeight)
    }
  }, [children, setContainerHeightDebounced])

  return (
    <S.Root {...restProps} delay={delay} height={isCollapsed ? 0 : containerHeight} ref={containerRef}>
      {children}
    </S.Root>
  )
}
