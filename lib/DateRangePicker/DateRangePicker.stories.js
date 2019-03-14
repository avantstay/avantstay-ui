"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var addon_actions_1 = require("@storybook/addon-actions");
var addon_knobs_1 = require("@storybook/addon-knobs");
var react_1 = require("@storybook/react");
var react_2 = __importDefault(require("react"));
var _1 = __importDefault(require("./"));
var DateRangePickerStories = react_1.storiesOf('DatePicker', module);
DateRangePickerStories.addDecorator(addon_knobs_1.withKnobs);
DateRangePickerStories
    .add('Default usage', function () { return (react_2.default.createElement(_1.default, { show: addon_knobs_1.boolean('show', true), onChange: addon_actions_1.action('DateRangePicker[onChange]'), onClose: addon_actions_1.action('DateRangePicker[onClose]'), onInit: addon_actions_1.action('DateRangePicker[onInit]') })); })
    .add('With start and end date', function () { return (react_2.default.createElement(_1.default, { show: addon_knobs_1.boolean('show', true), startDate: addon_knobs_1.text('startDate', '2019-01-01'), endDate: addon_knobs_1.text('endDate', '2019-01-10'), onChange: addon_actions_1.action('DateRangePicker[onChange]'), onClose: addon_actions_1.action('DateRangePicker[onClose]'), onInit: addon_actions_1.action('DateRangePicker[onInit]') })); })
    .add('With min and max date', function () { return (react_2.default.createElement(_1.default, { show: addon_knobs_1.boolean('show', true), minDate: addon_knobs_1.text('minDate', '2019-01-01'), maxDate: addon_knobs_1.text('maxDate', '2020-01-10'), onChange: addon_actions_1.action('DateRangePicker[onChange]'), onClose: addon_actions_1.action('DateRangePicker[onClose]'), onInit: addon_actions_1.action('DateRangePicker[onInit]') })); });
