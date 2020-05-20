import debounce from 'lodash.debounce'
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import ResizeObserver from 'resize-observer-polyfill'
import * as S from './CollapsibleContainer.styles'

type CollapsibleContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  delay?: number
  isCollapsed?: boolean
}

const MINIMUM_HEIGHT_DIFFERENCE = 2

function CollapsibleContainer({ children, delay = 250, isCollapsed = false, ...restProps }: CollapsibleContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const [containerHeight, setContainerHeight] = useState(0)

  const setContainerHeightDebounced = useMemo(() => {
    return debounce((nextHeight) => {
      setContainerHeight((previousHeight) => {
        const heightDifference = Math.abs(previousHeight - nextHeight)
        const shouldChangeHeight = heightDifference >= MINIMUM_HEIGHT_DIFFERENCE

        return shouldChangeHeight ? nextHeight : previousHeight
      })
    }, delay)
  }, [delay])

  useEffect(() => {
    const containerElement = containerRef.current
    if (!containerElement) return

    const containerHeightObserver = new ResizeObserver((entries) => {
      const nextHeight = entries[0].target.scrollHeight
      setContainerHeightDebounced(nextHeight)
    })

    containerHeightObserver.observe(containerElement)
    return () => {
      containerHeightObserver.unobserve(containerElement)
    }
  }, [setContainerHeightDebounced])

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

export default React.memo(CollapsibleContainer)
