import * as React from 'react'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import * as ReactDOM from 'react-dom'
import { getDocumentDimensions } from '../utils/getDocumentDimensions'
import { getElementOffset } from '../utils/getElementOffset'
import { createPortalElementAt, getPortalElement } from '../utils/getPortalElement'
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
  disabled?: boolean
  portalParent?: HTMLElement
}

const simulatedPortal = (() => {
  if (globalThis.document === undefined) {
    return
  }
  const el = globalThis.document.createElement('div')
  el.style.width = '100%'
  el.style.height = '0'
  el.style.overflow = 'hidden'
  globalThis.document.body.appendChild(el)
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
    disabled = false,
    portalParent,
    style,
    className,
  } = props

  const [showTip, setShowTip] = useState(false)
  const [portalElement, setPortalElement] = useState<HTMLElement | null>()
  const wrapperRef = useRef(null)
  const simulatedContainerRef = useRef(null)
  const wrapperScrollableParent = useScrollableParent(wrapperRef.current)
  const scrollableParent = portalParent || wrapperScrollableParent

  useLayoutEffect(() => {
    if (!wrapperRef.current) return

    if (portalParent) setPortalElement(createPortalElementAt(portalParent))
    else setPortalElement(getPortalElement(wrapperRef.current!))
  }, [portalParent])

  useElementScrolling(
    scrollableParent,
    removeListener => {
      if (!keepOpen && showTip) setShowTip(false)
      removeListener()
    },
    [scrollableParent, showTip]
  )

  const { height, width, left, top, right, bottom } = getElementOffset(wrapperRef.current, scrollableParent)
  const { simulatedHeight, simulatedWidth } = useSimulatedContainerDimensions(simulatedContainerRef)
  const { documentWidth, documentHeight } = getDocumentDimensions()
  const extraHeight = arrowHeight + verticalSpacing

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
        ...(!disabled && {
          onMouseEnter: () => !keepOpen && setShowTip(true),
          onMouseLeave: () => !keepOpen && setShowTip(false),
          onMouseMove: () => !showTip && !keepOpen && setShowTip(true),
        }),
      })}
      {!disabled &&
        showTip &&
        portalElement &&
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
            style={style}
            className={className}
          >
            {tip}
          </TipContainer>,
          portalElement
        )}
    </>
  )
}

function useElementScrolling(
  element: HTMLElement | null,
  fn: (removeListener: () => void) => void,
  memoizeBy?: Array<any>
) {
  useEffect(() => {
    function listener() {
      fn(() => element && element.removeEventListener('scroll', listener))
    }

    element && element.addEventListener('scroll', listener)

    return () => {
      element && element.removeEventListener('scroll', listener)
    }
  }, [...memoizeBy, element, fn])
}

function useSimulatedContainerDimensions(simulatedContainerRef: React.RefObject<any>) {
  return useMemo(() => {
    const { width, height } = getElementOffset(simulatedContainerRef.current)

    return {
      simulatedWidth: width || 0,
      simulatedHeight: height || 0,
    }
  }, [simulatedContainerRef])
}
