import addMonths from 'date-fns/add_months'
import differenceInDays from 'date-fns/difference_in_days'
import eachDay from 'date-fns/each_day'
import endOfDay from 'date-fns/end_of_day'
import format from 'date-fns/format'
import getDay from 'date-fns/get_day'
import getDaysInMonth from 'date-fns/get_days_in_month'
import getMonth from 'date-fns/get_month'
import getYear from 'date-fns/get_year'
import isAfter from 'date-fns/is_after'
import isBefore from 'date-fns/is_before'
import isEqual from 'date-fns/is_equal'
import isSameDay from 'date-fns/is_same_day'
import parse from 'date-fns/parse'
import setDate from 'date-fns/set_date'
import setMonth from 'date-fns/set_month'
import startOfDay from 'date-fns/start_of_day'
import startOfMonth from 'date-fns/start_of_month'
import * as React from 'react'
import { IconAngleLeft, IconAngleRight, IconButton } from './Calendar.styles'
import { AnyDate, DateRange, SpecialDay } from './DateRangePicker.types'
import { checkEndEdge, checkRange, checkStartEdge, isOutsideMinMax } from './dateUtils'
import DayCell from './DayCell'
import { defaultClasses, months } from './enums'
import { HiddenAccessibilityText } from './HiddenAccessibilityText'
import { twoWeekdaysShort } from './weekdays'

export interface CalendarProps {
  showMonthArrow: boolean
  disableDaysBeforeToday: boolean
  lang: string
  sets: string
  range: {
    startDate: any
    endDate: any
  }
  originalRange?: {
    startDate: any
    endDate: any
  }
  minDate: any
  maxDate: any
  minRangeLength?: number
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
  specialDays: SpecialDay[]
  classNames: any
  locale: string
  dateTooltip?: any
  singleDateRange?: boolean
  blockedDates?: string[]
  multiSelectedDates?: AnyDate[]
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
    showSingleMonthPicker: false,
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
    const { showMonthArrow, showSingleMonthPicker } = this.props

    const shownDate = this.getShownDate()
    const month = months[getMonth(shownDate)]
    const year = getYear(shownDate)

    return (
      <div className={showSingleMonthPicker ? classes.monthAndYearWrapperSingleMonth : classes.monthAndYearWrapper}>
        {showMonthArrow ? (
          <IconButton type="button" className={classes.prevButton} onClick={(e: any) => this.changeMonth(-1, e)}>
            <IconAngleLeft />
            <HiddenAccessibilityText>prev</HiddenAccessibilityText>
          </IconButton>
        ) : null}
        <span className={classes.monthAndYearContainer}>
          <span className={classes.month}>{month}</span>
          <span className={classes.year}>{year}</span>
        </span>
        {showMonthArrow ? (
          <IconButton
            type="button"
            className={showSingleMonthPicker ? classes.nextButtonSingleMonth : classes.nextButton}
            onClick={(e: any) => this.changeMonth(1, e)}
          >
            <IconAngleRight />
            <HiddenAccessibilityText>next</HiddenAccessibilityText>
          </IconButton>
        ) : null}
      </div>
    )
  }

  renderWeekdays(classes: any) {
    const firstDayOfWeek = this.state.firstDayOfWeek
    const weekdays = []

    for (let i: number = firstDayOfWeek; i < 7 + firstDayOfWeek; i++) {
      const day = twoWeekdaysShort[i]

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
    const {
      range,
      minDate,
      maxDate,
      minRangeLength,
      disableDaysBeforeToday,
      specialDays,
      dateTooltip,
      originalRange,
      blockedDates,
      multiSelectedDates,
    } = this.props

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
        // if there is minRangeLength, some days will be disabled (passive) for endDate selection
        const isPassive =
          minRangeLength &&
          range.startDate &&
          !range.endDate &&
          Math.abs(differenceInDays(dayMoment, range.startDate)) < minRangeLength
        days.push({ dayMoment, isPassive })
      }
    }

    const today = startOfDay(new Date())

    return days.map((data, index) => {
      const { dayMoment, isPassive } = data
      const formattedDay = format(dayMoment, 'YYYY-MM-DD')
      const isSelected = !range && +parse(dayMoment) === dateUnix
      const isMultiDateSelected = multiSelectedDates?.some(date => format(date, 'YYYY-MM-DD') === formattedDay)
      const isInRange = range && checkRange(dayMoment, range)
      const isStartEdge = range && checkStartEdge(dayMoment, range)
      const isEndEdge = (isStartEdge && range && !range.endDate) || (range && checkEndEdge(dayMoment, range))
      const isEdge = isStartEdge || isEndEdge
      const isToday = isEqual(today, dayMoment)
      const isSunday = getDay(dayMoment) === 0
      const isInOriginalRange = originalRange && checkRange(dayMoment, originalRange)
      const specialDay =
        specialDays && specialDays.find((specialDay: any) => isEqual(endOfDay(dayMoment), endOfDay(specialDay.date)))
      const isSpecialDay = Boolean(specialDay)
      const isOutOfRange = isOutsideMinMax(dayMoment, minDate, maxDate)
      const shouldNotApplyPassive = !isInOriginalRange && !isInRange && !isStartEdge
      const isBlockedDay = blockedDates && blockedDates.includes(formattedDay)

      const isAllDaysBeforeAvailable = () => {
        if (multiSelectedDates) {
          return true
        }
        return blockedDates && range && !range.endDate && isBefore(dayMoment, range.startDate)
          ? eachDay(dayMoment, range.startDate)
              .map(it => format(it, 'YYYY-MM-DD'))
              .every(it => !blockedDates.includes(it))
          : true
      }

      const isAllDaysAfterAvailable = () => {
        if (multiSelectedDates) {
          return true
        }
        return blockedDates && range && !range.endDate && isAfter(dayMoment, range.startDate)
          ? eachDay(range.startDate, dayMoment)
              .map(it => format(it, 'YYYY-MM-DD'))
              .every(it => !blockedDates.includes(it))
          : true
      }
      const shouldNotHighlight =
        originalRange &&
        range &&
        isEqual(startOfDay(originalRange.startDate), startOfDay(range.startDate)) &&
        isEqual(startOfDay(originalRange.endDate), startOfDay(range.endDate))

      return (
        <DayCell
          onSelect={this.handleSelect}
          {...data}
          isStartEdge={!shouldNotHighlight && isStartEdge}
          isEndEdge={!shouldNotHighlight && isEndEdge}
          hasOriginalRange={!!originalRange}
          isInOriginalRange={isInOriginalRange}
          isSelected={multiSelectedDates ? isMultiDateSelected : !shouldNotHighlight && (isSelected || isEdge)}
          isInRange={isInRange}
          isSunday={isSunday}
          isSpecialDay={isSpecialDay}
          specialDay={specialDay}
          isToday={isToday}
          key={index}
          isPassive={
            shouldNotApplyPassive &&
            (isPassive || isOutOfRange || isBlockedDay || !isAllDaysBeforeAvailable() || !isAllDaysAfterAvailable())
          }
          classNames={classes}
          tooltip={dateTooltip}
        />
      )
    })
  }

  render() {
    const { classNames, offset } = this.props

    const classes = { ...defaultClasses, ...classNames }

    return (
      <div className={`${classes.calendar} ${classes.calendar}-${offset}`}>
        <div className={classes.monthAndYear}>{this.renderMonthAndYear(classes)}</div>
        <div className={classes.weekDays}>{this.renderWeekdays(classes)}</div>
        <div className={classes.days}>{this.renderDays(classes)}</div>
      </div>
    )
  }
}

export default Calendar
