export function offsetTop(elem: any): number {
  if (!elem) return 0

  return elem.offsetTop + offsetTop(elem.offsetParent)
}

export function offsetLeft(elem: any): number {
  if (!elem) return 0

  return elem.offsetLeft + offsetLeft(elem.offsetParent)
}
