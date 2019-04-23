"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var addon_knobs_1 = require("@storybook/addon-knobs");
var react_1 = require("@storybook/react");
var react_2 = __importDefault(require("react"));
var _1 = __importDefault(require("./"));
var Tooltip_1 = require("./Tooltip");
var Stories = react_1.storiesOf('Tooltip', module);
Stories.addDecorator(addon_knobs_1.withKnobs);
Stories
    .add('Default usage', function () { return (react_2.default.createElement("div", null,
    react_2.default.createElement("div", { style: { width: '100%', height: '250px', overflow: 'auto' } },
        react_2.default.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum quis turpis nec dictum. Ut finibus ante at pretium mollis. Quisque mattis finibus congue. Praesent vitae massa vitae tortor consectetur luctus. Curabitur dapibus nunc eget ipsum tempor, at hendrerit tellus ultrices. Etiam ac rhoncus elit, ut iaculis turpis. Suspendisse at bibendum mi. Aliquam semper eros quis quam tempor, ac blandit ligula volutpat."),
        react_2.default.createElement("table", { style: { width: '100%' } },
            react_2.default.createElement("tbody", null,
                react_2.default.createElement("tr", null,
                    react_2.default.createElement("td", { style: { width: '50%' } }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum quis turpis nec dictum. Ut finibus ante at pretium mollis. Quisque mattis finibus congue. Praesent vitae massa vitae tortor consectetur luctus. Curabitur dapibus nunc eget ipsum tempor, at hendrerit tellus ultrices. Etiam ac rhoncus elit, ut iaculis turpis. Suspendisse at bibendum mi. Aliquam semper eros quis quam tempor, ac blandit ligula volutpat."),
                    react_2.default.createElement("td", { align: "right" },
                        react_2.default.createElement(_1.default, { maxWidth: 300, tip: react_2.default.createElement("div", null,
                                react_2.default.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum quis turpis nec dictum. Ut finibus ante at pretium mollis."),
                                react_2.default.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum quis turpis nec dictum. Ut finibus ante at pretium mollis.")) },
                            react_2.default.createElement("span", null,
                                "Need help? Lorem ipsum dolor sit amet",
                                react_2.default.createElement("br", null),
                                "Etiam ac rhoncus elit, ut iaculis turpis.")))),
                react_2.default.createElement("tr", null,
                    react_2.default.createElement("td", { style: { width: '50%' } }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum quis turpis nec dictum. Ut finibus ante at pretium mollis. Quisque mattis finibus congue. Praesent vitae massa vitae tortor consectetur luctus. Curabitur dapibus nunc eget ipsum tempor, at hendrerit tellus ultrices. Etiam ac rhoncus elit, ut iaculis turpis. Suspendisse at bibendum mi. Aliquam semper eros quis quam tempor, ac blandit ligula volutpat."),
                    react_2.default.createElement("td", null,
                        react_2.default.createElement(_1.default, { tip: react_2.default.createElement("div", null,
                                react_2.default.createElement("h2", null, "Cool tip 2"),
                                react_2.default.createElement("ul", null,
                                    react_2.default.createElement("li", null, "One"),
                                    react_2.default.createElement("li", null, "Two"))), preferredHorizontalGravity: Tooltip_1.HorizontalGravity.right, preferredVerticalGravity: Tooltip_1.VerticalGravity.bottom, style: { display: 'inline-block', background: 'yellow' } },
                            react_2.default.createElement("div", { style: { display: 'inline-block', background: 'yellow' } },
                                "Need help? Lorem ipsum dolor sit amet",
                                react_2.default.createElement("br", null),
                                "Etiam ac rhoncus elit, ut iaculis turpis.")))))),
        react_2.default.createElement("p", null, "Phasellus eu efficitur nulla, pretium sagittis augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent a justo vitae orci sollicitudin imperdiet at non tellus. Proin posuere nibh urna. Sed quis arcu sapien. Nulla finibus justo ut tortor aliquet, a aliquet massa venenatis. Praesent augue ipsum, ultrices vitae faucibus ut, tempus tempus leo. Mauris tortor metus, molestie non arcu sit amet, hendrerit auctor dui.")))); });
