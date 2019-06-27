"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("@storybook/addon-centered/react"));
var addon_knobs_1 = require("@storybook/addon-knobs");
var react_2 = require("@storybook/react");
var react_3 = __importDefault(require("react"));
var DropDownMenu_1 = __importDefault(require("./DropDownMenu"));
var DropDownMenuStories = react_2.storiesOf('DropDownMenu', module);
DropDownMenuStories.addDecorator(react_1.default)
    .addDecorator(addon_knobs_1.withKnobs)
    .add('Default usage', function () { return (react_3.default.createElement(DropDownMenu_1.default, { items: [
        {
            label: 'Logout',
            searchable: 'logout',
            disabled: false,
            action: function () { },
        },
    ], position: 'right' }, "Menu label")); })
    .add('Multiple menus', function () { return (react_3.default.createElement("div", null,
    react_3.default.createElement(DropDownMenu_1.default, { items: [
            {
                label: 'Logout',
                searchable: 'logout',
                disabled: false,
                action: function () { },
            },
        ], position: 'right' }, "Menu label"),
    react_3.default.createElement(DropDownMenu_1.default, { items: [
            {
                label: 'Logout',
                searchable: 'logout',
                disabled: false,
                action: function () { },
            },
        ], position: 'right' }, "Menu label 2"))); });
