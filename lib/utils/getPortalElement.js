"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _portalElements = [];
function getPortalElement(rootElement) {
    if (!rootElement)
        return null;
    var existingPortalElement = _portalElements.find(function (it) { return it.rootElement === rootElement; });
    if (existingPortalElement)
        return existingPortalElement.portalElement;
    var scrollableParent = getScrollableParent(rootElement);
    var portalElement = document.createElement('div');
    if (scrollableParent)
        scrollableParent.appendChild(portalElement);
    else
        document.body.appendChild(portalElement);
    _portalElements.push({
        portalElement: portalElement,
        rootElement: rootElement,
    });
    return portalElement;
}
exports.getPortalElement = getPortalElement;
function getScrollableParent(node) {
    var overflowRegex = /(auto|scroll)/;
    if (node == null)
        return document.body;
    var _a = getComputedStyle(node), overflow = _a.overflow, overflowX = _a.overflowX, overflowY = _a.overflowY, position = _a.position;
    if (position === 'static') {
        return getScrollableParent(node.parentNode);
    }
    if (overflowRegex.test("" + overflow + overflowX + overflowY)) {
        return node;
    }
    else {
        return getScrollableParent(node.parentNode);
    }
}
exports.getScrollableParent = getScrollableParent;
