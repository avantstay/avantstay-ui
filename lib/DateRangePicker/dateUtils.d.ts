import { AnyDate, DateRange } from './DateRangePicker';
export declare function checkRange(dayMoment: AnyDate, range: DateRange): boolean;
export declare function checkStartEdge(dayMoment: AnyDate, range: DateRange): boolean;
export declare function checkEndEdge(dayMoment: AnyDate, range: DateRange): boolean;
export declare function isOutsideMinMax(dayMoment: AnyDate, minDate: AnyDate, maxDate: AnyDate): boolean | "" | 0;
