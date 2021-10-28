import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

const bgPulse = keyframes`
  0% { background-color: rgba(0, 0, 0, 0.1) }
  50% { background-color: rgba(0, 0, 0, 0.2) }
  100% { background-color: rgba(0, 0, 0, 0.1) }
`

export const ImgLiteRoot = styled.div<{
  src?: string
  children?: any
  width?: number | string
  height?: number | string
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
  width: ${p => p.width || '100%'};
  height: ${p => p.height || '100%'};
  ${p => (p.pulseBackground ? `background-color: rgba(0, 0, 0, 0.1); animation: ${bgPulse} 1.5s infinite;` : '')}
`
