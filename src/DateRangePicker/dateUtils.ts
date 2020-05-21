import { AnyDate, DateRange } from './DateRangePicker'
import { endOfDay, isAfter, isBefore, isEqual, isWithinRange, startOfDay } from 'date-fns'

export function checkRange(dayMoment: AnyDate, range: DateRange) {
  return isBefore(range.startDate, range.endDate)
    ? isWithinRange(dayMoment, range.startDate, range.endDate)
    : isWithinRange(dayMoment, range.endDate, range.startDate)
}

export function checkStartEdge(dayMoment: AnyDate, range: DateRange) {
  const { startDate } = range

  return isEqual(startOfDay(dayMoment), startOfDay(startDate))
}

export function checkEndEdge(dayMoment: AnyDate, range: DateRange) {
  const { endDate } = range

  return isEqual(endOfDay(dayMoment), endOfDay(endDate))
}

export function isOutsideMinMax(dayMoment: AnyDate, minDate: AnyDate, maxDate: AnyDate) {
  return (minDate && isBefore(dayMoment, startOfDay(minDate))) || (maxDate && isAfter(dayMoment, endOfDay(maxDate)))
}
