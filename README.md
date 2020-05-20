# AvantStay UI

## Installation

```
yarn add @avantstay/avantstay-ui
```

## Components

### CollapsibleContainer

```
import CollapsibleContainer from '@avantstay/avantstay-ui/lib/CollapsibleContainer'

<CollapsibleContainer
  delay={number}        // (optional, default: 250) Delay in milliseconds when expanding/collapsing
  isCollapsed={boolean} // (optional, default: false) Flag to control when it is collapsed
>
  Something to expand/collapse
</CollapsibleContainer>


```

### DateRangePicker

```
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

```
import DropDownMenu from '@avantstay/avantstay-ui/lib/DropDownMenu'

<DropDownMenu
  items={[
    {
      label: "First item",
      searchable: "firstItem",
      disabled: true|false,
      action: () => {}
    }
  ]}
>
  <p>Menu label</p>
</DropDownMenu>
```

### ImgLite

```
import ImgLite from '@avantstay/avantstay-ui/lib/ImgLite'

// This will render an img element:
<ImgLite
  density={number}         // (optional, default: 1.5 on mobile or 1 otherwise)
  fit={ImgLiteFit}         // (optional, default: cover) Check https://sharp.pixelplumbing.com/api-resize#resize
  height={number}          // (optional) Set this value in case you want a fixed height (not responsive)
  lowResQuality={number}   // (optional) Quality of low resolution image to load before the betrer quality image
  lowResWidth={number}     // (optional) Width of low resolution image to load before the better quality image
  gravity={ImgLiteGravity} // (optional, default: entropy) Check sharp.gravity and sharp.strategy on https://sharp.pixelplumbing.com/api-resize#resize
  quality={number}         // (optional, default: 85) Quality of the image
  sharpen={string}         // (optional) Check https://sharp.pixelplumbing.com/api-operation#parameters-4
  sizingStep={number}      // (optional, default: 100) By how much the width or height has to change to request a new image
  src={string}             // The url of the image
  width={number}           // (optional) Set this value in case you want a fixed width (not responsive)
  ...imgElementProps       // (optional) Any React.ImgHTMLAttributes<HTMLImageElement> except for children
/>

// This will render a div element with a background:
<ImgLite
  ...anyOfTheAbovePropsButImgElementProps
  ...divElementProps    // (optional) Any React.HTMLAttributes<HTMLDivElement>
>
  You can put anything here
</ImgLite>
```

### Tooltip

```
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
