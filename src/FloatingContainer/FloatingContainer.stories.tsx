import { boolean, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import FloatingContainer from './FloatingContainer'

const Stories = storiesOf('Floating Container', module)
Stories.addDecorator(withKnobs)

Stories.add('Default usage', () => (
  <div>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum quis
      turpis nec dictum. Ut finibus ante at pretium
      mollis. Quisque mattis finibus congue. Praesent vitae massa vitae tortor
      consectetur luctus. Curabitur dapibus nunc eget
      ipsum tempor, at hendrerit tellus ultrices. Etiam ac rhoncus elit, ut
      iaculis turpis. Suspendisse at bibendum mi. Aliquam
      semper eros quis quam tempor, ac blandit ligula volutpat.
    </p>
    <div style={{ width: '100%', height: '250px', overflow: 'auto', position: 'relative' }}>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum
        quis turpis nec dictum. Ut finibus ante at pretium
        mollis. Quisque mattis finibus congue. Praesent vitae massa vitae tortor
        consectetur luctus. Curabitur dapibus nunc eget
        ipsum tempor, at hendrerit tellus ultrices. Etiam ac rhoncus elit, ut
        iaculis turpis. Suspendisse at bibendum mi. Aliquam
        semper eros quis quam tempor, ac blandit ligula volutpat.
      </p>
      <FloatingContainer show={boolean('show', true)}>
        <div
          style={{
            background: 'white',
            padding: 20,
            boxShadow: '0 0 10px rgba(0,0,0,.5)',
            marginLeft: 20
          }}
        >
          Lorem ipsum
        </div>
      </FloatingContainer>
      <p>
        Phasellus eu efficitur nulla, pretium sagittis augue. Class aptent
        taciti sociosqu ad litora torquent per conubia nostra,
        per inceptos himenaeos. Praesent a justo vitae orci sollicitudin
        imperdiet at non tellus. Proin posuere nibh urna. Sed
        quis arcu sapien. Nulla finibus justo ut tortor aliquet, a aliquet massa
        venenatis. Praesent augue ipsum, ultrices vitae
        faucibus ut, tempus tempus leo. Mauris tortor metus, molestie non arcu
        sit amet, hendrerit auctor dui.
      </p>
      <p>
        Phasellus eu efficitur nulla, pretium sagittis augue. Class aptent
        taciti sociosqu ad litora torquent per conubia nostra,
        per inceptos himenaeos. Praesent a justo vitae orci sollicitudin
        imperdiet at non tellus. Proin posuere nibh urna. Sed
        quis arcu sapien. Nulla finibus justo ut tortor aliquet, a aliquet massa
        venenatis. Praesent augue ipsum, ultrices vitae
        faucibus ut, tempus tempus leo. Mauris tortor metus, molestie non arcu
        sit amet, hendrerit auctor dui.
      </p>
      <p>
        Phasellus eu efficitur nulla, pretium sagittis augue. Class aptent
        taciti sociosqu ad litora torquent per conubia nostra,
        per inceptos himenaeos. Praesent a justo vitae orci sollicitudin
        imperdiet at non tellus. Proin posuere nibh urna. Sed
        quis arcu sapien. Nulla finibus justo ut tortor aliquet, a aliquet massa
        venenatis. Praesent augue ipsum, ultrices vitae
        faucibus ut, tempus tempus leo. Mauris tortor metus, molestie non arcu
        sit amet, hendrerit auctor dui.
      </p>
      <p>
        Phasellus eu efficitur nulla, pretium sagittis augue. Class aptent
        taciti sociosqu ad litora torquent per conubia nostra,
        per inceptos himenaeos. Praesent a justo vitae orci sollicitudin
        imperdiet at non tellus. Proin posuere nibh urna. Sed
        quis arcu sapien. Nulla finibus justo ut tortor aliquet, a aliquet massa
        venenatis. Praesent augue ipsum, ultrices vitae
        faucibus ut, tempus tempus leo. Mauris tortor metus, molestie non arcu
        sit amet, hendrerit auctor dui.
      </p>
      <p>
        Phasellus eu efficitur nulla, pretium sagittis augue. Class aptent
        taciti sociosqu ad litora torquent per conubia nostra,
        per inceptos himenaeos. Praesent a justo vitae orci sollicitudin
        imperdiet at non tellus. Proin posuere nibh urna. Sed
        quis arcu sapien. Nulla finibus justo ut tortor aliquet, a aliquet massa
        venenatis. Praesent augue ipsum, ultrices vitae
        faucibus ut, tempus tempus leo. Mauris tortor metus, molestie non arcu
        sit amet, hendrerit auctor dui.
      </p>
    </div>
  </div>
))
