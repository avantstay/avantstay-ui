import { action } from '@storybook/addon-actions'
import { boolean, text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import DateRangePicker from './'

const DateRangePickerStories = storiesOf('DatePicker', module)

DateRangePickerStories.add('Default usage', () => (
  <div>
    <p>
      First first first first first first first first first first first first first first first first first first first
      first first first first first first first first first first first first first first first first first first first
      first first first first first first first first first first first first first first first first first first first
      first first first first first first first first first first
    </p>
    {boolean('show extra paragraph at the top', false) && (
      <p>
        Second second second second second second second second second second second second second second second second
        second second second second second second second second second second second second second second second second
        second second second second second second second second second second second second second second second second
        second second second second second second second second second second second second second second second second
        second second second second second second second second second second second second second second
      </p>
    )}
    <div className="oito">
      <DateRangePicker
        show={boolean('show', true)}
        onChange={action('DateRangePicker[onChange]')}
        onClose={action('DateRangePicker[onClose]')}
        onInit={action('DateRangePicker[onInit]')}
        onClickOut={action('DateRangePicker[onClickOut]')}
      />
    </div>
    {new Array(100).fill(1).map((it, i) => (
      <p key={i}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, consequuntur, culpa cumque dicta dolor, eaque
        error esse ipsam libero maxime natus nisi quae quod ratione repudiandae rerum saepe ullam veniam. Lorem ipsum
        dolor sit amet, consectetur adipisicing elit. Commodi, consequuntur, culpa cumque dicta dolor, eaque error esse
        ipsam libero maxime natus nisi quae quod ratione repudiandae rerum saepe ullam veniam.
      </p>
    ))}
  </div>
))
  .add('Inside scrollable container', () => (
    <div>
      <p>
        before before before before before before before before before before before before before before before before
        before before before before before before before before before before before before before before before before
        before before before before before before before before before before before before before before before before
        before before before before before before before before before before before before before before before
      </p>
      <div
        style={{
          height: '90vh',
          width: '90vw',
          overflow: 'auto',
          position: 'relative',
        }}
      >
        <p>
          First first first first first first first first first first first first first first first first first first
          first first first first first first first first first first first first first first first first first first
          first first first first first first first first first first first first first first first first first first
          first first first first first first first first first first first first first
        </p>
        {boolean('show extra paragraph at the top', false) && (
          <p>
            Second second second second second second second second second second second second second second second
            second second second second second second second second second second second second second second second
            second second second second second second second second second second second second second second second
            second second second second second second second second second second second second second second second
            second second second second second second second second second second second second second second second
            second second second
          </p>
        )}
        <div className="oito">
          <DateRangePicker
            show={boolean('show', true)}
            onChange={action('DateRangePicker[onChange]')}
            onClose={action('DateRangePicker[onClose]')}
            onInit={action('DateRangePicker[onInit]')}
          />
        </div>
        {new Array(100).fill(1).map((it, i) => (
          <p key={i}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, consequuntur, culpa cumque dicta dolor,
            eaque error esse ipsam libero maxime natus nisi quae quod ratione repudiandae rerum saepe ullam veniam.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, consequuntur, culpa cumque dicta dolor,
            eaque error esse ipsam libero maxime natus nisi quae quod ratione repudiandae rerum saepe ullam veniam.
          </p>
        ))}
      </div>
    </div>
  ))
  .add('Align to the right', () => (
    <div>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque minus molestiae nisi! Animi delectus distinctio
      explicabo id minus possimus quasi quisquam quo tempore voluptas! Dolore error inventore porro praesentium
      sapiente!
      <div style={{ width: 200, margin: '50px auto', background: 'yellow' }}>
        <span>Lorem ipsum dolor</span>
        <DateRangePicker show={boolean('show', true)} horizontalAlignment="right" />
      </div>
    </div>
  ))
  .add('With apply button', () => (
    <DateRangePicker
      show={boolean('show', true)}
      showApply={boolean('showApply', true)}
      applyLabel={text('applyLabel', 'Apply')}
      startDate={text('startDate', '2019-01-01')}
      endDate={text('endDate', '2019-01-10')}
      onChange={action('DateRangePicker[onChange]')}
      onClose={action('DateRangePicker[onClose]')}
      onInit={action('DateRangePicker[onInit]')}
    />
  ))
  .add('With start and end date', () => (
    <DateRangePicker
      show={boolean('show', true)}
      startDate={text('startDate', '2019-01-01')}
      endDate={text('endDate', '2019-01-10')}
      onChange={action('DateRangePicker[onChange]')}
      onClose={action('DateRangePicker[onClose]')}
      onInit={action('DateRangePicker[onInit]')}
    />
  ))
  .add('With min and max date', () => (
    <DateRangePicker
      show={boolean('show', true)}
      minDate={text('minDate', '2019-01-01')}
      maxDate={text('maxDate', '2020-01-10')}
      onChange={action('DateRangePicker[onChange]')}
      onClose={action('DateRangePicker[onClose]')}
      onInit={action('DateRangePicker[onInit]')}
    />
  ))
  .add('With tooltip', () => (
    <DateRangePicker
      show={boolean('show', true)}
      onChange={action('DateRangePicker[onChange]')}
      onClose={action('DateRangePicker[onClose]')}
      onInit={action('DateRangePicker[onInit]')}
      onClickOut={action('DateRangePicker[onClickOut]')}
      dateTooltip={text('tooltip', 'This is a tooltip')}
    />
  ))
