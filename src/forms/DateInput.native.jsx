import React from 'react';
import { TextInput as NativeTextInput, View } from 'react-native';

import { Icon } from '../native/Icon.jsx';
import { useTokens } from '../native/theme.jsx';
import { Txt } from '../native/Txt.jsx';
import { controlStyle } from './Field.native.jsx';
import { displayToIso, isoToDisplay, maskDate } from './dateText.js';

/**
 * A date typed as dd/mm/aaaa with the number pad: no picker to install, and faster than a
 * calendar for a date someone reads off a document. onChange gets the ISO date once it is a real
 * day, "" when cleared; what is half typed stays in the field.
 */
export function DateInput({ value, onChange, invalid, disabled, id, style }) {
  const t = useTokens();
  const [focus, setFocus] = React.useState(false);
  const [text, setText] = React.useState(isoToDisplay(value));

  // A value from outside (a reset, a loaded record) replaces what is shown
  React.useEffect(() => {
    setText(current => (displayToIso(current) === (value || null) ? current : isoToDisplay(value)));
  }, [value]);

  const type = next => {
    const masked = maskDate(next);
    setText(masked);
    if (!onChange) return;
    const iso = displayToIso(masked);
    if (iso) { if (iso !== value) onChange(iso); }
    else if (masked === '' && value) onChange('');
  };
  const incomplete = text !== '' && !displayToIso(text);

  return (
    <View style={{ justifyContent: 'center' }}>
      <NativeTextInput nativeID={id} keyboardType="number-pad" maxLength={10} value={text} editable={!disabled}
        placeholder="dd/mm/aaaa" placeholderTextColor={t.ink3}
        accessibilityLabelledBy={id ? id + '-label' : undefined}
        onChangeText={type} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={[controlStyle({ invalid: invalid || (incomplete && !focus), disabled, mono: true, focus }, t), { paddingRight: 32 }, style]} />
      <Icon name="ti-calendar" size={16} color={t.ink3} pointerEvents="none" style={{ position: 'absolute', right: 10 }} />
    </View>
  );
}

export function DateRange({ from, to, onFrom, onTo, style }) {
  const t = useTokens();

  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 8 }, style]}>
      <View style={{ flex: 1 }}><DateInput value={from} onChange={onFrom} /></View>
      <Txt size={t.uiText} color={t.ink3}>a</Txt>
      <View style={{ flex: 1 }}><DateInput value={to} onChange={onTo} /></View>
    </View>
  );
}
