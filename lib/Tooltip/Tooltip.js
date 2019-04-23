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
function Tooltip(props) {
    var _a, _b, _c, _d;
    var _e = props.preferredVerticalGravity, preferredVerticalGravity = _e === void 0 ? VerticalGravity.top : _e, _f = props.preferredHorizontalGravity, preferredHorizontalGravity = _f === void 0 ? HorizontalGravity.center : _f, _g = props.verticalSpacing, verticalSpacing = _g === void 0 ? 5 : _g, _h = props.backgroundColor, backgroundColor = _h === void 0 ? '#003459' : _h, _j = props.textColor, textColor = _j === void 0 ? 'white' : _j, _k = props.maxWidth, maxWidth = _k === void 0 ? 200 : _k, tip = props.tip, children = props.children, _l = props.tipContainerPadding, tipContainerPadding = _l === void 0 ? '14px 20px 15px 20px' : _l, _m = props.tipContainerBorderRadius, tipContainerBorderRadius = _m === void 0 ? 3 : _m;
    var _o = react_1.useState(false), showTip = _o[0], setShowTip = _o[1];
    var wrapperRef = react_1.useRef(null);
    var simulatedContainerRef = react_1.useRef(null);
    var scrollableParent = useScrollableParent_1.useScrollableParent(wrapperRef.current);
    var _p = useElementOffset_1.useElementOffset(wrapperRef.current), height = _p.height, width = _p.width, left = _p.left, top = _p.top, right = _p.right, bottom = _p.bottom;
    var _q = useSimulatedContainerDimensions(simulatedContainerRef), simulatedHeight = _q.simulatedHeight, simulatedWidth = _q.simulatedWidth;
    var _r = getDocumentDimensions_1.getDocumentDimensions(), documentWidth = _r.documentWidth, documentHeight = _r.documentHeight;
    var extraHeight = Tooltip_styles_1.arrowHeight + verticalSpacing;
    useScrollToHideTip(scrollableParent, showTip, setShowTip);
    var vGravity = (_a = {},
        _a[VerticalGravity.top] = function () {
            return top > simulatedHeight + extraHeight
                ? VerticalGravity.top
                : VerticalGravity.bottom;
        },
        _a[VerticalGravity.bottom] = function () {
            return bottom + simulatedHeight + extraHeight < documentHeight
                ? VerticalGravity.bottom
                : VerticalGravity.top;
        },
        _a)[preferredVerticalGravity]();
    var hGravity = (_b = {},
        _b[HorizontalGravity.left] = function () {
            return left - simulatedWidth + (width / 2) + 40 > 0
                ? HorizontalGravity.left
                : left - simulatedWidth / 2 > 0
                    ? HorizontalGravity.center
                    : HorizontalGravity.right;
        },
        _b[HorizontalGravity.center] = function () {
            return left - simulatedWidth / 2 > 0
                ? right + simulatedWidth / 2 < documentWidth
                    ? HorizontalGravity.center
                    : HorizontalGravity.left
                : HorizontalGravity.right;
        },
        _b[HorizontalGravity.right] = function () {
            return right + simulatedWidth - (width / 2) < documentWidth
                ? HorizontalGravity.right
                : right + simulatedWidth / 2 < documentWidth
                    ? HorizontalGravity.center
                    : HorizontalGravity.left;
        },
        _b)[preferredHorizontalGravity]();
    var anchorTop = (_c = {},
        _c[VerticalGravity.top] = top - simulatedHeight - Tooltip_styles_1.arrowHeight -
            verticalSpacing,
        _c[VerticalGravity.bottom] = top + height + Tooltip_styles_1.arrowHeight + verticalSpacing,
        _c)[vGravity];
    var anchorLeft = (_d = {},
        _d[HorizontalGravity.center] = left + (width / 2) - simulatedWidth / 2,
        _d[HorizontalGravity.left] = left + (width / 2) - simulatedWidth + 4 *
            Tooltip_styles_1.arrowHeight,
        _d[HorizontalGravity.right] = left + (width / 2) - 4 * Tooltip_styles_1.arrowHeight,
        _d)[hGravity];
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
