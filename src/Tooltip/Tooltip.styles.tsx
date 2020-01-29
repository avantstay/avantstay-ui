import * as React from 'react'
import styled, { keyframes } from 'styled-components'
import { HorizontalGravity, VerticalGravity } from './Tooltip'

interface TipContainerProps {
  maxWidth: number | string
  top: number
  left: number
  backgroundColor: string
  textColor: string
  vGravity: VerticalGravity
  hGravity: HorizontalGravity
  padding: number | string
  borderRadius: number | string
  style: any
}

interface SimulatedTipContainerProps {
  maxWidth: number | string
  padding: number | string
}

export const arrowHeight = 8 // px

const appearIn = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`

export const TipContainer: React.FC<TipContainerProps> = styled.div<TipContainerProps>`
  max-width: ${p => typeof p.maxWidth === 'number' ? `${p.maxWidth}px` : p.maxWidth};
  padding: ${p => typeof p.padding === 'number' ? `${p.padding}px` : p.padding}; 
  border-radius: ${p => typeof p.borderRadius === 'number' ? `${p.borderRadius}px` : p.borderRadius}; 
  position: absolute;
  top: ${p => p.top}px;
  left: ${p => p.left}px;
  background: ${p => p.backgroundColor};
  z-index: 999; 
  opacity: 0;
  animation: ${appearIn} 200ms forwards;
  color: ${p => p.textColor};
  
  &::after {
    content: '';
    position: absolute;
    ${p => p.vGravity === VerticalGravity.top ? 'bottom' : 'top' }: 0;
    left: ${p => ({
  center: '50%',
  left: `calc(100% - ${arrowHeight * 3}px)`,
  right: `${arrowHeight * 3}px`
}[p.hGravity])};
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: ${p => p.vGravity === VerticalGravity.top
  ? `${arrowHeight}px ${arrowHeight}px 0 ${arrowHeight}px`
  : `0 ${arrowHeight}px ${arrowHeight}px ${arrowHeight}px`};
    border-color: ${p => p.vGravity === VerticalGravity.top
  ? `${p.backgroundColor} transparent transparent transparent`
  : `transparent transparent ${p.backgroundColor} transparent`};
    transform: translateY(${p => p.vGravity === VerticalGravity.top ? 'calc(100% - 1px)' : 'calc(-100% + 1px)' }) translateX(-50%);
  }
`

export const SimulatedTipContainer: React.FC<SimulatedTipContainerProps & any> = styled.div<SimulatedTipContainerProps>`
  display: inline-block;
  max-width: ${p => typeof p.maxWidth === 'number' ? `${p.maxWidth}px` : p.maxWidth};
  padding: ${p => typeof p.padding === 'number' ? `${p.padding}px` : p.padding}; 
`
