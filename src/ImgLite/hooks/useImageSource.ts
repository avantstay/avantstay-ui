import * as React from 'react'

import { ImgLiteThumbnailOptions } from '../__types'
import thumbnail from '../utils/thumbnail'

export function useImageSource() {
  const [imageSource, setImageSource] = React.useState<string>()
  const [imageThumbnail, setImageThumbnail] = React.useState<string>()

  const updateImageSource = (imageSource: string | undefined, options?: ImgLiteThumbnailOptions) => {
    setImageSource(imageSource)

    const nextImageThumbnail =
      imageSource !== undefined && options !== undefined ? thumbnail(imageSource, options) : undefined

    setImageThumbnail(nextImageThumbnail)
    return nextImageThumbnail
  }

  return { imageSource, imageThumbnail, updateImageSource }
}
