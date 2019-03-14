export function useElementOffset(element: HTMLElement | null) {
  const clientRect = (element &&
    (element as HTMLElement).getBoundingClientRect()) ||
    { top: 0, left: 0, width: 0, height: 0, bottom: 0, right: 0 }

  return {
    height: clientRect.height,
    width : clientRect.width,
    top   : clientRect.top,
    left  : clientRect.left,
    bottom: clientRect.bottom,
    right : clientRect.right,
  }
}