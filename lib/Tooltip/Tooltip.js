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
var portalElement = document.createElement('div');
document.body.appendChild(portalElement);
var simulatedPortal = (function () {
    var el = document.createElement('div');
    el.style.width = '100%';
    el.style.height = '0';
    el.style.overflow = 'hidden';
    document.body.appendChild(el);
    return el;
})();
function Tooltip(_a) {
    var _b = _a.wrapper, wrapper = _b === void 0 ? 'div' : _b, _c = _a.preferredVerticalGravity, preferredVerticalGravity = _c === void 0 ? VerticalGravity.top : _c, _d = _a.preferredHorizontalGravity, preferredHorizontalGravity = _d === void 0 ? HorizontalGravity.center : _d, _e = _a.verticalSpacing, verticalSpacing = _e === void 0 ? 5 : _e, _f = _a.backgroundColor, backgroundColor = _f === void 0 ? '#003459' : _f, _g = _a.textColor, textColor = _g === void 0 ? 'white' : _g, _h = _a.maxWidth, maxWidth = _h === void 0 ? 200 : _h, style = _a.style, className = _a.className, tip = _a.tip, children = _a.children, _j = _a.tipContainerPadding, tipContainerPadding = _j === void 0 ? '14px 20px 15px 20px' : _j, _k = _a.tipContainerBorderRadius, tipContainerBorderRadius = _k === void 0 ? 3 : _k;
    var _l, _m, _o, _p;
    var Component = wrapper;
    var _q = react_1.useState(false), showTip = _q[0], setShowTip = _q[1];
    var wrapperRef = react_1.useRef(null);
    var simulatedContainerRef = react_1.useRef(null);
    var scrollableParent = useScrollableParent_1.useScrollableParent(wrapperRef.current);
    var _r = useElementOffset_1.useElementOffset(wrapperRef.current), height = _r.height, width = _r.width, left = _r.left, top = _r.top, right = _r.right, bottom = _r.bottom;
    var _s = useSimulatedContainerDimensions(simulatedContainerRef), simulatedHeight = _s.simulatedHeight, simulatedWidth = _s.simulatedWidth;
    var _t = getDocumentDimensions_1.getDocumentDimensions(), documentWidth = _t.documentWidth, documentHeight = _t.documentHeight;
    var extraHeight = Tooltip_styles_1.arrowHeight + verticalSpacing;
    useScrollToHideTip(scrollableParent, showTip, setShowTip);
    var vGravity = (_l = {},
        _l[VerticalGravity.top] = function () {
            return top > simulatedHeight + extraHeight
                ? VerticalGravity.top
                : VerticalGravity.bottom;
        },
        _l[VerticalGravity.bottom] = function () {
            return bottom + simulatedHeight + extraHeight < documentHeight
                ? VerticalGravity.bottom
                : VerticalGravity.top;
        },
        _l)[preferredVerticalGravity]();
    var hGravity = (_m = {},
        _m[HorizontalGravity.left] = function () {
            return left - simulatedWidth + 40 > 0
                ? HorizontalGravity.left
                : left - simulatedWidth / 2 > 0
                    ? HorizontalGravity.center
                    : HorizontalGravity.right;
        },
        _m[HorizontalGravity.center] = function () {
            return left - simulatedWidth / 2 > 0
                ? right + simulatedWidth / 2 < documentWidth
                    ? HorizontalGravity.center
                    : HorizontalGravity.left
                : HorizontalGravity.right;
        },
        _m[HorizontalGravity.right] = function () {
            return right + simulatedWidth < documentWidth
                ? HorizontalGravity.right
                : right + simulatedWidth / 2 < documentWidth
                    ? HorizontalGravity.center
                    : HorizontalGravity.left;
        },
        _m)[preferredHorizontalGravity]();
    console.log(right, simulatedWidth, documentWidth, right + simulatedWidth / 2, preferredHorizontalGravity, hGravity);
    var anchorTop = (_o = {},
        _o[VerticalGravity.top] = top,
        _o[VerticalGravity.bottom] = top + height,
        _o)[vGravity];
    var anchorLeft = (_p = {},
        _p[HorizontalGravity.center] = left + (width / 2),
        _p[HorizontalGravity.left] = left,
        _p[HorizontalGravity.right] = left + width,
        _p)[hGravity];
    return (React.createElement(React.Fragment, null,
        ReactDOM.createPortal((React.createElement(Tooltip_styles_1.SimulatedTipContainer, { ref: simulatedContainerRef, maxWidth: maxWidth, padding: tipContainerPadding }, tip)), simulatedPortal),
        React.createElement(Component, { ref: wrapperRef, style: style, className: className, onMouseEnter: function () { return setShowTip(true); }, onMouseLeave: function () { return setShowTip(false); }, onMouseMove: function () { return !showTip && setShowTip(true); } }, children),
        showTip &&
            ReactDOM.createPortal((React.createElement(Tooltip_styles_1.TipContainer, { padding: tipContainerPadding, borderRadius: tipContainerBorderRadius, vSpacing: verticalSpacing, vGravity: vGravity, hGravity: hGravity, backgroundColor: backgroundColor, textColor: textColor, maxWidth: maxWidth, top: anchorTop, left: anchorLeft }, tip)), portalElement)));
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
