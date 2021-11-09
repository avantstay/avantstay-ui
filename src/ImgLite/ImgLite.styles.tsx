import * as React from 'react'
import { useEffect, useMemo } from 'react'

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
  const uniqueClassName = useMemo(() => `imglite_${Math.random().toString(36).substr(2)}`, [])

  useEffect(() => {
    const styles = `
    @keyframes imglite_bg_pulse {
      0% { background-color: rgba(0, 0, 0, 0.1) }
      50% { background-color: rgba(0, 0, 0, 0.2) }
      100% { background-color: rgba(0, 0, 0, 0.1) }
    }
    
    .${uniqueClassName} {
      -webkit-print-color-adjust: ${isPrintable ? 'exact' : 'economy'};
      color-adjust: ${isPrintable ? 'exact' : 'economy'};
      display: ${children ? 'flex' : 'inline-block'};
      background-image: url('${liteSrc}');
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      transition: background 0ms;
      width: ${width};
      height: ${height};
      ${
        pulseBackground
          ? `
      background-color: rgba(0, 0, 0, 0.1); 
      animation: imglite_bg_pulse 1.5s infinite;
      `.trim()
          : ''
      }
    }`

    const styleElement = globalThis.document?.createElement('style')

    if (styleElement) {
      styleElement.innerHTML = styles
      globalThis.document?.head?.prepend(styleElement)
    }

    return () => {
      if (styleElement) {
        globalThis.document?.head?.removeChild(styleElement)
      }
    }
  }, [uniqueClassName, isPrintable, liteSrc, width, height, pulseBackground, children])

  return uniqueClassName
}
