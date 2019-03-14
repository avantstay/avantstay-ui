"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getDocumentDimensions() {
    var fullSizeElement = document.createElement('div');
    fullSizeElement.style.position = 'absolute';
    fullSizeElement.style.top = '0';
    fullSizeElement.style.bottom = '0';
    fullSizeElement.style.left = '0';
    fullSizeElement.style.right = '0';
    document.body.appendChild(fullSizeElement);
    var documentWidth = fullSizeElement.offsetWidth;
    var documentHeight = fullSizeElement.offsetHeight;
    document.body.removeChild(fullSizeElement);
    return {
        documentWidth: documentWidth,
        documentHeight: documentHeight,
    };
}
exports.getDocumentDimensions = getDocumentDimensions;
