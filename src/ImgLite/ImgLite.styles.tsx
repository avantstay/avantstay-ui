import styled from 'styled-components'
import './ImgLite.css'

export const ImageBackground = styled.div<{
  src?: string
  children?: any
  printable: boolean
  pulseBackground?: boolean
}>`
  -webkit-print-color-adjust: ${p => (p.printable ? 'exact' : 'economy')};
  color-adjust: ${p => (p.printable ? 'exact' : 'economy')};
  display: ${p => (p.children ? 'flex' : 'inline-block')};
  background-image: url('${p => p.src}');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  transition: background 0ms;
  ${p => (p.pulseBackground ? `background-color: rgba(0, 0, 0, 0.1); animation: ImgLiteBgPulse 1.5s infinite;` : '')}
`
