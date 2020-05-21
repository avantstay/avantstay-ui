import { storiesOf } from '@storybook/react'
import React from 'react'
import DropDownMenu from './DropDownMenu'

const DropDownMenuStories = storiesOf('DropDownMenu', module)

DropDownMenuStories.add('Default usage', () => (
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
  .add('With a custom onTrigger', () => {
    return (
      <div onClick={() => alert("This should't be opened")}>
        <DropDownMenu
          items={[
            {
              label: 'Logout',
              searchable: 'logout',
              disabled: false,
              action: () => {},
            },
          ]}
          onTrigger={e => {
            e.stopPropagation()
          }}
          position={'right'}
        >
          Menu label
        </DropDownMenu>
      </div>
    )
  })
