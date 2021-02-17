import { storiesOf } from '@storybook/react'
import React from 'react'
import ImgLite from './ImgLite'

const EXAMPLE_IMAGE = 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg'
const EXAMPLE_IMAGE_2 = 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'

const Stories = storiesOf('ImgLite', module)

Stories.add('Default usage', () => {
  const [src, setSrc] = React.useState(EXAMPLE_IMAGE)

  return (
    <div>
      <ImgLite src={src} quality={85} density={1} style={{ width: '40vw', height: '50vh' }} pulseBackground={false} />
      <button onClick={() => setSrc(EXAMPLE_IMAGE_2)}>Change</button>
    </div>
  )
})

Stories.add('Different crops', () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridTemplateRows: 'auto 500px',
      columnGap: 20,
    }}
  >
    <div>Center</div>
    <div>West</div>
    <div>Entropy</div>
    <div style={{ display: 'flex' }}>
      <ImgLite gravity="center" src={EXAMPLE_IMAGE} style={{ flexGrow: 1, width: '100%' }} />
    </div>
    <div style={{ display: 'flex' }}>
      <ImgLite gravity="west" src={EXAMPLE_IMAGE} style={{ flexGrow: 1, width: '100%' }} />
    </div>
    <div style={{ display: 'flex' }}>
      <ImgLite gravity="entropy" src={EXAMPLE_IMAGE} style={{ flexGrow: 1, width: '100%' }} />
    </div>
  </div>
))

Stories.add('Overlaying Content', () => (
  <ImgLite
    gravity="north"
    src={EXAMPLE_IMAGE}
    style={{
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      minHeight: 500,
      width: '70%',
    }}
  >
    <h1 style={{ zIndex: 1, color: 'white' }}>Overlaying Content</h1>
  </ImgLite>
))

Stories.add('On Load & On Error', () => {
  const onLoad = React.useCallback(() => {
    console.log('Image loaded successfully')
  }, [])

  const onError = React.useCallback(() => {
    console.log('Image could not be loaded')
  }, [])

  return (
    <div>
      <ImgLite
        onError={onError}
        onLoad={onLoad}
        src={EXAMPLE_IMAGE}
        quality={85}
        density={1}
        style={{ width: 400, height: 400 }}
        pulseBackground={false}
      />
      <ImgLite
        onError={onError}
        onLoad={onLoad}
        src="https://thissitedoesnotexist/random-image.jpg"
        quality={85}
        density={1}
        style={{ width: 400, height: 400 }}
        pulseBackground={false}
      />
    </div>
  )
})
