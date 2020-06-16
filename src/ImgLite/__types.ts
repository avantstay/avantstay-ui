import React from 'react'

export type Fit = 'cover' | 'contain' | 'fill' | 'inside' | 'outside'

export type Gravity =
  | 'center'
  | 'entropy'
  | 'attention'
  | 'north'
  | 'northeast'
  | 'east'
  | 'southeast'
  | 'south'
  | 'southwest'
  | 'west'
  | 'northwest'

export type ImgLiteRef = React.Ref<HTMLDivElement> | React.Ref<HTMLImageElement>

export interface ImgLiteThumbnailOptions {
  fit?: Fit
  gravity?: Gravity
  height?: number
  width?: number
  quality?: number
  sharpen?: string
  webp?: boolean
}
