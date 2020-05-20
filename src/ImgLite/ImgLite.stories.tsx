import { storiesOf } from '@storybook/react'
import React from 'react'
import ImgLite from './ImgLite'

const EXAMPLE_IMAGE = 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg'

const Stories = storiesOf('ImgLite', module)

Stories.add('Default usage', () => <ImgLite src={EXAMPLE_IMAGE} style={{ maxWidth: 300, minHeight: 300, width: '100%' }} />)

Stories.add('Different crops', () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'auto 500px', columnGap: 20 }}>
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
      minHeight: 300,
      width: '100%',
    }}
  >
    <h1 style={{ zIndex: 1, color: 'white' }}>Overlaying Content</h1>
  </ImgLite>
))
