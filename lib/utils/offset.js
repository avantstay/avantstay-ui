"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function offsetTop(elem) {
    if (!elem)
        return 0;
    return elem.offsetTop + offsetTop(elem.offsetParent);
}
exports.offsetTop = offsetTop;
function offsetLeft(elem) {
    if (!elem)
        return 0;
    return elem.offsetLeft + offsetLeft(elem.offsetParent);
}
exports.offsetLeft = offsetLeft;
function offsetRight(elem) {
    if (!elem)
        return 0;
    return window.innerWidth - elem.getBoundingClientRect().right;
}
exports.offsetRight = offsetRight;
