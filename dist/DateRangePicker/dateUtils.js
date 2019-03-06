import { endOfDay, isAfter, isBefore, isEqual, isWithinRange, startOfDay, } from 'date-fns';
export function checkRange(dayMoment, range) {
    return (isBefore(range.startDate, range.endDate)
        ? isWithinRange(dayMoment, range.startDate, range.endDate)
        : isWithinRange(dayMoment, range.endDate, range.startDate));
}
export function checkStartEdge(dayMoment, range) {
    var startDate = range.startDate;
    return isEqual(startOfDay(dayMoment), startOfDay(startDate));
}
export function checkEndEdge(dayMoment, range) {
    var endDate = range.endDate;
    return isEqual(endOfDay(dayMoment), endOfDay(endDate));
}
export function isOutsideMinMax(dayMoment, minDate, maxDate) {
    return ((minDate && isBefore(dayMoment, startOfDay(minDate))) ||
        (maxDate && isAfter(dayMoment, endOfDay(maxDate))));
}
