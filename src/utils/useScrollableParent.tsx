import { useMemo } from 'react'

export function useScrollableParent(element: HTMLElement | null) {
  return useMemo(() => {
    function getScrollParent(node: any): HTMLElement | null {
      if (node == null) {
        return null
      }

      if (node.scrollHeight > node.clientHeight) {
        return node
      } else {
        return getScrollParent(node.parentNode)
      }
    }

    return getScrollParent(element)
  }, [element])
}