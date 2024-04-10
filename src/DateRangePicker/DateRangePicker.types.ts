import { ReactNode } from 'react'

export type AnyDate = Date | string | number
export type DateFactory = () => AnyDate

export type DateRange<T = AnyDate> = {
  startDate: AnyDate | T
  endDate: AnyDate | T
}
export interface DateRangePickerBaseProps {
  rootClassName?: string
  children?: ReactNode
  className?: string
  clearButtonLabel?: string
  clearButtonColor?: string
  firstDayOfWeek?: number
  startDate?: AnyDate | DateFactory
  endDate?: AnyDate | DateFactory
  minDate?: AnyDate | DateFactory
  maxDate?: AnyDate | DateFactory
  minRangeLength?: number
  dateLimit?: DateFactory
  linkedCalendars?: boolean
  twoStepChange?: boolean
  onInit?: (range: DateRange<undefined>) => void
  onChange?: (range: DateRange<undefined>, source?: any) => void
  specialDays?: Array<any>
  format?: any
  lang?: any
  showApply?: boolean
  applyLabel?: string
  disableDaysBeforeToday?: any
  shownDate?: any
  showMonthArrow?: any
  dateTooltip?: any
  singleDateRange?: boolean
  showSingleMonthPicker?: boolean
  originalRange?: DateRange
  totalAmount?: string
  blockedDates?: string[]
  customHeaderComponent?: ReactNode
  shouldStartEmpty?: boolean
  showCloseButton?: boolean
  multiSelectedDates?: AnyDate[]
}

export interface DateRangePickerProps extends DateRangePickerBaseProps {
  rootClassName?: string
  show: boolean
  horizontalAlignment?: 'left' | 'right'
  onClose?: () => void
  onClickOut?: () => void
}

export interface DateRangePickerBaseState {
  range: DateRange<undefined>
  link: any
  linkStepsCount: number
}
