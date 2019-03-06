var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import addMonths from 'date-fns/add_months';
import differenceInDays from 'date-fns/difference_in_days';
import endOfDay from 'date-fns/end_of_day';
import getDay from 'date-fns/get_day';
import getDaysInMonth from 'date-fns/get_days_in_month';
import getMonth from 'date-fns/get_month';
import getYear from 'date-fns/get_year';
import isEqual from 'date-fns/is_equal';
import isSameDay from 'date-fns/is_same_day';
import parse from 'date-fns/parse';
import setDate from 'date-fns/set_date';
import setMonth from 'date-fns/set_month';
import startOfDay from 'date-fns/start_of_day';
import startOfMonth from 'date-fns/start_of_month';
import * as React from 'react';
import { IconAngleLeft, IconAngleRight } from './Calendar.styles';
import { checkEndEdge, checkRange, checkStartEdge, isOutsideMinMax, } from './dateUtils';
import DayCell from './DayCell';
import { defaultClasses, months } from './enums';
import { HiddenAccessibilityText } from './HiddenAccessibilityText';
import { weekdaysShort } from './weekdays';
var Calendar = /** @class */ (function (_super) {
    __extends(Calendar, _super);
    function Calendar(props, context) {
        var _this = _super.call(this, props, context) || this;
        var range = props.range, offset = props.offset, firstDayOfWeek = props.firstDayOfWeek, shownDate = props.shownDate;
        var date = props.date && startOfDay(props.date || new Date());
        _this.state = {
            date: date,
            shownDate: addMonths(shownDate || range && range.endDate || date, offset),
            firstDayOfWeek: firstDayOfWeek || 0,
        };
        _this.getShownDate = _this.getShownDate.bind(_this);
        _this.handleSelect = _this.handleSelect.bind(_this);
        _this.changeMonth = _this.changeMonth.bind(_this);
        _this.renderMonthAndYear = _this.renderMonthAndYear.bind(_this);
        _this.renderWeekdays = _this.renderWeekdays.bind(_this);
        _this.renderDays = _this.renderDays.bind(_this);
        return _this;
    }
    Calendar.prototype.componentDidMount = function () {
        var onInit = this.props.onInit;
        onInit && onInit(this.state.date);
    };
    Calendar.prototype.componentWillReceiveProps = function (nextProps) {
        var range = nextProps.range, offset = nextProps.offset;
        var oldRange = this.props.oldRange;
        if ((range && range['endDate'] &&
            !isSameDay(range['endDate'], range['startDate'])) ||
            (oldRange && !isEqual(oldRange['startDate'], range['startDate']))) {
            this.setState({ shownDate: addMonths(range['endDate'], offset) });
        }
    };
    Calendar.prototype.getShownDate = function () {
        var _a = this.props, link = _a.link, offset = _a.offset;
        var shownDate = (link) ? addMonths(link, offset) : this.state.shownDate;
        return shownDate;
    };
    Calendar.prototype.handleSelect = function (newDate) {
        var _a = this.props, link = _a.link, onChange = _a.onChange;
        onChange && onChange(newDate, Calendar);
        if (!link) {
            this.setState({ date: newDate });
        }
    };
    Calendar.prototype.changeMonth = function (direction, event) {
        event.preventDefault();
        var _a = this.props, link = _a.link, linkCB = _a.linkCB;
        if (link && linkCB) {
            return linkCB(direction);
        }
        var newMonth = addMonths(this.state.shownDate, direction);
        this.setState({
            shownDate: newMonth,
        });
    };
    Calendar.prototype.renderMonthAndYear = function (classes) {
        var _this = this;
        var showMonthArrow = this.props.showMonthArrow;
        var shownDate = this.getShownDate();
        var month = months[getMonth(shownDate)];
        var year = getYear(shownDate);
        return (<div className={classes.monthAndYearWrapper}>
        {showMonthArrow ?
            <button type="button" className={classes.prevButton} onClick={function (e) { return _this.changeMonth(-1, e); }}>
              <IconAngleLeft />
              <HiddenAccessibilityText>prev</HiddenAccessibilityText>
            </button> : null}
        <span>
          <span className={classes.month}>{month}</span>
          <span className={classes.year}>{year}</span>
        </span>
        {showMonthArrow ?
            <button type="button" className={classes.nextButton} onClick={function (e) { return _this.changeMonth(1, e); }}>
              <IconAngleRight />
              <HiddenAccessibilityText>next</HiddenAccessibilityText>
            </button> : null}
      </div>);
    };
    Calendar.prototype.renderWeekdays = function (classes) {
        var firstDayOfWeek = this.state.firstDayOfWeek;
        var weekdays = [];
        for (var i = firstDayOfWeek; i < 7 + firstDayOfWeek; i++) {
            var day = weekdaysShort[i];
            weekdays.push(<span className={classes.weekDay} key={i + day}>
          {day}
        </span>);
        }
        return weekdays;
    };
    Calendar.prototype.renderDays = function (classes) {
        var _this = this;
        // TODO: Split this logic into smaller chunks
        var _a = this.props, range = _a.range, minDate = _a.minDate, maxDate = _a.maxDate, disableDaysBeforeToday = _a.disableDaysBeforeToday, specialDays = _a.specialDays;
        var shownDate = this.getShownDate();
        var _b = this.state, date = _b.date, firstDayOfWeek = _b.firstDayOfWeek;
        var dateUnix = +parse(date);
        var monthNumber = getMonth(shownDate);
        var dayCount = getDaysInMonth(shownDate);
        var startOfMonthDay = getDay(startOfMonth(shownDate));
        var lastMonth = setMonth(shownDate, monthNumber - 1);
        var lastMonthDayCount = getDaysInMonth(lastMonth);
        // const nextMonth                = addMonths(startOfMonth(shownDate), 1)
        var days = [];
        // Previous month's days
        var diff = (Math.abs(firstDayOfWeek - (startOfMonthDay + 7)) % 7);
        for (var i = diff - 1; i >= 0; i--) {
            var dayMoment = setDate(lastMonth, lastMonthDayCount - i);
            days.push({ dayMoment: dayMoment, isPassive: true, isFromPreviousMonth: true });
        }
        // Current month's days
        for (var i = 1; i <= dayCount; i++) {
            var dayMoment = setDate(shownDate, i);
            // set days before today to isPassive
            var _today = new Date();
            if (disableDaysBeforeToday && differenceInDays(dayMoment, _today) <= -1) {
                days.push({ dayMoment: dayMoment, isPassive: true });
            }
            else {
                days.push({ dayMoment: dayMoment });
            }
        }
        var today = startOfDay(new Date());
        return days.map(function (data, index) {
            var dayMoment = data.dayMoment, isPassive = data.isPassive;
            var isSelected = !range && (+parse(dayMoment) === dateUnix);
            var isInRange = range && checkRange(dayMoment, range);
            var isStartEdge = range && checkStartEdge(dayMoment, range);
            var isEndEdge = range && checkEndEdge(dayMoment, range);
            var isEdge = isStartEdge || isEndEdge;
            var isToday = isEqual(today, dayMoment);
            var isSunday = getDay(dayMoment) === 0;
            var isSpecialDay = specialDays && specialDays.some(function (specialDay) { return isEqual(endOfDay(dayMoment), endOfDay(specialDay.date)); });
            var isOutOfRange = isOutsideMinMax(dayMoment, minDate, maxDate);
            return (<DayCell onSelect={_this.handleSelect} {...data} isStartEdge={isStartEdge} isEndEdge={isEndEdge} isSelected={isSelected || isEdge} isInRange={isInRange} isSunday={isSunday} isSpecialDay={isSpecialDay} isToday={isToday} key={index} isPassive={isPassive || isOutOfRange} classNames={classes}/>);
        });
    };
    Calendar.prototype.render = function () {
        var classNames = this.props.classNames;
        var classes = __assign({}, defaultClasses, classNames);
        return (<div className={classes.calendar}>
        <div className={classes.monthAndYear}>{this.renderMonthAndYear(classes)}</div>
        <div className={classes.weekDays}>{this.renderWeekdays(classes)}</div>
        <div className={classes.days}>{this.renderDays(classes)}</div>
      </div>);
    };
    Calendar.defaultProps = {
        format: 'DD/MM/YYYY',
        showMonthArrow: true,
        disableDaysBeforeToday: false,
        classNames: {},
        specialDays: [],
    };
    return Calendar;
}(React.Component));
export default Calendar;
