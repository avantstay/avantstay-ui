import { action } from '@storybook/addon-actions'
import { boolean, text, number } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { isSameDay } from 'date-fns'
import React, { useState } from 'react'
import DateRangePicker from './'

const DateRangePickerStories = storiesOf('DatePicker', module)
const now = new Date()

var threeDaysAfter = new Date(Date.now() + 3 * 86400000)
var fiveDaysAfter = new Date(Date.now() + 5 * 86400000)

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
        singleDateRange={boolean('singleDateRange', false)}
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
            singleDateRange={boolean('singleDateRange', false)}
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
      singleDateRange={boolean('singleDateRange', false)}
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
      minDate={text('minDate', `${now.getFullYear()}-${now.getMonth() + 1}-10`)}
      maxDate={text('maxDate', `${now.getFullYear()}-${now.getMonth() + 2}-10`)}
      onChange={action('DateRangePicker[onChange]')}
      onClose={action('DateRangePicker[onClose]')}
      onInit={action('DateRangePicker[onInit]')}
    />
  ))
  .add('With min range length', () => (
    <DateRangePicker
      show={boolean('show', true)}
      minRangeLength={3}
      onChange={action('DateRangePicker[onChange]')}
      onClose={action('DateRangePicker[onClose]')}
      onInit={action('DateRangePicker[onInit]')}
    />
  ))
  .add('With clear button label', () => (
    <DateRangePicker
      show={boolean('show', true)}
      onChange={action('DateRangePicker[onChange]')}
      onClose={action('DateRangePicker[onClose]')}
      onInit={action('DateRangePicker[onInit]')}
      onClickOut={action('DateRangePicker[onClickOut]')}
      clearButtonLabel={'Clear button label'}
    />
  ))
  .add('With initial empty selection', () => (
    <DateRangePicker
      shouldStartEmpty
      show={boolean('show', true)}
      onChange={action('DateRangePicker[onChange]')}
      onClose={action('DateRangePicker[onClose]')}
      onInit={action('DateRangePicker[onInit]')}
      onClickOut={action('DateRangePicker[onClickOut]')}
    />
  ))
  .add('With personalized clear button color', () => (
    <DateRangePicker
      show={boolean('show', true)}
      onChange={action('DateRangePicker[onChange]')}
      onClose={action('DateRangePicker[onClose]')}
      onInit={action('DateRangePicker[onInit]')}
      onClickOut={action('DateRangePicker[onClickOut]')}
      clearButtonColor="#3788F7"
    />
  ))
  .add('With possibility to extend date', () => (
    <div>
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
          singleDateRange={boolean('singleDateRange', false)}
          onChange={action('DateRangePicker[onChange]')}
          onClose={action('DateRangePicker[onClose]')}
          onInit={action('DateRangePicker[onInit]')}
          onClickOut={action('DateRangePicker[onClickOut]')}
          clearButtonLabel="Clear"
          clearButtonColor="#3788F7"
          disableDaysBeforeToday
          minRangeLength={1}
          originalRange={{
            startDate: new Date('2022-06-10T12:00:00Z'),
            endDate: new Date('2022-06-12T12:00:00Z'),
          }}
          startDate={new Date('2022-06-13T12:00:00Z')}
          endDate={new Date('2022-06-17T12:00:00Z')}
          totalAmount="$4,890.00"
          blockedDates={['2022-08-08', '2022-08-09', '2022-08-16', '2022-08-17']}
        />
      </div>
      {new Array(100).fill(1).map((it, i) => (
        <p key={i}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, consequuntur, culpa cumque dicta dolor,
          eaque error esse ipsam libero maxime natus nisi quae quod ratione repudiandae rerum saepe ullam veniam. Lorem
          ipsum dolor sit amet, consectetur adipisicing elit. Commodi, consequuntur, culpa cumque dicta dolor, eaque
          error esse ipsam libero maxime natus nisi quae quod ratione repudiandae rerum saepe ullam veniam.
        </p>
      ))}
    </div>
  ))
  .add('With custom component inside floating container', () => (
    <div>
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
          singleDateRange={boolean('singleDateRange', false)}
          onChange={action('DateRangePicker[onChange]')}
          onClose={action('DateRangePicker[onClose]')}
          onInit={action('DateRangePicker[onInit]')}
          onClickOut={action('DateRangePicker[onClickOut]')}
          customHeaderComponent={
            <div>
              Custom Custom Custom Custom Custom Custom Custom Custom Custom Custom Custom Custom Custom Custom Custom
              Custom Custom Custom Custom Custom Custom Custom Custom Custom Custom Custom Custom Custom Custom Custom
              Custom Custom Custom Custom Custom Custom Custom Custom Custom Custom Custom Custom Custom Custom Custom
            </div>
          }
        >
          Sample custom footer
        </DateRangePicker>
      </div>
      {new Array(100).fill(1).map((it, i) => (
        <p key={i}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, consequuntur, culpa cumque dicta dolor,
          eaque error esse ipsam libero maxime natus nisi quae quod ratione repudiandae rerum saepe ullam veniam. Lorem
          ipsum dolor sit amet, consectetur adipisicing elit. Commodi, consequuntur, culpa cumque dicta dolor, eaque
          error esse ipsam libero maxime natus nisi quae quod ratione repudiandae rerum saepe ullam veniam.
        </p>
      ))}
    </div>
  ))
  .add('With single month picker', () => (
    <DateRangePicker
      show={boolean('show', true)}
      minDate={text('minDate', `${now.getFullYear()}-${now.getMonth() + 1}-10`)}
      maxDate={text('maxDate', `${now.getFullYear()}-${now.getMonth() + 2}-10`)}
      onChange={action('DateRangePicker[onChange]')}
      onClose={action('DateRangePicker[onClose]')}
      onInit={action('DateRangePicker[onInit]')}
      showSingleMonthPicker={true}
    />
  ))
  .add('With single day picker', () => (
    <DateRangePicker
      show={boolean('show', true)}
      minDate={text('minDate', `${now.getFullYear()}-${now.getMonth() + 1}-10`)}
      maxDate={text('maxDate', `${now.getFullYear()}-${now.getMonth() + 2}-10`)}
      onChange={action('DateRangePicker[onChange]')}
      onClose={action('DateRangePicker[onClose]')}
      onInit={action('DateRangePicker[onInit]')}
      singleDateRange={true}
    />
  ))
  .add('With multi selected days', () => {
    const [selectedDates, setSelectedDates] = useState([now, threeDaysAfter, fiveDaysAfter])
    return (
      <DateRangePicker
        show={boolean('show', true)}
        minDate={text('minDate', `${now.getFullYear()}-${now.getMonth() + 1}-10`)}
        maxDate={text('maxDate', `${now.getFullYear()}-${now.getMonth() + 2}-10`)}
        onChange={date => {
          const startDate = date?.startDate as Date
          if (!startDate) {
            setSelectedDates([])
          } else {
            const isDateSelected = selectedDates.some(currentDate => isSameDay(currentDate, startDate))

            setSelectedDates(prevState =>
              isDateSelected
                ? [...prevState.filter(currentDate => !isSameDay(currentDate, startDate))]
                : [...prevState, startDate]
            )
          }
        }}
        onClose={action('DateRangePicker[onClose]')}
        onInit={action('DateRangePicker[onInit]')}
        singleDateRange={true}
        showSingleMonthPicker
        firstDayOfWeek={number('firstDayOfWeek', 6)}
        multiSelectedDates={selectedDates}
      />
    )
  })
