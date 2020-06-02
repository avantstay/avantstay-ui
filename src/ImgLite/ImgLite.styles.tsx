import styled from 'styled-components'
import './ImgLite.css'

export const Background = styled.div<{ src?: string; children?: any }>`
  display: ${p => (p.children ? 'block' : 'inline-block')};
  background-image: url("${p => p.src}");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: rgba(0, 0, 0, 0.1);
  animation: ImgLiteBgPulse 1.5s infinite;
  transition: background 0ms;
`

export const Image = styled.img`
  object-fit: cover;
  transition: background 0ms;
  animation: ImgLiteBgPulse 1.5s infinite;
  background-color: rgba(0, 0, 0, 0.1);
`
