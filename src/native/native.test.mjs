import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { test } from 'node:test';

import { iconGlyph } from './icons.js';
import { border, lineHeight, padding } from './style.js';
import { fontFamily } from './typography.js';
import { nativeTokens } from '../../tokens/native.js';

test('padding tokens spread as in CSS', () => {
    assert.deepEqual(padding(8), { paddingTop: 8, paddingRight: 8, paddingBottom: 8, paddingLeft: 8 });
    assert.deepEqual(padding([14, 18]), { paddingTop: 14, paddingRight: 18, paddingBottom: 14, paddingLeft: 18 });
    assert.deepEqual(padding([16, 16, 88]), { paddingTop: 16, paddingRight: 16, paddingBottom: 88, paddingLeft: 16 });
    assert.deepEqual(padding([1, 2, 3, 4]), { paddingTop: 1, paddingRight: 2, paddingBottom: 3, paddingLeft: 4 });
});

test('border and line height tokens become React Native props', () => {
    const tokens = nativeTokens();

    assert.deepEqual(border(tokens.borderHair), { borderWidth: 1, borderStyle: 'solid', borderColor: '#DCDFD8' });
    assert.equal(lineHeight(tokens.uiText, tokens.leadingNormal), 25);
});

test('a family and weight token name the font file, falling back to the closest lighter weight', () => {
    const tokens = nativeTokens();

    assert.equal(fontFamily(tokens.sans), 'IBMPlexSans-Regular');
    assert.equal(fontFamily(tokens.sans, tokens.weightSemibold), 'IBMPlexSans-SemiBold');
    assert.equal(fontFamily(tokens.mono, tokens.weightSemibold), 'IBMPlexMono-Medium');
    assert.equal(fontFamily('System', 500), 'System');
});

test('every font fontFamily names ships as a file', () => {
    const files = readdirSync(new URL('../../assets/fonts/native/', import.meta.url));
    const tokens = nativeTokens();

    for (const family of [tokens.sans, tokens.mono]) {
        for (const weight of [400, 500, 600]) {
            assert.ok(files.includes(`${fontFamily(family, weight)}.ttf`), fontFamily(family, weight));
        }
    }

    assert.ok(files.includes('tabler-icons.ttf'));
});

test('icons take the web name and draw their Tabler character', () => {
    assert.equal(iconGlyph('ti-plus'), '');
    assert.equal(iconGlyph('plus'), '');
    // Past the 16 bit range
    assert.equal(iconGlyph('ti-wheat'), String.fromCodePoint(0x100a8));
    assert.equal(iconGlyph('ti-not-an-icon'), undefined);
});
