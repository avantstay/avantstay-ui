// @ts-nocheck
import React, { Component } from 'react'
import addMonths from 'date-fns/add_months'
import endOfDay from 'date-fns/end_of_day'
import isAfter from 'date-fns/is_after'
import isEqual from 'date-fns/is_equal'
import startOfDay from 'date-fns/start_of_day'
import FloatingContainer from '../FloatingContainer/FloatingContainer'
import Calendar from './Calendar'
import {
  ApplyButton,
  CalendarContainer,
  ClearButton,
  ClearButtonContainer,
  CloseButton,
  IconClose,
} from './Calendar.styles'
import { defaultClasses } from './enums'

export type AnyDate = Date | string | number
export type DateFactory = () => AnyDate

export type DateRange<T = AnyDate> = {
  startDate: AnyDate | T
  endDate: AnyDate | T
}

export interface DateRangePickerProps {
  className?: string
  clearButtonLabel?: string
  firstDayOfWeek?: number
  startDate?: AnyDate | DateFactory
  endDate?: AnyDate | DateFactory
  minDate?: AnyDate | DateFactory
  maxDate?: AnyDate | DateFactory
  dateLimit?: DateFactory
  linkedCalendars?: boolean
  twoStepChange?: boolean
  onInit?: (range: DateRange<undefined>) => void
  onChange?: (range: DateRange<undefined>, source?: any) => void
  specialDays?: Array<any>
  format?: any
  lang?: any
  show: boolean
  showApply?: boolean
  horizontalAlignment?: 'left' | 'right'
  applyLabel?: string
  disableDaysBeforeToday?: any
  shownDate?: any
  showMonthArrow?: any
  dateTooltip?: any
  onClose?: () => void
  onClickOut?: () => void
}

export interface DateRangePickerState {
  range: DateRange<undefined>
  link: any
  linkStepsCount: number
}

const getDate = (date: AnyDate | DateFactory, defaultValue: AnyDate = ''): AnyDate => {
  return (typeof date === 'function' ? date() : date) || defaultValue
}

class DateRangePicker extends Component<DateRangePickerProps, DateRangePickerState> {
  static defaultProps = {
    linkedCalendars: true,
    format: 'DD/MM/YYYY',
    specialDays: [],
    twoStepChange: false,
    clearButtonLabel: 'Clear',
    showApply: false,
    applyLabel: 'Apply',
    horizontalAlignment: 'left',
  }

  step = 0

  constructor(props: DateRangePickerProps) {
    super(props)

    const { linkedCalendars } = props

    const startDate = startOfDay(getDate(props.startDate as Date, new Date()))
    const endDate = endOfDay(getDate(props.endDate as Date, new Date()))

    this.state = {
      range: { startDate, endDate },
      link: linkedCalendars && endDate,
      linkStepsCount: 0,
    }
  }

  componentDidMount() {
    const { onInit } = this.props
    onInit && onInit(this.state.range)
  }

  UNSAFE_componentWillReceiveProps(nextProps: DateRangePickerProps) {
    if (nextProps.startDate || nextProps.endDate) {
      const startDate = nextProps.startDate && startOfDay(getDate(nextProps.startDate))
      const endDate = nextProps.endDate && endOfDay(getDate(nextProps.endDate))
      const oldStartDate = this.props.startDate && startOfDay(getDate(this.props.startDate))
      const oldEndDate = this.props.endDate && endOfDay(getDate(this.props.endDate))
      const startDateDidChange = !isEqual(startDate as Date, oldStartDate as Date)
      const endDateDidChange = !isEqual(endDate as Date, oldEndDate as Date)

      if (startDateDidChange || endDateDidChange) {
        this.setRange({
          startDate: startDate || oldStartDate,
          endDate: endDate || oldEndDate,
        })
      }
    }
  }

  onClickOut = () => {
    this.props.onClose && this.props.onClose()
    this.props.onClickOut && this.props.onClickOut()
  }

  orderRange = (range: DateRange<undefined>) => {
    const { startDate, endDate } = range

    const swap = isAfter(startDate as Date, endDate as Date)

    if (!swap) return range

    return {
      startDate: endDate,
      endDate: startDate,
    }
  }

  setRange = (range: DateRange<undefined>, source?: any, triggerChange?: boolean) => {
    const { onChange } = this.props
    range = this.orderRange(range)

    this.setState({ range }, () => triggerChange && onChange && onChange(range, source))
  }

  handleSelect = (date: DateRange | AnyDate, source: any) => {
    this.setState({ linkStepsCount: 0 })

    if (date.hasOwnProperty('startDate') && date.hasOwnProperty('endDate')) {
      this.step = 0
      return this.setRange(date as any, source, true)
    }

    const { startDate, endDate } = this.state.range

    const range = { startDate, endDate }

    switch (this.step) {
      case 0:
        range.startDate = date as AnyDate
        range.endDate = endDate && isAfter(endDate, date as AnyDate) ? endDate : undefined
        this.step = 1
        break

      case 1:
        range.endDate = date as AnyDate
        this.step = 0
        break
    }

    const triggerChange = !this.props.twoStepChange || (this.step === 0 && this.props.twoStepChange)

    this.setRange(range, source, triggerChange)
  }

  moveCalendarDisplay = (direction: number) => {
    const { link, linkStepsCount } = this.state

    this.setState({
      linkStepsCount: linkStepsCount - direction,
      link: addMonths(link, direction),
    })
  }

  clearRange = () => {
    this.setRange({ startDate: undefined, endDate: undefined })
    this.props.onChange && this.props.onChange({ startDate: undefined, endDate: undefined })
  }

  resetPosition = () => {
    this.moveCalendarDisplay(this.state.linkStepsCount)
  }

  render() {
    const {
      className,
      format,
      linkedCalendars,
      firstDayOfWeek,
      minDate,
      maxDate,
      specialDays,
      lang,
      disableDaysBeforeToday,
      shownDate,
      showMonthArrow,
      onClose,
      show,
      showApply,
      applyLabel,
      clearButtonLabel,
      onChange,
      horizontalAlignment,
      dateTooltip,
    } = this.props

    const { range, link } = this.state
    const classes = { ...defaultClasses }

    const calendarProps = {
      classNames: classes,
      showMonthArrow,
      shownDate,
      disableDaysBeforeToday,
      lang,
      range,
      format,
      firstDayOfWeek,
      minDate,
      maxDate,
      specialDays,
      dateTooltip,
      link: linkedCalendars && link,
      linkCB: this.moveCalendarDisplay,
      onChange: this.handleSelect,
    }

    return (
      <FloatingContainer show={show} onClickOut={this.onClickOut} horizontalAlignment={horizontalAlignment}>
        <CalendarContainer className={className}>
          <div className={classes.dateRange}>
            <div>
              <Calendar {...calendarProps} offset={0} />
              <ClearButtonContainer>
                <ClearButton show={Boolean(range.startDate || range.endDate)} onClick={this.clearRange}>
                  {clearButtonLabel}
                </ClearButton>
                <CloseButton onClick={onClose}>
                  <IconClose />
                </CloseButton>
              </ClearButtonContainer>
              <Calendar {...calendarProps} offset={1} />
            </div>
            <ApplyButton
              show={showApply}
              onClick={() => {
                onChange && onChange(range)
                onClose && onClose()
              }}
            >
              {applyLabel}
            </ApplyButton>
          </div>
        </CalendarContainer>
      </FloatingContainer>
    )
  }
}

export default DateRangePicker
