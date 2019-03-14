"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_1 = require("react");
var ReactDOM = __importStar(require("react-dom"));
var getDocumentDimensions_1 = require("../utils/getDocumentDimensions");
var useElementOffset_1 = require("../utils/useElementOffset");
var useScrollableParent_1 = require("../utils/useScrollableParent");
var Tooltip_styles_1 = require("./Tooltip.styles");
var VerticalGravity;
(function (VerticalGravity) {
    VerticalGravity["bottom"] = "bottom";
    VerticalGravity["top"] = "top";
})(VerticalGravity = exports.VerticalGravity || (exports.VerticalGravity = {}));
var HorizontalGravity;
(function (HorizontalGravity) {
    HorizontalGravity["left"] = "left";
    HorizontalGravity["right"] = "right";
    HorizontalGravity["center"] = "center";
})(HorizontalGravity = exports.HorizontalGravity || (exports.HorizontalGravity = {}));
var portal = document.createElement('div');
document.body.appendChild(portal);
var simulatedPortal = (function () {
    var el = document.createElement('div');
    el.style.width = '100%';
    el.style.height = '0';
    el.style.overflow = 'hidden';
    document.body.appendChild(el);
    return el;
})();
function Tooltip(_a) {
    var _b = _a.wrapper, wrapper = _b === void 0 ? 'div' : _b, _c = _a.preferredVerticalGravity, preferredVerticalGravity = _c === void 0 ? VerticalGravity.top : _c, _d = _a.preferredHorizontalGravity, preferredHorizontalGravity = _d === void 0 ? HorizontalGravity.center : _d, _e = _a.vSpacing, vSpacing = _e === void 0 ? 5 : _e, _f = _a.backgroundColor, backgroundColor = _f === void 0 ? '#003459' : _f, _g = _a.textColor, textColor = _g === void 0 ? 'white' : _g, _h = _a.maxWidth, maxWidth = _h === void 0 ? 200 : _h, style = _a.style, className = _a.className, tip = _a.tip, children = _a.children, _j = _a.tipContainerPadding, tipContainerPadding = _j === void 0 ? '14px 20px 15px 20px' : _j, _k = _a.tipContainerBorderRadius, tipContainerBorderRadius = _k === void 0 ? 3 : _k, _l = _a.portalElement, portalElement = _l === void 0 ? portal : _l;
    var _m, _o, _p, _q;
    var Component = wrapper;
    var _r = react_1.useState(false), showTip = _r[0], setShowTip = _r[1];
    var wrapperRef = react_1.useRef(null);
    var simulatedContainerRef = react_1.useRef(null);
    var scrollableParent = useScrollableParent_1.useScrollableParent(wrapperRef.current);
    var _s = useElementOffset_1.useElementOffset(wrapperRef.current), height = _s.height, width = _s.width, left = _s.left, top = _s.top, right = _s.right, bottom = _s.bottom;
    var _t = useSimulatedContainerDimensions(simulatedContainerRef), simulatedHeight = _t.simulatedHeight, simulatedWidth = _t.simulatedWidth;
    var _u = getDocumentDimensions_1.getDocumentDimensions(), documentWidth = _u.documentWidth, documentHeight = _u.documentHeight;
    var extraHeight = Tooltip_styles_1.arrowHeight + vSpacing;
    useScrollToHideTip(scrollableParent, showTip, setShowTip);
    var vGravity = (_m = {},
        _m[VerticalGravity.top] = function () {
            return top > simulatedHeight + extraHeight
                ? VerticalGravity.top
                : VerticalGravity.bottom;
        },
        _m[VerticalGravity.bottom] = function () {
            return bottom + simulatedHeight + extraHeight < documentHeight
                ? VerticalGravity.bottom
                : VerticalGravity.top;
        },
        _m)[preferredVerticalGravity]();
    var hGravity = (_o = {},
        _o[HorizontalGravity.left] = function () {
            return left - simulatedWidth + 50 > 0
                ? HorizontalGravity.left
                : left - simulatedWidth / 2 > 0
                    ? HorizontalGravity.center
                    : HorizontalGravity.right;
        },
        _o[HorizontalGravity.center] = function () {
            return left - simulatedWidth / 2 > 0
                ? HorizontalGravity.center
                : HorizontalGravity.right;
        },
        _o[HorizontalGravity.right] = function () {
            return right + simulatedWidth < documentWidth
                ? HorizontalGravity.right
                : right + simulatedWidth / 2 < documentWidth
                    ? HorizontalGravity.center
                    : HorizontalGravity.left;
        },
        _o)[preferredHorizontalGravity]();
    var anchorTop = (_p = {},
        _p[VerticalGravity.top] = top,
        _p[VerticalGravity.bottom] = top + height,
        _p)[vGravity];
    var anchorLeft = (_q = {},
        _q[HorizontalGravity.center] = left + (width / 2),
        _q[HorizontalGravity.left] = left,
        _q[HorizontalGravity.right] = left + width,
        _q)[hGravity];
    return (React.createElement(React.Fragment, null,
        ReactDOM.createPortal((React.createElement(Tooltip_styles_1.SimulatedTipContainer, { ref: simulatedContainerRef, maxWidth: maxWidth, padding: tipContainerPadding }, tip)), simulatedPortal),
        React.createElement(Component, { ref: wrapperRef, style: style, className: className, onMouseEnter: function () { return setShowTip(true); }, onMouseLeave: function () { return setShowTip(false); }, onMouseMove: function () { return !showTip && setShowTip(true); } }, children),
        showTip &&
            ReactDOM.createPortal((React.createElement(Tooltip_styles_1.TipContainer, { padding: tipContainerPadding, borderRadius: tipContainerBorderRadius, vSpacing: vSpacing, vGravity: vGravity, hGravity: hGravity, backgroundColor: backgroundColor, textColor: textColor, maxWidth: maxWidth, top: anchorTop, left: anchorLeft }, tip)), portalElement)));
}
exports.default = Tooltip;
function useScrollToHideTip(scrollableParent, showTip, setShowTip) {
    react_1.useEffect(function () {
        var handleScroll = function () {
            showTip && setShowTip(false);
            scrollableParent &&
                scrollableParent.removeEventListener('scroll', handleScroll);
        };
        scrollableParent &&
            scrollableParent.addEventListener('scroll', handleScroll);
        return function () {
            scrollableParent &&
                scrollableParent.removeEventListener('scroll', handleScroll);
        };
    }, [scrollableParent, showTip]);
}
function useSimulatedContainerDimensions(simulatedContainerRef) {
    return react_1.useMemo(function () {
        var _a = useElementOffset_1.useElementOffset(simulatedContainerRef.current), width = _a.width, height = _a.height;
        return {
            simulatedWidth: width || 0,
            simulatedHeight: height || 0,
        };
    }, [simulatedContainerRef.current]);
}
