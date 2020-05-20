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
var is_after_1 = __importDefault(require("date-fns/is_after"));
var is_equal_1 = __importDefault(require("date-fns/is_equal"));
var start_of_day_1 = __importDefault(require("date-fns/start_of_day"));
var react_1 = __importStar(require("react"));
var FloatingContainer_1 = __importDefault(require("../FloatingContainer/FloatingContainer"));
var Calendar_1 = __importDefault(require("./Calendar"));
var Calendar_styles_1 = require("./Calendar.styles");
var enums_1 = require("./enums");
var getDate = function (date, defaultValue) {
    if (defaultValue === void 0) { defaultValue = ''; }
    return (typeof date === 'function' ? date() : date) || defaultValue;
};
var DateRangePicker = (function (_super) {
    __extends(DateRangePicker, _super);
    function DateRangePicker(props) {
        var _this = _super.call(this, props) || this;
        _this.step = 0;
        _this.onClickOut = function () {
            _this.props.onClose && _this.props.onClose();
            _this.props.onClickOut && _this.props.onClickOut();
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
            var range = { startDate: startDate, endDate: endDate };
            switch (_this.step) {
                case 0:
                    range.startDate = date;
                    range.endDate = endDate && is_after_1.default(endDate, date) ? endDate : undefined;
                    _this.step = 1;
                    break;
                case 1:
                    range.endDate = date;
                    _this.step = 0;
                    break;
            }
            var triggerChange = !_this.props.twoStepChange || (_this.step === 0 && _this.props.twoStepChange);
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
            _this.props.onChange && _this.props.onChange({ startDate: undefined, endDate: undefined });
        };
        _this.resetPosition = function () {
            _this.moveCalendarDisplay(_this.state.linkStepsCount);
        };
        var linkedCalendars = props.linkedCalendars;
        var startDate = start_of_day_1.default(getDate(props.startDate, new Date()));
        var endDate = end_of_day_1.default(getDate(props.endDate, new Date()));
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
    };
    DateRangePicker.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.startDate || nextProps.endDate) {
            var startDate = nextProps.startDate && start_of_day_1.default(getDate(nextProps.startDate));
            var endDate = nextProps.endDate && end_of_day_1.default(getDate(nextProps.endDate));
            var oldStartDate = this.props.startDate && start_of_day_1.default(getDate(this.props.startDate));
            var oldEndDate = this.props.endDate && end_of_day_1.default(getDate(this.props.endDate));
            var startDateDidChange = !is_equal_1.default(startDate, oldStartDate);
            var endDateDidChange = !is_equal_1.default(endDate, oldEndDate);
            if (startDateDidChange || endDateDidChange) {
                this.setRange({
                    startDate: startDate || oldStartDate,
                    endDate: endDate || oldEndDate,
                });
            }
        }
    };
    DateRangePicker.prototype.render = function () {
        var _a = this.props, className = _a.className, format = _a.format, linkedCalendars = _a.linkedCalendars, firstDayOfWeek = _a.firstDayOfWeek, minDate = _a.minDate, maxDate = _a.maxDate, specialDays = _a.specialDays, lang = _a.lang, disableDaysBeforeToday = _a.disableDaysBeforeToday, shownDate = _a.shownDate, showMonthArrow = _a.showMonthArrow, onClose = _a.onClose, show = _a.show, showApply = _a.showApply, applyLabel = _a.applyLabel, clearButtonLabel = _a.clearButtonLabel, onChange = _a.onChange, horizontalAlignment = _a.horizontalAlignment;
        var _b = this.state, range = _b.range, link = _b.link;
        var classes = __assign({}, enums_1.defaultClasses);
        var calendarProps = {
            classNames: classes,
            showMonthArrow: showMonthArrow,
            shownDate: shownDate,
            disableDaysBeforeToday: disableDaysBeforeToday,
            lang: lang,
            range: range,
            format: format,
            firstDayOfWeek: firstDayOfWeek,
            minDate: minDate,
            maxDate: maxDate,
            specialDays: specialDays,
            link: linkedCalendars && link,
            linkCB: this.moveCalendarDisplay,
            onChange: this.handleSelect,
        };
        return (react_1.default.createElement(FloatingContainer_1.default, { show: show, onClickOut: this.onClickOut, horizontalAlignment: horizontalAlignment },
            react_1.default.createElement(Calendar_styles_1.CalendarContainer, { className: className },
                react_1.default.createElement("div", { className: classes.dateRange },
                    react_1.default.createElement("div", null,
                        react_1.default.createElement(Calendar_1.default, __assign({}, calendarProps, { offset: 0 })),
                        react_1.default.createElement(Calendar_styles_1.ClearButtonContainer, null,
                            react_1.default.createElement(Calendar_styles_1.ClearButton, { show: Boolean(range.startDate || range.endDate), onClick: this.clearRange }, clearButtonLabel),
                            react_1.default.createElement(Calendar_styles_1.CloseButton, { onClick: onClose },
                                react_1.default.createElement(Calendar_styles_1.IconClose, null))),
                        react_1.default.createElement(Calendar_1.default, __assign({}, calendarProps, { offset: 1 }))),
                    react_1.default.createElement(Calendar_styles_1.ApplyButton, { show: showApply, onClick: function () {
                            onChange && onChange(range);
                            onClose && onClose();
                        } }, applyLabel)))));
    };
    DateRangePicker.defaultProps = {
        linkedCalendars: true,
        format: 'DD/MM/YYYY',
        specialDays: [],
        twoStepChange: false,
        clearButtonLabel: 'Clear',
        showApply: false,
        applyLabel: 'Apply',
        horizontalAlignment: 'left',
    };
    return DateRangePicker;
}(react_1.Component));
exports.default = DateRangePicker;
