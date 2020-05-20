"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isUriEncoded(uri) {
    return uri !== decodeURIComponent(uri);
}
exports.default = isUriEncoded;
