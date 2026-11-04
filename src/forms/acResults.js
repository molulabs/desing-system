// What an Autocomplete lists for the typed text, the same for every renderer.

/** Lower case, without accents or edge spaces: how the text and the items are compared. */
export const acNorm = s => String(s == null ? '' : s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
export const defaultExact = (it, t) => acNorm(typeof it.label === 'string' ? it.label : it.value) === acNorm(t);
export const defaultCreateLabel = t => 'Crear «' + t + '»';

/**
 * The items that match the text (by label and meta) and whether the "Crear «text»" row shows:
 * creating is on and nothing in the catalog, nor in `exclude`, already is that text.
 */
export function acResults({ items, query, onCreate, matchExact = defaultExact, exclude = [] }) {
  const text = (query || '').trim();
  const q = acNorm(text);
  const list = q ? items.filter(it => acNorm((typeof it.label === 'string' ? it.label : '') + ' ' + (it.meta || '')).includes(q)) : items;
  const canCreate = !!onCreate && !!text && ![...items, ...exclude].some(it => matchExact(it, text));
  return { text, list, canCreate };
}
