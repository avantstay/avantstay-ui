import centered from '@storybook/addon-centered/react'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import DropDownMenu from './DropDownMenu'

const DropDownMenuStories = storiesOf('DropDownMenu', module)

DropDownMenuStories.addDecorator(centered)
  .addDecorator(withKnobs)
  .add('Default usage', () => (
    <DropDownMenu
      items={[
        {
          label: 'Logout',
          searchable: 'logout',
          disabled: false,
          action: () => {},
        },
      ]}
      position={'right'}
    >
      Menu label
    </DropDownMenu>
  ))
  .add('Multiple menus', () => (
    <div>
      <DropDownMenu
        items={[
          {
            label: 'Logout',
            searchable: 'logout',
            disabled: false,
            action: () => {},
          },
        ]}
        position={'right'}
      >
        Menu label
      </DropDownMenu>
      <DropDownMenu
        items={[
          {
            label: 'Logout',
            searchable: 'logout',
            disabled: false,
            action: () => {},
          },
        ]}
        position={'right'}
      >
        Menu label 2
      </DropDownMenu>
    </div>
  ))
  .add('Stop propagation', () => {
    return (
      <div onClick={() => alert("This should't be opened")}>
        <DropDownMenu
          items={[
            {
              label: 'Logout',
              searchable: 'logout',
              disabled: false,
              action: () => alert('This should be the one that opens'),
            },
          ]}
          stopPropagation
          position={'right'}
        >
          Menu label
        </DropDownMenu>
      </div>
    )
  })
