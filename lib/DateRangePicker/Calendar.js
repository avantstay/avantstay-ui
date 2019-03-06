"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var add_months_1 = __importDefault(require("date-fns/add_months"));
var difference_in_days_1 = __importDefault(require("date-fns/difference_in_days"));
var end_of_day_1 = __importDefault(require("date-fns/end_of_day"));
var get_day_1 = __importDefault(require("date-fns/get_day"));
var get_days_in_month_1 = __importDefault(require("date-fns/get_days_in_month"));
var get_month_1 = __importDefault(require("date-fns/get_month"));
var get_year_1 = __importDefault(require("date-fns/get_year"));
var is_equal_1 = __importDefault(require("date-fns/is_equal"));
var is_same_day_1 = __importDefault(require("date-fns/is_same_day"));
var parse_1 = __importDefault(require("date-fns/parse"));
var set_date_1 = __importDefault(require("date-fns/set_date"));
var set_month_1 = __importDefault(require("date-fns/set_month"));
var start_of_day_1 = __importDefault(require("date-fns/start_of_day"));
var start_of_month_1 = __importDefault(require("date-fns/start_of_month"));
var React = __importStar(require("react"));
var Calendar_styles_1 = require("./Calendar.styles");
var dateUtils_1 = require("./dateUtils");
var DayCell_1 = __importDefault(require("./DayCell"));
var enums_1 = require("./enums");
var HiddenAccessibilityText_1 = require("./HiddenAccessibilityText");
var weekdays_1 = require("./weekdays");
var Calendar = /** @class */ (function (_super) {
    __extends(Calendar, _super);
    function Calendar(props, context) {
        var _this = _super.call(this, props, context) || this;
        var range = props.range, offset = props.offset, firstDayOfWeek = props.firstDayOfWeek, shownDate = props.shownDate;
        var date = props.date && start_of_day_1.default(props.date || new Date());
        _this.state = {
            date: date,
            shownDate: add_months_1.default(shownDate || range && range.endDate || date, offset),
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
            !is_same_day_1.default(range['endDate'], range['startDate'])) ||
            (oldRange && !is_equal_1.default(oldRange['startDate'], range['startDate']))) {
            this.setState({ shownDate: add_months_1.default(range['endDate'], offset) });
        }
    };
    Calendar.prototype.getShownDate = function () {
        var _a = this.props, link = _a.link, offset = _a.offset;
        var shownDate = (link) ? add_months_1.default(link, offset) : this.state.shownDate;
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
        var newMonth = add_months_1.default(this.state.shownDate, direction);
        this.setState({
            shownDate: newMonth,
        });
    };
    Calendar.prototype.renderMonthAndYear = function (classes) {
        var _this = this;
        var showMonthArrow = this.props.showMonthArrow;
        var shownDate = this.getShownDate();
        var month = enums_1.months[get_month_1.default(shownDate)];
        var year = get_year_1.default(shownDate);
        return (React.createElement("div", { className: classes.monthAndYearWrapper },
            showMonthArrow ?
                React.createElement("button", { type: "button", className: classes.prevButton, onClick: function (e) { return _this.changeMonth(-1, e); } },
                    React.createElement(Calendar_styles_1.IconAngleLeft, null),
                    React.createElement(HiddenAccessibilityText_1.HiddenAccessibilityText, null, "prev")) : null,
            React.createElement("span", null,
                React.createElement("span", { className: classes.month }, month),
                React.createElement("span", { className: classes.year }, year)),
            showMonthArrow ?
                React.createElement("button", { type: "button", className: classes.nextButton, onClick: function (e) { return _this.changeMonth(1, e); } },
                    React.createElement(Calendar_styles_1.IconAngleRight, null),
                    React.createElement(HiddenAccessibilityText_1.HiddenAccessibilityText, null, "next")) : null));
    };
    Calendar.prototype.renderWeekdays = function (classes) {
        var firstDayOfWeek = this.state.firstDayOfWeek;
        var weekdays = [];
        for (var i = firstDayOfWeek; i < 7 + firstDayOfWeek; i++) {
            var day = weekdays_1.weekdaysShort[i];
            weekdays.push(React.createElement("span", { className: classes.weekDay, key: i + day }, day));
        }
        return weekdays;
    };
    Calendar.prototype.renderDays = function (classes) {
        var _this = this;
        // TODO: Split this logic into smaller chunks
        var _a = this.props, range = _a.range, minDate = _a.minDate, maxDate = _a.maxDate, disableDaysBeforeToday = _a.disableDaysBeforeToday, specialDays = _a.specialDays;
        var shownDate = this.getShownDate();
        var _b = this.state, date = _b.date, firstDayOfWeek = _b.firstDayOfWeek;
        var dateUnix = +parse_1.default(date);
        var monthNumber = get_month_1.default(shownDate);
        var dayCount = get_days_in_month_1.default(shownDate);
        var startOfMonthDay = get_day_1.default(start_of_month_1.default(shownDate));
        var lastMonth = set_month_1.default(shownDate, monthNumber - 1);
        var lastMonthDayCount = get_days_in_month_1.default(lastMonth);
        // const nextMonth                = addMonths(startOfMonth(shownDate), 1)
        var days = [];
        // Previous month's days
        var diff = (Math.abs(firstDayOfWeek - (startOfMonthDay + 7)) % 7);
        for (var i = diff - 1; i >= 0; i--) {
            var dayMoment = set_date_1.default(lastMonth, lastMonthDayCount - i);
            days.push({ dayMoment: dayMoment, isPassive: true, isFromPreviousMonth: true });
        }
        // Current month's days
        for (var i = 1; i <= dayCount; i++) {
            var dayMoment = set_date_1.default(shownDate, i);
            // set days before today to isPassive
            var _today = new Date();
            if (disableDaysBeforeToday && difference_in_days_1.default(dayMoment, _today) <= -1) {
                days.push({ dayMoment: dayMoment, isPassive: true });
            }
            else {
                days.push({ dayMoment: dayMoment });
            }
        }
        var today = start_of_day_1.default(new Date());
        return days.map(function (data, index) {
            var dayMoment = data.dayMoment, isPassive = data.isPassive;
            var isSelected = !range && (+parse_1.default(dayMoment) === dateUnix);
            var isInRange = range && dateUtils_1.checkRange(dayMoment, range);
            var isStartEdge = range && dateUtils_1.checkStartEdge(dayMoment, range);
            var isEndEdge = range && dateUtils_1.checkEndEdge(dayMoment, range);
            var isEdge = isStartEdge || isEndEdge;
            var isToday = is_equal_1.default(today, dayMoment);
            var isSunday = get_day_1.default(dayMoment) === 0;
            var isSpecialDay = specialDays && specialDays.some(function (specialDay) { return is_equal_1.default(end_of_day_1.default(dayMoment), end_of_day_1.default(specialDay.date)); });
            var isOutOfRange = dateUtils_1.isOutsideMinMax(dayMoment, minDate, maxDate);
            return (React.createElement(DayCell_1.default, __assign({ onSelect: _this.handleSelect }, data, { isStartEdge: isStartEdge, isEndEdge: isEndEdge, isSelected: isSelected || isEdge, isInRange: isInRange, isSunday: isSunday, isSpecialDay: isSpecialDay, isToday: isToday, key: index, isPassive: isPassive || isOutOfRange, classNames: classes })));
        });
    };
    Calendar.prototype.render = function () {
        var classNames = this.props.classNames;
        var classes = __assign({}, enums_1.defaultClasses, classNames);
        return (React.createElement("div", { className: classes.calendar },
            React.createElement("div", { className: classes.monthAndYear }, this.renderMonthAndYear(classes)),
            React.createElement("div", { className: classes.weekDays }, this.renderWeekdays(classes)),
            React.createElement("div", { className: classes.days }, this.renderDays(classes))));
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
exports.default = Calendar;
