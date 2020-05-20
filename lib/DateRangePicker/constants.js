"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var is_mobile_1 = require("is-mobile");
var cssUtils_1 = require("../utils/cssUtils");
exports.Z_INDEX_CALENDAR_CONTAINER = is_mobile_1.isMobile() ? 99 + 4 : 99;
exports.XS_SCREEN = '24em';
exports.SM_SCREEN = '35.5em';
exports.MD_SCREEN = '48em';
exports.MD_SCREEN_PLUS_ONE = '769px';
exports.LG_SCREEN = '56em';
exports.LG_SCREEN_PLUS_ONE = '897px';
exports.XL_SCREEN_MINUS_ONE = '1023px';
exports.XL_SCREEN = '64em';
exports.XXL_SCREEN = '80em';
exports.XXL_SCREEN_MINUS_ONE = '1279px';
exports.CENTERED_CONTAINER_WIDTH = 1440;
exports.INSTITUTIONAL_CONTENT_WIDTH = 1140;
exports.MAX_TEXT_WIDTH = 700;
exports.MINW_XS_SCREEN = cssUtils_1.mediaScreen({ minWidth: exports.XS_SCREEN });
exports.MINW_SM_SCREEN = cssUtils_1.mediaScreen({ minWidth: exports.SM_SCREEN });
exports.MINW_MD_SCREEN = cssUtils_1.mediaScreen({ minWidth: exports.MD_SCREEN });
exports.MINW_MD_SCREEN_PLUS_ONE = cssUtils_1.mediaScreen({
    minWidth: exports.MD_SCREEN_PLUS_ONE,
});
exports.MINW_LG_SCREEN = cssUtils_1.mediaScreen({ minWidth: exports.LG_SCREEN });
exports.MINW_LG_SCREEN_PLUS_ONE = cssUtils_1.mediaScreen({
    minWidth: exports.LG_SCREEN_PLUS_ONE,
});
exports.MINW_XL_SCREEN = cssUtils_1.mediaScreen({ minWidth: exports.XL_SCREEN });
exports.MINW_XXL_SCREEN = cssUtils_1.mediaScreen({ minWidth: exports.XXL_SCREEN });
exports.MINW_CENTERED_CONTAINER_WIDTH = cssUtils_1.mediaScreen({
    minWidth: exports.CENTERED_CONTAINER_WIDTH + 'px',
});
exports.MINW_INSTITUTIONAL_CONTENT_WIDTH = cssUtils_1.mediaScreen({
    minWidth: exports.INSTITUTIONAL_CONTENT_WIDTH + 'px',
});
exports.MAXW_XS_SCREEN = cssUtils_1.mediaScreen({ maxWidth: exports.XS_SCREEN });
exports.MAXW_SM_SCREEN = cssUtils_1.mediaScreen({ maxWidth: exports.SM_SCREEN });
exports.MAXW_MD_SCREEN = cssUtils_1.mediaScreen({ maxWidth: exports.MD_SCREEN });
exports.MAXW_MD_SCREEN_PLUS_ONE = cssUtils_1.mediaScreen({
    maxWidth: exports.MD_SCREEN_PLUS_ONE,
});
exports.MAXW_LG_SCREEN = cssUtils_1.mediaScreen({ maxWidth: exports.LG_SCREEN });
exports.MAXW_LG_SCREEN_PLUS_ONE = cssUtils_1.mediaScreen({
    maxWidth: exports.LG_SCREEN_PLUS_ONE,
});
exports.MAXW_XL_SCREEN = cssUtils_1.mediaScreen({ maxWidth: exports.XL_SCREEN });
exports.MAXW_XL_SCREEN_MINUS_ONE = cssUtils_1.mediaScreen({
    maxWidth: exports.XL_SCREEN_MINUS_ONE,
});
exports.MAXW_XXL_SCREEN = cssUtils_1.mediaScreen({ maxWidth: exports.XXL_SCREEN });
exports.MAXW_XXL_MINUS_ONE_SCREEN = cssUtils_1.mediaScreen({
    maxWidth: exports.XXL_SCREEN_MINUS_ONE,
});
exports.MAXW_CENTERED_CONTAINER_WIDTH = cssUtils_1.mediaScreen({
    maxWidth: exports.CENTERED_CONTAINER_WIDTH + 'px',
});
exports.MAXW_INSTITUTIONAL_CONTENT_WIDTH = cssUtils_1.mediaScreen({
    maxWidth: exports.INSTITUTIONAL_CONTENT_WIDTH + 'px',
});
