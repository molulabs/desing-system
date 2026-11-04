// Turns the shorthand tokens into React Native style props.

/**
 * A padding token, [all] | [vertical, horizontal] | [top, horizontal, bottom] |
 * [top, right, bottom, left] as in CSS, as React Native padding props.
 *
 * @param {number | number[]} value
 */
export function padding(value) {
    const [top, right = top, bottom = top, left = right] = Array.isArray(value) ? value : [value];

    return { paddingTop: top, paddingRight: right, paddingBottom: bottom, paddingLeft: left };
}

/**
 * A border token, { width, style, color }, as React Native border props.
 *
 * @param {{ width: number, style: string, color: string }} value
 */
export function border(value) {
    return { borderWidth: value.width, borderStyle: value.style, borderColor: value.color };
}

/**
 * The line height React Native takes, in px: the tokens keep the CSS multiplier.
 *
 * @param {number} fontSize
 * @param {number} leading
 */
export function lineHeight(fontSize, leading) {
    return Math.round(fontSize * leading);
}
