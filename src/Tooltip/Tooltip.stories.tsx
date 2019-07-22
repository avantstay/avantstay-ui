import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import Tooltip from './'
import { HorizontalGravity, VerticalGravity } from './Tooltip'

const Stories = storiesOf('Tooltip', module)
Stories.addDecorator(withKnobs)

Stories.add('Default usage', () => (
  <div>
    <div style={{ width: '100%', height: '250px', overflow: 'auto', position: 'relative' }}>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum quis turpis nec dictum. Ut finibus ante at pretium
        mollis. Quisque mattis finibus congue. Praesent vitae massa vitae tortor consectetur luctus. Curabitur dapibus nunc eget
        ipsum tempor, at hendrerit tellus ultrices. Etiam ac rhoncus elit, ut iaculis turpis. Suspendisse at bibendum mi. Aliquam
        semper eros quis quam tempor, ac blandit ligula volutpat.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum quis turpis nec dictum. Ut finibus ante at pretium
        mollis. Quisque mattis finibus congue. Praesent vitae massa vitae tortor consectetur luctus. Curabitur dapibus nunc eget
        ipsum tempor, at hendrerit tellus ultrices. Etiam ac rhoncus elit, ut iaculis turpis. Suspendisse at bibendum mi. Aliquam
        semper eros quis quam tempor, ac blandit ligula volutpat.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum quis turpis nec dictum. Ut finibus ante at pretium
        mollis. Quisque mattis finibus congue. Praesent vitae massa vitae tortor consectetur luctus. Curabitur dapibus nunc eget
        ipsum tempor, at hendrerit tellus ultrices. Etiam ac rhoncus elit, ut iaculis turpis. Suspendisse at bibendum mi. Aliquam
        semper eros quis quam tempor, ac blandit ligula volutpat.
      </p>
      <table style={{ width: '100%' }}>
        <tbody>
          <tr>
            <td style={{ width: '50%' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum quis turpis nec dictum. Ut finibus ante at
              pretium mollis. Quisque mattis finibus congue. Praesent vitae massa vitae tortor consectetur luctus. Curabitur
              dapibus nunc eget ipsum tempor, at hendrerit tellus ultrices. Etiam ac rhoncus elit, ut iaculis turpis. Suspendisse
              at bibendum mi. Aliquam semper eros quis quam tempor, ac blandit ligula volutpat.
            </td>
            <td align="right">
              <Tooltip
                maxWidth={300}
                tip={
                  <div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum quis turpis nec dictum. Ut finibus
                      ante at pretium mollis.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum quis turpis nec dictum. Ut finibus
                      ante at pretium mollis.
                    </p>
                  </div>
                }
              >
                <span>
                  Need help? Lorem ipsum dolor sit amet
                  <br />
                  Etiam ac rhoncus elit, ut iaculis turpis.
                </span>
              </Tooltip>
            </td>
          </tr>
          <tr>
            <td style={{ width: '50%' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum quis turpis nec dictum. Ut finibus ante at
              pretium mollis. Quisque mattis finibus congue. Praesent vitae massa vitae tortor consectetur luctus. Curabitur
              dapibus nunc eget ipsum tempor, at hendrerit tellus ultrices. Etiam ac rhoncus elit, ut iaculis turpis. Suspendisse
              at bibendum mi. Aliquam semper eros quis quam tempor, ac blandit ligula volutpat.
            </td>
            <td>
              <Tooltip
                tip={
                  <div>
                    <h2>Cool tip 2</h2>
                    <ul>
                      <li>One</li>
                      <li>Two</li>
                    </ul>
                  </div>
                }
                preferredHorizontalGravity={HorizontalGravity.right}
                preferredVerticalGravity={VerticalGravity.bottom}
                style={{ display: 'inline-block', background: 'yellow' }}
              >
                <div style={{ display: 'inline-block', background: 'yellow' }}>
                  Need help? Lorem ipsum dolor sit amet
                  <br />
                  Etiam ac rhoncus elit, ut iaculis turpis.
                </div>
              </Tooltip>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        Phasellus eu efficitur nulla, pretium sagittis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra,
        per inceptos himenaeos. Praesent a justo vitae orci sollicitudin imperdiet at non tellus. Proin posuere nibh urna. Sed
        quis arcu sapien. Nulla finibus justo ut tortor aliquet, a aliquet massa venenatis. Praesent augue ipsum, ultrices vitae
        faucibus ut, tempus tempus leo. Mauris tortor metus, molestie non arcu sit amet, hendrerit auctor dui.
      </p>
      <p>
        Phasellus eu efficitur nulla, pretium sagittis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra,
        per inceptos himenaeos. Praesent a justo vitae orci sollicitudin imperdiet at non tellus. Proin posuere nibh urna. Sed
        quis arcu sapien. Nulla finibus justo ut tortor aliquet, a aliquet massa venenatis. Praesent augue ipsum, ultrices vitae
        faucibus ut, tempus tempus leo. Mauris tortor metus, molestie non arcu sit amet, hendrerit auctor dui.
      </p>
      <p>
        Phasellus eu efficitur nulla, pretium sagittis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra,
        per inceptos himenaeos. Praesent a justo vitae orci sollicitudin imperdiet at non tellus. Proin posuere nibh urna. Sed
        quis arcu sapien. Nulla finibus justo ut tortor aliquet, a aliquet massa venenatis. Praesent augue ipsum, ultrices vitae
        faucibus ut, tempus tempus leo. Mauris tortor metus, molestie non arcu sit amet, hendrerit auctor dui.
      </p>
    </div>
  </div>
))
  .add('Keep open usage', () => (
    <div>
      <div style={{ width: '100%', height: '250px', overflow: 'auto' }}>
        <table style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td style={{ width: '50%' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum quis turpis nec dictum. Ut finibus ante at
                pretium mollis. Quisque mattis finibus congue. Praesent vitae massa vitae tortor consectetur luctus. Curabitur
                dapibus nunc eget ipsum tempor, at hendrerit tellus ultrices. Etiam ac rhoncus elit, ut iaculis turpis.
                Suspendisse at bibendum mi. Aliquam semper eros quis quam tempor, ac blandit ligula volutpat.
              </td>
              <td align="right">
                <Tooltip
                  maxWidth={300}
                  keepOpen
                  tip={
                    <div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum quis turpis nec dictum. Ut finibus
                        ante at pretium mollis.
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum quis turpis nec dictum. Ut finibus
                        ante at pretium mollis.
                      </p>
                    </div>
                  }
                >
                  <span>
                    Need help? Lorem ipsum dolor sit amet
                    <br />
                    Etiam ac rhoncus elit, ut iaculis turpis.
                  </span>
                </Tooltip>
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          Phasellus eu efficitur nulla, pretium sagittis augue. Class aptent taciti sociosqu ad litora torquent per conubia
          nostra, per inceptos himenaeos. Praesent a justo vitae orci sollicitudin imperdiet at non tellus. Proin posuere nibh
          urna. Sed quis arcu sapien. Nulla finibus justo ut tortor aliquet, a aliquet massa venenatis. Praesent augue ipsum,
          ultrices vitae faucibus ut, tempus tempus leo. Mauris tortor metus, molestie non arcu sit amet, hendrerit auctor dui.
        </p>
      </div>
    </div>
  ))
  .add('Inside scrollable', () => (
    <div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid commodi consectetur consequuntur doloribus
        harum impedit, iste itaque iure laborum minima mollitia necessitatibus nesciunt non, pariatur placeat quaerat recusandae
        repellat!
      </p>
      <div style={{ width: 300, height: 200, overflow: 'auto', position: 'relative' }}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid commodi consectetur consequuntur doloribus
          harum impedit, iste itaque iure laborum minima mollitia necessitatibus nesciunt non, pariatur placeat quaerat recusandae
          repellat!
        </p>
        <Tooltip
          tip={
            <div>
              <h2>Cool tip 2</h2>
              <ul>
                <li>One</li>
                <li>Two</li>
              </ul>
            </div>
          }
          keepOpen={true}
          preferredHorizontalGravity={HorizontalGravity.right}
          preferredVerticalGravity={VerticalGravity.bottom}
          style={{ display: 'inline-block', background: 'yellow' }}
        >
          <div style={{ display: 'inline-block', background: 'yellow' }}>
            Need help? Lorem ipsum dolor sit amet
            <br />
          </div>
        </Tooltip>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid commodi consectetur consequuntur doloribus
          harum impedit, iste itaque iure laborum minima mollitia necessitatibus nesciunt non, pariatur placeat quaerat recusandae
          repellat!
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid commodi consectetur consequuntur doloribus
          harum impedit, iste itaque iure laborum minima mollitia necessitatibus nesciunt non, pariatur placeat quaerat recusandae
          repellat!
        </p>
      </div>
    </div>
  ))
