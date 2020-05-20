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
var tiny_warning_1 = __importDefault(require("tiny-warning"));
var isUriEncoded_1 = __importDefault(require("../utils/isUriEncoded"));
var S = __importStar(require("./ImgLite.styles"));
var AUTO_DENSITY = is_mobile_1.isMobile() ? 1.5 : 1;
function createCallbackRef(ref, internalRef, internalRefToClear) {
    return function (element) {
        var internalMutableRef = internalRef;
        internalMutableRef.current = element;
        var internalMutableRefToClear = internalRefToClear;
        internalMutableRefToClear.current = null;
        if (typeof ref === 'function') {
            ref(element);
            return;
        }
        if (ref !== null) {
            var mutableRef = ref;
            mutableRef.current = element;
        }
    };
}
function getMaxSize(size, density, sizingStep) {
    if (density === void 0) { density = AUTO_DENSITY; }
    if (sizingStep === void 0) { sizingStep = 100; }
    return Math.ceil((size * density) / sizingStep) * sizingStep;
}
function sanitizeUrl(url) {
    return url.replace('https://ik.imagekit.io/avantstay/', '').replace(/^\//, '');
}
function thumbnail(url, options) {
    if (options === void 0) { options = {}; }
    var _a = options.fit, fit = _a === void 0 ? 'cover' : _a, _b = options.gravity, gravity = _b === void 0 ? 'entropy' : _b, height = options.height, _c = options.quality, quality = _c === void 0 ? 85 : _c, _d = options.sharpen, sharpen = _d === void 0 ? '1,0.3,1' : _d, width = options.width;
    if (url === '')
        return url;
    if (/^(blob|data):/i.test(url))
        return url;
    if (/\.svg$/.test(url))
        return url;
    if (process.env.NODE_ENV === 'development' && !/^http/i.test(url))
        return url;
    var sanitizedUrl = sanitizeUrl(url);
    var urlEncoded = isUriEncoded_1.default(sanitizedUrl) ? sanitizedUrl : encodeURIComponent(sanitizedUrl);
    var baseUrl = "https://imglite.avantstay.com/" + urlEncoded;
    var heightStringified = typeof height === 'number' ? height.toString(10) : '';
    var qualityStringified = quality.toString(10);
    var widthStringified = typeof width === 'number' ? width.toString(10) : '';
    return query_string_1.default.stringifyUrl({
        url: baseUrl,
        query: { fit: fit, gravity: gravity, height: heightStringified, quality: qualityStringified, sharpen: sharpen, width: widthStringified },
    }, { skipEmptyString: true });
}
function ImgLite(_a, ref) {
    var children = _a.children, crop = _a.crop, density = _a.density, fit = _a.fit, height = _a.height, _b = _a.lowResQuality, lowResQuality = _b === void 0 ? 30 : _b, lowResWidth = _a.lowResWidth, gravity = _a.gravity, quality = _a.quality, sharpen = _a.sharpen, sizingStep = _a.sizingStep, src = _a.src, width = _a.width, elementProps = __rest(_a, ["children", "crop", "density", "fit", "height", "lowResQuality", "lowResWidth", "gravity", "quality", "sharpen", "sizingStep", "src", "width"]);
    tiny_warning_1.default(!crop, 'crop property on ImgLite is going to be deprecated in a next major. Use gravity instead.');
    var divRef = react_1.useRef(null);
    var imageRef = react_1.useRef(null);
    var divCallbackRef = react_1.useMemo(function () { return createCallbackRef(ref, divRef, imageRef); }, [ref]);
    var imageCallbackRef = react_1.useMemo(function () { return createCallbackRef(ref, imageRef, divRef); }, [ref]);
    var _c = react_1.useState(), currentImage = _c[0], setCurrentImage = _c[1];
    var loadImage = react_1.useCallback(function (src) {
        var image = new Image();
        image.onload = function () { return setCurrentImage(src); };
        image.src = src;
    }, []);
    var updateCurrentImage = react_1.useCallback(function () {
        var imageElement = divRef.current || imageRef.current;
        var elementHeight = imageElement ? imageElement.offsetHeight : 0;
        var elementWidth = imageElement ? imageElement.offsetWidth : 0;
        var maxHeight = height || getMaxSize(elementHeight, density, sizingStep);
        var maxWidth = width || getMaxSize(elementWidth, density, sizingStep);
        if (!maxHeight || !maxWidth)
            return;
        var thumbnailOptions = { fit: fit, gravity: gravity || crop, height: maxHeight, quality: quality, sharpen: sharpen, width: maxWidth };
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
    }, [
        crop,
        currentImage,
        density,
        fit,
        gravity,
        height,
        loadImage,
        lowResQuality,
        lowResWidth,
        quality,
        sharpen,
        sizingStep,
        src,
        width,
    ]);
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
    return children ? (react_1.default.createElement(S.Background, __assign({ ref: divCallbackRef, src: currentImage }, elementProps), children)) : (react_1.default.createElement(S.Image, __assign({ ref: imageCallbackRef, src: currentImage }, elementProps)));
}
exports.default = react_1.default.memo(react_1.default.forwardRef(ImgLite));
