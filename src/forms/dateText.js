// A date typed as dd/mm/aaaa and kept as ISO (aaaa-mm-dd), for the inputs that have no date
// picker.

/** "2026-11-02" → "02/11/2026"; anything else → "". */
export function isoToDisplay(iso) {
  const m = typeof iso === 'string' ? iso.match(/^(\d{4})-(\d{2})-(\d{2})$/) : null;
  return m ? m[3] + '/' + m[2] + '/' + m[1] : '';
}

/** What was typed, kept to digits and slashed as dd/mm/aaaa while it is typed. */
export function maskDate(text) {
  const d = String(text).replace(/\D/g, '').slice(0, 8);
  if (d.length <= 2) return d;
  if (d.length <= 4) return d.slice(0, 2) + '/' + d.slice(2);
  return d.slice(0, 2) + '/' + d.slice(2, 4) + '/' + d.slice(4);
}

/** "02/11/2026" → "2026-11-02"; null while incomplete or not a real day (31/02). */
export function displayToIso(text) {
  const m = String(text).match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return null;
  const [, dd, mm, yyyy] = m;
  const date = new Date(Date.UTC(+yyyy, +mm - 1, +dd));
  const real = date.getUTCFullYear() === +yyyy && date.getUTCMonth() === +mm - 1 && date.getUTCDate() === +dd;
  return real ? yyyy + '-' + mm + '-' + dd : null;
}
