import React from 'react';
import { Pressable, View } from 'react-native';

import { Icon } from '../native/Icon.jsx';
import { useTokens } from '../native/theme.jsx';
import { Txt } from '../native/Txt.jsx';
import { padding } from '../native/style.js';
import { Sheet } from '../mobile/Sheet.native.jsx';
import { controlStyle } from './Field.native.jsx';

/**
 * Closed list. The web opens the browser's <select>; a phone opens a Sheet with one row per
 * option. The placeholder is the empty choice, as the web's first option.
 */
export function Select({ value, onChange, options = [], placeholder, invalid, disabled, id, style }) {
  const t = useTokens();
  const [open, setOpen] = React.useState(false);
  const opts = options.map(o => (typeof o === 'string' ? { value: o, label: o } : o));
  const current = opts.find(o => o.value === value);
  const { color, fontFamily, fontSize, textAlign, ...box } = controlStyle({ invalid, disabled, focus: open }, t);
  const choose = next => {
    setOpen(false);
    if (next !== value && onChange) onChange(next);
  };

  return (
    <>
      <Pressable nativeID={id} accessibilityRole="combobox" accessibilityState={{ disabled: !!disabled, expanded: open }}
        accessibilityLabelledBy={id ? id + '-label' : undefined} accessibilityValue={{ text: current ? current.label : placeholder }}
        disabled={disabled} onPress={() => setOpen(true)}
        style={[box, { flexDirection: 'row', alignItems: 'center', paddingRight: 32 }, style]}>
        <Txt size={fontSize} color={current ? t.ink : t.ink3} numberOfLines={1} style={{ flex: 1 }}>
          {current ? current.label : placeholder || ''}
        </Txt>
        <Icon name="ti-chevron-down" size={16} color={t.ink3} style={{ position: 'absolute', right: 10 }} />
      </Pressable>
      <Sheet open={open} title={placeholder} onClose={() => setOpen(false)}>
        {[...(placeholder ? [{ value: '', label: placeholder, empty: true }] : []), ...opts].map((o, i) => {
          const on = o.value === (value ?? '');
          return (
            <Pressable key={String(o.value)} accessibilityRole="radio" accessibilityState={{ checked: on }} onPress={() => choose(o.value)}
              style={({ pressed }) => ({
                flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: t.tapMin, ...padding(t.padRow),
                borderTopWidth: i === 0 ? 0 : t.borderHairSoft.width, borderTopColor: t.borderHairSoft.color,
                backgroundColor: pressed ? t.zebra : on ? t.mutBg : 'transparent',
              })}>
              <Txt size={t.uiText} weight={on ? t.weightMedium : t.weightRegular} color={o.empty ? t.ink3 : t.ink} style={{ flex: 1 }}>{o.label}</Txt>
              {on ? <Icon name="ti-check" size={18} color={t.chrome} /> : null}
            </Pressable>
          );
        })}
      </Sheet>
    </>
  );
}
