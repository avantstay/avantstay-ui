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
var classnames_1 = __importDefault(require("classnames"));
var get_date_1 = __importDefault(require("date-fns/get_date"));
var react_1 = __importStar(require("react"));
var DayCell = (function (_super) {
    __extends(DayCell, _super);
    function DayCell(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.handleMouseEvent = function (event) {
            event.preventDefault();
            if (_this.props.isPassive)
                return null;
            var newState = {};
            switch (event.type) {
                case 'mouseenter':
                    newState.hover = true;
                    break;
                case 'mouseup':
                case 'mouseleave':
                    newState.hover = false;
                    newState.active = false;
                    break;
                case 'mousedown':
                    newState.active = true;
                    break;
            }
            _this.setState(newState);
        };
        _this.handleSelect = function (event) {
            event.preventDefault();
            if (_this.props.isPassive)
                return null;
            _this.props.onSelect(_this.props.dayMoment);
        };
        _this.state = {
            hover: false,
            active: false,
        };
        return _this;
    }
    DayCell.prototype.getClassNames = function (classes) {
        var _a;
        var _b = this.props, isSelected = _b.isSelected, isInRange = _b.isInRange, isPassive = _b.isPassive, isStartEdge = _b.isStartEdge, isEndEdge = _b.isEndEdge, isToday = _b.isToday, isSunday = _b.isSunday, isFromPreviousMonth = _b.isFromPreviousMonth, isSpecialDay = _b.isSpecialDay;
        return classnames_1.default((_a = {},
            _a[classes.day] = true,
            _a[classes.dayActive] = isSelected,
            _a[classes.dayPassive] = isPassive,
            _a[classes.dayInRange] = isInRange,
            _a[classes.dayStartEdge] = isStartEdge,
            _a[classes.dayEndEdge] = isEndEdge,
            _a[classes.dayToday] = isToday,
            _a[classes.daySunday] = isSunday,
            _a[classes.dayFromPreviousMonth] = isFromPreviousMonth,
            _a[classes.daySpecialDay] = isSpecialDay,
            _a));
    };
    DayCell.prototype.render = function () {
        var _a = this.props, dayMoment = _a.dayMoment, classNames = _a.classNames;
        var classes = this.getClassNames(classNames);
        return (react_1.default.createElement("span", { className: classes.replace(classNames.day, classNames.dayWrapper), onClick: this.handleSelect },
            react_1.default.createElement("span", { onMouseEnter: this.handleMouseEvent, onMouseLeave: this.handleMouseEvent, onMouseDown: this.handleMouseEvent, onMouseUp: this.handleMouseEvent, className: classes }, get_date_1.default(dayMoment))));
    };
    return DayCell;
}(react_1.Component));
exports.default = DayCell;
