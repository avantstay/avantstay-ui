import React, { Component } from 'react'

import FloatingContainer from '../FloatingContainer/FloatingContainer'
import { DateRangePickerBase } from './DateRangePickerBase'
import { DateRangePickerProps } from './DateRangePicker.types'

class DateRangePicker extends Component<DateRangePickerProps> {
  handleClickOut = () => {
    const { onClose, onClickOut } = this.props
    onClose && onClose()
    onClickOut && onClickOut()
  }

  render() {
    const { rootClassName, show, horizontalAlignment, onClickOut, onClose, ...otherProps } = this.props

    return (
      <FloatingContainer
        className={rootClassName}
        show={show}
        onClickOut={this.handleClickOut}
        horizontalAlignment={horizontalAlignment}
      >
        <DateRangePickerBase {...otherProps} />
      </FloatingContainer>
    )
  }
}

export { DateRangePicker }
