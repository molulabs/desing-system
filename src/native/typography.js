// React Native takes one font file per weight: each family token and weight token maps to the
// name of its file in assets/fonts/native.

const FILES = {
    'IBM Plex Sans': { 400: 'IBMPlexSans-Regular', 500: 'IBMPlexSans-Medium', 600: 'IBMPlexSans-SemiBold' },
    'IBM Plex Mono': { 400: 'IBMPlexMono-Regular', 500: 'IBMPlexMono-Medium' },
};

export const ICON_FONT = 'tabler-icons';

/**
 * The font to draw a family token at a weight token, e.g. fontFamily(tokens.sans,
 * tokens.weightMedium). A weight the family lacks takes the closest one below it, as the
 * web does (Plex Mono has no 600: it draws 500).
 *
 * @param {string} family
 * @param {number} weight
 */
export function fontFamily(family, weight = 400) {
    const files = FILES[family];

    if (!files) {
        return family;
    }

    const weights = Object.keys(files).map(Number).sort((a, b) => a - b);
    const closest = weights.filter((candidate) => candidate <= weight).pop() ?? weights[0];

    return files[closest];
}
