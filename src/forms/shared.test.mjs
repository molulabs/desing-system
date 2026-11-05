// The logic web and native components share: one copy, tested once.
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { acNorm, acResults } from './acResults.js';
import { displayToIso, isoToDisplay, maskDate } from './dateText.js';
import { multiChoiceState } from './multiChoice.js';
import { statusOf } from './stepStatus.js';

const options = ['Vacunos', 'Ovinos', 'Caprinos', { value: 'none', label: 'Ninguno', exclusive: true }];

test('MultiChoice: an exclusive option clears the rest, and the rest clear it', () => {
    assert.deepEqual(multiChoiceState({ value: ['Vacunos', 'Ovinos'], options }).toggle({ value: 'none', exclusive: true }), ['none']);
    assert.deepEqual(multiChoiceState({ value: ['none'], options }).toggle({ value: 'Vacunos' }), ['Vacunos']);
    assert.deepEqual(multiChoiceState({ value: ['Vacunos'], options }).toggle({ value: 'Vacunos' }), []);
});

test('MultiChoice: at the max, only exclusive options and the chosen ones can be tapped', () => {
    const state = multiChoiceState({ value: ['Vacunos', 'Ovinos'], options, max: 2 });

    assert.equal(state.toggle({ value: 'Caprinos' }), undefined);
    assert.equal(state.isOff({ value: 'Caprinos' }), true);
    assert.equal(state.isOff({ value: 'Vacunos' }), false);
    assert.equal(state.isOff({ value: 'none', exclusive: true }), false);
    assert.equal(state.summary, '2 de 3 seleccionadas · máx. 2');
    assert.equal(multiChoiceState({ value: ['none'], options }).summary, 'Ninguno');
    assert.equal(multiChoiceState({ value: [], options }).summary, 'Ninguna seleccionada');
    assert.equal(multiChoiceState({ value: [], options, disabled: true }).toggle({ value: 'Vacunos' }), undefined);
});

test('dates are typed as dd/mm/aaaa and kept as ISO', () => {
    assert.equal(isoToDisplay('2026-11-02'), '02/11/2026');
    assert.equal(isoToDisplay(''), '');
    assert.equal(maskDate('0211'), '02/11');
    assert.equal(maskDate('02/11/2026xx9'), '02/11/2026');
    assert.equal(displayToIso('02/11/2026'), '2026-11-02');
    assert.equal(displayToIso('02/11/20'), null);
    assert.equal(displayToIso('31/02/2026'), null);
    assert.equal(displayToIso('29/02/2028'), '2028-02-29');
});

test('Autocomplete matches ignoring case and accents, and offers to create what is not there', () => {
    const items = [{ label: 'Criolla', meta: 'CR' }, { label: 'Hereford' }];

    assert.equal(acNorm('  Áéí '), 'aei');
    assert.deepEqual(acResults({ items, query: 'crió' }).list, [items[0]]);
    assert.deepEqual(acResults({ items, query: 'cr' }).list, [items[0]]);
    assert.equal(acResults({ items, query: 'Angus', onCreate() {} }).canCreate, true);
    assert.equal(acResults({ items, query: 'criolla ', onCreate() {} }).canCreate, false);
    assert.equal(acResults({ items, query: 'Angus' }).canCreate, false);
    assert.equal(acResults({ items: [], query: 'Angus', onCreate() {}, exclude: [{ label: 'angus' }] }).canCreate, false);
});

test('a step is done before the current one, todo after it, unless it says otherwise', () => {
    assert.equal(statusOf({}, 0, 1), 'done');
    assert.equal(statusOf({}, 1, 1), 'current');
    assert.equal(statusOf({}, 2, 1), 'todo');
    assert.equal(statusOf({ status: 'error' }, 0, 1), 'error');
});

test('no source writes combining marks literally: a page read as latin1 breaks the regex that strips accents', async () => {
    const { readdirSync, readFileSync } = await import('node:fs');
    const { join } = await import('node:path');
    const root = new URL('..', import.meta.url).pathname;
    const files = readdirSync(root, { recursive: true }).filter((f) => /\.(js|jsx)$/.test(f));

    for (const file of files) {
        assert.doesNotMatch(readFileSync(join(root, file), 'utf8'), /[̀-ͯ]/, file + ': write it as \\u0300-\\u036f');
    }
});
