"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var styled_components_1 = __importDefault(require("styled-components"));
var getPortalElement_1 = require("../utils/getPortalElement");
var isDescendant_1 = __importDefault(require("../utils/isDescendant"));
var offset_1 = require("../utils/offset");
var lodash_1 = require("lodash");
exports.FloatingContainerRoot = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  z-index: 99;\n  position: absolute;\n  top: ", "px;\n  left: ", "px;\n  box-sizing: border-box;\n\n  & * {\n    box-sizing: border-box;\n  }\n"], ["\n  z-index: 99;\n  position: absolute;\n  top: ", "px;\n  left: ", "px;\n  box-sizing: border-box;\n\n  & * {\n    box-sizing: border-box;\n  }\n"])), function (p) { return p.top; }, function (p) { return p.left; });
var FloatingContainer = /** @class */ (function (_super) {
    __extends(FloatingContainer, _super);
    function FloatingContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.floatingContainerRef = react_1.default.createRef();
        _this.positioningRef = react_1.default.createRef();
        _this.state = {
            portalElement: null,
        };
        _this.onWindowResize = lodash_1.debounce(function () {
            console.log('rolou window resize');
            _this.forceUpdate();
        }, 100);
        _this.onClickOut = function (e) {
            if (!isDescendant_1.default(_this.floatingContainerRef.current, e.target)) {
                _this.props.onClickOut && _this.props.onClickOut(e);
            }
        };
        return _this;
    }
    FloatingContainer.prototype.componentDidMount = function () {
        window.addEventListener('click', this.onClickOut);
        window.addEventListener('resize', this.onWindowResize);
        this.setState({
            portalElement: getPortalElement_1.getPortalElement(this.positioningRef.current),
        });
    };
    FloatingContainer.prototype.componentWillUnmount = function () {
        window.removeEventListener('click', this.onClickOut);
        window.removeEventListener('resize', this.onWindowResize);
    };
    Object.defineProperty(FloatingContainer.prototype, "offsetTop", {
        get: function () {
            var portalParent = this.state.portalElement && this.state.portalElement.parentNode;
            return offset_1.offsetTop(this.positioningRef.current) - offset_1.offsetTop(portalParent);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FloatingContainer.prototype, "offsetLeft", {
        get: function () {
            var portalParent = this.state.portalElement && this.state.portalElement.parentNode;
            return offset_1.offsetLeft(this.positioningRef.current) - offset_1.offsetLeft(portalParent);
        },
        enumerable: true,
        configurable: true
    });
    FloatingContainer.prototype.render = function () {
        var _a = this.props, show = _a.show, children = _a.children;
        var portalElement = this.state.portalElement;
        return (react_1.default.createElement("div", { ref: this.positioningRef }, show &&
            portalElement &&
            react_dom_1.default.createPortal(react_1.default.createElement(exports.FloatingContainerRoot, { ref: this.floatingContainerRef, top: this.offsetTop, left: this.offsetLeft }, children), portalElement)));
    };
    FloatingContainer.defaultProps = {
        show: true,
    };
    return FloatingContainer;
}(react_1.Component));
exports.default = FloatingContainer;
var templateObject_1;
