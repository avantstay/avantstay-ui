import { boolean, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import CollapsibleContainer from './CollapsibleContainer'

const Stories = storiesOf('CollapsibleContainer', module)
Stories.addDecorator(withKnobs as any)

Stories.add('Default usage', () => (
  <CollapsibleContainer isCollapsed={boolean('Collapse', false)} style={{ backgroundColor: '#D1E3DD', padding: 15 }}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec porta lacus. Fusce finibus at metus sed lacinia. In tempor
    pharetra porttitor. Nulla facilisi. Integer convallis, arcu sit amet placerat vestibulum, elit nulla elementum mi, eu varius
    diam ante ut dolor. Vestibulum auctor efficitur magna, eleifend mollis massa ultrices id. Vestibulum sodales ex et nibh
    imperdiet, et feugiat turpis pretium. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    Vestibulum molestie libero feugiat quam sollicitudin, vitae porta mi dapibus. Sed auctor, nibh non mollis hendrerit, felis
    eros aliquet ex, ac ornare ligula justo a tellus. Donec et pretium lacus, eu elementum elit. Duis at ullamcorper dolor, a
    faucibus felis. Donec rutrum quam pretium metus rutrum tempor. Donec et nisi sit amet libero vestibulum pellentesque. Sed quis
    eleifend est. Morbi convallis enim est, sit amet accumsan nunc cursus vitae. Maecenas molestie, nisi vitae pretium tempus,
    arcu dolor facilisis lorem, pellentesque hendrerit massa ex sit amet enim. Aenean sodales vel diam nec eleifend. Proin justo
    lacus, rutrum a suscipit vel, rhoncus et ante. Nulla venenatis purus dolor, a rhoncus libero euismod sed. Donec lacinia
    volutpat arcu, eget condimentum dolor euismod ac. Nam eget sem lectus. Vestibulum ipsum massa, varius nec nisi at, faucibus
    rhoncus ligula. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis ante velit,
    commodo ac lacus vitae, faucibus sagittis lacus. Aenean molestie lacus nunc, vitae maximus nunc luctus eu. Proin efficitur
    arcu sit amet ante euismod, vitae suscipit elit rhoncus. Duis vestibulum tortor in eros pharetra vehicula. Nullam vulputate
    dui non quam vehicula, ut tempor nisl venenatis. Phasellus dapibus ligula a semper euismod. Nam nec consequat turpis. Fusce at
    velit ut ipsum ullamcorper condimentum a viverra sapien. Donec ac tortor a enim lobortis tincidunt. Nam sed eleifend dolor,
    sit amet sollicitudin lacus. Maecenas enim erat, pretium et erat in, iaculis dictum lorem. Duis eu venenatis lectus. Sed
    porttitor, elit ac lobortis porta, orci magna vehicula justo, a porttitor nisi diam at justo. Proin at ipsum consectetur,
    malesuada nulla pulvinar, aliquet diam. Curabitur ultrices sed mauris ut facilisis. Sed ac orci placerat dui ullamcorper
    imperdiet. Proin laoreet ante nec enim tempus congue. Maecenas mollis malesuada tellus ut volutpat. Integer eu pulvinar magna.
    Suspendisse semper dui varius arcu imperdiet vehicula. Proin purus quam, sollicitudin nec nunc a, convallis porttitor est.
    Maecenas eget pulvinar magna, sit amet vestibulum urna. Nullam sit amet congue urna. Sed sagittis viverra sapien, quis
    faucibus sapien. Cras lacus massa, condimentum sed justo eu, placerat faucibus dui. Vestibulum maximus sit amet nibh nec
    varius. Aenean consectetur bibendum nulla vel molestie. Fusce egestas egestas massa. In scelerisque risus purus, id faucibus
    magna porta id. Morbi orci orci, dapibus et consectetur nec, efficitur vel tortor. Duis bibendum, justo quis vestibulum
    posuere, enim felis hendrerit ante, sit amet suscipit dui ex eget velit. Donec rutrum finibus felis sed blandit. Nullam erat
    nulla, cursus pulvinar vehicula a, semper at orci.
  </CollapsibleContainer>
))
