import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import DateRangePicker from '../src/DateRangePicker';

const DateRangePickerStories = storiesOf('DatePicker', module)
DateRangePickerStories.addDecorator(withKnobs);

DateRangePickerStories
  .add('Default usage', () => (
    <DateRangePicker 
      show={boolean('show', true)} 
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
  ));