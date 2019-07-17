import * as React from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as ReactDOM from 'react-dom'
import { getDocumentDimensions } from '../utils/getDocumentDimensions'
import { useElementOffset } from '../utils/useElementOffset'
import { useScrollableParent } from '../utils/useScrollableParent'
import { arrowHeight, SimulatedTipContainer, TipContainer } from './Tooltip.styles'

export enum VerticalGravity {
  bottom = 'bottom',
  top = 'top',
}

export enum HorizontalGravity {
  left = 'left',
  right = 'right',
  center = 'center',
}

export interface TooltipProps {
  className?: string
  style?: any
  backgroundColor?: string
  textColor?: string
  maxWidth?: number | string
  tipContainerPadding?: number | string
  tipContainerBorderRadius?: number | string
  verticalSpacing?: number
  preferredVerticalGravity?: VerticalGravity
  preferredHorizontalGravity?: HorizontalGravity
  tip: React.ReactNode
  children: React.ReactNode
  keepOpen?: boolean
}

const portalElement = document.createElement('div')
portalElement.style.overflow = 'hidden'
document.body.appendChild(portalElement)

const simulatedPortal = (() => {
  const el = document.createElement('div')
  el.style.width = '100%'
  el.style.height = '0'
  el.style.overflow = 'hidden'
  document.body.appendChild(el)
  return el
})()

export default function Tooltip(props: TooltipProps) {
  const {
    preferredVerticalGravity = VerticalGravity.top,
    preferredHorizontalGravity = HorizontalGravity.center,
    verticalSpacing = 5,
    backgroundColor = '#003459',
    textColor = 'white',
    maxWidth = 200,
    tip,
    children,
    tipContainerPadding = '14px 20px 15px 20px',
    tipContainerBorderRadius = 3,
    keepOpen = false,
  } = props

  const [showTip, setShowTip] = useState(false)
  const wrapperRef = useRef(null)
  const simulatedContainerRef = useRef(null)
  const scrollableParent = useScrollableParent(wrapperRef.current)

  const { height, width, left, top, right, bottom } = useElementOffset(wrapperRef.current)

  const { simulatedHeight, simulatedWidth } = useSimulatedContainerDimensions(simulatedContainerRef)

  const { documentWidth, documentHeight } = getDocumentDimensions()
  const extraHeight = arrowHeight + verticalSpacing

  useScrollToHideTip(scrollableParent, showTip, setShowTip)

  const vGravity = {
    [VerticalGravity.top]: () => (top > simulatedHeight + extraHeight ? VerticalGravity.top : VerticalGravity.bottom),

    [VerticalGravity.bottom]: () =>
      bottom + simulatedHeight + extraHeight < documentHeight ? VerticalGravity.bottom : VerticalGravity.top,
  }[preferredVerticalGravity as VerticalGravity]()

  const hGravity = {
    [HorizontalGravity.left]: () =>
      left - simulatedWidth + width / 2 + 40 > 0
        ? HorizontalGravity.left
        : left - simulatedWidth / 2 > 0
        ? HorizontalGravity.center
        : HorizontalGravity.right,

    [HorizontalGravity.center]: () =>
      left - simulatedWidth / 2 > 0
        ? right + simulatedWidth / 2 < documentWidth
          ? HorizontalGravity.center
          : HorizontalGravity.left
        : HorizontalGravity.right,

    [HorizontalGravity.right]: () =>
      right + simulatedWidth - width / 2 < documentWidth
        ? HorizontalGravity.right
        : right + simulatedWidth / 2 < documentWidth
        ? HorizontalGravity.center
        : HorizontalGravity.left,
  }[preferredHorizontalGravity as HorizontalGravity]()

  const anchorTop = {
    [VerticalGravity.top]: top - simulatedHeight - arrowHeight - verticalSpacing,
    [VerticalGravity.bottom]: top + height + arrowHeight + verticalSpacing,
  }[vGravity]

  const anchorLeft = {
    [HorizontalGravity.center]: left + width / 2 - simulatedWidth / 2,
    [HorizontalGravity.left]: left + width / 2 - simulatedWidth + 4 * arrowHeight,
    [HorizontalGravity.right]: left + width / 2 - 4 * arrowHeight,
  }[hGravity]

  React.useLayoutEffect(() => {
    setShowTip(keepOpen)
  }, [keepOpen])

  return (
    <>
      {ReactDOM.createPortal(
        <SimulatedTipContainer ref={simulatedContainerRef} maxWidth={maxWidth} padding={tipContainerPadding}>
          {tip}
        </SimulatedTipContainer>,
        simulatedPortal
      )}
      {React.cloneElement(children as any, {
        ref: wrapperRef,
        onMouseEnter: () => !keepOpen && setShowTip(true),
        onMouseLeave: () => !keepOpen && setShowTip(false),
        onMouseMove: () => !showTip && !keepOpen && setShowTip(true),
      })}
      {showTip &&
        ReactDOM.createPortal(
          <TipContainer
            padding={tipContainerPadding}
            borderRadius={tipContainerBorderRadius}
            vGravity={vGravity}
            hGravity={hGravity}
            backgroundColor={backgroundColor}
            textColor={textColor}
            maxWidth={maxWidth}
            top={anchorTop}
            left={anchorLeft}
          >
            {tip}
          </TipContainer>,
          portalElement
        )}
    </>
  )
}

function useScrollToHideTip(
  scrollableParent: HTMLElement | null,
  showTip: boolean,
  setShowTip: React.Dispatch<React.SetStateAction<boolean>>
) {
  useEffect(() => {
    const handleScroll = () => {
      showTip && setShowTip(false)
      scrollableParent && scrollableParent.removeEventListener('scroll', handleScroll)
    }

    scrollableParent && scrollableParent.addEventListener('scroll', handleScroll)

    return () => {
      scrollableParent && scrollableParent.removeEventListener('scroll', handleScroll)
    }
  }, [scrollableParent, showTip])
}

function useSimulatedContainerDimensions(simulatedContainerRef: any) {
  return useMemo(() => {
    const { width, height } = useElementOffset(simulatedContainerRef.current)

    return {
      simulatedWidth: width || 0,
      simulatedHeight: height || 0,
    }
  }, [simulatedContainerRef.current])
}
