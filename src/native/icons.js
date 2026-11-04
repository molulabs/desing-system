import { glyphs } from '../../tokens/native-icons.js';

/**
 * The character the Tabler font draws for an icon prop, "ti-plus" (as the web takes it) or
 * "plus"; undefined for an icon Tabler does not have.
 *
 * @param {string} name
 */
export function iconGlyph(name) {
    const code = glyphs[name.replace(/^ti-/, '')];

    return code === undefined ? undefined : String.fromCodePoint(code);
}
