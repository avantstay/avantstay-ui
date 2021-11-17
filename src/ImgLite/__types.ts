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

export interface ImgLiteThumbnailOptions {
  density?: number
  fit?: Fit
  gravity?: Gravity
  height?: number
  quality?: number
  sharpen?: string
  width?: number
  webp?: boolean
}
