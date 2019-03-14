"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var styled_components_1 = __importStar(require("styled-components"));
var Tooltip_1 = require("./Tooltip");
exports.arrowHeight = 8; // px
var appearIn = styled_components_1.keyframes(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  from { opacity: 0 }\n  to { opacity: 1 }\n"], ["\n  from { opacity: 0 }\n  to { opacity: 1 }\n"])));
exports.TipContainer = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  max-width: ", ";\n  padding: ", "; \n  border-radius: ", "; \n  position: absolute;\n  top: ", "px;\n  left: ", "px;\n  background: ", ";\n  z-index: 999; \n  opacity: 0;\n  animation: ", " 200ms forwards;\n  color: ", ";\n  \n  &::after {\n    content: '';\n    position: absolute;\n    ", ": 0;\n    left: ", ";\n    display: block;\n    width: 0;\n    height: 0;\n    border-style: solid;\n    border-width: ", ";\n    border-color: ", ";\n    transform: translateY(", ") translateX(-50%);\n  }\n"], ["\n  max-width: ", ";\n  padding: ", "; \n  border-radius: ", "; \n  position: absolute;\n  top: ", "px;\n  left: ", "px;\n  background: ", ";\n  z-index: 999; \n  opacity: 0;\n  animation: ", " 200ms forwards;\n  color: ", ";\n  \n  &::after {\n    content: '';\n    position: absolute;\n    ", ": 0;\n    left: ",
    ";\n    display: block;\n    width: 0;\n    height: 0;\n    border-style: solid;\n    border-width: ",
    ";\n    border-color: ",
    ";\n    transform: translateY(", ") translateX(-50%);\n  }\n"])), function (p) { return typeof p.maxWidth === 'number' ? p.maxWidth + "px" : p.maxWidth; }, function (p) { return typeof p.padding === 'number' ? p.padding + "px" : p.padding; }, function (p) { return typeof p.borderRadius === 'number' ? p.borderRadius + "px" : p.borderRadius; }, function (p) { return p.top; }, function (p) { return p.left; }, function (p) { return p.backgroundColor; }, appearIn, function (p) { return p.textColor; }, function (p) { return p.vGravity === Tooltip_1.VerticalGravity.top ? 'bottom' : 'top'; }, function (p) { return ({
    center: '50%',
    left: "calc(100% - " + exports.arrowHeight * 3 + "px)",
    right: exports.arrowHeight * 3 + "px"
}[p.hGravity]); }, function (p) { return p.vGravity === Tooltip_1.VerticalGravity.top
    ? exports.arrowHeight + "px " + exports.arrowHeight + "px 0 " + exports.arrowHeight + "px"
    : "0 " + exports.arrowHeight + "px " + exports.arrowHeight + "px " + exports.arrowHeight + "px"; }, function (p) { return p.vGravity === Tooltip_1.VerticalGravity.top
    ? p.backgroundColor + " transparent transparent transparent"
    : "transparent transparent " + p.backgroundColor + " transparent"; }, function (p) { return p.vGravity === Tooltip_1.VerticalGravity.top ? 'calc(100% - 1px)' : 'calc(-100% + 1px)'; });
exports.SimulatedTipContainer = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: inline-block;\n  max-width: ", ";\n  padding: ", "; \n"], ["\n  display: inline-block;\n  max-width: ", ";\n  padding: ", "; \n"])), function (p) { return typeof p.maxWidth === 'number' ? p.maxWidth + "px" : p.maxWidth; }, function (p) { return typeof p.padding === 'number' ? p.padding + "px" : p.padding; });
var templateObject_1, templateObject_2, templateObject_3;
