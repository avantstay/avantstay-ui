"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var styled_components_1 = __importDefault(require("styled-components"));
exports.Background = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background-image: url(\"", "\");\n  background-position: center;\n  background-size: cover;\n  transition: all 250ms, background 0ms;\n"], ["\n  background-image: url(\"", "\");\n  background-position: center;\n  background-size: cover;\n  transition: all 250ms, background 0ms;\n"])), function (p) { return p.src; });
exports.Image = styled_components_1.default.img(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  object-fit: cover;\n  transition: all 250ms, background 0ms;\n"], ["\n  object-fit: cover;\n  transition: all 250ms, background 0ms;\n"])));
var templateObject_1, templateObject_2;
