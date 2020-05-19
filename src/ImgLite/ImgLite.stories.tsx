import { storiesOf } from '@storybook/react'
import React from 'react'
import ImgLite from './ImgLite'

const EXAMPLE_IMAGE = 'https://ik.imagekit.io/avantstay/static/media/heroImage01.ba2729ca.jpg'

const Stories = storiesOf('ImgLite', module)

Stories.add('Default usage', () => <ImgLite src={EXAMPLE_IMAGE} style={{ maxWidth: 500, minHeight: 300, width: '100%' }} />)

Stories.add('Different crops', () => (
  <div style={{ alignItems: 'stretch', display: 'flex', height: '100%', justifyContent: 'space-between', minHeight: 500 }}>
    <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', width: '33%' }}>
      <div style={{ marginBottom: '10px' }}>ATTENTION</div>
      <ImgLite crop="attention" src={EXAMPLE_IMAGE} style={{ flexGrow: 1, width: '100%' }} />
    </div>
    <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', width: '33%' }}>
      <div style={{ marginBottom: '10px' }}>CENTER</div>
      <ImgLite crop="center" src={EXAMPLE_IMAGE} style={{ flexGrow: 1, width: '100%' }} />
    </div>
    <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', width: '33%' }}>
      <div style={{ marginBottom: '10px' }}>ENTROPY</div>
      <ImgLite crop="entropy" src={EXAMPLE_IMAGE} style={{ flexGrow: 1, width: '100%' }} />
    </div>
  </div>
))

Stories.add('With text at center', () => (
  <ImgLite
    src={EXAMPLE_IMAGE}
    style={{
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      minHeight: 300,
      width: '100%',
    }}
  >
    <div style={{ fontSize: 24, zIndex: 1 }}>TEXT ON CENTER</div>
  </ImgLite>
))
