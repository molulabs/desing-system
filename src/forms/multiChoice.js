// What a MultiChoice answers, the same for every renderer: the options, which are on or off and
// what tapping one leaves selected.

export function multiChoiceState({ value, options = [], max, disabled }) {
  const opts = options.map(o => (typeof o === 'object' ? o : { value: o, label: o }));
  const sel = Array.isArray(value) ? value : [];
  const full = max != null && sel.length >= max;
  const main = opts.filter(o => !o.exclusive);
  const ex = opts.filter(o => o.exclusive);

  // An option is off when it cannot be added: disabled, or the max is reached (exclusives stay on)
  const isOn = o => sel.includes(o.value);
  const isOff = o => disabled || (!isOn(o) && full && !o.exclusive);

  /** The selection after tapping the option, or undefined when the tap changes nothing. */
  const toggle = o => {
    if (disabled) return undefined;
    if (isOn(o)) return sel.filter(v => v !== o.value);
    if (o.exclusive) return [o.value];
    if (full) return undefined;
    const excl = ex.map(x => x.value);
    return [...sel.filter(v => !excl.includes(v)), o.value];
  };

  // The line under the 'list' variant
  const chosenExclusive = ex.find(isOn);
  const summary = (sel.length ? (chosenExclusive ? chosenExclusive.label : sel.length + ' de ' + main.length + ' seleccionadas') : 'Ninguna seleccionada')
    + (max != null ? ' · máx. ' + max : '');

  return { opts, sel, main, ex, isOn, isOff, toggle, summary };
}
