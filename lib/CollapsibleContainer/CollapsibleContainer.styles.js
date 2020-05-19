"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var styled_1 = __importDefault(require("@emotion/styled"));
exports.Root = styled_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  ", ";\n  ", ";\n  box-sizing: content-box;\n  max-height: ", "px;\n  overflow: hidden;\n  transition: max-height ", "ms, padding-bottom ", "ms, padding-top ", "ms;\n"], ["\n  ", ";\n  ", ";\n  box-sizing: content-box;\n  max-height: ", "px;\n  overflow: hidden;\n  transition: max-height ", "ms, padding-bottom ", "ms, padding-top ", "ms;\n"])), function (p) { return (p.height === 0 ? 'padding-bottom: 0 !important' : ''); }, function (p) { return (p.height === 0 ? 'padding-top: 0 !important' : ''); }, function (p) { return p.height; }, function (p) { return p.delay; }, function (p) { return p.delay; }, function (p) { return p.delay; });
var templateObject_1;
