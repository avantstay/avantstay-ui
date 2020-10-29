import addMonths from 'date-fns/add_months'
import differenceInDays from 'date-fns/difference_in_days'
import endOfDay from 'date-fns/end_of_day'
import getDay from 'date-fns/get_day'
import getDaysInMonth from 'date-fns/get_days_in_month'
import getMonth from 'date-fns/get_month'
import getYear from 'date-fns/get_year'
import isEqual from 'date-fns/is_equal'
import isSameDay from 'date-fns/is_same_day'
import parse from 'date-fns/parse'
import setDate from 'date-fns/set_date'
import setMonth from 'date-fns/set_month'
import startOfDay from 'date-fns/start_of_day'
import startOfMonth from 'date-fns/start_of_month'
import * as React from 'react'
import { IconAngleLeft, IconAngleRight } from './Calendar.styles'
import { AnyDate, DateRange } from './DateRangePicker'
import { checkEndEdge, checkRange, checkStartEdge, isOutsideMinMax } from './dateUtils'
import DayCell from './DayCell'
import { defaultClasses, months } from './enums'
import { HiddenAccessibilityText } from './HiddenAccessibilityText'
import { weekdaysShort } from './weekdays'

export interface CalendarProps {
  showMonthArrow: boolean
  disableDaysBeforeToday: boolean
  lang: string
  sets: string
  range: {
    startDate: any
    endDate: any
  }
  minDate: any
  maxDate: any
  date: any
  offset: any
  shownDate: any
  format: string
  oldRange: DateRange
  firstDayOfWeek: number
  onChange: () => void
  onInit: (d: AnyDate) => void
  link:
    | boolean
    | {
        startDate: any
        endDate: any
      }
  linkCB: () => void
  specialDays: Array<any>
  classNames: any
  locale: string
  dateTooltip?: any
}

export interface CalendarState {
  date: AnyDate
  shownDate: AnyDate
  firstDayOfWeek: number
}

class Calendar extends React.Component<any, CalendarState> {
  static defaultProps = {
    format: 'DD/MM/YYYY',
    showMonthArrow: true,
    disableDaysBeforeToday: false,
    classNames: {},
    specialDays: [],
  }

  constructor(props: CalendarProps, context: any) {
    super(props, context)

    const { range, offset, firstDayOfWeek, shownDate } = props

    const date = props.date && startOfDay(props.date || new Date())

    this.state = {
      date,
      shownDate: addMonths(shownDate || (range && range.endDate) || date, offset),
      firstDayOfWeek: firstDayOfWeek || 0,
    }

    this.getShownDate = this.getShownDate.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.changeMonth = this.changeMonth.bind(this)
    this.renderMonthAndYear = this.renderMonthAndYear.bind(this)
    this.renderWeekdays = this.renderWeekdays.bind(this)
    this.renderDays = this.renderDays.bind(this)
  }

  componentDidMount() {
    const { onInit } = this.props
    onInit && onInit(this.state.date)
  }

  UNSAFE_componentWillReceiveProps(nextProps: CalendarProps) {
    const { range, offset } = nextProps
    const oldRange = this.props.oldRange

    if (
      (range && range['endDate'] && !isSameDay(range['endDate'], range['startDate'])) ||
      (oldRange && !isEqual(oldRange['startDate'], range['startDate']))
    ) {
      this.setState({ shownDate: addMonths(range['endDate'], offset) })
    }
  }

  getShownDate() {
    const { link, offset } = this.props

    const shownDate = link ? addMonths(link, offset) : this.state.shownDate

    return shownDate
  }

  handleSelect(newDate: AnyDate) {
    const { link, onChange } = this.props

    onChange && onChange(newDate, Calendar)

    if (!link) {
      this.setState({ date: newDate })
    }
  }

  changeMonth(direction: any, event: MouseEvent) {
    event.preventDefault()
    const { link, linkCB } = this.props

    if (link && linkCB) {
      return linkCB(direction)
    }

    const newMonth = addMonths(this.state.shownDate, direction)

    this.setState({
      shownDate: newMonth,
    })
  }

