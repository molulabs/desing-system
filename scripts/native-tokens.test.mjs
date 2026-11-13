import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

import { buildNativeTokens, parseScopes, readTokenCss, render, toNative } from './native-tokens.mjs';
import { nativeTokens, themes } from '../tokens/native.js';

test('tokens/native.js is up to date with the CSS', () => {
    const { js, types } = render(buildNativeTokens(readTokenCss()));

    assert.equal(readFileSync(new URL('../tokens/native.js', import.meta.url), 'utf8'), js, 'run `npm run tokens:native`');
    assert.equal(readFileSync(new URL('../tokens/native.d.ts', import.meta.url), 'utf8'), types, 'run `npm run tokens:native`');
});

test('a theme reaches the tokens that alias its colours', () => {
    assert.equal(themes.carbon.surfacePage, '#F3F3F2');
    assert.deepEqual(themes.carbon.borderHair, { width: 1, style: 'solid', color: '#DDDDDA' });
    // Status colours are not themed
    assert.equal(themes.carbon.ok, themes.campo.ok);
});

test('the malbec theme reaches native', () => {
    assert.equal(themes.malbec.chrome, '#300A24');
    assert.equal(themes.malbec.leather, '#82601C');
    assert.equal(themes.malbec.ok, themes.campo.ok);
});

test('native defaults to the touch density of the campo theme', () => {
    const tokens = nativeTokens();

    assert.equal(tokens.chrome, '#223026');
    assert.equal(tokens.tapMin, 44);
    assert.deepEqual(tokens.padControl, [14, 18]);
    assert.equal(nativeTokens({ density: 'compact' }).tapMin, 28);
    assert.equal(nativeTokens({ density: 'comfortable' }).leadingNormal, 1.6);
});

test('values become what React Native takes', () => {
    assert.equal(toNative('13.5px'), 13.5);
    assert.equal(toNative('600'), 600);
    assert.equal(toNative('.12s'), 120);
    assert.equal(toNative('#F3F4F1'), '#F3F4F1');
    assert.equal(toNative('rgba(25, 33, 28, .45)'), 'rgba(25, 33, 28, .45)');
    assert.deepEqual(toNative('26px 28px 48px'), [26, 28, 48]);
    assert.deepEqual(toNative('1px solid #DCDFD8'), { width: 1, style: 'solid', color: '#DCDFD8' });
    assert.deepEqual(toNative('cubic-bezier(.2, .7, .3, 1)'), [0.2, 0.7, 0.3, 1]);
    assert.equal(toNative('"IBM Plex Sans", system-ui, sans-serif'), 'IBM Plex Sans');
    assert.equal(toNative('0 10px 24px rgba(15, 25, 18, .18)'), '0 10px 24px rgba(15, 25, 18, .18)');

    for (const webOnly of ['72ch', '50%', '-0.015em', 'clamp(28px, 5.5vw, 28px)']) {
        assert.equal(toNative(webOnly), undefined, webOnly);
    }
});

test('a token web only in one density is left out of all of them', () => {
    const { densities, webOnly } = buildNativeTokens(`
        :root { --w: 460px; }
        [data-density="compact"] { --w: 460px; }
        [data-density="touch"] { --w: 100%; }
    `);

    assert.deepEqual(webOnly, ['w']);
    assert.deepEqual(densities, { compact: {}, touch: {} });
});

test('tokens under a selector native cannot follow fail instead of going missing', () => {
    assert.throws(() => parseScopes('.dark { --ink: #000; }'), /\.dark/);
    // Rules without tokens and @-blocks are fine
    assert.doesNotThrow(() => parseScopes('body { color: red; } @keyframes x { from { opacity: 0; } }'));
});

test('a theme token that changes with the density cannot be split and fails', () => {
    assert.throws(
        () =>
            buildNativeTokens(`
                :root { --gap: 4px; --pad: var(--gap); }
                [data-density="compact"] { --gap: 4px; }
                [data-density="touch"] { --gap: 8px; }
                [data-theme="dark"] { --pad: 2px; }
            `),
        // --pad follows --gap in the default theme
        /campo.*touch/
    );
});
