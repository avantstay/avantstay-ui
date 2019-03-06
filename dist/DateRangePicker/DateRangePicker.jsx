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
import endOfDay from 'date-fns/end_of_day';
import getMonth from 'date-fns/get_month';
import getYear from 'date-fns/get_year';
import isAfter from 'date-fns/is_after';
import isEqual from 'date-fns/is_equal';
import startOfDay from 'date-fns/start_of_day';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import isDescendant from '../utils/isDescendant';
import { offsetLeft, offsetTop } from '../utils/offset';
import Calendar from './Calendar';
import { CalendarContainer, ClearButton, ClearButtonContainer, CloseButton, IconClose, } from './Calendar.styles';
import { defaultClasses } from './enums';
var calendarRoot = document.createElement('div');
document.body.appendChild(calendarRoot);
var getDate = function (date, defaultValue) {
    if (defaultValue === void 0) { defaultValue = ''; }
    return (typeof date === 'function' ? date() : date) || defaultValue;
};
var DateRangePicker = /** @class */ (function (_super) {
    __extends(DateRangePicker, _super);
    function DateRangePicker(props) {
        var _this = _super.call(this, props) || this;
        _this.step = 0;
        _this.onClickOut = function (e) {
            if (!isDescendant(_this.calendarContainerRef.current, e.target))
                _this.props.onClose();
        };
        _this.orderRange = function (range) {
            var startDate = range.startDate, endDate = range.endDate;
            var swap = isAfter(startDate, endDate);
            if (!swap)
                return range;
            return {
                startDate: endDate,
                endDate: startDate,
            };
        };
        _this.setRange = function (range, source, triggerChange) {
            var onChange = _this.props.onChange;
            range = _this.orderRange(range);
            _this.setState({ range: range }, function () { return triggerChange && onChange && onChange(range, source); });
        };
        _this.handleSelect = function (date, source) {
            _this.setState({ linkStepsCount: 0 });
            if (date.hasOwnProperty('startDate') && date.hasOwnProperty('endDate')) {
                _this.step = 0;
                return _this.setRange(date, source, true);
            }
            var _a = _this.state.range, startDate = _a.startDate, endDate = _a.endDate;
            var range = {
                startDate: startDate,
                endDate: endDate,
            };
            switch (_this.step) {
                case 0:
                    range.startDate = date;
                    range.endDate = date;
                    _this.step = 1;
                    break;
                case 1:
                    range.endDate = date;
                    _this.step = 0;
                    break;
            }
            var triggerChange = !_this.props.twoStepChange || _this.step === 0 &&
                _this.props.twoStepChange;
            _this.setRange(range, source, triggerChange);
        };
        _this.moveCalendarDisplay = function (direction) {
            var _a = _this.state, link = _a.link, linkStepsCount = _a.linkStepsCount;
            _this.setState({
                linkStepsCount: linkStepsCount - direction,
                link: addMonths(link, direction),
            });
        };
        _this.clearRange = function () {
            _this.setRange({ startDate: undefined, endDate: undefined });
            _this.props.onChange &&
                _this.props.onChange({ startDate: undefined, endDate: undefined });
        };
        _this.resetPosition = function () {
            _this.moveCalendarDisplay(_this.state.linkStepsCount);
        };
        var linkedCalendars = props.linkedCalendars;
        var startDate = startOfDay(getDate(props.startDate, new Date()));
        var endDate = endOfDay(getDate(props.endDate, new Date()));
        _this.calendarContainerRef = React.createRef();
        _this.positioningRef = React.createRef();
        _this.state = {
            range: { startDate: startDate, endDate: endDate },
            link: linkedCalendars && endDate,
            linkStepsCount: 0,
        };
        return _this;
    }
    DateRangePicker.prototype.componentDidMount = function () {
        var onInit = this.props.onInit;
        onInit && onInit(this.state.range);
        if (this.props.show) {
            window.addEventListener('click', this.onClickOut);
        }
    };
    DateRangePicker.prototype.componentWillReceiveProps = function (nextProps) {
        var _this = this;
        if (nextProps.startDate || nextProps.endDate) {
            var startDate = nextProps.startDate &&
                startOfDay(getDate(nextProps.startDate));
            var endDate = nextProps.endDate && endOfDay(getDate(nextProps.endDate));
            var oldStartDate = this.props.startDate &&
                startOfDay(getDate(this.props.startDate));
            var oldEndDate = this.props.endDate &&
                endOfDay((getDate(this.props.endDate)));
            if (!isEqual(startDate, oldStartDate) ||
                !isEqual(endDate, oldEndDate)) {
                this.setRange({
                    startDate: startDate || oldStartDate,
                    endDate: endDate || oldEndDate,
                });
            }
        }
        if (!this.props.show && nextProps.show) {
            setTimeout(function () { return window.addEventListener('click', _this.onClickOut); }, 10);
        }
        if (this.props.show && !nextProps.show) {
            window.removeEventListener('click', this.onClickOut);
        }
    };
    DateRangePicker.prototype.componentWillUnmount = function () {
        window.removeEventListener('click', this.onClickOut);
    };
    Object.defineProperty(DateRangePicker.prototype, "offsetTop", {
        get: function () {
            return offsetTop(this.positioningRef.current);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateRangePicker.prototype, "offsetLeft", {
        get: function () {
            return offsetLeft(this.positioningRef.current);
        },
        enumerable: true,
        configurable: true
    });
    DateRangePicker.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, format = _a.format, linkedCalendars = _a.linkedCalendars, calendars = _a.calendars, firstDayOfWeek = _a.firstDayOfWeek, minDate = _a.minDate, maxDate = _a.maxDate, classNames = _a.classNames, specialDays = _a.specialDays, lang = _a.lang, offsetPositive = _a.offsetPositive, rangedCalendars = _a.rangedCalendars, disableDaysBeforeToday = _a.disableDaysBeforeToday, shownDate = _a.shownDate, showMonthArrow = _a.showMonthArrow, onClose = _a.onClose, show = _a.show, clearButtonLabel = _a.clearButtonLabel;
        var _b = this.state, range = _b.range, link = _b.link;
        var classes = __assign({}, defaultClasses, classNames);
        var yearsDiff = getYear(range.endDate) -
            getYear(range.startDate);
        var monthsDiff = getMonth(range.endDate) -
            getMonth(range.startDate);
        var diff = yearsDiff * 12 + monthsDiff;
        var calendarsCount = Number(calendars) - 1;
        return (<div ref={this.positioningRef}>
        {ReactDOM.createPortal(<CalendarContainer ref={this.calendarContainerRef} className={className} show={show} top={this.offsetTop} left={this.offsetLeft}>
            <div className={classes.dateRange}>
              {(function () {
            var _calendars = [];
            var _method = offsetPositive ? 'unshift' : 'push';
            for (var i = calendarsCount; i >= 0; i--) {
                var offset = offsetPositive ? i : -i;
                var realDiff = offsetPositive ? diff : -diff;
                var realOffset = (rangedCalendars && i == calendarsCount &&
                    diff != 0) ? realDiff : offset;
                _calendars[_method](<Calendar showMonthArrow={showMonthArrow} shownDate={shownDate} disableDaysBeforeToday={disableDaysBeforeToday} lang={lang} key={i} offset={realOffset} link={linkedCalendars && link} linkCB={_this.moveCalendarDisplay.bind(_this)} range={range} format={format} firstDayOfWeek={firstDayOfWeek} minDate={minDate} maxDate={maxDate} specialDays={specialDays} classNames={classes} onChange={_this.handleSelect.bind(_this)}/>);
            }
            return ([
                _calendars[0],
                <ClearButtonContainer key="clearButton">
                    <ClearButton show={range.startDate || range.endDate} onClick={_this.clearRange}>
                      {clearButtonLabel}
                    </ClearButton>
                    <CloseButton onClick={onClose}>
                      <IconClose />
                    </CloseButton>
                  </ClearButtonContainer>,
                _calendars[1],
            ]);
        })()}
            </div>
          </CalendarContainer>, calendarRoot)}
      </div>);
    };
    DateRangePicker.defaultProps = {
        linkedCalendars: true,
        format: 'DD/MM/YYYY',
        calendars: 2,
        offsetPositive: true,
        classNames: {},
        specialDays: [],
        rangedCalendars: false,
        twoStepChange: false,
        clearButtonLabel: 'Clear',
    };
    return DateRangePicker;
}(Component));
export default DateRangePicker;
