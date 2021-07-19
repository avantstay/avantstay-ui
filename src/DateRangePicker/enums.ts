import format from 'date-fns/format'

export const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].reduce(
  (acc, curr) =>
    Object.assign(acc, {
      [curr]: format(new Date(2000, curr, 1), 'MMMM'),
    }),
  {} as any
)

export const defaultClasses = {
  calendar: 'rdr-Calendar',
  dateRange: 'rdr-DateRange',
  predefinedRanges: 'rdr-PredefinedRanges',
  predefinedRangesItem: 'rdr-PredefinedRangesItem',
  predefinedRangesItemActive: 'rdr-PredefinedRangesItemActive',
  monthAndYear: 'rdr-MonthAndYear',
  weekDays: 'rdr-WeekDays',
  weekDay: 'rdr-WeekDay',
  days: 'rdr-Days',
  day: 'rdr-Day',
  dayWrapper: 'rdr-DayWrapper',
  dayActive: 'is-selected',
  dayPassive: 'is-passive',
  dayInRange: 'is-inRange',
  dayStartEdge: 'is-startEdge',
  dayEndEdge: 'is-endEdge',
  dayToday: 'is-today',
  dayFromPreviousMonth: 'is-fromPreviousMonth',
  monthAndYearWrapper: 'rdr-MonthAndYear-innerWrapper',
  monthAndYearWrapperSingleMonth: 'rdr-MonthAndYear-innerWrapper single',
  prevButton: 'rdr-MonthAndYear-button prev',
  nextButton: 'rdr-MonthAndYear-button next',
  nextButtonSingleMonth: 'rdr-MonthAndYear-button next-single',
  month: 'rdr-MonthAndYear-month',
  monthAndYearDivider: 'rdr-MonthAndYear-divider',
  year: 'rdr-MonthAndYear-year',
  daySunday: 'rdr-Sunday',
  daySpecialDay: 'rdr-SpecialDay',
}
