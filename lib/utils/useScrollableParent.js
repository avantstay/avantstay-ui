"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useScrollableParent(element) {
    return react_1.useMemo(function () {
        function getScrollParent(node) {
            if (node == null) {
                return null;
            }
            if (node.scrollHeight > node.clientHeight) {
                return node;
            }
            else {
                return getScrollParent(node.parentNode);
            }
        }
        return getScrollParent(element);
    }, [element]);
}
exports.useScrollableParent = useScrollableParent;
