"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var date_fns_1 = require("date-fns");
function checkRange(dayMoment, range) {
    return (date_fns_1.isBefore(range.startDate, range.endDate)
        ? date_fns_1.isWithinRange(dayMoment, range.startDate, range.endDate)
        : date_fns_1.isWithinRange(dayMoment, range.endDate, range.startDate));
}
exports.checkRange = checkRange;
function checkStartEdge(dayMoment, range) {
    var startDate = range.startDate;
    return date_fns_1.isEqual(date_fns_1.startOfDay(dayMoment), date_fns_1.startOfDay(startDate));
}
exports.checkStartEdge = checkStartEdge;
function checkEndEdge(dayMoment, range) {
    var endDate = range.endDate;
    return date_fns_1.isEqual(date_fns_1.endOfDay(dayMoment), date_fns_1.endOfDay(endDate));
}
exports.checkEndEdge = checkEndEdge;
function isOutsideMinMax(dayMoment, minDate, maxDate) {
    return ((minDate && date_fns_1.isBefore(dayMoment, date_fns_1.startOfDay(minDate))) ||
        (maxDate && date_fns_1.isAfter(dayMoment, date_fns_1.endOfDay(maxDate))));
}
exports.isOutsideMinMax = isOutsideMinMax;
