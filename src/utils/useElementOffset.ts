import { offsetLeft, offsetTop } from './offset'

export function useElementOffset(element: HTMLElement | null, scrollableParent?: HTMLElement) {
  const clientRect = (element && (element as HTMLElement).getBoundingClientRect()) || {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    bottom: 0,
    right: 0,
  }

  let parentOffsetTop = 0
  let parentOffsetLeft = 0

  if (element && scrollableParent) {
    parentOffsetTop = offsetTop(scrollableParent) - scrollableParent.scrollTop
    parentOffsetLeft = offsetLeft(scrollableParent) - scrollableParent.scrollLeft
  }

  return {
    height: clientRect.height,
    width: clientRect.width,
    top: clientRect.top - parentOffsetTop,
    left: clientRect.left - parentOffsetLeft,
    bottom: clientRect.bottom,
    right: clientRect.right,
  }
}
