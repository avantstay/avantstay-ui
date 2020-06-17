import React, { memo, useMemo } from 'react'
import { AvatarRoot, Initials } from './Avatar.styles'

interface IProps extends React.HTMLProps<HTMLDivElement> {
  alt?: string
  className?: string
  src?: string
  size: number
  solid?: boolean
  style?: React.CSSProperties
}

function _Avatar({ alt, className, size, src, solid, style, ...otherProps }: IProps) {
  const initials = useMemo(() => {
    return alt
      ? alt
          .split(/\s+/)
          .slice(0, 2)
          .map(it => it && it[0].toUpperCase())
          .join('')
      : ''
  }, [])

  const altColor = useMemo(() => {
    if (src || !alt) {
      return '#ccc'
    }

    const cleanName = alt.toLowerCase().replace(/[^a-z]/g, '')
    const hash = parseInt(cleanName, 36) * alt.length
    const hue = hash % 360

    return solid ? `hsl(${hue}, 55%, 35%)` : `linear-gradient(hsl(${hue}, 60%, 40%), hsl(${hue}, 50%, 30%))`
  }, [])

  const _style = useMemo(() => {
    return {
      ...style,
      width: size,
      height: size,
      background: src ? `url('${src}')` : altColor,
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
    }
  }, [])

  return (
    <AvatarRoot className={className} style={_style} {...(otherProps as any)}>
      <Initials show={!src} size={size}>
        {initials}
      </Initials>
    </AvatarRoot>
  )
}

export default memo(_Avatar)
