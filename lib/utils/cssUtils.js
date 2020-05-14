"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tinycolor2_1 = __importDefault(require("tinycolor2"));
var lodash_kebabCase_1 = __importDefault(require("lodash.kebabCase"));
function lighten(color, percentage) {
    return tinycolor2_1.default(color).lighten(percentage).toRgbString();
}
exports.lighten = lighten;
function darken(color, percentage) {
    return tinycolor2_1.default(color).darken(percentage).toRgbString();
}
exports.darken = darken;
function rgba(color, alpha) {
    return tinycolor2_1.default(color).setAlpha(alpha).toRgbString();
}
exports.rgba = rgba;
function mediaScreen(props) {
    return "@media screen and " + Object.keys(props)
        .map(function (it) { return "(" + lodash_kebabCase_1.default(it) + ": " + props[it] + ")"; })
        .join(' and ');
}
exports.mediaScreen = mediaScreen;
