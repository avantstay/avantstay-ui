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
DateRangePickerStories.add('Default usage', function () { return (react_2.default.createElement("div", null,
    react_2.default.createElement("p", null, "First first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first"),
    addon_knobs_1.boolean('show extra paragraph at the top', false) && (react_2.default.createElement("p", null, "Second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second")),
    react_2.default.createElement("div", { className: "oito" },
        react_2.default.createElement(_1.default, { show: addon_knobs_1.boolean('show', true), onChange: addon_actions_1.action('DateRangePicker[onChange]'), onClose: addon_actions_1.action('DateRangePicker[onClose]'), onInit: addon_actions_1.action('DateRangePicker[onInit]'), onClickOut: addon_actions_1.action('DateRangePicker[onClickOut]') })),
    new Array(100).fill(1).map(function (it, i) { return (react_2.default.createElement("p", { key: i }, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, consequuntur, culpa cumque dicta dolor, eaque error esse ipsam libero maxime natus nisi quae quod ratione repudiandae rerum saepe ullam veniam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, consequuntur, culpa cumque dicta dolor, eaque error esse ipsam libero maxime natus nisi quae quod ratione repudiandae rerum saepe ullam veniam.")); }))); })
    .add('Inside scrollable container', function () { return (react_2.default.createElement("div", null,
    react_2.default.createElement("p", null, "before before before before before before before before before before before before before before before before before before before before before before before before before before before before before before before before before before before before before before before before before before before before before before before before before before before before before before before before before before before before before before before"),
    react_2.default.createElement("div", { style: {
            height: '90vh',
            width: '90vw',
            overflow: 'auto',
            position: 'relative',
        } },
        react_2.default.createElement("p", null, "First first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first first"),
        addon_knobs_1.boolean('show extra paragraph at the top', false) && (react_2.default.createElement("p", null, "Second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second second")),
        react_2.default.createElement("div", { className: "oito" },
            react_2.default.createElement(_1.default, { show: addon_knobs_1.boolean('show', true), onChange: addon_actions_1.action('DateRangePicker[onChange]'), onClose: addon_actions_1.action('DateRangePicker[onClose]'), onInit: addon_actions_1.action('DateRangePicker[onInit]') })),
        new Array(100).fill(1).map(function (it, i) { return (react_2.default.createElement("p", { key: i }, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, consequuntur, culpa cumque dicta dolor, eaque error esse ipsam libero maxime natus nisi quae quod ratione repudiandae rerum saepe ullam veniam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, consequuntur, culpa cumque dicta dolor, eaque error esse ipsam libero maxime natus nisi quae quod ratione repudiandae rerum saepe ullam veniam.")); })))); })
    .add('Align to the right', function () { return (react_2.default.createElement("div", null,
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque minus molestiae nisi! Animi delectus distinctio explicabo id minus possimus quasi quisquam quo tempore voluptas! Dolore error inventore porro praesentium sapiente!",
    react_2.default.createElement("div", { style: { width: 200, margin: '50px auto', background: 'yellow' } },
        react_2.default.createElement("span", null, "Lorem ipsum dolor"),
        react_2.default.createElement(_1.default, { show: addon_knobs_1.boolean('show', true), horizontalAlignment: "right" })))); })
    .add('With apply button', function () { return (react_2.default.createElement(_1.default, { show: addon_knobs_1.boolean('show', true), showApply: addon_knobs_1.boolean('showApply', true), applyLabel: addon_knobs_1.text('applyLabel', 'Apply'), startDate: addon_knobs_1.text('startDate', '2019-01-01'), endDate: addon_knobs_1.text('endDate', '2019-01-10'), onChange: addon_actions_1.action('DateRangePicker[onChange]'), onClose: addon_actions_1.action('DateRangePicker[onClose]'), onInit: addon_actions_1.action('DateRangePicker[onInit]') })); })
    .add('With start and end date', function () { return (react_2.default.createElement(_1.default, { show: addon_knobs_1.boolean('show', true), startDate: addon_knobs_1.text('startDate', '2019-01-01'), endDate: addon_knobs_1.text('endDate', '2019-01-10'), onChange: addon_actions_1.action('DateRangePicker[onChange]'), onClose: addon_actions_1.action('DateRangePicker[onClose]'), onInit: addon_actions_1.action('DateRangePicker[onInit]') })); })
    .add('With min and max date', function () { return (react_2.default.createElement(_1.default, { show: addon_knobs_1.boolean('show', true), minDate: addon_knobs_1.text('minDate', '2019-01-01'), maxDate: addon_knobs_1.text('maxDate', '2020-01-10'), onChange: addon_actions_1.action('DateRangePicker[onChange]'), onClose: addon_actions_1.action('DateRangePicker[onClose]'), onInit: addon_actions_1.action('DateRangePicker[onInit]') })); });
