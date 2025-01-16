import cn from 'classnames'
import getDate from 'date-fns/get_date'
import React, { Component } from 'react'
import { SpecialDay } from './DateRangePicker.types'

interface DayCellProps {
  dayMoment: any
  onSelect: (date: Date | string) => void
  onHover: (date: Date | string) => void
  isSelected: boolean
  isInRange: boolean
  hasOriginalRange?: boolean
  isInOriginalRange?: boolean
  isFromPreviousMonth?: boolean
  isPassive: boolean
  isSpecialDay: boolean
  specialDay?: SpecialDay
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

  handleSelect = (event: MouseEvent) => {
    event.preventDefault()

    if (this.props.isPassive) return null

    this.props.onSelect(this.props.dayMoment)
  }

  getClassNames(classes: any, specialDay?: SpecialDay) {
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
      hasOriginalRange,
      isInOriginalRange,
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
      [classes.dayOriginalRange]: isInOriginalRange,
      [classes.dayHasOriginalRange]: hasOriginalRange,
      [specialDay?.className || '']: Boolean(specialDay),
    })
  }

  render() {
    const { dayMoment, classNames, tooltip, specialDay } = this.props
    const Tooltip = tooltip

    const classes = this.getClassNames(classNames, specialDay)

    const date = () => {
      return <span className={classes}>{getDate(dayMoment)}</span>
    }

    return (
      <span className={classes.replace(classNames.day, classNames.dayWrapper)} onClick={this.handleSelect as any}>
        {tooltip ? <Tooltip day={dayMoment}>{date()}</Tooltip> : date()}
      </span>
    )
  }
}

export default DayCell
