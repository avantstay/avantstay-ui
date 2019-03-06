import tinyColor from 'tinycolor2';
import { kebabCase } from 'lodash';
export function lighten(color, percentage) {
    return tinyColor(color).lighten(percentage).toRgbString();
}
export function darken(color, percentage) {
    return tinyColor(color).darken(percentage).toRgbString();
}
export function rgba(color, alpha) {
    return tinyColor(color).setAlpha(alpha).toRgbString();
}
export function mediaScreen(props) {
    return "@media screen and " + Object.keys(props)
        .map(function (it) { return "(" + kebabCase(it) + ": " + props[it] + ")"; })
        .join(' and ');
}
