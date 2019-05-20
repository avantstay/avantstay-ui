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
var colors_1 = require("./colors");
exports.DropDownMenuRoot = styled_components_1.default("div")(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: relative;\n  display: inline-block;\n"], ["\n  position: relative;\n  display: inline-block;\n"])));
exports.HiddenLabel = styled_components_1.default("label")(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: none;\n"], ["\n  display: none;\n"])));
exports.SearchField = styled_components_1.default("input")(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  position: absolute;\n  width: 0;\n  height: 0;\n  opacity: 0;\n  color: transparent;\n  text-shadow: 0 0 0 black;\n  -webkit-text-fill-color: transparent;\n"], ["\n  position: absolute;\n  width: 0;\n  height: 0;\n  opacity: 0;\n  color: transparent;\n  text-shadow: 0 0 0 black;\n  -webkit-text-fill-color: transparent;\n"])));
exports.TriggerContainer = styled_components_1.default("div")(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  cursor: pointer;\n"], ["\n  cursor: pointer;\n"])));
exports.MenuItemList = styled_components_1.default("div")(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  position: absolute;\n  display: ", ";\n  background: white;\n  border-radius: 2px;\n  box-shadow: 0 2px 30px 0 rgba(0, 0, 0, 0.05), 0 2px 15px 0 rgba(0, 0, 0, 0.05);\n  padding: 0;\n  max-height: 400px;\n  min-width: 200px;\n  overflow-y: auto;\n  margin-top: 10px;\n  z-index: 9999;\n  bottom: ", ";\n  top: ", ";\n\n  &.left {\n    right: 0;\n  }\n  &.center {\n    right: -100px;\n  }\n  &.right {\n    left: 0;\n  }\n"], ["\n  position: absolute;\n  display: ", ";\n  background: white;\n  border-radius: 2px;\n  box-shadow: 0 2px 30px 0 rgba(0, 0, 0, 0.05), 0 2px 15px 0 rgba(0, 0, 0, 0.05);\n  padding: 0;\n  max-height: 400px;\n  min-width: 200px;\n  overflow-y: auto;\n  margin-top: 10px;\n  z-index: 9999;\n  bottom: ", ";\n  top: ", ";\n\n  &.left {\n    right: 0;\n  }\n  &.center {\n    right: -100px;\n  }\n  &.right {\n    left: 0;\n  }\n"])), function (p) { return (p.show ? "block" : "none"); }, function (p) { return (p.gravity === "up" ? "calc(100% + .5rem)" : "auto"); }, function (p) { return (p.gravity === "up" ? "auto" : "100%"); });
exports.MenuItem = styled_components_1.default("a")(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  white-space: nowrap;\n  padding: 10px 20px;\n  cursor: pointer;\n  background: ", ";\n  color: ", ";\n  display: flex;\n  font-size: 14px;\n  align-items: center;\n  text-transform: capitalize;\n  margin-right: 0;\n  font-weight: normal;\n  text-decoration: none;\n  border-left: 4px solid transparent;\n\n  &:hover {\n    background: ", ";\n    color: ", " !important;\n    border-color: ", ";\n  }\n"], ["\n  white-space: nowrap;\n  padding: 10px 20px;\n  cursor: pointer;\n  background: ",
    ";\n  color: ", ";\n  display: flex;\n  font-size: 14px;\n  align-items: center;\n  text-transform: capitalize;\n  margin-right: 0;\n  font-weight: normal;\n  text-decoration: none;\n  border-left: 4px solid transparent;\n\n  &:hover {\n    background: ", ";\n    color: ", " !important;\n    border-color: ", ";\n  }\n"])), function (p) {
    return p.highlight === "true" ? colors_1.COLOR_NEUTRAL_EXTRA_LIGHT : "transparent";
}, colors_1.COLOR_NEUTRAL_DARK, colors_1.COLOR_NEUTRAL_EXTRA_LIGHT, colors_1.COLOR_NEUTRAL_DARK, colors_1.COLOR_PRIMARY);
exports.MenuTitle = styled_components_1.default("div")(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  padding: 10px 20px;\n  margin-bottom: 7px;\n"], ["\n  padding: 10px 20px;\n  margin-bottom: 7px;\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
