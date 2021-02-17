import styled from 'styled-components'
import './ImgLite.css'

export const ImageContainer = styled.div<{
  children?: any
  printable: boolean
  pulseBackground?: boolean
}>`
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  background: red;
  position: relative;
  ${p => (p.pulseBackground ? `background-color: rgba(0, 0, 0, 0.1); animation: ImgLiteBgPulse 1.5s infinite;` : '')}
`

export const ChildrenContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`

export const Img = styled.img<{ definingDimension: string }>`
  ${p => p.definingDimension === 'height' && 'max-height: 100%'};
  ${p => p.definingDimension === 'width' && 'max-width: 100%'};
`
