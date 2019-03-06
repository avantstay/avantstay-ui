import { isMobile } from 'is-mobile';
import { mediaScreen } from '../utils/cssUtils';
export var Z_INDEX_CALENDAR_CONTAINER = isMobile() ? 99 + 4 : 99;
//
// SCREEN SIZES
//
export var XS_SCREEN = '24em'; // 384px
export var SM_SCREEN = '35.5em'; // 568px
export var MD_SCREEN = '48em'; // 768px
export var MD_SCREEN_PLUS_ONE = '769px';
export var LG_SCREEN = '56em'; // 896px
export var LG_SCREEN_PLUS_ONE = '897px';
export var XL_SCREEN_MINUS_ONE = '1023px'; // 1024px
export var XL_SCREEN = '64em'; // 1024px
export var XXL_SCREEN = '80em'; // 1280px
export var XXL_SCREEN_MINUS_ONE = '1279px'; // 1280px
export var CENTERED_CONTAINER_WIDTH = 1440; // px
export var INSTITUTIONAL_CONTENT_WIDTH = 1140;
export var MAX_TEXT_WIDTH = 700;
export var MINW_XS_SCREEN = mediaScreen({ minWidth: XS_SCREEN });
export var MINW_SM_SCREEN = mediaScreen({ minWidth: SM_SCREEN });
export var MINW_MD_SCREEN = mediaScreen({ minWidth: MD_SCREEN });
export var MINW_MD_SCREEN_PLUS_ONE = mediaScreen({
    minWidth: MD_SCREEN_PLUS_ONE,
});
export var MINW_LG_SCREEN = mediaScreen({ minWidth: LG_SCREEN });
export var MINW_LG_SCREEN_PLUS_ONE = mediaScreen({
    minWidth: LG_SCREEN_PLUS_ONE,
});
export var MINW_XL_SCREEN = mediaScreen({ minWidth: XL_SCREEN });
export var MINW_XXL_SCREEN = mediaScreen({ minWidth: XXL_SCREEN });
export var MINW_CENTERED_CONTAINER_WIDTH = mediaScreen({
    minWidth: CENTERED_CONTAINER_WIDTH + 'px',
});
export var MINW_INSTITUTIONAL_CONTENT_WIDTH = mediaScreen({
    minWidth: INSTITUTIONAL_CONTENT_WIDTH + 'px',
});
export var MAXW_XS_SCREEN = mediaScreen({ maxWidth: XS_SCREEN });
export var MAXW_SM_SCREEN = mediaScreen({ maxWidth: SM_SCREEN });
export var MAXW_MD_SCREEN = mediaScreen({ maxWidth: MD_SCREEN });
export var MAXW_MD_SCREEN_PLUS_ONE = mediaScreen({
    maxWidth: MD_SCREEN_PLUS_ONE,
});
export var MAXW_LG_SCREEN = mediaScreen({ maxWidth: LG_SCREEN });
export var MAXW_LG_SCREEN_PLUS_ONE = mediaScreen({
    maxWidth: LG_SCREEN_PLUS_ONE,
});
export var MAXW_XL_SCREEN = mediaScreen({ maxWidth: XL_SCREEN });
export var MAXW_XL_SCREEN_MINUS_ONE = mediaScreen({
    maxWidth: XL_SCREEN_MINUS_ONE,
});
export var MAXW_XXL_SCREEN = mediaScreen({ maxWidth: XXL_SCREEN });
export var MAXW_XXL_MINUS_ONE_SCREEN = mediaScreen({
    maxWidth: XXL_SCREEN_MINUS_ONE,
});
export var MAXW_CENTERED_CONTAINER_WIDTH = mediaScreen({
    maxWidth: CENTERED_CONTAINER_WIDTH + 'px',
});
export var MAXW_INSTITUTIONAL_CONTENT_WIDTH = mediaScreen({
    maxWidth: INSTITUTIONAL_CONTENT_WIDTH + 'px',
});
