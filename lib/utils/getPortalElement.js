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
    if (node == null) {
        return null;
    }
    if (node.scrollHeight > node.offsetHeight) {
        return node;
    }
    else {
        return getScrollableParent(node.parentNode);
    }
}
exports.getScrollableParent = getScrollableParent;
