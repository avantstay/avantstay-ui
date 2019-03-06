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
var end_of_day_1 = __importDefault(require("date-fns/end_of_day"));
var get_month_1 = __importDefault(require("date-fns/get_month"));
var get_year_1 = __importDefault(require("date-fns/get_year"));
var is_after_1 = __importDefault(require("date-fns/is_after"));
var is_equal_1 = __importDefault(require("date-fns/is_equal"));
var start_of_day_1 = __importDefault(require("date-fns/start_of_day"));
var react_1 = __importStar(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var isDescendant_1 = __importDefault(require("../utils/isDescendant"));
var offset_1 = require("../utils/offset");
var Calendar_1 = __importDefault(require("./Calendar"));
var Calendar_styles_1 = require("./Calendar.styles");
var enums_1 = require("./enums");
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
            if (!isDescendant_1.default(_this.calendarContainerRef.current, e.target))
                _this.props.onClose();
        };
        _this.orderRange = function (range) {
            var startDate = range.startDate, endDate = range.endDate;
            var swap = is_after_1.default(startDate, endDate);
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
                link: add_months_1.default(link, direction),
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
        var startDate = start_of_day_1.default(getDate(props.startDate, new Date()));
        var endDate = end_of_day_1.default(getDate(props.endDate, new Date()));
        _this.calendarContainerRef = react_1.default.createRef();
        _this.positioningRef = react_1.default.createRef();
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
                start_of_day_1.default(getDate(nextProps.startDate));
            var endDate = nextProps.endDate && end_of_day_1.default(getDate(nextProps.endDate));
            var oldStartDate = this.props.startDate &&
                start_of_day_1.default(getDate(this.props.startDate));
            var oldEndDate = this.props.endDate &&
                end_of_day_1.default((getDate(this.props.endDate)));
            if (!is_equal_1.default(startDate, oldStartDate) ||
                !is_equal_1.default(endDate, oldEndDate)) {
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
            return offset_1.offsetTop(this.positioningRef.current);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DateRangePicker.prototype, "offsetLeft", {
        get: function () {
            return offset_1.offsetLeft(this.positioningRef.current);
        },
        enumerable: true,
        configurable: true
    });
    DateRangePicker.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, format = _a.format, linkedCalendars = _a.linkedCalendars, calendars = _a.calendars, firstDayOfWeek = _a.firstDayOfWeek, minDate = _a.minDate, maxDate = _a.maxDate, classNames = _a.classNames, specialDays = _a.specialDays, lang = _a.lang, offsetPositive = _a.offsetPositive, rangedCalendars = _a.rangedCalendars, disableDaysBeforeToday = _a.disableDaysBeforeToday, shownDate = _a.shownDate, showMonthArrow = _a.showMonthArrow, onClose = _a.onClose, show = _a.show, clearButtonLabel = _a.clearButtonLabel;
        var _b = this.state, range = _b.range, link = _b.link;
        var classes = __assign({}, enums_1.defaultClasses, classNames);
        var yearsDiff = get_year_1.default(range.endDate) -
            get_year_1.default(range.startDate);
        var monthsDiff = get_month_1.default(range.endDate) -
            get_month_1.default(range.startDate);
        var diff = yearsDiff * 12 + monthsDiff;
        var calendarsCount = Number(calendars) - 1;
        return (react_1.default.createElement("div", { ref: this.positioningRef }, react_dom_1.default.createPortal(react_1.default.createElement(Calendar_styles_1.CalendarContainer, { ref: this.calendarContainerRef, className: className, show: show, top: this.offsetTop, left: this.offsetLeft },
            react_1.default.createElement("div", { className: classes.dateRange }, (function () {
                var _calendars = [];
                var _method = offsetPositive ? 'unshift' : 'push';
                for (var i = calendarsCount; i >= 0; i--) {
                    var offset = offsetPositive ? i : -i;
                    var realDiff = offsetPositive ? diff : -diff;
                    var realOffset = (rangedCalendars && i == calendarsCount &&
                        diff != 0) ? realDiff : offset;
                    _calendars[_method](react_1.default.createElement(Calendar_1.default, { showMonthArrow: showMonthArrow, shownDate: shownDate, disableDaysBeforeToday: disableDaysBeforeToday, lang: lang, key: i, offset: realOffset, link: linkedCalendars && link, linkCB: _this.moveCalendarDisplay.bind(_this), range: range, format: format, firstDayOfWeek: firstDayOfWeek, minDate: minDate, maxDate: maxDate, specialDays: specialDays, classNames: classes, onChange: _this.handleSelect.bind(_this) }));
                }
                return ([
                    _calendars[0],
                    react_1.default.createElement(Calendar_styles_1.ClearButtonContainer, { key: "clearButton" },
                        react_1.default.createElement(Calendar_styles_1.ClearButton, { show: range.startDate || range.endDate, onClick: _this.clearRange }, clearButtonLabel),
                        react_1.default.createElement(Calendar_styles_1.CloseButton, { onClick: onClose },
                            react_1.default.createElement(Calendar_styles_1.IconClose, null))),
                    _calendars[1],
                ]);
            })())), calendarRoot)));
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
}(react_1.Component));
exports.default = DateRangePicker;
