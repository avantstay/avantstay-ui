// @ts-nocheck
import React, { Component } from 'react'
import addMonths from 'date-fns/add_months'
import endOfDay from 'date-fns/end_of_day'
import isAfter from 'date-fns/is_after'
import isEqual from 'date-fns/is_equal'
import startOfDay from 'date-fns/start_of_day'
import Calendar from '../DateRangePicker/Calendar'
import {
  ApplyButton,
  CalendarContainer,
  ClearButton,
  ClearButtonContainer,
  CloseButton,
  Divider,
  FooterText,
  FooterTextLinedThrough,
  IconClose,
} from '../DateRangePicker/Calendar.styles'
import { defaultClasses } from '../DateRangePicker/enums'
import { ERROR } from '../DateRangePicker/colors'
import differenceInDays from 'date-fns/difference_in_days'
import {
  AnyDate,
  DateFactory,
  DateRangePickerBaseProps,
  DateRange,
  DateRangePickerBaseState,
} from '../DateRangePicker/DateRangePicker.types'

const getDate = (date: AnyDate | DateFactory, defaultValue: AnyDate = ''): AnyDate => {
  return (typeof date === 'function' ? date() : date) || defaultValue
}

const dateFormat = { month: 'short', day: 'numeric', year: 'numeric' }

const formatRange = (range?: DateRange) =>
  new Intl.DateTimeFormat('en', dateFormat).formatRange(range?.startDate, range?.endDate)

const getDaysRange = (range?: DateRange) => differenceInDays(range?.endDate, range?.startDate)

class DateRangePickerBase extends Component<DateRangePickerBaseProps, DateRangePickerBaseState> {
  static defaultProps = {
    linkedCalendars: true,
    format: 'DD/MM/YYYY',
    specialDays: [],
    twoStepChange: false,
    clearButtonLabel: 'Clear',
    clearButtonColor: ERROR,
    showApply: false,
    applyLabel: 'Apply',
    horizontalAlignment: 'left',
    singleDateRange: false,
    showSingleMonthPicker: false,
    shouldStartEmpty: false,
    showCloseButton: true,
  }

  step = 0

  constructor(props: DateRangePickerBaseProps) {
    super(props)

    const { linkedCalendars, shouldStartEmpty } = props
    const shouldStartEmptySelected = shouldStartEmpty || (this.props.originalRange && props.startDate === undefined)

    const startDate = startOfDay(getDate(props.startDate as Date, new Date()))
    const endDate = endOfDay(getDate(props.endDate as Date, new Date()))

    this.state = {
      range: shouldStartEmptySelected ? { startDate: undefined, endDate: undefined } : { startDate, endDate },
      link: linkedCalendars && endDate,
      linkStepsCount: 0,
    }
  }

  componentDidMount() {
    const { onInit } = this.props
    onInit && onInit(this.state.range)
  }

  UNSAFE_componentWillReceiveProps(nextProps: DateRangePickerBaseProps) {
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

    if (this.props.singleDateRange) {
      this.step = 0
      range.startDate = date as AnyDate
      range.endDate = range.startDate
    }

    switch (this.step) {
      case 0:
        range.startDate = date as AnyDate
        range.endDate = undefined
        this.step = 1
        break

      case 1:
        range.endDate = date as AnyDate
        this.step = 0
        break
    }

    const triggerChange = !this.props.twoStepChange || (this.step === 0 && this.props.twoStepChange)

    if (this.props.originalRange && range.startDate === undefined) {
      range.startDate = originalStartDate
      range.endDate = originalEndDate
    }

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
      children,
      className,
      format,
      linkedCalendars,
      firstDayOfWeek,
      minDate,
      maxDate,
      minRangeLength,
      specialDays,
      lang,
      disableDaysBeforeToday,
      shownDate,
      showMonthArrow,
      onClose,
      showApply,
      applyLabel,
      clearButtonLabel,
      clearButtonColor,
      onChange,
      dateTooltip,
      singleDateRange,
      showSingleMonthPicker,
      originalRange,
      totalAmount,
      blockedDates,
      customHeaderComponent,
      showCloseButton,
      multiSelectedDates,
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
      minRangeLength,
      specialDays,
      dateTooltip,
      singleDateRange,
      showSingleMonthPicker,
      link: linkedCalendars && link,
      linkCB: this.moveCalendarDisplay,
      onChange: this.handleSelect,
      originalRange,
      blockedDates,
      customHeaderComponent,
      multiSelectedDates,
    }

    const isBothDatesEqual =
      originalRange &&
      range &&
      isEqual(startOfDay(originalRange.startDate), startOfDay(range.startDate)) &&
      isEqual(startOfDay(originalRange.endDate), startOfDay(range.endDate))

    const isSameDayRange = isEqual(range.startDate, range.endDate)
    const selectedRange = !range.endDate || isSameDayRange ? originalRange : range
    const days = getDaysRange(selectedRange)

    const shouldDisplayClearButton = () => {
      if (!clearButtonLabel) return false

      if (multiSelectedDates) {
        return multiSelectedDates.length > 0
      }
      return Boolean(range.startDate || range.endDate)
    }

    return (
      <CalendarContainer className={className} isSingleMonthPicker={showSingleMonthPicker}>
        <div className={classes.dateRange}>
          <ClearButtonContainer showSingleMonthPicker={showSingleMonthPicker} className={classes.actionsContainer}>
            <ClearButton
              show={shouldDisplayClearButton()}
              onClick={this.clearRange}
              color={clearButtonColor}
              className={classes.clearButton}
            >
              {clearButtonLabel}
            </ClearButton>
            <CloseButton
              onClick={onClose}
              color={clearButtonColor}
              show={showCloseButton}
              className={classes.closeButton}
            >
              <IconClose />
            </CloseButton>
          </ClearButtonContainer>

          {customHeaderComponent && <div className={classes.customComponentContainer}>{customHeaderComponent}</div>}

          <div className={classes.dateRangeContainer}>
            <Calendar {...calendarProps} offset={0} />
            {!showSingleMonthPicker && <Calendar {...calendarProps} offset={1} />}
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

          {originalRange && (
            <>
              <Divider />
              <div>
                {!isBothDatesEqual && range.endDate && !isSameDayRange && (
                  <FooterTextLinedThrough>{formatRange(originalRange)}</FooterTextLinedThrough>
                )}
                <FooterText>
                  &nbsp;{`${formatRange(selectedRange)} • ${days} night${days > 1 ? 's' : ''} • ${totalAmount}`}
                </FooterText>
              </div>
            </>
          )}
          {children}
        </div>
      </CalendarContainer>
    )
  }
}

export { DateRangePickerBase }
