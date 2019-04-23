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
portalElement.style.overflow = 'hidden';
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
    // const childElement = ReactDOM.findDOMNode(children as any)
    //
    // console.log(childElement)
    var _b = _a.preferredVerticalGravity, preferredVerticalGravity = _b === void 0 ? VerticalGravity.top : _b, _c = _a.preferredHorizontalGravity, preferredHorizontalGravity = _c === void 0 ? HorizontalGravity.center : _c, _d = _a.verticalSpacing, verticalSpacing = _d === void 0 ? 5 : _d, _e = _a.backgroundColor, backgroundColor = _e === void 0 ? '#003459' : _e, _f = _a.textColor, textColor = _f === void 0 ? 'white' : _f, _g = _a.maxWidth, maxWidth = _g === void 0 ? 200 : _g, tip = _a.tip, children = _a.children, _h = _a.tipContainerPadding, tipContainerPadding = _h === void 0 ? '14px 20px 15px 20px' : _h, _j = _a.tipContainerBorderRadius, tipContainerBorderRadius = _j === void 0 ? 3 : _j;
    var _k, _l, _m, _o;
    var _p = react_1.useState(false), showTip = _p[0], setShowTip = _p[1];
    var wrapperRef = react_1.useRef(null);
    var simulatedContainerRef = react_1.useRef(null);
    var scrollableParent = useScrollableParent_1.useScrollableParent(wrapperRef.current);
    var _q = useElementOffset_1.useElementOffset(wrapperRef.current), height = _q.height, width = _q.width, left = _q.left, top = _q.top, right = _q.right, bottom = _q.bottom;
    var _r = useSimulatedContainerDimensions(simulatedContainerRef), simulatedHeight = _r.simulatedHeight, simulatedWidth = _r.simulatedWidth;
    var _s = getDocumentDimensions_1.getDocumentDimensions(), documentWidth = _s.documentWidth, documentHeight = _s.documentHeight;
    var extraHeight = Tooltip_styles_1.arrowHeight + verticalSpacing;
    useScrollToHideTip(scrollableParent, showTip, setShowTip);
    var vGravity = (_k = {},
        _k[VerticalGravity.top] = function () {
            return top > simulatedHeight + extraHeight
                ? VerticalGravity.top
                : VerticalGravity.bottom;
        },
        _k[VerticalGravity.bottom] = function () {
            return bottom + simulatedHeight + extraHeight < documentHeight
                ? VerticalGravity.bottom
                : VerticalGravity.top;
        },
        _k)[preferredVerticalGravity]();
    var hGravity = (_l = {},
        _l[HorizontalGravity.left] = function () {
            return left - simulatedWidth + (width / 2) + 40 > 0
                ? HorizontalGravity.left
                : left - simulatedWidth / 2 > 0
                    ? HorizontalGravity.center
                    : HorizontalGravity.right;
        },
        _l[HorizontalGravity.center] = function () {
            return left - simulatedWidth / 2 > 0
                ? right + simulatedWidth / 2 < documentWidth
                    ? HorizontalGravity.center
                    : HorizontalGravity.left
                : HorizontalGravity.right;
        },
        _l[HorizontalGravity.right] = function () {
            return right + simulatedWidth - (width / 2) < documentWidth
                ? HorizontalGravity.right
                : right + simulatedWidth / 2 < documentWidth
                    ? HorizontalGravity.center
                    : HorizontalGravity.left;
        },
        _l)[preferredHorizontalGravity]();
    var anchorTop = (_m = {},
        _m[VerticalGravity.top] = top - simulatedHeight - Tooltip_styles_1.arrowHeight -
            verticalSpacing,
        _m[VerticalGravity.bottom] = top + height + Tooltip_styles_1.arrowHeight + verticalSpacing,
        _m)[vGravity];
    var anchorLeft = (_o = {},
        _o[HorizontalGravity.center] = left + (width / 2) - simulatedWidth / 2,
        _o[HorizontalGravity.left] = left + (width / 2) - simulatedWidth + 4 *
            Tooltip_styles_1.arrowHeight,
        _o[HorizontalGravity.right] = left + (width / 2) - 4 * Tooltip_styles_1.arrowHeight,
        _o)[hGravity];
    return (React.createElement(React.Fragment, null,
        ReactDOM.createPortal((React.createElement(Tooltip_styles_1.SimulatedTipContainer, { ref: simulatedContainerRef, maxWidth: maxWidth, padding: tipContainerPadding }, tip)), simulatedPortal),
        React.cloneElement(children, {
            ref: wrapperRef,
            onMouseEnter: function () { return setShowTip(true); },
            onMouseLeave: function () { return setShowTip(false); },
            onMouseMove: function () { return !showTip && setShowTip(true); },
        }),
        showTip &&
            ReactDOM.createPortal((React.createElement(Tooltip_styles_1.TipContainer, { padding: tipContainerPadding, borderRadius: tipContainerBorderRadius, vGravity: vGravity, hGravity: hGravity, backgroundColor: backgroundColor, textColor: textColor, maxWidth: maxWidth, top: anchorTop, left: anchorLeft }, tip)), portalElement)));
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
