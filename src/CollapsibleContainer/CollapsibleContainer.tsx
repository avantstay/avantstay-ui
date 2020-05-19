import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import ResizeObserver from 'resize-observer-polyfill'
import * as S from './CollapsibleContainer.styles'

type CollapsibleContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
  className?: string
  isCollapsed?: boolean
}

const MINIMUM_HEIGHT_DIFFERENCE = 2

function CollapsibleContainer({ children, isCollapsed = false, ...restProps }: CollapsibleContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const [containerHeight, setContainerHeight] = useState(0)

  const setContainerHeightByAtLeastMinimumValue = useCallback((nextHeight) => {
    setContainerHeight((previousHeight) => {
      const heightDifference = Math.abs(previousHeight - nextHeight)
      const shouldChangeHeight = heightDifference >= MINIMUM_HEIGHT_DIFFERENCE

      return shouldChangeHeight ? nextHeight : previousHeight
    })
  }, [])

  useEffect(() => {
    const containerElement = containerRef.current
    if (!containerElement) return

    const containerHeightObserver = new ResizeObserver((entries) => {
      const nextHeight = entries[0].target.scrollHeight
      setContainerHeightByAtLeastMinimumValue(nextHeight)
    })

    containerHeightObserver.observe(containerElement)
    return () => {
      containerHeightObserver.unobserve(containerElement)
    }
  }, [setContainerHeightByAtLeastMinimumValue])

  useLayoutEffect(() => {
    const containerElement = containerRef.current
    if (containerElement) {
      setContainerHeightByAtLeastMinimumValue(containerElement.scrollHeight)
    }
  }, [children, setContainerHeightByAtLeastMinimumValue])

  return (
    <S.Root {...restProps} height={isCollapsed ? 0 : containerHeight} ref={containerRef}>
      {children}
    </S.Root>
  )
}

export default React.memo(CollapsibleContainer)
