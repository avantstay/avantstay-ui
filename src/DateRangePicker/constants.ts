import { isMobile } from 'is-mobile'
import { mediaScreen } from '../utils/cssUtils'

export const Z_INDEX_CALENDAR_CONTAINER = isMobile() ? 99 + 4 : 99

//
// SCREEN SIZES
//
export const XS_SCREEN = '24em' // 384px
export const SM_SCREEN = '35.5em' // 568px
export const MD_SCREEN = '48em' // 768px
export const MD_SCREEN_PLUS_ONE = '769px'
export const LG_SCREEN = '56em' // 896px
export const LG_SCREEN_PLUS_ONE = '897px'
export const XL_SCREEN_MINUS_ONE = '1023px' // 1024px
export const XL_SCREEN = '64em' // 1024px
export const XXL_SCREEN = '80em' // 1280px
export const XXL_SCREEN_MINUS_ONE = '1279px' // 1280px
export const CENTERED_CONTAINER_WIDTH = 1440 // px
export const INSTITUTIONAL_CONTENT_WIDTH = 1140
export const MAX_TEXT_WIDTH = 700

export const MINW_XS_SCREEN = mediaScreen({ minWidth: XS_SCREEN })
export const MINW_SM_SCREEN = mediaScreen({ minWidth: SM_SCREEN })
export const MINW_MD_SCREEN = mediaScreen({ minWidth: MD_SCREEN })
export const MINW_MD_SCREEN_PLUS_ONE = mediaScreen({
  minWidth: MD_SCREEN_PLUS_ONE,
})
export const MINW_LG_SCREEN = mediaScreen({ minWidth: LG_SCREEN })
export const MINW_LG_SCREEN_PLUS_ONE = mediaScreen({
  minWidth: LG_SCREEN_PLUS_ONE,
})
export const MINW_XL_SCREEN = mediaScreen({ minWidth: XL_SCREEN })
export const MINW_XXL_SCREEN = mediaScreen({ minWidth: XXL_SCREEN })
export const MINW_CENTERED_CONTAINER_WIDTH = mediaScreen({
  minWidth: CENTERED_CONTAINER_WIDTH + 'px',
})
export const MINW_INSTITUTIONAL_CONTENT_WIDTH = mediaScreen({
  minWidth: INSTITUTIONAL_CONTENT_WIDTH + 'px',
})

export const MAXW_XS_SCREEN = mediaScreen({ maxWidth: XS_SCREEN })
export const MAXW_SM_SCREEN = mediaScreen({ maxWidth: SM_SCREEN })
export const MAXW_MD_SCREEN = mediaScreen({ maxWidth: MD_SCREEN })
export const MAXW_MD_SCREEN_PLUS_ONE = mediaScreen({
  maxWidth: MD_SCREEN_PLUS_ONE,
})
export const MAXW_LG_SCREEN = mediaScreen({ maxWidth: LG_SCREEN })
export const MAXW_LG_SCREEN_PLUS_ONE = mediaScreen({
  maxWidth: LG_SCREEN_PLUS_ONE,
})
export const MAXW_XL_SCREEN = mediaScreen({ maxWidth: XL_SCREEN })
export const MAXW_XL_SCREEN_MINUS_ONE = mediaScreen({
  maxWidth: XL_SCREEN_MINUS_ONE,
})
export const MAXW_XXL_SCREEN = mediaScreen({ maxWidth: XXL_SCREEN })
export const MAXW_XXL_MINUS_ONE_SCREEN = mediaScreen({
  maxWidth: XXL_SCREEN_MINUS_ONE,
})
export const MAXW_CENTERED_CONTAINER_WIDTH = mediaScreen({
  maxWidth: CENTERED_CONTAINER_WIDTH + 'px',
})
export const MAXW_INSTITUTIONAL_CONTENT_WIDTH = mediaScreen({
  maxWidth: INSTITUTIONAL_CONTENT_WIDTH + 'px',
})
