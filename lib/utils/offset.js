export function offsetTop(elem) {
    if (!elem)
        return 0;
    return elem.offsetTop + offsetTop(elem.offsetParent);
}
export function offsetLeft(elem) {
    if (!elem)
        return 0;
    return elem.offsetLeft + offsetLeft(elem.offsetParent);
}
