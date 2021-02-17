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
  height: 100%;
  width: 100%;
`

export const Img = styled.img<{ definingDimension: string }>`
  ${p => p.definingDimension === 'height' && 'height: 100%'};
  ${p => p.definingDimension === 'width' && 'width: 100%'};
`