  renderMonthAndYear(classes: any) {
    const { showMonthArrow } = this.props

    const shownDate = this.getShownDate()
    const month = months[getMonth(shownDate)]
    const year = getYear(shownDate)

    return (
      <div className={classes.monthAndYearWrapper}>
        {showMonthArrow ? (
          <button type="button" className={classes.prevButton} onClick={(e: any) => this.changeMonth(-1, e)}>
            <IconAngleLeft />
            <HiddenAccessibilityText>prev</HiddenAccessibilityText>
          </button>
        ) : null}
        <span>
          <span className={classes.month}>{month}</span>
          <span className={classes.year}>{year}</span>
        </span>
        {showMonthArrow ? (
          <button type="button" className={classes.nextButton} onClick={(e: any) => this.changeMonth(1, e)}>
            <IconAngleRight />
            <HiddenAccessibilityText>next</HiddenAccessibilityText>
          </button>
        ) : null}
      </div>
    )
  }

  renderWeekdays(classes: any) {
    const firstDayOfWeek = this.state.firstDayOfWeek
    const weekdays = []

    for (let i: number = firstDayOfWeek; i < 7 + firstDayOfWeek; i++) {
      const day = weekdaysShort[i]

      weekdays.push(
        <span className={classes.weekDay} key={i + day}>
          {day}
        </span>
      )
    }

    return weekdays
  }

  renderDays(classes: any) {
    // TODO: Split this logic into smaller chunks
    const { range, minDate, maxDate, disableDaysBeforeToday, specialDays, dateTooltip } = this.props

    const shownDate = this.getShownDate()
    const { date, firstDayOfWeek } = this.state
    const dateUnix = +parse(date)
    const monthNumber = getMonth(shownDate)
    const dayCount = getDaysInMonth(shownDate)
    const startOfMonthDay = getDay(startOfMonth(shownDate))
    const lastMonth = setMonth(shownDate, monthNumber - 1)
    const lastMonthDayCount = getDaysInMonth(lastMonth)
    // const nextMonth                = addMonths(startOfMonth(shownDate), 1)
    const days = []

    // Previous month's days
    const diff = Math.abs(firstDayOfWeek - (startOfMonthDay + 7)) % 7
    for (let i = diff - 1; i >= 0; i--) {
      const dayMoment = setDate(lastMonth, lastMonthDayCount - i)
      days.push({ dayMoment, isPassive: true, isFromPreviousMonth: true })
    }

    // Current month's days
    for (let i = 1; i <= dayCount; i++) {
      const dayMoment = setDate(shownDate, i)
      // set days before today to isPassive
      const _today = new Date()
      if (disableDaysBeforeToday && differenceInDays(dayMoment, _today) <= -1) {
        days.push({ dayMoment, isPassive: true })
      } else {
        days.push({ dayMoment })
      }
    }

    const today = startOfDay(new Date())

    return days.map((data, index) => {
      const { dayMoment, isPassive } = data
      const isSelected = !range && +parse(dayMoment) === dateUnix
      const isInRange = range && checkRange(dayMoment, range)
      const isStartEdge = range && checkStartEdge(dayMoment, range)
      const isEndEdge = (isStartEdge && range && !range.endDate) || (range && checkEndEdge(dayMoment, range))
      const isEdge = isStartEdge || isEndEdge
      const isToday = isEqual(today, dayMoment)
      const isSunday = getDay(dayMoment) === 0
      const isSpecialDay =
        specialDays && specialDays.some((specialDay: any) => isEqual(endOfDay(dayMoment), endOfDay(specialDay.date)))
      const isOutOfRange = isOutsideMinMax(dayMoment, minDate, maxDate)

      return (
        <DayCell
          onSelect={this.handleSelect}
          {...data}
          isStartEdge={isStartEdge}
          isEndEdge={isEndEdge}
          isSelected={isSelected || isEdge}
          isInRange={isInRange}
          isSunday={isSunday}
          isSpecialDay={isSpecialDay}
          isToday={isToday}
          key={index}
          isPassive={isPassive || isOutOfRange}
          classNames={classes}
          tooltip={dateTooltip}
        />
      )
    })
  }

  render() {
    const { classNames } = this.props

    const classes = { ...defaultClasses, ...classNames }

    return (
      <div className={classes.calendar}>
        <div className={classes.monthAndYear}>{this.renderMonthAndYear(classes)}</div>
        <div className={classes.weekDays}>{this.renderWeekdays(classes)}</div>
        <div className={classes.days}>{this.renderDays(classes)}</div>
      </div>
    )
  }
}

export default Calendar
