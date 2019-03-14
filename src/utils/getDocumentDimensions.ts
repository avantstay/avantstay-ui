export function getDocumentDimensions() {
  const fullSizeElement = document.createElement('div')
  fullSizeElement.style.position = 'absolute'
  fullSizeElement.style.top = '0'
  fullSizeElement.style.bottom = '0'
  fullSizeElement.style.left = '0'
  fullSizeElement.style.right = '0'
  document.body.appendChild(fullSizeElement)

  const documentWidth = fullSizeElement.offsetWidth
  const documentHeight = fullSizeElement.offsetHeight

  document.body.removeChild(fullSizeElement)

  return {
    documentWidth,
    documentHeight,
  }
}