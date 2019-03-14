import * as React from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as ReactDOM from 'react-dom'
import { getDocumentDimensions } from '../utils/getDocumentDimensions'
import { useElementOffset } from '../utils/useElementOffset'
import { useScrollableParent } from '../utils/useScrollableParent'
import {
  arrowHeight,
  SimulatedTipContainer,
  TipContainer,
} from './Tooltip.styles'

export enum VerticalGravity {
  bottom = 'bottom',
  top = 'top'
}

export enum HorizontalGravity {
  left = 'left',
  right = 'right',
  center = 'center'
}

export interface TooltipProps {
  className?: string,
  style?: any,
  backgroundColor?: string,
  textColor?: string,
  maxWidth?: number | string,
  tipContainerPadding?: number | string,
  tipContainerBorderRadius?: number | string,
  verticalSpacing?: number,
  wrapper?: React.PureComponent | React.FC | React.Component | React.ClassicComponent | string,
  preferredVerticalGravity?: VerticalGravity,
  preferredHorizontalGravity?: HorizontalGravity,
  tip: React.ReactNode,
  children: React.ReactNode
}

const portalElement = document.createElement('div')
document.body.appendChild(portalElement)

const simulatedPortal = (() => {
  const el = document.createElement('div')
  el.style.width = '100%'
  el.style.height = '0'
  el.style.overflow = 'hidden'
  document.body.appendChild(el)
  return el
})()

export default function Tooltip({
                                  wrapper = 'div',
                                  preferredVerticalGravity = VerticalGravity.top,
                                  preferredHorizontalGravity = HorizontalGravity.center,
                                  verticalSpacing = 5,
                                  backgroundColor = '#003459',
                                  textColor = 'white',
                                  maxWidth = 200,
                                  style,
                                  className,
                                  tip,
                                  children,
                                  tipContainerPadding = '14px 20px 15px 20px',
                                  tipContainerBorderRadius = 3,
                                }: TooltipProps) {

  const Component: any = wrapper
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

    [VerticalGravity.top]: () =>
      top > simulatedHeight + extraHeight
        ? VerticalGravity.top
        : VerticalGravity.bottom,

    [VerticalGravity.bottom]: () =>
      bottom + simulatedHeight + extraHeight < documentHeight
        ? VerticalGravity.bottom
        : VerticalGravity.top,

  }[preferredVerticalGravity as VerticalGravity]()

  const hGravity = {

    [HorizontalGravity.left]: () =>
      left - simulatedWidth + 40 > 0
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
      right + simulatedWidth < documentWidth
        ? HorizontalGravity.right
        : right + simulatedWidth / 2 < documentWidth
        ? HorizontalGravity.center
        : HorizontalGravity.left,

  }[preferredHorizontalGravity as HorizontalGravity]()

  console.log(right, simulatedWidth, documentWidth, right + simulatedWidth / 2, preferredHorizontalGravity, hGravity)

  const anchorTop = {
    [VerticalGravity.top]   : top,
    [VerticalGravity.bottom]: top + height,
  }[vGravity]

  const anchorLeft = {
    [HorizontalGravity.center]: left + (width / 2),
    [HorizontalGravity.left]  : left,
    [HorizontalGravity.right] : left + width,
  }[hGravity]

  return (
    <>
      {
        ReactDOM.createPortal((
          <SimulatedTipContainer
            ref={simulatedContainerRef}
            maxWidth={maxWidth}
            padding={tipContainerPadding}
          >
            {tip}
          </SimulatedTipContainer>
        ), simulatedPortal)
      }
      <Component
        ref={wrapperRef}
        style={style}
        className={className}
        onMouseEnter={() => setShowTip(true)}
        onMouseLeave={() => setShowTip(false)}
        onMouseMove={() => !showTip && setShowTip(true)}
      >
        {children}
      </Component>

      {
        showTip &&
        ReactDOM.createPortal((
          <TipContainer
            padding={tipContainerPadding}
            borderRadius={tipContainerBorderRadius}
            vSpacing={verticalSpacing}
            vGravity={vGravity}
            hGravity={hGravity}
            backgroundColor={backgroundColor}
            textColor={textColor}
            maxWidth={maxWidth}
            top={anchorTop}
            left={anchorLeft}
          >
            {tip}
          </TipContainer>
        ), portalElement)
      }
    </>
  )
}

function useScrollToHideTip(
  scrollableParent: HTMLElement | null,
  showTip: boolean,
  setShowTip: React.Dispatch<React.SetStateAction<boolean>>,
) {
  useEffect(() => {
    const handleScroll = () => {
      showTip && setShowTip(false)
      scrollableParent &&
      scrollableParent.removeEventListener('scroll', handleScroll)
    }

    scrollableParent &&
    scrollableParent.addEventListener('scroll', handleScroll)

    return () => {
      scrollableParent &&
      scrollableParent.removeEventListener('scroll', handleScroll)
    }
  }, [scrollableParent, showTip])
}

function useSimulatedContainerDimensions(simulatedContainerRef: any) {
  return useMemo(() => {
    const { width, height } = useElementOffset(simulatedContainerRef.current)

    return {
      simulatedWidth : width || 0,
      simulatedHeight: height || 0,
    }
  }, [simulatedContainerRef.current])
}
