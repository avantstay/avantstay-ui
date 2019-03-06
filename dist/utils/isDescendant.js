export default function (parent, child) {
    var node = child.parentNode;
    while (node != null) {
        // noinspection EqualityComparisonWithCoercionJS
        if (node == parent)
            return true;
        node = node.parentNode;
    }
    return false;
}
