"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var offset_1 = require("./offset");
function getElementOffset(element, scrollableParent) {
    var clientRect = (element && element.getBoundingClientRect()) || {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        bottom: 0,
        right: 0,
    };
    var parentOffsetTop = 0;
    var parentOffsetLeft = 0;
    if (element && scrollableParent) {
        parentOffsetTop = offset_1.offsetTop(scrollableParent) - scrollableParent.scrollTop;
        parentOffsetLeft = offset_1.offsetLeft(scrollableParent) - scrollableParent.scrollLeft;
    }
    return {
        height: clientRect.height,
        width: clientRect.width,
        top: clientRect.top - parentOffsetTop,
        left: clientRect.left - parentOffsetLeft,
        bottom: clientRect.bottom,
        right: clientRect.right,
    };
}
exports.getElementOffset = getElementOffset;
