import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import Tooltip from './'
import { HorizontalGravity, VerticalGravity } from './Tooltip'

const Stories = storiesOf('Tooltip', module)
Stories.addDecorator(withKnobs)

Stories
  .add('Default usage', () => (
    <div>
      <div style={{ width: '100%', height: '250px', overflow: 'auto' }}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum
          quis turpis nec dictum. Ut finibus ante at pretium mollis. Quisque
          mattis finibus congue. Praesent vitae massa vitae tortor consectetur
          luctus. Curabitur dapibus nunc eget ipsum tempor, at hendrerit tellus
          ultrices. Etiam ac rhoncus elit, ut iaculis turpis. Suspendisse at
          bibendum mi. Aliquam semper eros quis quam tempor, ac blandit ligula
          volutpat.
        </p>
        <table style={{ width: '100%' }}>
          <tr>
            <td style={{ width: '50%' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              fermentum
              quis turpis nec dictum. Ut finibus ante at pretium mollis. Quisque
              mattis finibus congue. Praesent vitae massa vitae tortor
              consectetur
              luctus. Curabitur dapibus nunc eget ipsum tempor, at hendrerit
              tellus
              ultrices. Etiam ac rhoncus elit, ut iaculis turpis. Suspendisse at
              bibendum mi. Aliquam semper eros quis quam tempor, ac blandit
              ligula
              volutpat.
            </td>
            <td align="right">
              <Tooltip
                tip={
                  <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </div>
                }
                style={{ display: 'inline-block', background: 'yellow' }}
              >
                Need help? Lorem ipsum dolor sit amet<br/>
                Etiam ac rhoncus elit, ut iaculis turpis.
              </Tooltip>
            </td>
          </tr>
          <tr>
            <td style={{ width: '50%' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              fermentum
              quis turpis nec dictum. Ut finibus ante at pretium mollis. Quisque
              mattis finibus congue. Praesent vitae massa vitae tortor
              consectetur
              luctus. Curabitur dapibus nunc eget ipsum tempor, at hendrerit
              tellus
              ultrices. Etiam ac rhoncus elit, ut iaculis turpis. Suspendisse at
              bibendum mi. Aliquam semper eros quis quam tempor, ac blandit
              ligula
              volutpat.
            </td>
            <td>
              <Tooltip
                tip={<div><h2>Cool tip 2</h2><ul><li>One</li><li>Two</li></ul></div>}
                preferredHorizontalGravity={HorizontalGravity.left}
                preferredVerticalGravity={VerticalGravity.bottom}
                style={{ display: 'inline-block', background: 'yellow' }}
              >
                Need help? Lorem ipsum dolor sit amet<br/>
                Etiam ac rhoncus elit, ut iaculis turpis.
              </Tooltip>
            </td>
          </tr>
        </table>
        <p>
          Phasellus eu efficitur nulla, pretium sagittis augue. Class aptent
          taciti sociosqu ad litora torquent per conubia nostra, per inceptos
          himenaeos. Praesent a justo vitae orci sollicitudin imperdiet at non
          tellus. Proin posuere nibh urna. Sed quis arcu sapien. Nulla finibus
          justo ut tortor aliquet, a aliquet massa venenatis. Praesent augue
          ipsum, ultrices vitae faucibus ut, tempus tempus leo. Mauris tortor
          metus, molestie non arcu sit amet, hendrerit auctor dui.
        </p>
      </div>
    </div>
  ))