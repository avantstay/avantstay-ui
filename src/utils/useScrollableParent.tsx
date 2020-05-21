import { useMemo } from 'react'
import { getScrollableParent } from './getPortalElement'

export function useScrollableParent(element: HTMLElement | undefined | null) {
  return useMemo(() => {
    return getScrollableParent(element as HTMLElement)
  }, [element])
}
