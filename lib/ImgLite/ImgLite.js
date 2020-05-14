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
var is_mobile_1 = require("is-mobile");
var lodash_debounce_1 = __importDefault(require("lodash.debounce"));
var query_string_1 = __importDefault(require("query-string"));
var react_1 = __importStar(require("react"));
var S = __importStar(require("./ImgLite.styles"));
var AUTO_DENSITY = is_mobile_1.isMobile() ? 1.5 : 1;
function getMaxSize(size, density, sizingStep) {
    if (density === void 0) { density = AUTO_DENSITY; }
    if (sizingStep === void 0) { sizingStep = 100; }
    return Math.ceil((size * density) / sizingStep) * sizingStep;
}
function thumbnail(url, options) {
    if (options === void 0) { options = {}; }
    var _a = options.crop, crop = _a === void 0 ? 'entropy' : _a, _b = options.maxHeight, maxHeight = _b === void 0 ? 0 : _b, _c = options.maxWidth, maxWidth = _c === void 0 ? 1200 : _c, _d = options.quality, quality = _d === void 0 ? 85 : _d, _e = options.sharpen, sharpen = _e === void 0 ? '1,0.3,1' : _e;
    var hasUrl = !!url;
    if (!hasUrl)
        return url;
    var isBlobOrDataUrl = /^(blob|data):/i.test(url);
    if (isBlobOrDataUrl)
        return url;
    var isSvg = /\.svg$/.test(url);
    if (isSvg)
        return url;
    var isDevelopmentUrl = process.env.NODE_ENV === 'development' && !/^http/i.test(url);
    if (isDevelopmentUrl)
        return url;
    var sanitizedUrl = url.replace('https://ik.imagekit.io/avantstay/', '').replace(/^\//, '');
    var baseUrl = "https://imglite.avantstay.com/" + maxWidth + "x" + maxHeight + "/" + quality + "/" + sanitizedUrl;
    return query_string_1.default.stringifyUrl({ url: baseUrl, query: { crop: crop, sharpen: sharpen } }, { skipEmptyString: true });
}
function ImgLite(_a, ref) {
    var className = _a.className, crop = _a.crop, density = _a.density, height = _a.height, _b = _a.lowResQuality, lowResQuality = _b === void 0 ? 30 : _b, lowResWidth = _a.lowResWidth, quality = _a.quality, sharpen = _a.sharpen, sizingStep = _a.sizingStep, src = _a.src, width = _a.width, imageElementProps = __rest(_a, ["className", "crop", "density", "height", "lowResQuality", "lowResWidth", "quality", "sharpen", "sizingStep", "src", "width"]);
    var imageRef = react_1.useRef(null);
    var imageCallbackRef = react_1.useCallback(function (element) {
        var imageMutableRef = imageRef;
        imageMutableRef.current = element;
        if (typeof ref === 'function') {
            ref(element);
            return;
        }
        if (ref !== null) {
            var mutableRef = ref;
            mutableRef.current = element;
        }
    }, [ref]);
    var _c = react_1.useState(), currentImage = _c[0], setCurrentImage = _c[1];
    var loadImage = react_1.useCallback(function (src) {
        var image = new Image();
        image.onload = function () { return setCurrentImage(src); };
        image.src = src;
    }, []);
    var updateCurrentImage = react_1.useCallback(function () {
        var imageElement = imageRef.current;
        var elementHeight = imageElement ? imageElement.offsetHeight : 0;
        var elementWidth = imageElement ? imageElement.offsetWidth : 0;
        var maxHeight = height || getMaxSize(elementHeight, density, sizingStep);
        var maxWidth = width || getMaxSize(elementWidth, density, sizingStep);
        if (!maxHeight || !maxWidth)
            return;
        var thumbnailOptions = { crop: crop, maxHeight: maxHeight, maxWidth: maxWidth, quality: quality, sharpen: sharpen };
        var newSrc = thumbnail(src, thumbnailOptions);
        if (currentImage) {
            loadImage(newSrc);
            return;
        }
        if (lowResWidth) {
            var lowResolutionThumbnailOptions = __assign({}, thumbnailOptions, { maxHeight: undefined, maxWidth: lowResWidth, quality: lowResQuality });
            setCurrentImage(thumbnail(src, lowResolutionThumbnailOptions));
            loadImage(newSrc);
            return;
        }
        setCurrentImage(newSrc);
    }, [crop, currentImage, density, height, loadImage, lowResQuality, lowResWidth, quality, sharpen, sizingStep, src, width]);
    react_1.useLayoutEffect(function () {
        updateCurrentImage();
    }, [updateCurrentImage]);
    react_1.useEffect(function () {
        var debouncedUpdateCurrentImage = lodash_debounce_1.default(updateCurrentImage, 200);
        window.addEventListener('resize', debouncedUpdateCurrentImage);
        return function () {
            window.removeEventListener('resize', debouncedUpdateCurrentImage);
        };
    }, [updateCurrentImage]);
    return react_1.default.createElement(S.Image, __assign({ className: className, ref: imageCallbackRef, src: currentImage }, imageElementProps));
}
exports.default = react_1.default.memo(react_1.default.forwardRef(ImgLite));
