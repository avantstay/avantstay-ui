import { boolean } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React, { useState } from 'react'
import FloatingContainer from './FloatingContainer'

const Stories = storiesOf('Floating Container', module)

Stories.add('Default usage', () => (
  <div>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum quis turpis nec dictum. Ut finibus ante at
      pretium mollis. Quisque mattis finibus congue. Praesent vitae massa vitae tortor consectetur luctus. Curabitur
      dapibus nunc eget ipsum tempor, at hendrerit tellus ultrices. Etiam ac rhoncus elit, ut iaculis turpis.
      Suspendisse at bibendum mi. Aliquam semper eros quis quam tempor, ac blandit ligula volutpat.
    </p>
    <div
      style={{
        width: '50%',
        height: '350px',
        overflow: 'hidden',
        position: 'relative',
        marginLeft: 50,
      }}
    >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum quis turpis nec dictum. Ut finibus ante at
        pretium mollis. Quisque mattis finibus congue. Praesent vitae massa vitae tortor consectetur luctus. Curabitur
        dapibus nunc eget ipsum tempor, at hendrerit tellus ultrices. Etiam ac rhoncus elit, ut iaculis turpis.
        Suspendisse at bibendum mi. Aliquam semper eros quis quam tempor, ac blandit ligula volutpat
      </p>
      <FloatingContainer show={boolean('show', true)}>
        <div
          style={{
            background: 'white',
            padding: 20,
            boxShadow: '0 0 10px rgba(0,0,0,.5)',
            marginLeft: 20,
          }}
        >
          Lorem ipsum
        </div>
      </FloatingContainer>
      <p>
        Phasellus eu efficitur nulla, pretium sagittis augue. Class aptent taciti sociosqu ad litora torquent per
        conubia nostra, per inceptos himenaeos. Praesent a justo vitae orci sollicitudin imperdiet at non tellus. Proin
        posuere nibh urna. Sed quis arcu sapien. Nulla finibus justo ut tortor aliquet, a aliquet massa venenatis.
        Praesent augue ipsum, ultrices vitae faucibus ut, tempus tempus leo. Mauris tortor metus, molestie non arcu sit
        amet, hendrerit auctor dui.
      </p>
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium nulla officia ratione. Aspernatur
          necessitatibus optio possimus quam sequi suscipit tempora. Aliquid beatae, culpa est expedita molestiae
          necessitatibus praesentium sint veniam?
        </p>
        <FloatingContainer show horizontalAlignment="right">
          <div
            style={{
              background: 'white',
              padding: 20,
              boxShadow: '0 0 10px rgba(0,0,0,.5)',
            }}
          >
            Lorem ipsum to the right
          </div>
        </FloatingContainer>
      </div>
      <p>
        Phasellus eu efficitur nulla, pretium sagittis augue. Class aptent taciti sociosqu ad litora torquent per
        conubia nostra, per inceptos himenaeos. Praesent a justo vitae orci sollicitudin imperdiet at non tellus. Proin
        posuere nibh urna. Sed quis arcu sapien. Nulla finibus justo ut tortor aliquet, a aliquet massa venenatis.
        Praesent augue ipsum, ultrices vitae faucibus ut, tempus tempus leo. Mauris tortor metus, molestie non arcu sit
        amet, hendrerit auctor dui.
      </p>
      <p>
        Phasellus eu efficitur nulla, pretium sagittis augue. Class aptent taciti sociosqu ad litora torquent per
        conubia nostra, per inceptos himenaeos. Praesent a justo vitae orci sollicitudin imperdiet at non tellus. Proin
        posuere nibh urna. Sed quis arcu sapien. Nulla finibus justo ut tortor aliquet, a aliquet massa venenatis.
        Praesent augue ipsum, ultrices vitae faucibus ut, tempus tempus leo. Mauris tortor metus, molestie non arcu sit
        amet, hendrerit auctor dui.
      </p>
      <p>
        Phasellus eu efficitur nulla, pretium sagittis augue. Class aptent taciti sociosqu ad litora torquent per
        conubia nostra, per inceptos himenaeos. Praesent a justo vitae orci sollicitudin imperdiet at non tellus. Proin
        posuere nibh urna. Sed quis arcu sapien. Nulla finibus justo ut tortor aliquet, a aliquet massa venenatis.
        Praesent augue ipsum, ultrices vitae faucibus ut, tempus tempus leo. Mauris tortor metus, molestie non arcu sit
        amet, hendrerit auctor dui.
      </p>
      <p>
        Phasellus eu efficitur nulla, pretium sagittis augue. Class aptent taciti sociosqu ad litora torquent per
        conubia nostra, per inceptos himenaeos. Praesent a justo vitae orci sollicitudin imperdiet at non tellus. Proin
        posuere nibh urna. Sed quis arcu sapien. Nulla finibus justo ut tortor aliquet, a aliquet massa venenatis.
        Praesent augue ipsum, ultrices vitae faucibus ut, tempus tempus leo. Mauris tortor metus, molestie non arcu sit
        amet, hendrerit auctor dui.
      </p>
    </div>
  </div>
)).add('Click to show', () => <ClickToShow />)

const ClickToShow = () => {
  const [showBelow, setShowBelow] = useState(false)
  const [showAbove, setShowAbove] = useState(false)
  return (
    <>
      <div>
        <button type="button" onClick={() => setShowBelow(!showBelow)}>
          Show container below
        </button>
        <FloatingContainer show={showBelow}>
          <div
            style={{
              background: 'white',
              padding: 20,
              boxShadow: '0 0 10px rgba(0,0,0,.5)',
              marginLeft: 20,
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio, iure soluta. Aliquam corporis ducimus
            eius fugiat impedit labore maxime molestiae nam nesciunt nihil officiis optio porro quis, velit vitae
            voluptates.
          </div>
        </FloatingContainer>
      </div>
      <div style={{ marginTop: 100 }}>
        <FloatingContainer show={showAbove} verticalAlignment="top">
          <div
            style={{
              background: 'white',
              padding: 20,
              boxShadow: '0 0 10px rgba(0,0,0,.5)',
              marginLeft: 20,
              position: 'relative',
              bottom: 0,
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio, iure soluta. Aliquam corporis ducimus
            eius fugiat impedit labore maxime molestiae nam nesciunt nihil officiis optio porro quis, velit vitae
            voluptates.
          </div>
        </FloatingContainer>
        <button type="button" onClick={() => setShowAbove(!showAbove)}>
          Show container above
        </button>
      </div>
    </>
  )
}
