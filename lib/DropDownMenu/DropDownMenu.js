"use strict";
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
var React = __importStar(require("react"));
var ReactDOM = __importStar(require("react-dom"));
var lodash_1 = require("lodash");
var keycode_1 = __importDefault(require("keycode"));
var FloatingContainer_1 = __importDefault(require("../FloatingContainer/FloatingContainer"));
var DropDownMenu_styles_1 = require("./DropDownMenu.styles");
var DropDownMenu = /** @class */ (function (_super) {
    __extends(DropDownMenu, _super);
    function DropDownMenu(props) {
        var _this = _super.call(this, props) || this;
        _this.onTrigger = function (event) {
            _this.props.stopPropagation && event && event.stopPropagation();
            var becomeVisible = !_this.state.showItems;
            _this.setState({
                showItems: becomeVisible,
            }, function () { return _this.searchField.focus(); });
        };
        _this.onClickOut = function () {
            _this.setState({ showItems: false, highlightIndex: -1 });
        };
        _this.onSearch = function () {
            var query = _this.searchField.value.toLowerCase();
            var foundIndex = lodash_1.findIndex(_this.props.items, function (it) {
                var searchable = it.searchable || it.label;
                return searchable.toLowerCase().includes(query);
            });
            _this.setState({ highlightIndex: foundIndex });
            clearTimeout(_this.clearSearchTimeout);
            _this.clearSearchTimeout = window.setTimeout(_this.clearSearch, 1000);
        };
        _this.onKeyDown = function (e) {
            var highlightIndex = _this.state.highlightIndex;
            switch (e.keyCode) {
                case keycode_1.default('ENTER'):
                    var item_1 = _this.props.items[highlightIndex];
                    setTimeout(function () {
                        item_1.action();
                    }, 100);
                    _this.onClickOut();
                    break;
                case keycode_1.default('TAB'):
                    e.preventDefault();
                    break;
                case keycode_1.default('ESC'):
                    _this.onClickOut();
                    break;
                case keycode_1.default('DOWN'):
                    _this.moveHighlight(1);
                    break;
                case keycode_1.default('UP'):
                    _this.moveHighlight(-1);
                    break;
            }
        };
        _this.moveHighlight = function (step) {
            var highlightIndex = _this.state.highlightIndex;
            var numberOfItems = _this.props.items.length;
            var newSelectedIndex = (highlightIndex + step + numberOfItems) % numberOfItems;
            _this.setState({ highlightIndex: newSelectedIndex });
        };
        _this.clearSearch = function () {
            if (_this.searchField) {
                _this.searchField.value = '';
            }
        };
        _this.handleItemOnClick = function (item) { return function (e) {
            if (item.action) {
                e.preventDefault();
                e.stopPropagation();
                item.action();
                _this.onClickOut();
            }
        }; };
        _this.state = {
            showItems: false,
            highlightIndex: -1,
        };
        _this.id = Math.random()
            .toString(36)
            .substr(2);
        return _this;
    }
    DropDownMenu.prototype.render = function () {
        var _this = this;
        var highlightIndex = this.state.highlightIndex;
        var _a = this.props, className = _a.className, trigger = _a.trigger, children = _a.children, items = _a.items, position = _a.position, title = _a.title;
        return (React.createElement(DropDownMenu_styles_1.DropDownMenuRoot, { className: className },
            React.createElement(DropDownMenu_styles_1.HiddenLabel, { htmlFor: this.id }, "Dropdown search"),
            React.createElement(DropDownMenu_styles_1.SearchField, { id: this.id, ref: function (it) { return (_this.searchField = it && ReactDOM.findDOMNode(it)); }, onKeyDown: this.onKeyDown, onChange: this.onSearch, type: "text" }),
            typeof (children || trigger) === 'function' ? (children || (trigger && this.onTrigger)) : (React.createElement(DropDownMenu_styles_1.TriggerContainer, { onClick: this.onTrigger }, children || trigger)),
            React.createElement(FloatingContainer_1.default, { show: this.state.showItems, onClickOut: this.onClickOut, horizontalAlignment: position },
                React.createElement(DropDownMenu_styles_1.MenuItemList, null,
                    title && React.createElement(DropDownMenu_styles_1.MenuTitle, null, title),
                    items.map(function (it, i) {
                        return !it.disabled && (React.createElement(DropDownMenu_styles_1.MenuItem, { key: it.searchable || it.label, highlight: i === highlightIndex ? 'true' : 'false', onClick: _this.handleItemOnClick(it) }, it.label));
                    })))));
    };
    DropDownMenu.defaultProps = {
        items: [],
        position: 'left',
        stopPropagation: false,
    };
    return DropDownMenu;
}(React.PureComponent));
exports.DropDownMenu = DropDownMenu;
exports.default = DropDownMenu;
