"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("@storybook/react");
var react_2 = __importDefault(require("react"));
var DropDownMenu_1 = __importDefault(require("./DropDownMenu"));
var DropDownMenuStories = react_1.storiesOf("DropDownMenu", module);
DropDownMenuStories.add("Default usage", function () { return (react_2.default.createElement("div", { style: {
        paddingLeft: "45%"
    } },
    react_2.default.createElement(DropDownMenu_1.default, { items: [
            {
                label: "Logout",
                searchable: "logout",
                disabled: false,
                action: function () { }
            }
        ] }, "Menu label"))); });
