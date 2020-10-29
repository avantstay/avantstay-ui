import cn from 'classnames'
import getDate from 'date-fns/get_date'
import React, { Component } from 'react'
import { HorizontalGravity, Tooltip, VerticalGravity } from '../index'

interface DayCellProps {
  dayMoment: any
  onSelect: (date: Date | string) => void
  isSelected: boolean
  isInRange: boolean
  isFromPreviousMonth?: boolean
  isPassive: boolean
  isSpecialDay: boolean
  isStartEdge: boolean
  isEndEdge: boolean
  isSunday: boolean
  isToday: boolean
  classNames: { [name: string]: boolean }
  tooltip?: any
}

class DayCell extends Component<DayCellProps & any> {
  constructor(props: DayCellProps, context: any) {
    super(props, context)

    this.state = {
      hover: false,
      active: false,
    }
  }

  handleMouseEvent = (event: MouseEvent) => {
    event.preventDefault()

    if (this.props.isPassive) return null

    const newState = {} as any

    switch (event.type) {
      case 'mouseenter':
        newState.hover = true
        break

      case 'mouseup':
      case 'mouseleave':
        newState.hover = false
        newState.active = false
        break

      case 'mousedown':
        newState.active = true
        break
    }

    this.setState(newState)
  }

  handleSelect = (event: MouseEvent) => {
    event.preventDefault()

    if (this.props.isPassive) return null

    this.props.onSelect(this.props.dayMoment)
  }

  getClassNames(classes: any) {
    const {
      isSelected,
      isInRange,
      isPassive,
      isStartEdge,
      isEndEdge,
      isToday,
      isSunday,
      isFromPreviousMonth,
      isSpecialDay,
    } = this.props

    return cn({
      [classes.day]: true,
      [classes.dayActive]: isSelected,
      [classes.dayPassive]: isPassive,
      [classes.dayInRange]: isInRange,
      [classes.dayStartEdge]: isStartEdge,
      [classes.dayEndEdge]: isEndEdge,
      [classes.dayToday]: isToday,
      [classes.daySunday]: isSunday,
      [classes.dayFromPreviousMonth]: isFromPreviousMonth,
      [classes.daySpecialDay]: isSpecialDay,
    })
  }

  render() {
    const { dayMoment, classNames, tooltip } = this.props

    const classes = this.getClassNames(classNames)

    const date = () => {
      return (
        <span
          onMouseEnter={this.handleMouseEvent as any}
          onMouseLeave={this.handleMouseEvent as any}
          onMouseDown={this.handleMouseEvent as any}
          onMouseUp={this.handleMouseEvent as any}
          className={classes}
        >
          {getDate(dayMoment)}
        </span>
      )
    }

    return (
      <span className={classes.replace(classNames.day, classNames.dayWrapper)} onClick={this.handleSelect as any}>
        {tooltip ? (
          <Tooltip
            tip={tooltip}
            preferredHorizontalGravity={HorizontalGravity.center}
            preferredVerticalGravity={VerticalGravity.top}
          >
            {date()}
          </Tooltip>
        ) : (
          date()
        )}
      </span>
    )
  }
}

export default DayCell
