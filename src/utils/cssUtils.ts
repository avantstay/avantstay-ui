import tinyColor from 'tinycolor2'
import { kebabCase } from 'lodash'

export function lighten(color: string, percentage: number) {
  return tinyColor(color).lighten(percentage).toRgbString()
}

export function darken(color: string, percentage: number) {
  return tinyColor(color).darken(percentage).toRgbString()
}

export function rgba(color: string, alpha: number) {
  return tinyColor(color).setAlpha(alpha).toRgbString()
}

export function mediaScreen(props: any) {
  return `@media screen and ${Object.keys(props)
    .map(it => `(${kebabCase(it)}: ${props[ it ]})`)
    .join(' and ')}`
}