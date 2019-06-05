"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var getPortalElement_1 = require("./getPortalElement");
function useScrollableParent(element) {
    return react_1.useMemo(function () {
        return getPortalElement_1.getScrollableParent(element);
    }, [element]);
}
exports.useScrollableParent = useScrollableParent;
