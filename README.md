# AvantStay UI

## Install it

`yarn add https://github.com/avantstay/avantstay-ui.git#v0.1.3`

## Use it

```
import DateRangePicker from 'avantstay-ui/lib/DateRangePicker'
import Tooltip from 'avantstay-ui/lib/Tooltip'

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