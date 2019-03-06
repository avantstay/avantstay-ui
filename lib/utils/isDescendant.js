"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(parent, child) {
    var node = child.parentNode;
    while (node != null) {
        // noinspection EqualityComparisonWithCoercionJS
        if (node == parent)
            return true;
        node = node.parentNode;
    }
    return false;
}
exports.default = default_1;
