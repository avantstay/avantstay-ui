# AvantStay UI

## Installation

```
yarn add @avantstay/avantstay-ui
```

## Components

### CollapsibleContainer

```typescript jsx
import CollapsibleContainer from '@avantstay/avantstay-ui/lib/CollapsibleContainer'
;<CollapsibleContainer
  delay={number} // (optional, default: 250) Delay in milliseconds when expanding/collapsing
  isCollapsed={boolean} // (optional, default: false) Flag to control when it is collapsed
>
  Something to expand/collapse
</CollapsibleContainer>
```

### DateRangePicker

```typescript jsx
import DateRangePicker from '@avantstay/avantstay-ui/lib/DateRangePicker'

<DateRangePicker
  show={true|false}
  startDate={...}
  endDate={...}
  minDate={...}
  maxDate={...}
  onClose={...}
  onChange={...}
  onInit={...}
/>
```

### DropDownMenu

```typescript jsx
import DropDownMenu from '@avantstay/avantstay-ui/lib/DropDownMenu'
;<DropDownMenu
  items={[
    {
      label: 'First item',
      searchable: 'firstItem',
      disabled: true | false,
      action: () => {},
    },
  ]}
>
  <p>Menu label</p>
</DropDownMenu>
```

### Tooltip

```typescript jsx
import Tooltip from '@avantstay/avantstay-ui/lib/Tooltip'

<Tooltip
  className={...}
  style={...}
  tip={...}                        // ReactNode
  verticalSpacing={...}            // Default: 5
  backgroundColor={...}            // Default: #003459
  maxWidth={...}                   // Default: 200
  wrapper={...}                    // Default: div
  preferredVerticalGravity={...}   // Default: VerticalGravity.top
  preferredHorizontalGravity={...} // Default: HorizontalGravity.center
  tipContainerBorderRadius={...}   // Default: 3
  tipContainerPadding={...}        // Default: 14px 20px 15px 20px
>
  Triggering content
</Tooltip>
```
