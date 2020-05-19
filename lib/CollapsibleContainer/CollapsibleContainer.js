"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_debounce_1 = __importDefault(require("lodash.debounce"));
var react_1 = __importStar(require("react"));
var resize_observer_polyfill_1 = __importDefault(require("resize-observer-polyfill"));
var S = __importStar(require("./CollapsibleContainer.styles"));
var MINIMUM_HEIGHT_DIFFERENCE = 2;
function CollapsibleContainer(_a) {
    var children = _a.children, _b = _a.delay, delay = _b === void 0 ? 250 : _b, _c = _a.isCollapsed, isCollapsed = _c === void 0 ? false : _c, restProps = __rest(_a, ["children", "delay", "isCollapsed"]);
    var containerRef = react_1.useRef(null);
    var _d = react_1.useState(0), containerHeight = _d[0], setContainerHeight = _d[1];
    var setContainerHeightDebounced = react_1.useMemo(function () {
        return lodash_debounce_1.default(function (nextHeight) {
            setContainerHeight(function (previousHeight) {
                var heightDifference = Math.abs(previousHeight - nextHeight);
                var shouldChangeHeight = heightDifference >= MINIMUM_HEIGHT_DIFFERENCE;
                return shouldChangeHeight ? nextHeight : previousHeight;
            });
        }, delay);
    }, [delay]);
    react_1.useEffect(function () {
        var containerElement = containerRef.current;
        if (!containerElement)
            return;
        var containerHeightObserver = new resize_observer_polyfill_1.default(function (entries) {
            var nextHeight = entries[0].target.scrollHeight;
            setContainerHeightDebounced(nextHeight);
        });
        containerHeightObserver.observe(containerElement);
        return function () {
            containerHeightObserver.unobserve(containerElement);
        };
    }, [setContainerHeightDebounced]);
    react_1.useLayoutEffect(function () {
        var containerElement = containerRef.current;
        if (containerElement) {
            setContainerHeightDebounced(containerElement.scrollHeight);
        }
    }, [children, setContainerHeightDebounced]);
    return (react_1.default.createElement(S.Root, __assign({}, restProps, { delay: delay, height: isCollapsed ? 0 : containerHeight, ref: containerRef }), children));
}
exports.default = react_1.default.memo(CollapsibleContainer);
