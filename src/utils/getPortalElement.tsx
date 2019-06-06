const _portalElements: Array<{
  rootElement: HTMLElement
  portalElement: HTMLElement
}> = []

export function getPortalElement(rootElement: HTMLElement): HTMLElement | null {
  if (!rootElement) return null

  const existingPortalElement = _portalElements.find((it) => it.rootElement === rootElement)

  if (existingPortalElement) return existingPortalElement.portalElement

  const scrollableParent = getScrollableParent(rootElement)
  const portalElement = document.createElement('div')

  if (scrollableParent) scrollableParent.appendChild(portalElement)
  else document.body.appendChild(portalElement)

  _portalElements.push({
    portalElement: portalElement,
    rootElement,
  })

  return portalElement
}

export function getScrollableParent(node: HTMLElement | null): HTMLElement {
  const overflowRegex = /(auto|scroll)/

  if (node == null) return document.body

  const { overflow, overflowX, overflowY, position } = getComputedStyle(node)

  if (position === 'static') {
    return getScrollableParent(node.parentNode as HTMLElement)
  }

  if (overflowRegex.test(`${overflow}${overflowX}${overflowY}`)) {
    return node
  } else {
    return getScrollableParent(node.parentNode as HTMLElement)
  }
}
