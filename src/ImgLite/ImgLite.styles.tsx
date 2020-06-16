import styled from 'styled-components'
import './ImgLite.css'

export const Background = styled.div<{ src?: string; children?: any; pulseBackground?: boolean }>`
  display: ${p => (p.children ? 'flex' : 'inline-block')};
  background-image: url("${p => p.src}");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  transition: background 0ms;
  ${p => (p.pulseBackground ? `background-color: rgba(0, 0, 0, 0.1); animation: ImgLiteBgPulse 1.5s infinite;` : '')}
`

export const Image = styled.img<{ pulseBackground?: boolean }>`
  object-fit: cover;
  transition: background 0ms;
  ${p => (p.pulseBackground ? `background-color: rgba(0, 0, 0, 0.1); animation: ImgLiteBgPulse 1.5s infinite;` : '')}
`
