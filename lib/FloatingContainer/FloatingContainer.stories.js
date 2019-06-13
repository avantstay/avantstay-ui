"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var addon_knobs_1 = require("@storybook/addon-knobs");
var react_1 = require("@storybook/react");
var react_2 = __importDefault(require("react"));
var FloatingContainer_1 = __importDefault(require("./FloatingContainer"));
var Stories = react_1.storiesOf('Floating Container', module);
Stories.addDecorator(addon_knobs_1.withKnobs);
Stories.add('Default usage', function () { return (react_2.default.createElement("div", null,
    react_2.default.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum quis turpis nec dictum. Ut finibus ante at pretium mollis. Quisque mattis finibus congue. Praesent vitae massa vitae tortor consectetur luctus. Curabitur dapibus nunc eget ipsum tempor, at hendrerit tellus ultrices. Etiam ac rhoncus elit, ut iaculis turpis. Suspendisse at bibendum mi. Aliquam semper eros quis quam tempor, ac blandit ligula volutpat."),
    react_2.default.createElement("div", { style: { width: '100%', height: '250px', overflow: 'auto', position: 'relative' } },
        react_2.default.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum quis turpis nec dictum. Ut finibus ante at pretium mollis. Quisque mattis finibus congue. Praesent vitae massa vitae tortor consectetur luctus. Curabitur dapibus nunc eget ipsum tempor, at hendrerit tellus ultrices. Etiam ac rhoncus elit, ut iaculis turpis. Suspendisse at bibendum mi. Aliquam semper eros quis quam tempor, ac blandit ligula volutpat."),
        react_2.default.createElement(FloatingContainer_1.default, { show: addon_knobs_1.boolean('show', true) },
            react_2.default.createElement("div", { style: {
                    background: 'white',
                    padding: 20,
                    boxShadow: '0 0 10px rgba(0,0,0,.5)',
                    marginLeft: 20
                } }, "Lorem ipsum")),
        react_2.default.createElement("p", null, "Phasellus eu efficitur nulla, pretium sagittis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent a justo vitae orci sollicitudin imperdiet at non tellus. Proin posuere nibh urna. Sed quis arcu sapien. Nulla finibus justo ut tortor aliquet, a aliquet massa venenatis. Praesent augue ipsum, ultrices vitae faucibus ut, tempus tempus leo. Mauris tortor metus, molestie non arcu sit amet, hendrerit auctor dui."),
        react_2.default.createElement("p", null, "Phasellus eu efficitur nulla, pretium sagittis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent a justo vitae orci sollicitudin imperdiet at non tellus. Proin posuere nibh urna. Sed quis arcu sapien. Nulla finibus justo ut tortor aliquet, a aliquet massa venenatis. Praesent augue ipsum, ultrices vitae faucibus ut, tempus tempus leo. Mauris tortor metus, molestie non arcu sit amet, hendrerit auctor dui."),
        react_2.default.createElement("p", null, "Phasellus eu efficitur nulla, pretium sagittis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent a justo vitae orci sollicitudin imperdiet at non tellus. Proin posuere nibh urna. Sed quis arcu sapien. Nulla finibus justo ut tortor aliquet, a aliquet massa venenatis. Praesent augue ipsum, ultrices vitae faucibus ut, tempus tempus leo. Mauris tortor metus, molestie non arcu sit amet, hendrerit auctor dui."),
        react_2.default.createElement("p", null, "Phasellus eu efficitur nulla, pretium sagittis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent a justo vitae orci sollicitudin imperdiet at non tellus. Proin posuere nibh urna. Sed quis arcu sapien. Nulla finibus justo ut tortor aliquet, a aliquet massa venenatis. Praesent augue ipsum, ultrices vitae faucibus ut, tempus tempus leo. Mauris tortor metus, molestie non arcu sit amet, hendrerit auctor dui."),
        react_2.default.createElement("p", null, "Phasellus eu efficitur nulla, pretium sagittis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent a justo vitae orci sollicitudin imperdiet at non tellus. Proin posuere nibh urna. Sed quis arcu sapien. Nulla finibus justo ut tortor aliquet, a aliquet massa venenatis. Praesent augue ipsum, ultrices vitae faucibus ut, tempus tempus leo. Mauris tortor metus, molestie non arcu sit amet, hendrerit auctor dui.")))); });
