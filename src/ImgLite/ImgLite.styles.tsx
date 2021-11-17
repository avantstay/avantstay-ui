import * as React from 'react'
import { useEffect, useMemo } from 'react'

if (globalThis.document) {
  const styleElement = globalThis.document.createElement('style')
  styleElement.innerHTML = `
      @keyframes imglite_bg_pulse {
        0% { background-color: rgba(0, 0, 0, 0.1) }
        50% { background-color: rgba(0, 0, 0, 0.2) }
        100% { background-color: rgba(0, 0, 0, 0.1) }
      }`
  globalThis.document.head.prepend(styleElement)
}

function getRandomId() {
  return Math.random().toString(36).substr(2)
}

function isEmpty(width: number | string) {
  return width === undefined || width === null || width === ''
}

export function useImgLiteStyles({
  isPrintable,
  children,
  liteSrc,
  width,
  height,
  pulseBackground,
}: {
  isPrintable: boolean
  children: React.ReactNode
  liteSrc: string
  width: number | string
  height: number | string
  pulseBackground: boolean
}) {
  const uniqueId = useMemo(() => `imglite_${getRandomId()}`, [])

  useEffect(() => {
    const baseSelector = `[data-imglite-id=${uniqueId}]`
    const visibilitySelector = `[data-imglite-visible=true]`

    const styles = `
    ${baseSelector} {
      -webkit-print-color-adjust: ${isPrintable ? 'exact' : 'economy'};
      color-adjust: ${isPrintable ? 'exact' : 'economy'};
      display: ${children ? 'flex' : 'inline-block'};
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      transition: background 0ms;
      width: ${isEmpty(width) ? 'auto' : width};
      height: ${isEmpty(height) ? 'auto' : height};
      ${pulseBackground ? `background-color: rgba(0, 0, 0, 0.1);` : ''} 
      ${pulseBackground ? `animation: imglite_bg_pulse 1.5s infinite;` : ''} 
    }
    
    ${baseSelector}${visibilitySelector} {
      background-image: url('${liteSrc}');
    }
    `

    const styleElement = globalThis.document?.createElement('style')

    if (styleElement) {
      styleElement.setAttribute('data-imglite', 'true')
      styleElement.innerHTML = styles
      globalThis.document.head?.prepend(styleElement)
    }

    return () => {
      if (styleElement) {
        globalThis.document.head?.removeChild(styleElement)
      }
    }
  }, [uniqueId, isPrintable, liteSrc, width, height, pulseBackground, children])

  return uniqueId
}
