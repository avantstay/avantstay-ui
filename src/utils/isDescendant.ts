export default function isDescendant(parent: any, child: any) {
  let node = child.parentNode

  while (node !== null) {
    // noinspection EqualityComparisonWithCoercionJS
    if (node === parent) return true

    node = node.parentNode
  }

  return false
}
